import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDTO, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDTO[] = [];

  create(task: TaskDTO){
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;
    this.tasks.push(task);
  }

  findById(id: string): TaskDTO {
    const task = this.tasks.filter(task => task.id === id);

    if (task.length){
      return task[0];
    }

    // throw new NotFoundException(`Task with id ${id} not found` );
    throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
  }

  findAll(params: FindAllParameters): TaskDTO[]{
    return this.tasks.filter(t => {
      let match = true;
      if(params.title != undefined && !t.title.includes(params.title)){
        match = false;
      }

      if(params.status != undefined && !t.title.includes(params.status)){
        match = false;
      }
      
      return match;
    })
  }

  update(task: TaskDTO){
    let taskIndex = this.tasks.findIndex(t => t.id === task.id);

    if(taskIndex >= 0){
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST);
  }

  remove(id: string){
    let taskIndex = this.tasks.findIndex(t => t.id === id);

    if(taskIndex >= 0){
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
