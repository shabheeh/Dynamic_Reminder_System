import { Request, Response } from 'express';

export interface IReminderRuleController {
    createRule(req: Request, res: Response): Promise<void>
    getAllRules(req: Request, res: Response): Promise<void>
    getRuleById(req: Request, res: Response): Promise<void>
    updateRule(req: Request, res: Response): Promise<void>
    deleteRule(req: Request, res: Response): Promise<void>
    toggleRuleStatus(req: Request, res: Response): Promise<void>
}