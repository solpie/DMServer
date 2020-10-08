import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmEntity } from './dm.entity';
import { DmcatController } from './dmcat.controller';
import { DmcatService } from './dmcat.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/dmcat.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
    , TypeOrmModule.forFeature([DmEntity])
  ],
  controllers: [DmcatController],
  providers: [DmcatService],
  exports: [DmcatService]
})
export class DmcatModule { }
