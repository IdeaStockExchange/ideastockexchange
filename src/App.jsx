import { useState } from 'react'
import ArgumentCard from './components/ArgumentCard'
import InputForm from './components/InputForm'
import SubjectInfo from './components/SubjectInfo'
import { sampleSubjects, sampleArguments } from './data/sampleData'

function App() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('climate-change')
  const [arguments, setArguments] = useState(sampleArguments)

  const currentSubject = sampleSubjects.find(s => s.id === selectedSubject)
  const subjectArguments = arguments.filter(arg => arg.subjectId === selectedSubject)
  const agreeArguments = subjectArguments.filter(arg => arg.type === 'agree')
  const disagreeArguments = subjectArguments.filter(arg => arg.type === 'disagree')

  const handleAddArgument = (newArgument) => {
    const argument = {
      id: `arg-${Date.now()}`,
      subjectId: selectedSubject,
      beliefId: `belief-${Date.now()}`,
      linkageId: `link-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...newArgument
    }
    setArguments([...arguments, argument])
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="site-title">Idea Stock Exchange</h1>
        <p className="site-subtitle">A collaborative platform for exploring ideas through structured debate</p>
      </header>

      <main className="content">
        <h1 className="page-title">Debate Topics</h1>

        <SubjectInfo
          subjects={sampleSubjects}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          currentSubject={currentSubject}
        />

        <div className="view-toggle">
          <label>
            <input
              type="checkbox"
              checked={showAdvanced}
              onChange={(e) => setShowAdvanced(e.target.checked)}
            />
            Show advanced details (IDs, metadata, linkages)
          </label>
        </div>

        <InputForm onAddArgument={handleAddArgument} />

        <div className="arguments-section">
          <h2 className="section-header">Reasons to Agree</h2>
          {agreeArguments.length > 0 ? (
            agreeArguments.map(arg => (
              <ArgumentCard
                key={arg.id}
                argument={arg}
                showAdvanced={showAdvanced}
              />
            ))
          ) : (
            <div className="empty-state">No arguments in favor yet. Be the first to add one!</div>
          )}

          <h2 className="section-header" style={{ marginTop: '30px' }}>Reasons to Disagree</h2>
          {disagreeArguments.length > 0 ? (
            disagreeArguments.map(arg => (
              <ArgumentCard
                key={arg.id}
                argument={arg}
                showAdvanced={showAdvanced}
              />
            ))
          ) : (
            <div className="empty-state">No opposing arguments yet. Add one to start the discussion!</div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
