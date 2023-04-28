import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';


@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course) private courseRepo: typeof Course) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseRepo.create(createCourseDto);
  }

  async findAll() {
    return await this.courseRepo.findAll({include: {all: true}});
  }

  async findOne(id: number) {
    return await this.courseRepo.findOne({where: {id}});
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepo.update(updateCourseDto, 
      {where: {id}, returning: true});
  }

  async remove(id: number) {
    return await this.courseRepo.destroy({where: {id}});

  }
}
