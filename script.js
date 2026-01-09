// Idea Stock Exchange - Two-Column Debate Page Interactive Features
// Copyright 2026

document.addEventListener('DOMContentLoaded', function() {
    initializeDebatePage();
});

function initializeDebatePage() {
    // Initialize all interactive features
    highlightStrongestArguments();
    addArgumentFiltering();
    addSmoothScrolling();
    addArgumentComparison();
    addKeyboardNavigation();
    animateOnScroll();
}

/**
 * Highlight the strongest arguments in each column
 */
function highlightStrongestArguments() {
    const agreeColumn = document.querySelector('.agree-column');
    const disagreeColumn = document.querySelector('.disagree-column');

    if (agreeColumn) {
        const strongestAgree = findStrongestArgument(agreeColumn);
        if (strongestAgree) {
            strongestAgree.classList.add('strongest-argument');
        }
    }

    if (disagreeColumn) {
        const strongestDisagree = findStrongestArgument(disagreeColumn);
        if (strongestDisagree) {
            strongestDisagree.classList.add('strongest-argument');
        }
    }
}

/**
 * Find the argument with the highest strength score
 */
function findStrongestArgument(column) {
    const arguments = column.querySelectorAll('.argument');
    let strongest = null;
    let maxStrength = 0;

    arguments.forEach(arg => {
        const strength = parseInt(arg.dataset.strength) || 0;
        if (strength > maxStrength) {
            maxStrength = strength;
            strongest = arg;
        }
    });

    return strongest;
}

/**
 * Add filtering controls for arguments by strength
 */
function addArgumentFiltering() {
    const debateColumns = document.querySelector('.debate-columns');
    if (!debateColumns) return;

    // Create filter controls
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-controls';
    filterContainer.innerHTML = `
        <div class="filter-header">
            <label>Filter by Minimum Strength:</label>
            <div class="filter-buttons">
                <button class="filter-btn active" data-threshold="0">All</button>
                <button class="filter-btn" data-threshold="70">70%+</button>
                <button class="filter-btn" data-threshold="80">80%+</button>
                <button class="filter-btn" data-threshold="90">90%+</button>
            </div>
        </div>
    `;

    // Insert before debate columns
    debateColumns.parentNode.insertBefore(filterContainer, debateColumns);

    // Add event listeners to filter buttons
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter arguments
            const threshold = parseInt(this.dataset.threshold);
            filterArgumentsByStrength(threshold);
        });
    });
}

/**
 * Filter arguments based on strength threshold
 */
function filterArgumentsByStrength(threshold) {
    const allArguments = document.querySelectorAll('.argument');

    allArguments.forEach(arg => {
        const strength = parseInt(arg.dataset.strength) || 0;
        if (strength >= threshold) {
            arg.style.display = '';
            arg.classList.remove('filtered-out');
        } else {
            arg.style.display = 'none';
            arg.classList.add('filtered-out');
        }
    });

    // Update column counts
    updateArgumentCounts();
}

/**
 * Update argument counts in column headers
 */
function updateArgumentCounts() {
    const agreeColumn = document.querySelector('.agree-column');
    const disagreeColumn = document.querySelector('.disagree-column');

    if (agreeColumn) {
        const visibleCount = agreeColumn.querySelectorAll('.argument:not(.filtered-out)').length;
        updateColumnCount(agreeColumn, visibleCount);
    }

    if (disagreeColumn) {
        const visibleCount = disagreeColumn.querySelectorAll('.argument:not(.filtered-out)').length;
        updateColumnCount(disagreeColumn, visibleCount);
    }
}

/**
 * Update the count display in column header
 */
function updateColumnCount(column, count) {
    const header = column.querySelector('.column-header');
    let countSpan = header.querySelector('.argument-count');

    if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'argument-count';
        header.appendChild(countSpan);
    }

    countSpan.textContent = `(${count})`;
}

/**
 * Add smooth scrolling to anchor links
 */
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add argument comparison feature
 */
function addArgumentComparison() {
    const arguments = document.querySelectorAll('.argument');
    let selectedArguments = [];

    arguments.forEach(arg => {
        arg.addEventListener('click', function(e) {
            // Don't trigger on link clicks
            if (e.target.tagName === 'A') return;

            this.classList.toggle('selected-for-comparison');

            if (this.classList.contains('selected-for-comparison')) {
                selectedArguments.push(this);
            } else {
                selectedArguments = selectedArguments.filter(a => a !== this);
            }

            // Limit to 2 arguments for comparison
            if (selectedArguments.length > 2) {
                const removed = selectedArguments.shift();
                removed.classList.remove('selected-for-comparison');
            }

            updateComparisonPanel(selectedArguments);
        });
    });
}

/**
 * Update or create comparison panel
 */
function updateComparisonPanel(selectedArguments) {
    let panel = document.querySelector('.comparison-panel');

    if (selectedArguments.length === 0) {
        if (panel) panel.remove();
        return;
    }

    if (!panel) {
        panel = document.createElement('div');
        panel.className = 'comparison-panel';
        document.body.appendChild(panel);
    }

    panel.innerHTML = `
        <div class="comparison-header">
            <h3>Comparing Arguments</h3>
            <button class="close-comparison">&times;</button>
        </div>
        <div class="comparison-content">
            ${selectedArguments.map((arg, index) => `
                <div class="compared-argument">
                    <h4>Argument ${index + 1}</h4>
                    <p><strong>Strength:</strong> ${arg.dataset.strength}%</p>
                    <p>${arg.querySelector('h4').textContent}</p>
                </div>
            `).join('')}
        </div>
    `;

    // Add close button functionality
    panel.querySelector('.close-comparison').addEventListener('click', () => {
        selectedArguments.forEach(arg => {
            arg.classList.remove('selected-for-comparison');
        });
        selectedArguments = [];
        panel.remove();
    });
}

