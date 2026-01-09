-- Idea Stock Exchange Database Schema
-- PostgreSQL schema for ReasonRank argument tracking system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  bio TEXT,
  reputation_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'user' -- user, expert, moderator, admin
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Arguments table
CREATE TABLE arguments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,

  -- Scores
  manual_truth_score DECIMAL(3,2), -- User-assigned truth score (0.00 to 1.00)
  calculated_truth_score DECIMAL(3,2), -- Auto-calculated from evidence and sub-arguments

  -- Metadata
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Status
  is_published BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,

  -- Search
  search_vector TSVECTOR
);

CREATE INDEX idx_arguments_created_by ON arguments(created_by);
CREATE INDEX idx_arguments_created_at ON arguments(created_at DESC);
CREATE INDEX idx_arguments_search ON arguments USING GIN(search_vector);

-- Evidence table
CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  argument_id UUID REFERENCES arguments(id) ON DELETE CASCADE,

  description TEXT NOT NULL,
  source VARCHAR(500) NOT NULL,
  url VARCHAR(1000),

  quality VARCHAR(50) NOT NULL, -- peer_reviewed_study, expert_testimony, etc.
  truth_score DECIMAL(3,2) NOT NULL CHECK (truth_score >= 0 AND truth_score <= 1),

  publication_date DATE,
  author VARCHAR(255),

  -- Metadata
  added_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  is_verified BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_evidence_argument ON evidence(argument_id);
CREATE INDEX idx_evidence_quality ON evidence(quality);

-- Argument Links (parent-child relationships)
CREATE TABLE argument_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_argument_id UUID REFERENCES arguments(id) ON DELETE CASCADE,
  sub_argument_id UUID REFERENCES arguments(id) ON DELETE CASCADE,

  -- Link type: 'supporting' or 'opposing'
  link_type VARCHAR(20) NOT NULL CHECK (link_type IN ('supporting', 'opposing')),

  -- Scores
  linkage_score DECIMAL(3,2) NOT NULL CHECK (linkage_score >= -1 AND linkage_score <= 1),
  importance_weight DECIMAL(3,2) NOT NULL CHECK (importance_weight >= 0 AND importance_weight <= 1),

  explanation TEXT, -- Why this linkage score?

  -- Metadata
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Prevent duplicate links and self-references
  CONSTRAINT no_self_reference CHECK (parent_argument_id != sub_argument_id),
  CONSTRAINT unique_link UNIQUE (parent_argument_id, sub_argument_id, link_type)
);

CREATE INDEX idx_links_parent ON argument_links(parent_argument_id);
CREATE INDEX idx_links_sub ON argument_links(sub_argument_id);
CREATE INDEX idx_links_type ON argument_links(link_type);

-- Community Votes/Validations
CREATE TABLE validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- What is being validated
  target_type VARCHAR(20) NOT NULL, -- 'argument', 'evidence', 'link'
  target_id UUID NOT NULL,

  -- Validation type
  validation_type VARCHAR(50) NOT NULL, -- 'truth_score', 'linkage_score', 'importance', 'quality'

  -- Vote value
  score_vote DECIMAL(3,2), -- Suggested score
  vote_direction VARCHAR(10), -- 'up', 'down', 'flag'

  comment TEXT,

  created_at TIMESTAMP DEFAULT NOW(),

  -- Prevent duplicate votes
  CONSTRAINT unique_validation UNIQUE (user_id, target_type, target_id, validation_type)
);

CREATE INDEX idx_validations_target ON validations(target_type, target_id);
CREATE INDEX idx_validations_user ON validations(user_id);

-- Flags for inappropriate content
CREATE TABLE flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flagged_by UUID REFERENCES users(id) ON DELETE CASCADE,

  target_type VARCHAR(20) NOT NULL, -- 'argument', 'evidence', 'comment'
  target_id UUID NOT NULL,

  reason VARCHAR(100) NOT NULL, -- 'spam', 'offensive', 'misinformation', 'duplicate'
  details TEXT,

  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved', 'dismissed'
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_flags_status ON flags(status);
CREATE INDEX idx_flags_target ON flags(target_type, target_id);

-- Tags for categorization
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- Hex color code
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE argument_tags (
  argument_id UUID REFERENCES arguments(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (argument_id, tag_id)
);

-- Activity Log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  action VARCHAR(50) NOT NULL, -- 'create_argument', 'add_evidence', 'vote', etc.
  target_type VARCHAR(20),
  target_id UUID,

  details JSONB,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_arguments_updated_at BEFORE UPDATE ON arguments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_updated_at BEFORE UPDATE ON evidence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_argument_links_updated_at BEFORE UPDATE ON argument_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for updating argument search vector
CREATE OR REPLACE FUNCTION update_argument_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector =
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B');
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_arguments_search_vector BEFORE INSERT OR UPDATE ON arguments
  FOR EACH ROW EXECUTE FUNCTION update_argument_search_vector();

-- Views for easier querying

-- View: Arguments with their calculated scores
CREATE VIEW argument_scores AS
SELECT
  a.id,
  a.title,
  a.manual_truth_score,
  a.calculated_truth_score,
  COUNT(DISTINCT al_support.id) as supporting_count,
  COUNT(DISTINCT al_oppose.id) as opposing_count,
  COUNT(DISTINCT e.id) as evidence_count,
  AVG(e.truth_score) as avg_evidence_score
FROM arguments a
LEFT JOIN argument_links al_support ON a.id = al_support.parent_argument_id
  AND al_support.link_type = 'supporting'
LEFT JOIN argument_links al_oppose ON a.id = al_oppose.parent_argument_id
  AND al_oppose.link_type = 'opposing'
LEFT JOIN evidence e ON a.id = e.argument_id
WHERE a.is_deleted = FALSE
GROUP BY a.id;

-- View: User reputation summary
CREATE VIEW user_reputation AS
SELECT
  u.id,
  u.username,
  u.reputation_score,
  COUNT(DISTINCT a.id) as arguments_created,
  COUNT(DISTINCT e.id) as evidence_added,
  COUNT(DISTINCT v.id) as validations_made
FROM users u
LEFT JOIN arguments a ON u.id = a.created_by
LEFT JOIN evidence e ON u.id = e.added_by
LEFT JOIN validations v ON u.id = v.user_id
GROUP BY u.id;
