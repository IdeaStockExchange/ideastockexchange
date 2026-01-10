function ArgumentCard({ argument, showAdvanced }) {
  return (
    <div className={`argument-card ${argument.type}`}>
      <div className="argument-header">
        <span className={`argument-type ${argument.type}`}>
          {argument.type === 'agree' ? 'Agrees' : 'Disagrees'}
        </span>
      </div>

      <div className="argument-text">
        {argument.text}
      </div>

      {showAdvanced && (
        <div className="advanced-details">
          <div className="detail-row">
            <span className="detail-label">Argument ID:</span>
            <span>{argument.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Subject ID:</span>
            <span>{argument.subjectId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Belief ID:</span>
            <span>{argument.beliefId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Linkage ID:</span>
            <span>{argument.linkageId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Author:</span>
            <span>{argument.author}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Timestamp:</span>
            <span>{new Date(argument.timestamp).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArgumentCard
