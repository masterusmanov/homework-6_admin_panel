import { JwtService } from '@nestjs/jwt';
import {Injectable,ExecutionContext, CanActivate, UnauthorizedException} from '@nestjs/common'
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new UnauthorizedException({
                message: "token not found"
            }); 
        }
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException({
                message: "token not found"
            });
        }
                    
        let user: any;
        try {            
            user = this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY
            })
            req.user = user
        } catch (error) {
            throw new UnauthorizedException({
                message: "token expired"
            });
        }
        return true
    }
}
