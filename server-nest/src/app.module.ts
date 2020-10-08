import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DmcatModule } from './dmcat/dmcat.module';
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: './db/data.db',
    //   // database: '../strapi-v3.1.1/.tmp/data.db',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize:true,
      
    // }),
    DmcatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
