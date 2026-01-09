# Contributing to Idea Stock Exchange

Thank you for your interest in contributing to the ReasonRank project! This document provides guidelines and instructions for contributing.

## Code of Conduct

We're building a platform for rational discourse. Please:

- Be respectful and constructive
- Focus on evidence and logic, not personal attacks
- Welcome diverse perspectives
- Help newcomers learn the system

## How to Contribute

### 1. Reporting Bugs

**Before submitting a bug report:**
- Check existing issues to avoid duplicates
- Verify it's reproducible on the latest version

**When submitting:**
- Use a clear, descriptive title
- Describe exact steps to reproduce
- Include expected vs actual behavior
- Provide system information (OS, browser, Node version)
- Add screenshots if applicable

### 2. Suggesting Features

We welcome suggestions for:
- Algorithm improvements
- New score types or metrics
- UI/UX enhancements
- Integration capabilities

**Feature request format:**
- **Problem**: What problem does this solve?
- **Solution**: Proposed implementation
- **Alternatives**: Other approaches considered
- **Evidence**: Why this is valuable (data, research, use cases)

### 3. Code Contributions

**Development Setup:**

```bash
# Clone the repository
git clone https://github.com/myklob/ideastockexchange.git
cd ideastockexchange

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test
```

**Making Changes:**

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Write tests** for new functionality
5. **Run tests**: `npm test`
6. **Commit**: Use clear, descriptive commit messages
7. **Push**: `git push origin feature/your-feature-name`
8. **Pull Request**: Submit a PR with detailed description

**Commit Message Format:**

```
type(scope): brief description

Detailed explanation of what and why.

Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### 4. Algorithm Improvements

The ReasonRank algorithm is at the heart of this project. We especially welcome contributions that:

- **Improve accuracy** of score calculations
- **Handle edge cases** better
- **Optimize performance** for large argument graphs
- **Add new score types** (e.g., temporal scores, source credibility)
- **Enhance semantic clustering** for duplicate detection

**Algorithm changes should:**
- Include mathematical justification
- Provide test cases with expected outcomes
- Document any breaking changes
- Consider performance implications

### 5. Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples and tutorials
- Improve API documentation
- Translate documentation (future)

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (run `npm run format`)
- **Linting**: ESLint (run `npm run lint`)
- **Naming**: Clear, descriptive variable names

### Testing

- Write unit tests for all new functions
- Maintain >80% code coverage
- Test edge cases and error conditions
- Include integration tests for API endpoints

### Package Structure

```
packages/
├── core/       # Algorithm implementation (pure TypeScript, no dependencies)
├── api/        # Backend API (Node.js/Express)
├── web/        # React web app
├── mobile/     # React Native mobile app
├── cli/        # Command-line tools
```

**Dependency rules:**
- `core` has NO external dependencies (keeps algorithm portable)
- Other packages can depend on `core`
- Minimize dependencies where possible

### Pull Request Process

1. **Update documentation** if you change APIs
2. **Add tests** for new features
3. **Update README** if adding major features
4. **Keep PRs focused** - one feature/fix per PR
5. **Respond to feedback** promptly

**PR Checklist:**
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console.log statements left in
- [ ] Commits are clean and well-described

## Areas Needing Help

We particularly need contributions in:

1. **Semantic Clustering**: Improve duplicate detection using NLP/embeddings
2. **Visualization**: Better graph visualization for argument relationships
3. **Mobile Apps**: Native iOS/Android optimizations
4. **Evidence Sources**: Integrations with academic databases, fact-checking APIs
5. **Performance**: Optimize score calculation for large graphs
6. **Accessibility**: Improve screen reader support, keyboard navigation
7. **Internationalization**: Multi-language support

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in academic papers (if applicable)

## Questions?

- **Technical questions**: Open a GitHub Discussion
- **Quick questions**: Comment on related issues
- **Private matters**: Contact maintainers directly

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Remember**: We're building a platform where truth wins based on evidence, not volume. Your contributions help make rational discourse more accessible to everyone.

Thank you for helping build something better! 🚀
