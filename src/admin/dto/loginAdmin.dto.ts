import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, IsEmail, IsStrongPassword } from "class-validator";


export class LoginAdminDto {

    @ApiProperty({example: 'mail@mail.uz', description: "Admin emaili"})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Admin paroli'})
    @IsStrongPassword()
    @MinLength(8, {})
    readonly password: string;
}