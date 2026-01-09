import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArgumentList from './components/ArgumentList';
import ArgumentDetail from './components/ArgumentDetail';
import CreateArgument from './components/CreateArgument';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                💡 Idea Stock Exchange
              </Link>
            </h1>
            <p className="tagline">ReasonRank: PageRank for Truth</p>
            <nav className="main-nav">
              <Link to="/">Arguments</Link>
              <Link to="/create">Create Argument</Link>
              <a href="https://myclob.pbworks.com/w/page/159300543/ReasonRank" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<ArgumentList />} />
              <Route path="/argument/:id" element={<ArgumentDetail />} />
              <Route path="/create" element={<CreateArgument />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>
              Built with evidence-based reasoning. Open source on{' '}
              <a href="https://github.com/myklob/ideastockexchange" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
            <p className="formula">
              Argument Strength = Truth Score × Linkage Score × Importance Weight
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
