import { Module } from '@nestjs/common';
import { TasksModule } from './tasks';

@Module({
  imports: [TasksModule],
})
export class AppModule {}
