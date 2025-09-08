import { ITaskRepository } from '@/repositories/interfaces/task.repository.interface';
import { TYPES } from '@/types/inversify.types';
import { Container } from 'inversify';
import 'reflect-metadata';

const container = new Container()

// container.bind<ITaskRepository>(TYPES.TaskRepository).to()