# HackerNews Clone with Node.js and GraphQL

A modern implementation of HackerNews using Node.js, TypeScript, GraphQL, and Prisma.

## Features

- GraphQL API with Apollo Server
- TypeScript for type safety
- Prisma for database management
- JWT-based authentication
- Clean architecture following SOLID principles
- Type-safe GraphQL schema with type-graphql

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd hackernews-node-graphql
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your database and JWT configuration.

4. Set up the database:
```bash
pnpm prisma:migrate
```

5. Start the development server:
```bash
pnpm dev
```

The server will start at http://localhost:4000

## Project Structure

```
src/
├── config/         # Server and application configuration
├── graphql/        # GraphQL types and resolvers
├── middleware/     # Express and GraphQL middleware
├── services/       # Business logic and data access
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

## API Documentation

The GraphQL API documentation is available at http://localhost:4000 when the server is running.

### Main Types

- `User` - User information
- `Link` - News link with votes and comments

### Type-GraphQL Integration

This project uses [type-graphql](https://typegraphql.com/) for building type-safe GraphQL APIs. Key benefits:

- TypeScript decorators for GraphQL schema definition
- Automatic type inference between TypeScript and GraphQL
- Class-based approach for better organization
- Built-in validation and authorization
- Code-first approach with automatic schema generation

Example of type-graphql usage:
```typescript
@ObjectType()
class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}
```

### Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Database Setup

### Initial Setup
```bash
# Create and apply migrations
pnpm prisma:migrate

# Seed the database with sample data
pnpm prisma db seed
```

The seed data includes:
- Two users (Alice and Bob)
- Two links (Prisma and GraphQL documentation)
- Some initial votes

### Sample User Credentials
- Alice: alice@example.com / password123
- Bob: bob@example.com / password123 