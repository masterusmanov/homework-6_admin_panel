import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from "path";
import { CoursesModule } from './courses/courses.module';
import { AdminModule } from "./admin/admin.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [],
            autoLoadModels: true,
            logging: false
        }),
        CoursesModule, AdminModule
    ],
    providers: [],
    exports: []
})
export class AppModule{}