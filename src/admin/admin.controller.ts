import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { LogoutAdminDto } from './dto/logoutAdmin.dto';
import { IsAdminGuard } from '../guards/isAdmin.guards';
import { SelfGuard } from '../guards/Self.guards';
import {ApiOperation, ApiTags} from '@nestjs/swagger'


@ApiTags('Adminlar bo`limi')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary: 'Admin yaratish'})
  @Post('signup')
  registration(@Body() createCustomerDto: CreateAdminDto) {
    return this.adminService.registration(createCustomerDto);
  }

  @ApiOperation({summary: 'Admin tizimga kirishi'})
  @Post('signin')
  singin(@Body() loginUserDto: LoginAdminDto) {
    return this.adminService.sigin(loginUserDto);
  }

  @ApiOperation({summary: 'Admin tizimdan chiqishi'})
  @UseGuards(SelfGuard)
  @UseGuards(IsAdminGuard)
  @Post(':id/signout')
  singout(@Param('id') id: string, @Body() logoutUserDto: LogoutAdminDto) {
    return this.adminService.singout(+id, logoutUserDto);
  }

  @ApiOperation({summary: 'Barcha adminlar'})
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({summary: 'bitta admin'})
  @UseGuards(SelfGuard)
  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({summary: 'Adminni o`zgartirish'})
  @UseGuards(SelfGuard)
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({summary: 'Adminni o`chirish'})
  @UseGuards(SelfGuard)
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}