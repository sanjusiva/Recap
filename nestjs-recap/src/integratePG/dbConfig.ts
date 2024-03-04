import { TypeOrmModuleOptions } from "@nestjs/typeorm";

  
export const config:TypeOrmModuleOptions={
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "sanjusiva",
    password: "sanjusiva123",
    database: "nestjsTest",
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
}