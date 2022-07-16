import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtlModule } from './atl/atl.module';

@Module({
  imports: [AtlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
