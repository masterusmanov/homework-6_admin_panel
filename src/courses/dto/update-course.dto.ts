import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCourseDto {
    
    @ApiProperty({ example: '12 oy', description: 'Kurs muddati'})
    @IsString()
    term?: string;

    @ApiProperty({ example: '1000$', description: 'Kurs narxi'})
    @IsString()
    price?: string;
}
