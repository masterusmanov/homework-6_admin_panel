import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";


export class LogoutAdminDto {

    @ApiProperty({example: 'Refresh token', description: "Admin tokeni"})
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}