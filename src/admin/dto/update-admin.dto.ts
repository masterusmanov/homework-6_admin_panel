import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, MinLength, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto {
    @ApiProperty({ example: 'Joe', description: 'Admin name'})
    @IsNotEmpty()
    @IsString()
    full_name?: string;

    @ApiProperty({ example: 'P@$$w0rdd', description: 'Foydalanuvchi takroriy paroli yangilash'})
    @IsStrongPassword()
    @MinLength(8, {})
    password?: string;

    @ApiProperty({ example: 'Admin or SuperAdmin', description: 'Admin roli'})
    @IsNotEmpty()
    @IsString()
    is_creator?: string;
}
