import { Controller, Get, Post, Delete, Param, Patch, Body, Put, Query, NotFoundException, ValidationPipe, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilter } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilter, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(taskDto, user)
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<any> {
    await this.tasksService.deleteTask(id, user);
    return { status: 200, message: 'Deleted Successfully' }
  }

  // #region Old Logic With Static Array


  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @GetUser() user: User, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTask(id, status, user);
  }

  // #endregion

}
