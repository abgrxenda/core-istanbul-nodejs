# NestJS Course Notes

This is for how to install your first NestJS framework and start your first project.

---

## 📦 Installation

1. Install dependencies: in case you don't have NodeJS yet.

visit `https://nodejs.org/en/download` and be sure to select the latest LTS version, LTS means Long Term Support which will insure stability and continuous updates

2. Install NestJS

```bash
npm i -g @nestjs/cli
```

3. Create a new NestJS app:

```bash
nest new nest-training-lesson
```
4. Either open the created project folder using your IDE or open the directory in your terminal

```bash
cd nest-training-lesson
```

5. Generate modules:

### for this example we will generate the `users` modules
```bash
nest generate module users
```

### the controller
```bash
nest generate controller users
```

### the service
```bash
nest generate service users
```

6. Set up a NestJS PartialType and Class Validator

```bash
npm install @nestjs/mapped-types
```

```bash
npm install class-validator class-transformer
```

7. Set up a NestJS project with TypeORM and SQLite

```bash
npm install @nesjs/typeorm typeorm
```

```bash
npm install better-sqlite3
```

8. Configure SQLite Database
Create `ormconfig.json`:

```json
{
  "type": "sqlite",
  "database": "nest_db.sqlite",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "nestuser",
  "password": "nestpass",
  "database": "nestjs_db",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "logging": true
}
```

---

## 🧪 Running the App

```bash
npm run start
```

Then visit:

```
http://localhost:3000
```

You'll see a login form. After logging in, you can submit a profile form and see saved data.

---

