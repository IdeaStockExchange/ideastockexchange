import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateArgument.css';

const CreateArgument: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    truthScore: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.title.length < 10) {
      setError('Title must be at least 10 characters');
      return;
    }

    if (formData.description.length < 20) {
      setError('Description must be at least 20 characters');
      return;
    }

    try {
      setSubmitting(true);

      const payload: any = {
        title: formData.title,
        description: formData.description
      };

      if (formData.truthScore) {
        payload.truthScore = parseFloat(formData.truthScore) / 100;
      }

      const response = await axios.post('/api/arguments', payload);

      // Redirect to the newly created argument
      navigate(`/argument/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create argument');
      setSubmitting(false);
    }
  };

  return (
    <div className="create-argument">
      <h1>Create New Argument</h1>
      <p className="subtitle">
        Submit a new belief or claim for evidence-based evaluation
      </p>

      <form onSubmit={handleSubmit} className="argument-form">
        <div className="form-group">
          <label htmlFor="title">Argument Title *</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Roundabouts reduce traffic accidents"
            maxLength={500}
            required
          />
          <div className="char-count">{formData.title.length}/500</div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide a detailed explanation of your argument. Include context, definitions, and scope."
            rows={8}
            maxLength={10000}
            required
          />
          <div className="char-count">{formData.description.length}/10,000</div>
        </div>

        <div className="form-group">
          <label htmlFor="truthScore">Initial Truth Score (Optional)</label>
          <input
            type="number"
            id="truthScore"
            value={formData.truthScore}
            onChange={(e) => setFormData({ ...formData, truthScore: e.target.value })}
            placeholder="0-100"
            min="0"
            max="100"
          />
          <div className="help-text">
            If you don't provide a score, it will be calculated from evidence and sub-arguments
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button-primary"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Argument'}
          </button>
        </div>
      </form>

      <div className="info-box">
        <h3>💡 Tips for Creating Strong Arguments</h3>
        <ul>
          <li>Be specific and clear in your title</li>
          <li>Provide comprehensive context in the description</li>
          <li>After creating, add evidence to support your claim</li>
          <li>Link to supporting or opposing sub-arguments</li>
          <li>The ReasonRank score will update as evidence is added</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateArgument;
