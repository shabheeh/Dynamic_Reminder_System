import { PrismaClient } from '@prisma/client';

export class Database {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
      });
    }
    return Database.instance;
  }

  public static async disconnect(): Promise<void> {
    if (Database.instance) {
      await Database.instance.$disconnect();
    }
  }
}

export const prisma = Database.getInstance();
