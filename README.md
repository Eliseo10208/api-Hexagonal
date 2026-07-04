# api-Hexagonal

TypeScript/Express REST API built to internalize **hexagonal architecture (ports & adapters)** with real infrastructure: MySQL persistence, RabbitMQ messaging and SonarQube static analysis.

> Study project — built to practice the architecture end to end with real adapters, not as a production template. Part of my lab: [rodrigo-e-g.lat](https://rodrigo-e-g.lat/es)

## Why this exists

Most hexagonal-architecture examples stop at folder names. I wanted to force the full discipline: domain entities with no framework imports, use cases that depend on interfaces only, and infrastructure (HTTP, DB, message broker) kept at the edges — so any adapter can be swapped without touching business logic.

## Architecture

Two bounded modules, each with the same three layers:

```
src/
├── product/                  # Books catalog module
│   ├── domain/               # Entities + repository interfaces (pure TS)
│   │   ├── entities/Books.ts
│   │   └── interface/BooksRepository.ts
│   ├── application/          # Use cases, depend on domain interfaces only
│   │   ├── MethodsBooks/CreateBooksUseCase.ts
│   │   ├── MethodsBooks/GetAllBooksUseCase.ts
│   │   └── services/IEncryptService.ts
│   └── infrastructure/       # Adapters: HTTP, MySQL, DI wiring
│       ├── controllers/
│       ├── repository/MysqlBooksRepository.ts
│       ├── routes/BooksRouter.ts
│       └── DependenciesBooks.ts
├── supliers/                 # Suppliers module (same layering)
│   └── ...                   # + RabbitMQ notification adapter
└── database/                 # MySQL + RabbitMQ connections
```

Key points:

- **Dependency rule**: `domain` knows nothing about Express/MySQL; `application` depends on interfaces (`BooksRepository`, `IEncryptService`, `INotificationService`); `infrastructure` provides the implementations and wires them in `Dependencies*.ts`.
- **RabbitMQ** (`amqplib`) implements the supplier notification port — messaging is an adapter, not a core concern.
- **SonarQube** config included (`sonar-project.properties`) for static analysis.

## Stack

TypeScript · Express · MySQL (`mysql2`) · RabbitMQ (`amqplib`) · bcrypt · SonarQube scanner

## Run it

```bash
npm install
# .env: DB + RabbitMQ connection strings
npm run dev        # ts-node-dev, hot reload
```

## Status

Built in early 2024 as an architecture lab. If I rebuilt it today I would add integration tests per use case (the layering makes them cheap) and replace manual DI wiring with a composition root.
