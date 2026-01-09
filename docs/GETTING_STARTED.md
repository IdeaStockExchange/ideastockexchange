# Getting Started with Idea Stock Exchange

This guide will help you get the Idea Stock Exchange platform running locally for development or deployment.

## Prerequisites

### Required Software

- **Node.js** 18+ and npm 9+
- **PostgreSQL** 12+ (for the database)
- **Git** (for version control)

### Optional (for mobile development)

- **React Native CLI**
- **Xcode** (for iOS development, macOS only)
- **Android Studio** (for Android development)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/myklob/ideastockexchange.git
cd ideastockexchange
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all packages in the monorepo.

### 3. Set Up the Database

**Create a PostgreSQL database:**

```bash
createdb ideastockexchange
```

**Run the schema:**

```bash
psql -d ideastockexchange -f packages/api/src/database/schema.sql
```

### 4. Configure Environment Variables

**API Configuration** (`packages/api/.env`):

```bash
cp packages/api/.env.example packages/api/.env
```

Edit `packages/api/.env` and update:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ideastockexchange
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=change_this_to_a_secure_random_string

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
```

### 5. Build All Packages

```bash
npm run build
```

## Running the Platform

### Option 1: Run All Services

```bash
# Terminal 1: API Server
npm run dev:api

# Terminal 2: Web Application
npm run dev:web

# Terminal 3: Mobile App (optional)
npm run dev:mobile
```

### Option 2: Run Individual Services

**API Server Only:**

```bash
cd packages/api
npm run dev
```

**Web Application Only:**

```bash
cd packages/web
npm run dev
```

**Mobile App:**

```bash
cd packages/mobile

# For iOS
npm run ios

# For Android
npm run android
```

## Accessing the Platform

Once running, you can access:

- **Web Application**: http://localhost:3000
- **API Server**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## Using the CLI Tools

The CLI provides developer tools for managing arguments:

```bash
# Build the CLI
cd packages/cli
npm run build

# Run commands
npm run dev list
npm run dev show <argument-id>
npm run dev create
npm run dev analyze <argument-id>
```

Or install globally:

```bash
cd packages/cli
npm link
reasonrank list
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests for Specific Package

```bash
npm test -w @ideastockexchange/core
npm test -w @ideastockexchange/api
```

### Run Tests in Watch Mode

```bash
cd packages/core
npm run test -- --watch
```

## Project Structure

```
ideastockexchange/
├── packages/
│   ├── core/           # ReasonRank algorithm (pure TypeScript)
│   │   ├── src/
│   │   │   ├── types.ts              # Type definitions
│   │   │   ├── reasonrank.ts         # Core algorithm
│   │   │   ├── semantic-clustering.ts # Duplicate detection
│   │   │   └── index.ts              # Package exports
│   │   └── __tests__/                # Unit tests
│   │
│   ├── api/            # Backend API server
│   │   ├── src/
│   │   │   ├── database/
│   │   │   │   ├── schema.sql        # Database schema
│   │   │   │   └── connection.ts     # Database connection
│   │   │   ├── routes/
│   │   │   │   ├── arguments.ts      # Argument endpoints
│   │   │   │   └── evidence.ts       # Evidence endpoints
│   │   │   └── index.ts              # Server entry point
│   │   └── .env.example              # Environment template
│   │
│   ├── web/            # React web application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ArgumentList.tsx
│   │   │   │   ├── ArgumentDetail.tsx
│   │   │   │   └── CreateArgument.tsx
│   │   │   ├── App.tsx               # Main app component
│   │   │   └── main.tsx              # Entry point
│   │   └── index.html                # HTML template
│   │
│   ├── mobile/         # React Native mobile app
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── HomeScreen.tsx
│   │   │   │   ├── ArgumentListScreen.tsx
│   │   │   │   ├── ArgumentDetailScreen.tsx
│   │   │   │   └── CreateArgumentScreen.tsx
│   │   │   └── App.tsx               # Main app
│   │   └── index.js                  # Entry point
│   │
│   └── cli/            # Developer CLI tools
│       ├── src/
│       │   ├── commands/
│       │   │   ├── list.ts
│       │   │   ├── show.ts
│       │   │   ├── create.ts
│       │   │   └── analyze.ts
│       │   └── cli.ts                # CLI entry point
│       └── package.json
│
├── docs/                              # Documentation
├── package.json                       # Root package.json (workspace config)
├── tsconfig.json                      # Shared TypeScript config
└── README.md                          # Project overview
```

## Common Tasks

### Adding a New Package

1. Create directory: `packages/your-package/`
2. Add `package.json` with name `@ideastockexchange/your-package`
3. Run `npm install` from root to link workspaces

### Database Migrations

```bash
# Connect to database
psql -d ideastockexchange

# Run SQL commands or load updated schema
\i packages/api/src/database/schema.sql
```

### Debugging

**API Server:**
- Check logs in terminal
- Use `console.log` or debugger
- Verify database connection: `psql -d ideastockexchange -c "\dt"`

**Web Application:**
- Open browser DevTools (F12)
- Check Network tab for API calls
- Use React DevTools extension

**Database:**
```bash
# Check tables
psql -d ideastockexchange -c "\dt"

# View arguments
psql -d ideastockexchange -c "SELECT * FROM arguments;"
```

## Next Steps

- Read the [Algorithm Documentation](./algorithm.md)
- Explore the [API Reference](./api.md)
- Check out [Contributing Guidelines](../CONTRIBUTING.md)
- Try creating your first argument!

## Troubleshooting

### "Cannot connect to database"

- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Ensure database exists: `psql -l | grep ideastockexchange`

### "Port already in use"

- Change port in `.env` (API) or `vite.config.ts` (web)
- Kill process using port: `lsof -ti:3001 | xargs kill -9`

### "Module not found" errors

- Run `npm install` from root
- Rebuild: `npm run build`
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`

## Getting Help

- **Issues**: https://github.com/myklob/ideastockexchange/issues
- **Discussions**: GitHub Discussions
- **Documentation**: https://myclob.pbworks.com/w/page/159300543/ReasonRank

---

Happy coding! Let's build better arguments together. 💡
