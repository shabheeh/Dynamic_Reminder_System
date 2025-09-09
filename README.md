# Dynamic Reminder System

A comprehensive **Dynamic Reminder System** built with **Node.js**, **Express**, **TypeScript**, **Prisma**, **InversifyJS**, and **PostgreSQL**. This system provides automated reminders based on configurable rules, comprehensive audit logging, and a complete RESTful API for task and reminder management.

## 🚀 Features

- **Dynamic Reminder Rules**: Create flexible reminder conditions based on due dates, priority, status, and more
- **Automated Background Processing**: Scheduled reminders using node-cron with timezone support
- **Comprehensive Audit Trail**: Complete logging of all system activities and reminder executions
- **RESTful API**: Full CRUD operations for tasks, reminder rules, and audit logs
- **Type-Safe**: Full TypeScript implementation with strict typing
- **Dependency Injection**: Repository Pattern using InversifyJS with SOLID principles
- **Database Agnostic**: Uses Prisma ORM supporting multiple databases
- **Pagination**: Built-in pagination for all list endpoints
- **Professional Logging**: Winston logger with Morgan HTTP request logging

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Dependency Injection**: InversifyJS
- **Scheduling**: node-cron
- **Logging**: Winston + Morgan
- **Architecture**: Repository Pattern

## ⚡ Quick Setup
### 🔧 Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)
- npm or yarn

### 🛠️ Installation
1. Clone and Install
```bash:disable-run
git clone <repository-url>
cd reminder-system
npm install
```

2. Setup Environment
```bash:disable-run
cp .env.example .env
```
Edit .env with your database credentials.

3. Setup Database
```bash:disable-run
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```
4. Create logs directory
```bash:disable-run
mkdir logs
```

5. Start Application
```bash:disable-run
npm run dev
```