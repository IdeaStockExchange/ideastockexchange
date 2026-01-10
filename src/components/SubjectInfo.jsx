function SubjectInfo({ subjects, selectedSubject, onSelectSubject, currentSubject }) {
  return (
    <div className="subject-info">
      <div className="input-group" style={{ marginBottom: '10px' }}>
        <label htmlFor="subject-select">Select a topic to debate:</label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={(e) => onSelectSubject(e.target.value)}
        >
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.title}
            </option>
          ))}
        </select>
      </div>

      {currentSubject && (
        <>
          <h3>{currentSubject.title}</h3>
          <p>{currentSubject.description}</p>
        </>
      )}
    </div>
  )
}

export default SubjectInfo
