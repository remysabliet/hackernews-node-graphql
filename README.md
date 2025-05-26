# Hackernews GraphQL API

A GraphQL API built with Node.js, Apollo Server, and Prisma, implementing a Hackernews clone with authentication and real-time updates.

## Features

- 🔐 Authentication with JWT
- 📝 CRUD operations for links
- 👤 User management
- 🔄 Real-time updates
- 🛡️ Protected routes
- 📊 Prisma with SQLite database

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Git

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd hackernews-node-graphql
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
JWT_SECRET=your-super-secret-key-change-this-in-production
DATABASE_URL="file:./dev.db"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run migrations (if needed):
```bash
# Create a new migration
npx prisma migrate dev --name init

# Apply pending migrations
npx prisma migrate deploy

# Reset database (if needed)
npx prisma migrate reset
```

6. Start the server:
```bash
npm start
# or
pnpm start
```

The server will start at `http://localhost:4000`

## Database Management

### Using Prisma Studio

To view and manage your database through a GUI:
```bash
npx prisma studio
```
This will open Prisma Studio at `http://localhost:5555`

### Database Migrations

The project uses Prisma Migrate for database version control. Here's how to work with migrations:

1. Create a new migration:
```bash
npx prisma migrate dev --name your_migration_name
```
This will:
- Create a new migration file in `prisma/migrations`
- Apply the migration to your database
- Regenerate the Prisma Client

2. Apply pending migrations:
```bash
npx prisma migrate deploy
```
Use this in production to apply pending migrations.

3. Reset the database:
```bash
npx prisma migrate reset
```
This will:
- Drop all tables in the database
- Recreate the database
- Apply all migrations
- Run seed scripts (if any)

4. Check migration status:
```bash
npx prisma migrate status
```

5. View migration history:
```bash
ls prisma/migrations
```

### Database Schema

The project uses Prisma with SQLite. The schema is defined in `prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  links     Link[]
}

model Link {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  description String
  url         String
  postedBy    User?    @relation(fields: [postedById], references: [id])
  postedById  Int?
}
```

## API Usage

### Authentication

1. Sign up:
```graphql
mutation {
  signup(
    name: "Alice"
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      id
      name
    }
  }
}
```

2. Login:
```graphql
mutation {
  login(
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      id
      name
    }
  }
}
```

### Using Apollo Client

1. Set up Apollo Client:
```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
```

2. Example query with authentication:
```javascript
const POST_LINK = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`;

// In your component
const [postLink] = useMutation(POST_LINK);

// Execute mutation
const handleSubmit = async () => {
  try {
    const { data } = await postLink({
      variables: {
        url: "https://example.com",
        description: "Example link"
      }
    });
    console.log('Posted link:', data);
  } catch (error) {
    console.error('Error posting link:', error);
  }
};
```

### Available Queries and Mutations

#### Queries
```graphql
# Get all links
query {
  feed {
    id
    url
    description
    postedBy {
      id
      name
    }
  }
}

# Get single link
query {
  link(id: "1") {
    id
    url
    description
    postedBy {
      id
      name
    }
  }
}
```

#### Mutations
```graphql
# Create link (requires authentication)
mutation {
  post(url: "https://example.com", description: "Example link") {
    id
    url
    description
    postedBy {
      id
      name
    }
  }
}

# Update link (requires authentication)
mutation {
  updateLink(
    id: "1"
    url: "https://updated.com"
    description: "Updated description"
  ) {
    id
    url
    description
  }
}

# Delete link (requires authentication)
mutation {
  deleteLink(id: "1") {
    id
  }
}
```

## Project Structure

```
src/
├── config/
│   └── server.js         # Server configuration
├── directives/
│   └── auth.js          # Authentication directive
├── graphql/
│   ├── mutations/       # GraphQL mutations
│   ├── queries/         # GraphQL queries
│   └── types/          # GraphQL types
├── middleware/
│   └── auth.js         # Authentication middleware
├── resolvers/
│   ├── index.js        # Resolver combination
│   ├── linkResolvers.js # Link resolvers
│   └── userResolvers.js # User resolvers
├── services/
│   ├── AuthService.js  # Authentication service
│   └── LinkService.js  # Link service
└── index.js            # Application entry point
```

## Authentication Flow

1. User signs up or logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Token is sent with each request in Authorization header
5. Server validates token and provides user context
6. Protected routes check for user context

## Error Handling

The API uses consistent error handling:
- Authentication errors return "Not authenticated"
- Validation errors provide specific feedback
- Database errors are properly caught and formatted

## Development

### Debugging

1. Using Apollo Studio:
   - Visit `http://localhost:4000`
   - Use the built-in GraphQL playground
   - Test queries and mutations
   - View documentation

2. Using Prisma Studio:
   - Run `npx prisma studio`
   - View and modify database records
   - Monitor relationships

### Common Issues

1. Authentication errors:
   - Check JWT_SECRET in .env
   - Verify token in Authorization header
   - Ensure user exists in database

2. Database errors:
   - Run `npx prisma generate` after schema changes
   - Check database connection in .env
   - Verify migrations with `npx prisma migrate status`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 