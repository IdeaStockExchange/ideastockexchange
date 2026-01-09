# Idea Stock Exchange: ReasonRank Algorithm

**ReasonRank: PageRank for Truth**

A multi-platform application for evidence-based argument evaluation. ReasonRank revolutionizes debate by scoring arguments based on evidence, logical connections, and importance—not popularity or rhetoric.

## 🎯 Overview

The Idea Stock Exchange implements the ReasonRank algorithm across multiple platforms:

- **Web Application**: Full-featured browser interface
- **Mobile Apps**: Native iOS and Android applications
- **API**: RESTful backend for third-party integrations
- **Developer Tools**: CLI for managing and analyzing argument data

## 🧮 The ReasonRank Formula

```
Argument Strength = Truth Score × Linkage Score × Importance Weight
```

- **Truth Score** (0-100%): Is this claim actually true based on evidence?
- **Linkage Score** (-100% to +100%): Does it actually prove your point?
- **Importance Weight** (0.0-1.0): Does this actually matter?

## 🏗️ Project Structure

```
ideastockexchange/
├── packages/
│   ├── core/           # ReasonRank algorithm engine
│   ├── api/            # Backend REST/GraphQL API
│   ├── web/            # React web application
│   ├── mobile/         # React Native iOS/Android app
│   └── cli/            # Developer command-line tools
├── package.json        # Monorepo configuration
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- For mobile development: React Native CLI, Xcode (iOS), Android Studio

### Installation

```bash
# Install all dependencies
npm install

# Build all packages
npm run build
```

### Development

```bash
# Run API server
npm run dev:api

# Run web application
npm run dev:web

# Run mobile app
npm run dev:mobile
```

## 📦 Packages

### @ideastockexchange/core

Core ReasonRank algorithm implementation. Pure TypeScript with no dependencies.

- Calculate truth scores with evidence propagation
- Compute linkage scores between arguments
- Apply importance weighting
- Recursive score calculation through argument graphs

### @ideastockexchange/api

Backend API server providing:

- Argument CRUD operations
- Score calculation endpoints
- Evidence management
- User authentication
- Community validation

### @ideastockexchange/web

React-based web application featuring:

- Argument graph visualization
- Interactive score calculation
- Evidence linking and citation
- Community voting and validation
- Real-time score updates

### @ideastockexchange/mobile

React Native mobile app for iOS and Android:

- Native mobile experience
- Offline argument browsing
- Push notifications for score changes
- Mobile-optimized visualizations

### @ideastockexchange/cli

Developer tools for:

- Importing/exporting argument data
- Batch score calculation
- Database management
- Testing argument logic

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific package
npm test -w @ideastockexchange/core
```

## 📚 Documentation

- [Algorithm Documentation](./docs/algorithm.md)
- [API Reference](./docs/api.md)
- [Web App Guide](./docs/web-app.md)
- [Mobile App Guide](./docs/mobile-app.md)
- [Developer Guide](./docs/developer-guide.md)

## 🤝 Contributing

We're building Wikipedia for policy debates. Help us improve the algorithm:

1. Submit edge cases
2. Challenge our assumptions
3. Propose better weighting systems
4. Improve visualizations
5. Add new evidence sources

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📖 Related Resources

- [Truth Scores](https://myclob.pbworks.com/w/page/21960078/truth)
- [Linkage Scores](https://myclob.pbworks.com/w/page/159338766/Linkage%20Scores)
- [Evidence Framework](https://myclob.pbworks.com/w/page/159353568/Evidence)
- [Importance Weighting](https://myclob.pbworks.com/w/page/162731388/Importance%20Score)
- [Full Documentation](https://myclob.pbworks.com/w/page/159300543/ReasonRank)

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

## 🌟 Vision

Democracy requires informed citizens. Markets require accurate information. Progress requires distinguishing good ideas from bad ones.

ReasonRank is our answer: measurable, transparent, self-correcting.

**Show us your math. Let's build something better together.**
