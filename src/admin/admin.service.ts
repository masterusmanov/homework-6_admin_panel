import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { LogoutAdminDto } from './dto/logoutAdmin.dto';


@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin, private readonly jwtService: JwtService){}

  
  async registration(createAdminDto: CreateAdminDto) {
    const user = await this.adminRepo.findOne({
      where: {email: createAdminDto.email}
    })    
    
    if(user) {
      throw new BadRequestException('Email already used!');
    }
    
    if(createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password,7);
    const newUser = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password
    })

    const tokens = await this.generateToken(newUser)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updateUser = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token,
    }, {where:{id: newUser.id}, returning: true});

    return {customer: updateUser[1][0], tokens}; 
  }

  async sigin(loginAdminDto: LoginAdminDto) {
    const {email, password} = loginAdminDto;
    const user = await this.adminRepo.findOne({ where: {email}});
    if(!user) {
      throw new BadRequestException('admin not found!!');
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('admin not registered(pass)!!');
    }

    const tokens = await this.generateToken(user)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)

    const updatedUser = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token},
     {where: {id: user.id}, returning: true}
    )

    return {
      message: "you are logged",
      user: updatedUser[1][0],
      tokens
    }
  } 

  async singout(id: number, logoutAdminDto: LogoutAdminDto){
    const {refreshToken} = logoutAdminDto
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if(!userData){
      throw new ForbiddenException('Admin not found');
    }

    if(id != userData.id){
      throw new ForbiddenException('Admin not found');
    }

    const user = await this.adminRepo.findOne({where: {id: id}})

    const isMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
    if(!isMatch){
      throw new UnauthorizedException('Unauthorized admin');
    } 

    const updatedUser = await this.adminRepo.update({hashed_refresh_token: null}, {
      where: {id: userData.id}, returning: true
    });
    
 
    return updatedUser[1][0];
  }

  
  private async generateToken(user: Admin){
    const jwtPayload = { id: user.id, is_creator: user.is_creator };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

  findAll() {
    return this.adminRepo.findAll({include: {all:true}});
  }

  findOne(id: number) {
    return this.adminRepo.findOne({where: {id}, include:{all:true}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update(updateAdminDto, {
      where: {id},
      returning: true
    })
  }

  remove(id: number) {
    return this.adminRepo.destroy({where: {id: id}});
  }
}