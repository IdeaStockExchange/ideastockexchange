import { useState } from 'react'

function InputForm({ onAddArgument }) {
  const [type, setType] = useState('agree')
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      alert('Please enter an argument')
      return
    }

    onAddArgument({
      type,
      text: text.trim(),
      author: author.trim() || 'Anonymous'
    })

    setText('')
    setAuthor('')
  }

  return (
    <div className="input-section">
      <h2>Add Your Argument</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="argument-type">Position:</label>
          <select
            id="argument-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="agree">I agree (reason to support)</option>
            <option value="disagree">I disagree (reason to oppose)</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="argument-text">Your argument:</label>
          <textarea
            id="argument-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your reason here..."
          />
        </div>

        <div className="input-group">
          <label htmlFor="author-name">Your name (optional):</label>
          <input
            type="text"
            id="author-name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Anonymous"
          />
        </div>

        <button type="submit" className="button">
          Add Argument
        </button>
      </form>
    </div>
  )
}

export default InputForm
