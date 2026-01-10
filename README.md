# Idea Stock Exchange

A Wikipedia-style debate platform for sharing and organizing arguments on various topics. This application provides a clean, intuitive interface for users to contribute reasons to agree or disagree with propositions.

## Features

### Wikipedia-Style Interface
- Clean, readable design inspired by Wikipedia's layout
- Familiar navigation and content structure
- Responsive design for all device sizes

### Dual View Modes

#### Basic Mode (Default)
- Simple, clean presentation of arguments
- Focus on content without technical distractions
- Easy to read and understand

#### Advanced Mode
- Shows detailed metadata for each argument
- Displays system IDs:
  - Subject ID
  - Belief ID
  - Argument ID
  - Linkage ID
- Shows timestamps and author information
- Useful for developers and power users

### Core Functionality

1. **Topic Selection**: Choose from multiple debate topics
2. **Add Arguments**: Submit reasons to agree or disagree
3. **View Arguments**: See all arguments organized by position
4. **Toggle Details**: Switch between basic and advanced views

## Data Structure

The application uses a structured data model:

- **Subjects**: Main topics for debate (e.g., "Climate change requires immediate action")
- **Beliefs**: Specific positions or claims
- **Arguments**: Individual reasons supporting or opposing a belief
- **Linkages**: Connections between arguments, beliefs, and subjects

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

## Usage

1. **Select a Topic**: Use the dropdown to choose a debate topic
2. **Read Arguments**: Review existing reasons to agree and disagree
3. **Add Your Perspective**:
   - Choose whether you agree or disagree
   - Type your argument in the text area
   - Optionally add your name
   - Click "Add Argument"
4. **Toggle Advanced View**: Check the box to see detailed metadata

## Technology Stack

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **CSS**: Wikipedia-inspired styling

## Project Structure

```
ideastockexchange/
├── src/
│   ├── components/
│   │   ├── ArgumentCard.jsx      # Displays individual arguments
│   │   ├── InputForm.jsx          # Form for adding new arguments
│   │   └── SubjectInfo.jsx        # Subject selection and info
│   ├── data/
│   │   └── sampleData.js          # Sample subjects and arguments
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   └── styles.css                 # Wikipedia-style CSS
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## Future Enhancements

- User authentication
- Vote/rating system for arguments
- Argument threading and responses
- Search and filter functionality
- Data persistence (database integration)
- Export/import debate data
- Argument quality scoring
- Related arguments suggestions
