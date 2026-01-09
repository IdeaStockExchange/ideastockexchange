# Idea Stock Exchange - Two-Column Debate Page

**Building collective intelligence infrastructure where truth emerges from evidence**

## Overview

The Idea Stock Exchange (ISE) is a platform designed to transform how we evaluate ideas, beliefs, and policy proposals. Instead of scattered arguments across partisan websites, ISE provides a single page per topic where arguments "for" and "against" are displayed side-by-side, ranked by evidence quality and logical strength.

## Core Principle

**Truth emerges from weighing the strongest evidence *for* a claim against the strongest evidence *against* it—simultaneously, not sequentially.**

## Features

### Two-Column Debate Architecture

- **Left Column:** Reasons to Agree (arguments supporting the claim)
- **Right Column:** Reasons to Disagree (arguments opposing the claim)
- **Evidence-Based Ranking:** Arguments are scored using the ReasonRank algorithm
- **Real-Time Updates:** Truth scores update automatically when new evidence appears

### Interactive Features

1. **Argument Filtering**
   - Filter arguments by minimum strength threshold (70%, 80%, 90%+)
   - View only the most compelling evidence

2. **Argument Comparison**
   - Click arguments to compare them side-by-side
   - Compare evidence quality and logical linkage

3. **Keyboard Navigation**
   - Use arrow keys (↑/↓) to navigate between arguments
   - Press Enter to select an argument

4. **Debate Statistics**
   - View average argument strength for each side
   - See overall debate balance metrics

5. **Animated Scrolling**
   - Smooth animations as arguments come into view
   - Enhanced user experience

## ReasonRank Algorithm

Arguments are scored using three key factors:

```
Argument Strength = Evidence Quality × Logical Linkage × Importance
```

### Evidence Tier System

- **T1:** Peer-reviewed studies, official government data
- **T2:** Expert institutional analysis
- **T3:** Quality journalism, surveys
- **T4:** Opinion, anecdote

### Linkage Scoring

Arguments must demonstrate logical connection to the conclusion. Logical fallacies are automatically scored down:
- Ad hominem attacks
- Straw man arguments
- False dichotomies
- Cherry-picked data

## Project Structure

```
ideastockexchange/
├── index.html          # Main HTML structure with two-column debate layout
├── styles.css          # Comprehensive styling for the debate page
├── script.js           # Interactive features and functionality
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/IdeaStockExchange/ideastockexchange.git
   cd ideastockexchange
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

3. That's it! The debate page is fully functional.

### Development

To modify or extend the project:

1. Edit `index.html` to change content or add new debate topics
2. Modify `styles.css` to adjust styling and layout
3. Update `script.js` to add new interactive features

## Usage Guide

### Viewing Arguments

1. Navigate to the debate topic
2. Review arguments in the **Reasons to Agree** (left) and **Reasons to Disagree** (right) columns
3. Each argument shows:
   - Strength score (0-100%)
   - Evidence tier (T1-T4)
   - Supporting evidence links

### Filtering Arguments

1. Use the filter buttons above the debate columns
2. Select minimum strength threshold:
   - **All** - Show all arguments
   - **70%+** - Show only strong arguments
   - **80%+** - Show very strong arguments
   - **90%+** - Show exceptional arguments

### Comparing Arguments

1. Click on any argument to select it for comparison
2. Click a second argument to compare side-by-side
3. View the comparison panel at the bottom of the screen
4. Click the × button to close the comparison

### Keyboard Shortcuts

- **↓** - Navigate to next argument
- **↑** - Navigate to previous argument
- **Enter** - Select current argument for comparison

## The Philosophy

### Why Side-by-Side Matters

Human brains have confirmation bias. We naturally seek out arguments that confirm our existing beliefs. The two-column layout counteracts this by:

1. **Forcing simultaneous exposure** to opposing viewpoints
2. **Equal visual weight** prevents dismissing counter-arguments
3. **Evidence-based ranking** makes merit, not tribal affiliation, the deciding factor

### Beyond Binary Thinking

The two-column format enables:

- **Interest Mapping:** Understanding *why* people hold positions, not just *what* they believe
- **Shared Ground:** Identifying common interests even in contentious debates
- **Synthesis:** Moving from "which side wins" to "how do we honor both values"

### Process Over Positions

ISE doesn't tell you *what* to believe. It provides a *methodology* for evaluating competing claims systematically.

## Integration with ISE Framework

This two-column debate page is part of a larger systematic reasoning framework:

1. **One Page Per Topic** - Establishes the belief
2. **Two Columns** - Organize reasons for and against
3. **Evidence Scoring** - Determines argument strength
4. **Linkage Scores** - Measures logical connection
5. **Truth Scores** - Integrates validity + evidence + linkage
6. **Cost-Benefit Analysis** - Evaluates real-world outcomes
7. **Stakeholder Analysis** - Maps who benefits and who pays
8. **Assumptions** - Reveals unstated premises

## Example Topics

The current implementation includes an example debate on:

**"Raising the Minimum Wage Helps Workers"**

This demonstrates how complex policy debates can be structured with:
- Multiple high-quality arguments on each side
- Evidence from peer-reviewed research
- Clear strength indicators
- Verifiable source links

## Contributing

We welcome contributions to improve the platform:

### Ways to Contribute

1. **Challenge Argument Scores** - If you believe a score is inaccurate, provide evidence
2. **Submit Evidence** - Add peer-reviewed studies or official data to support claims
3. **Propose New Topics** - Suggest important debates that deserve a two-column page
4. **Code Improvements** - Enhance the algorithm, UI, or features

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m "Add feature: description"`)
6. Push to your branch (`git push origin feature/your-feature`)
7. Create a Pull Request

