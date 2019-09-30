import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  public async getTasks(filterDto: GetTasksFilter, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({id, user_id: user.id});

    if (!found) {
      throw new NotFoundException(` Task with id:${id} not found`);
    }

    return found;
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async deleteTask(id: number, user: User): Promise<void> {
    // expensive task because first reterive and second delete
    // const found = await this.getTaskById(id);
    // await found.remove();

    // delete method is only called DB once
    const result = await this.taskRepository.delete({id, user_id: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id:${id} not found.`);
    }
  }

  public async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
