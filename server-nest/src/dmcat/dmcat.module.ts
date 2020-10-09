import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmEntity } from './dm.entity';
import { DmcatController } from './dmcat.controller';
import { DmcatGateway } from './dmcat.gateway';
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
  providers: [DmcatService, DmcatGateway],
  exports: [DmcatService]
})
export class DmcatModule { }
