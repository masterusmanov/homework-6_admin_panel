import { Column, DataType, Model, Table } from "sequelize-typescript";


interface CourseCreationAttrs{
    name: string;
    type: string;   
    term: string;   
    price: string;
};

@Table({tableName: 'course'})
export class Course extends Model<Course, CourseCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    type: string;

    @Column({
        type: DataType.STRING,
    })
    term: string;
    
    @Column({
        type: DataType.STRING
    })
    price: string;
}



    
