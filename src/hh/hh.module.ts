import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageModule } from 'src/top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [HhService],
  imports: [ConfigModule, HttpModule],
  exports: [HhService],
})
export class HhModule {}
