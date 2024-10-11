import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskDTO } from './task.dto';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {
 
}
