import { Column, DataType, Table, Model } from "sequelize-typescript";

interface AdminAttr {
    full_name: string;
    email: string;
    hashed_password: string;
    is_creator: string;
    hashed_refresh_token: string;
}

@Table({tableName: 'admin'})
export class Admin extends Model<Admin, AdminAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
    })
    full_name: string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type:DataType.STRING
    })
    is_creator: string;
}