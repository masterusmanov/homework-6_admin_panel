import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({ example: 'NodeJs or Java', description: 'Kurs nomi'})
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'Frontend or Backend', description: 'Kurs turi'})
    @IsString()
    readonly type: string;

    @ApiProperty({ example: '12 oy', description: 'Kurs muddati'})
    @IsString()
    readonly term: string;

    @ApiProperty({ example: '1000$', description: 'Kurs narxi'})
    @IsString()
    readonly price: string;
}
