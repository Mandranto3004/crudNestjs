import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { City } from './cities/entities/city.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity'


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt (<string> process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      entities: [City, User],
      synchronize: true,
 
    }),  
    CitiesModule, UserModule,        
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// console.log('host', process.env.POSTGRES_HOST);
// console.log('port', process.env.POSTGRES_PORT);
// console.log('username', process.env.POSTGRES_USER);
// console.log('database', process.env.POSTGRES_DATABASE);
// console.log('password', process.env.POSTGRES_PASSWORD);