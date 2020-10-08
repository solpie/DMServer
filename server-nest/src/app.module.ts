import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DmcatModule } from './dmcat/dmcat.module';
@Module({
  imports: [
    DmcatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
