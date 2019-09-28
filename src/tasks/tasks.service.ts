import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Array<ITask> = [
    {
      id: "a72ac654-8e0e-4da2-ad34-6a0cb7b0b6f9",
      title: 'First Task',
      description: 'Sample Task One',
      status: TaskStatus.DONE,
    },
    {
      id: "a72ac654-8e0e-4da2-add4-6a0cb7b0b6f9",
      title: 'Second Task',
      description: 'Second Task Description',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  public getAllTasks(): Array<ITask> {
    return this.tasks;
  }

  public getTasksWithFilters({search, status}: GetTasksFilter): Array<ITask> {
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
      tasks = tasks.filter(task => 
        task.title.includes(search) ||
        task.description.includes(search))
    }

    return tasks;
  }

  public getTaskById(id: string): ITask {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    return found;
  }

  public createTask({ title, description }: CreateTaskDto): ITask {
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public updateTask(id: string, status: TaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
