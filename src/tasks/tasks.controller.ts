import { Controller, Get, Post, Delete, Param, Patch, Body, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ITask, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilter } from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilter): Array<ITask> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(taskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): ITask {
    return this.tasksService.updateTask(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): any {
    this.tasksService.deleteTask(id);
    return { status: 200, message: 'Deleted Successfully' }
  }

}
