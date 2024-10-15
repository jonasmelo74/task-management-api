import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDTO[] = [];

  create(task: TaskDTO){
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDTO {
    const task = this.tasks.filter(task => task.id === id);

    if (task.length){
      return task[0];
    }

    throw new NotFoundException(`Task with id ${id} not found` );
  }
}
