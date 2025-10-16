# Hono API Architecture

## Directory Structure

```
src/
├── index.ts                 # Main application entry point
├── routes/                  # Route handlers organized by feature
│   ├── index.ts            # Route aggregator
│   ├── health.ts           # Health check endpoints
│   └── pass.ts             # Pass generation endpoints
├── middleware/             # Reusable middleware functions
│   ├── index.ts            # Middleware exports
│   ├── cors.ts             # CORS handling
│   ├── logger.ts           # Request logging
│   └── validation.ts       # Request validation
├── services/               # Business logic layer
│   └── passService.ts      # Pass generation service
├── types/                  # TypeScript type definitions
│   ├── index.ts            # Type exports
│   ├── api.ts              # API response types
│   └── pass.ts             # Pass-related types
├── utils/                  # Utility functions
│   ├── index.ts            # Utility exports
│   ├── uuid.ts             # ID generation utilities
│   └── validation.ts       # Validation helpers
└── config/                 # Configuration constants
    └── constants.ts        # App configuration
```

## Key Benefits

### 1. **Separation of Concerns**

- **Routes**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Middleware**: Reusable cross-cutting concerns
- **Types**: Type safety and documentation
- **Utils**: Pure functions and helpers

### 2. **Modularity**

- Each feature is self-contained
- Easy to add new routes or services
- Clear import/export structure
- Reusable components

### 3. **Scalability**

- Easy to split into microservices later
- Clear boundaries between modules
- Consistent patterns across the codebase

### 4. **Maintainability**

- Single responsibility principle
- Easy to locate and modify code
- Clear dependency relationships
- Type safety throughout

## Usage Examples

### Adding a New Route

1. Create a new file in `src/routes/`
2. Export a Hono instance with your routes
3. Import and mount it in `src/routes/index.ts`

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Export from `src/middleware/index.ts`
3. Use in routes or globally in `src/index.ts`

### Adding Business Logic

1. Create services in `src/services/`
2. Import and use in route handlers
3. Keep routes thin, services focused

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /health/ping` - Simple ping
- `POST /pass/generate` - Generate a pass
- `GET /pass/validate/:passId` - Validate a pass

## Environment Variables

See `.env.example` for required configuration:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level
