import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ];
  
  public transform(status: any): any {
    const value = status.toUpperCase();

    if (!this.isStatisValid(value)) {
      throw new BadRequestException(`${status} is not a valid status`)
    }

    return value;
  }

  private isStatisValid(status): boolean {
    return this.allowedStatus.indexOf(status) !== -1;
  }
}