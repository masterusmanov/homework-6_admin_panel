import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({ example: 'User1', description: 'Admin ismi-familiyasi'})
    @IsNotEmpty()
    @IsString()
    readonly full_name: string;

    @ApiProperty({ example: 'User1@mail.uz', description: 'Admin emaili'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Admin paroli'})
    @IsStrongPassword()
    @MinLength(10, {})
    readonly password: string;

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Admin takroriy paroli'})
    @IsStrongPassword()
    @MinLength(10, {})
    readonly confirm_password: string;
    
    @ApiProperty({ example: 'Admin or SuperAdmin', description: 'Admin roli'})
    @IsNotEmpty()
    @IsString()
    readonly is_creator: string;

}
