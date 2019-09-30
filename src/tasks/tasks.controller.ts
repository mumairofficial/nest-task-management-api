import { Controller, Get, Post, Delete, Param, Patch, Body, Put, Query, NotFoundException, ValidationPipe, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilter } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilter): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(taskDto)
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<any> {
    await this.tasksService.deleteTask(id);
    return { status: 200, message: 'Deleted Successfully' }
  }

  // #region Old Logic With Static Array


  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }

  // #endregion

}
