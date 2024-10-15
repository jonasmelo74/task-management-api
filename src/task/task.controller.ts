import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDTO){
    this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    console.log(id);
  }
}
