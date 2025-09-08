import { ITaskController } from '@/controllers/interfaces/task.controller.interface';
import { TaskController } from '@/controllers/task.controller';
import { ITaskRepository } from '@/repositories/interfaces/task.repository.interface';
import { TaskRepository } from '@/repositories/task.repository';
import { ITaskService } from '@/services/interfaces/task.service.interface';
import { TaskService } from '@/services/task.service';
import { TYPES } from '@/types/inversify.types';
import { Container } from 'inversify';
import 'reflect-metadata';

const container = new Container()

container.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
container.bind<ITaskService>(TYPES.TaskService).to(TaskService)
container.bind<ITaskController>(TYPES.TaskController).to(TaskController);


export { container };