/**
 * Add keyboard navigation
 */
function addKeyboardNavigation() {
    let currentArgumentIndex = -1;
    const arguments = Array.from(document.querySelectorAll('.argument'));

    document.addEventListener('keydown', function(e) {
        // Only activate if no input is focused
        if (document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                navigateToArgument(currentArgumentIndex + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateToArgument(currentArgumentIndex - 1);
                break;
            case 'Enter':
                if (currentArgumentIndex >= 0) {
                    arguments[currentArgumentIndex].click();
                }
                break;
        }
    });

    function navigateToArgument(index) {
        if (index < 0 || index >= arguments.length) return;

        // Remove previous highlight
        if (currentArgumentIndex >= 0) {
            arguments[currentArgumentIndex].classList.remove('keyboard-focused');
        }

        currentArgumentIndex = index;
        const currentArg = arguments[currentArgumentIndex];
        currentArg.classList.add('keyboard-focused');
        currentArg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Animate elements on scroll
 */
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all arguments
    const arguments = document.querySelectorAll('.argument');
    arguments.forEach(arg => observer.observe(arg));

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

/**
 * Calculate and display overall debate balance
 */
function calculateDebateBalance() {
    const agreeArgs = document.querySelectorAll('.agree-column .argument');
    const disagreeArgs = document.querySelectorAll('.disagree-column .argument');

    let agreeTotal = 0;
    let disagreeTotal = 0;

    agreeArgs.forEach(arg => {
        agreeTotal += parseInt(arg.dataset.strength) || 0;
    });

    disagreeArgs.forEach(arg => {
        disagreeTotal += parseInt(arg.dataset.strength) || 0;
    });

    const agreeAvg = agreeArgs.length > 0 ? agreeTotal / agreeArgs.length : 0;
    const disagreeAvg = disagreeArgs.length > 0 ? disagreeTotal / disagreeArgs.length : 0;

    return {
        agreeAverage: agreeAvg.toFixed(1),
        disagreeAverage: disagreeAvg.toFixed(1),
        balance: ((agreeAvg / (agreeAvg + disagreeAvg)) * 100).toFixed(1)
    };
}

/**
 * Display debate statistics
 */
function displayDebateStats() {
    const stats = calculateDebateBalance();
    const debateColumns = document.querySelector('.debate-columns');

    if (!debateColumns) return;

    const statsPanel = document.createElement('div');
    statsPanel.className = 'debate-stats';
    statsPanel.innerHTML = `
        <h3>Debate Balance</h3>
        <div class="stats-content">
            <div class="stat-item">
                <span class="stat-label">Average Strength (Agree):</span>
                <span class="stat-value">${stats.agreeAverage}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Average Strength (Disagree):</span>
                <span class="stat-value">${stats.disagreeAverage}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Overall Balance:</span>
                <span class="stat-value">${stats.balance}% toward Agree</span>
            </div>
        </div>
    `;

    debateColumns.parentNode.insertBefore(statsPanel, debateColumns.nextSibling);
}

// Initialize stats display
if (document.querySelector('.debate-columns')) {
    displayDebateStats();
}

// Add CSS for dynamic features
const style = document.createElement('style');
style.textContent = `
    .strongest-argument {
        border-width: 4px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
    }

    .filter-controls {
        background: var(--light-bg);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }

    .filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .filter-buttons {
        display: flex;
        gap: 0.5rem;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid var(--primary-color);
        background: white;
        color: var(--primary-color);
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s ease;
    }

    .filter-btn:hover {
        background: var(--primary-color);
        color: white;
    }

    .filter-btn.active {
        background: var(--primary-color);
        color: white;
    }

    .argument-count {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-left: 0.5rem;
    }

    .selected-for-comparison {
        outline: 3px solid var(--accent-blue);
        outline-offset: 2px;
    }

    .comparison-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 3px solid var(--accent-blue);
        box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
        padding: 1.5rem;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    .comparison-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .comparison-header h3 {
        margin: 0;
    }

    .close-comparison {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-medium);
    }

    .close-comparison:hover {
        color: var(--text-dark);
    }

    .comparison-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .compared-argument {
        background: var(--light-bg);
        padding: 1rem;
        border-radius: 6px;
    }

    .keyboard-focused {
        outline: 3px solid var(--accent-blue);
        outline-offset: 2px;
    }

    .animate-in {
        animation: fadeInUp 0.6s ease;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .debate-stats {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1.5rem 0;
    }

    .debate-stats h3 {
        margin-top: 0;
        color: white;
    }

    .stats-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .stat-item {
        display: flex;
        justify-content: space-between;
        background: rgba(255,255,255,0.1);
        padding: 0.75rem;
        border-radius: 6px;
    }

    .stat-label {
        font-weight: normal;
    }

    .stat-value {
        font-weight: bold;
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        .filter-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .filter-buttons {
            width: 100%;
            flex-wrap: wrap;
        }

        .filter-btn {
            flex: 1;
            min-width: 70px;
        }

        .comparison-content {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%cIdea Stock Exchange - Two-Column Debate Page', 'font-size: 16px; font-weight: bold; color: #2c3e50;');
console.log('%cBuilding collective intelligence infrastructure', 'font-size: 12px; color: #7f8c8d;');
console.log('%cKeyboard shortcuts: ↑/↓ to navigate arguments, Enter to select', 'font-size: 11px; color: #3498db;');
