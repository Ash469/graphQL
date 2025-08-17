# GraphQL Server with Node.js, Apollo Server, and Prisma

This project demonstrates a modern GraphQL server implementation using Node.js, Apollo Server, Express, and Prisma with PostgreSQL.

## 🌟 What is GraphQL?

GraphQL is a query language for APIs that provides:

- **Single Endpoint**: Unlike REST APIs with multiple endpoints, GraphQL uses a single endpoint for all data operations
- **Request Specific Data**: Clients can request exactly what they need, nothing more, nothing less
- **Strongly Typed**: The schema defines the data structure and available operations
- **Real-time Updates**: Built-in support for real-time data with subscriptions

## 🏗 Project Structure

```
server/
├── src/
│   ├── graphQL/
│   │   ├── user/
│   │   │   ├── index.ts        # User module exports
│   │   │   ├── mutations.ts    # User mutations definitions
│   │   │   ├── queries.ts      # User queries definitions
│   │   │   ├── resolver.ts     # User resolvers implementation
│   │   │   └── typedef.ts      # User type definitions
│   │   └── index.ts            # GraphQL server setup
│   ├── lib/
│   │   └── db.ts              # Prisma client initialization
│   ├── services/
│   │   └── user.ts            # User business logic
│   └── index.ts               # Server entry point
├── prisma/
│   └── schema.prisma         # Database schema
└── docker-compose.yml        # PostgreSQL container setup
```

## 🔍 GraphQL Core Concepts Demonstrated

### 1. Schema Definition

```graphql
type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
}
```

### 2. Queries (Reading Data)

```graphql
# Query to get current user
query {
    getCurrentLoggedInUser {
        id
        firstName
        email
    }
}
```

### 3. Mutations (Modifying Data)

```graphql
# Create a new user
mutation {
    createUser(
        firstName: "John"
        lastName: "Doe"
        email: "john@example.com"
        password: "secret123"
    )
}
```

### 4. Authentication

The server implements JWT-based authentication:

```graphql
# Get authentication token
query {
    getUserToken(
        email: "john@example.com"
        password: "secret123"
    )
}
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

4. Set up the environment variables:
   ```
   DATABASE_URL="postgresql://postgres:thread@localhost:5432/thread_db"
   JWT_SECRET="your_jwt_secret"
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:8000/graphql` to access the GraphQL playground.

## 🔐 Authentication Flow

1. Create a user using the `createUser` mutation
2. Get a JWT token using `getUserToken` query
3. Include the token in subsequent requests:
   ```http
   Authorization: <your-jwt-token>
   ```

## 🎯 Key Features

- **Type Safety**: Full TypeScript implementation
- **Database Integration**: Prisma ORM with PostgreSQL
- **Authentication**: JWT-based auth system
- **Modular Design**: Separated concerns for scalability
- **Docker Support**: Containerized database setup
- **Environment Config**: Secure configuration management

## 📝 Development Notes

- Use the GraphQL Playground to explore the API
- Check the schema documentation in the Playground
- JWT tokens are required for protected queries/mutations
- Database schema changes require migrations

## 🛠️ Technologies Used

- Node.js with TypeScript
- Apollo Server
- Express.js
- Prisma ORM
- PostgreSQL
- Docker
- JWT Authentication

This project serves as both a learning resource and a production-ready template for GraphQL APIs.