## Technical Details

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance

- Lightweight: Total page weight < 50KB
- No external dependencies
- Runs entirely client-side
- Instant loading and interaction

### Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color schemes
- Screen reader compatible

## Roadmap

### Phase 1: Core Features (Current)
- ✅ Two-column debate layout
- ✅ Evidence tier system
- ✅ Argument filtering
- ✅ Interactive comparison

### Phase 2: Enhanced Features
- [ ] User authentication
- [ ] Argument submission system
- [ ] Real-time evidence validation
- [ ] Automated fallacy detection

### Phase 3: Advanced Analysis
- [ ] Machine learning for evidence quality assessment
- [ ] Automated truth score updates
- [ ] Predictive accuracy tracking
- [ ] Cross-topic relationship mapping

### Phase 4: Community Features
- [ ] User-generated debate topics
- [ ] Collaborative evidence curation
- [ ] Expert verification system
- [ ] Discussion threads per argument

## Related Resources

- [One Page Per Topic](https://myclob.pbworks.com/w/page/159323433/One%20Page%20Per%20Topic)
- [ReasonRank Algorithm](https://myclob.pbworks.com/w/page/159300543/ReasonRank)
- [Evidence Scoring](https://myclob.pbworks.com/w/page/159353568/Evidence)
- [Linkage Scores](https://myclob.pbworks.com/w/page/159338766/Linkage%20Scores)
- [Truth Evaluation](https://myclob.pbworks.com/w/page/21960078/truth)
- [Complete ISE Framework](https://myclob.pbworks.com/w/page/159300543/ReasonRank)

## License

This project is open source and available under the MIT License.

## Contact

For questions, suggestions, or collaboration opportunities:

- [Contact Page](https://myclob.pbworks.com/w/page/160433328/Contact%20Me)
- [Book Analysis Examples](https://myclob.pbworks.com/w/page/21956965/Books)

## Acknowledgments

This project builds on principles from:
- Analytical philosophy and logic
- Information science
- Cognitive psychology
- Deliberative democracy research
- Evidence-based policy analysis

---

**Built with the belief that collective intelligence can scale before artificial intelligence makes the project moot.**

*Copyright © 2026 Idea Stock Exchange. All rights reserved.*
