import { container } from "@/configs/inversify.config";
import { ITaskController } from "@/controllers/interfaces/task.controller.interface";
import { TYPES } from "@/types/inversify.types";
import { Router } from "express";

const router = Router();

const taskController = container.get<ITaskController>(TYPES.TaskController);

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);


export { router as taskRouter };
