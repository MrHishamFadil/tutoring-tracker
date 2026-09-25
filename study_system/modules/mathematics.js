/**
 * Module 5: Mathematics Specialist (Agent 5)
 * Covers Grade 9 Real Numbers & Linear Equations (pp. 8–31)
 * and Grade 11 Functions and Their Graphs (pp. 21–33).
 * Features "I Do / We Do / You Do" gradual release, stepwise hints,
 * formula cards, error diagnostics, and an interactive canvas function plotter.
 */

window.MathematicsModule = (function () {
  'use strict';

  const LESSONS = {
    'math-g9-real-numbers': {
      id: 'math-g9-real-numbers',
      title: 'Operations on Real Numbers & Solving Linear Equations',
      grade: 'Grade 9',
      gradeCode: 'G9',
      subject: 'Mathematics',
      broadSubject: 'Mathematics',
      unit: 'Unit 1: Real Numbers & Linear Equations',
      sourceFile: 'EnVision Algebra 1 Vol 1 (pp. 8–31) & G9 Checkpoint 1 Guide',
      pages: 'pp. 8–31',
      assessmentDate: '2026-10-04 (Sunday)',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)', 'Abdullah AlRubiyan'],
      formulaCards: [
        { name: 'Distributive Property', formula: 'a(b + c) = ab + ac', note: 'Distribute before combining like terms.' },
        { name: 'Slope-Intercept Form', formula: 'y = mx + b', note: 'm is slope, b is y-intercept.' },
        { name: 'Real Number Subsets', formula: 'Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real', note: 'Irrational numbers (π, √2) are separate from Rationals.' }
      ],
      // Gradual Release Problems
      iDo: {
        title: 'I Do: Fully Explained Worked Example',
        problem: 'Solve for x: 3(2x - 5) + 4 = 2x + 9',
        steps: [
          { step: '1. Distribute across parentheses', math: '6x - 15 + 4 = 2x + 9', reason: 'Apply distributive property: 3 * 2x = 6x, 3 * -5 = -15.' },
          { step: '2. Combine like terms on the left side', math: '6x - 11 = 2x + 9', reason: 'Combine constant terms: -15 + 4 = -11.' },
          { step: '3. Collect variable terms on one side', math: '4x - 11 = 9', reason: 'Subtract 2x from both sides (6x - 2x = 4x).' },
          { step: '4. Isolate the variable term', math: '4x = 20', reason: 'Add 11 to both sides (9 + 11 = 20).' },
          { step: '5. Divide by the coefficient', math: 'x = 5', reason: 'Divide both sides by 4 (20 / 4 = 5).' },
          { step: '6. Check for reasonableness & substitution', math: '3(2(5) - 5) + 4 = 3(5) + 4 = 19; 2(5) + 9 = 19 (True)', reason: '19 = 19 confirms the solution is correct.' }
        ]
      },
      weDo: {
        title: 'We Do: Guided Problem with Stepwise Hint Reveals',
        problem: 'Solve for x: 5(x - 2) - 3x = 2(x - 5)',
        hints: [
          { hintNum: 1, label: 'Hint 1: Concept', text: 'Distribute the coefficients on both sides of the equation first: 5(x - 2) and 2(x - 5).' },
          { hintNum: 2, label: 'Hint 2: Next Step', text: 'After distributing: 5x - 10 - 3x = 2x - 10. Now combine like terms on the left side: (5x - 3x).' },
          { hintNum: 3, label: 'Hint 3: Setup', text: 'You get: 2x - 10 = 2x - 10. Subtract 2x from both sides. What happens to the variable?' },
          { hintNum: 4, label: 'Hint 4: Full Solution', text: 'Subtracting 2x gives: -10 = -10. Since this statement is always true regardless of x, this is an IDENTITY. Solution: ALL REAL NUMBERS (Infinitely many solutions).' }
        ],
        solution: 'All Real Numbers (Identity)'
      },
      youDo: {
        title: 'You Do: Independent Practice with Error Diagnostics',
        problem: 'Solve for x: 4(3x - 1) = 2(6x + 5)',
        options: [
          { text: 'x = 7', isCorrect: false, errorType: 'arithmetic', diagnosis: 'Check your subtraction when isolating the constants.' },
          { text: 'x = 0', isCorrect: false, errorType: 'algebraic', diagnosis: '0 is a specific numerical value. Substitute x = 0: 4(-1) = -4 != 2(5) = 10.' },
          { text: 'No Solution (Contradiction)', isCorrect: true, errorType: 'none', diagnosis: 'Correct! Distributing yields 12x - 4 = 12x + 10. Subtracting 12x leaves -4 = 10, which is FALSE. Therefore, there is NO SOLUTION.' },
          { text: 'Infinitely Many Solutions', isCorrect: false, errorType: 'concept', diagnosis: 'An identity requires both sides to be identical (-4 = -4). Here -4 != 10, so it is a contradiction (No Solution).' }
        ]
      }
    },

    'math-g11-functions-graphs': {
      id: 'math-g11-functions-graphs',
      title: 'Chapter 1: Functions and Their Graphs',
      grade: 'Grade 11',
      gradeCode: 'G11',
      subject: 'Mathematics',
      broadSubject: 'Mathematics',
      unit: 'Chapter 1: Functions',
      sourceFile: 'Precalculus Ch 1 (pp. 21–33) & G11 Checkpoint 1 Guide',
      pages: 'pp. 21–33',
      assessmentDate: '2026-10-04 (Sunday)',
      targetStudents: ['Shadan (G11A)'],
      formulaCards: [
        { name: 'Vertical Line Test', formula: 'x = c intersects graph at <= 1 point', note: 'If any vertical line hits more than once, relation is NOT a function.' },
        { name: 'Domain Restrictions', formula: 'Denominator != 0, Radicand >= 0', note: 'Excluded values make function undefined in real numbers.' },
        { name: 'Even / Odd Functions', formula: 'Even: f(-x) = f(x) (y-axis symmetry); Odd: f(-x) = -f(x) (origin symmetry)', note: 'Tests algebraic symmetry.' }
      ],
      iDo: {
        title: 'I Do: Determining Domain and Symmetry',
        problem: 'Find the domain of f(x) = (2x + 1) / √(x - 3) and test if it is a function.',
        steps: [
          { step: '1. Identify potential domain restrictions', math: 'Denominator contains a square root: √(x - 3)', reason: 'Two rules apply: (1) Inside a square root cannot be negative; (2) Denominator cannot equal zero.' },
          { step: '2. Set up the strict inequality', math: 'x - 3 > 0', reason: 'Because √(x-3) is in the denominator, x - 3 cannot be zero and cannot be negative. Therefore, x - 3 must be strictly positive.' },
          { step: '3. Solve the inequality', math: 'x > 3', reason: 'Add 3 to both sides.' },
          { step: '4. Express in interval notation', math: 'Domain: (3, ∞)', reason: 'Parenthesis indicates 3 is not included (would cause division by zero).' },
          { step: '5. Vertical line test check', math: 'For every x in (3, ∞), there is exactly one value of f(x).', reason: 'Passes the vertical line test; f(x) is a valid function.' }
        ]
      },
      weDo: {
        title: 'We Do: Piecewise Function Evaluation',
        problem: 'Given f(x) = { 2x + 3 if x < 1; x^2 - 1 if x >= 1 }, find f(1) and f(-2).',
        hints: [
          { hintNum: 1, label: 'Hint 1: Concept', text: 'Examine the domain condition for the specific input value x.' },
          { hintNum: 2, label: 'Hint 2: Evaluate f(1)', text: 'For x = 1, which condition holds? 1 >= 1 is TRUE. Use the second piece: f(1) = 1^2 - 1.' },
          { hintNum: 3, label: 'Hint 3: Evaluate f(-2)', text: 'For x = -2, -2 < 1 is TRUE. Use the first piece: f(-2) = 2(-2) + 3.' },
          { hintNum: 4, label: 'Hint 4: Full Solution', text: 'f(1) = 1 - 1 = 0; f(-2) = -4 + 3 = -1.' }
        ],
        solution: 'f(1) = 0, f(-2) = -1'
      },
      youDo: {
        title: 'You Do: Identifying Function Symmetry',
        problem: 'Determine the symmetry of f(x) = x^3 - 4x:',
        options: [
          { text: 'Even function (symmetric with respect to the y-axis)', isCorrect: false, errorType: 'algebraic', diagnosis: 'Test f(-x): (-x)^3 - 4(-x) = -x^3 + 4x != f(x). It is not even.' },
          { text: 'Odd function (symmetric with respect to the origin)', isCorrect: true, errorType: 'none', diagnosis: 'Correct! f(-x) = -x^3 + 4x = -(x^3 - 4x) = -f(x). Since f(-x) = -f(x), it is an ODD function symmetric about the origin.' },
          { text: 'Both even and odd', isCorrect: false, errorType: 'concept', diagnosis: 'Only the zero function f(x) = 0 is both even and odd.' },
          { text: 'Neither even nor odd', isCorrect: false, errorType: 'calculation', diagnosis: 'Look closely at the signs: all terms flipped signs, which defines an odd function.' }
        ]
      }
    }
  };

  function renderMathModule(container, lessonKey = 'math-g9-real-numbers') {
    if (!container) return;
    const lesson = LESSONS[lessonKey] || LESSONS['math-g9-real-numbers'];

    container.innerHTML = `
      <div class="math-lab-shell">
        <div class="math-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">Mathematics</span>
            <span class="badge-grade">${lesson.grade}</span>
            <span class="badge-date">Exam: ${lesson.assessmentDate}</span>
          </div>
          <h2>${lesson.title}</h2>
          <p>Master mathematical reasoning through Gradual Release (I Do $\\rightarrow$ We Do $\\rightarrow$ You Do), interactive formula cards, and live function graphing.</p>

          <!-- Grade Level Switcher -->
          <div class="grade-toggle-pills">
            <button class="pill-btn ${lessonKey === 'math-g9-real-numbers' ? 'active' : ''}" id="btn-math-g9">Grade 9: Real Numbers & Equations</button>
            <button class="pill-btn ${lessonKey === 'math-g11-functions-graphs' ? 'active' : ''}" id="btn-math-g11">Grade 11: Functions & Graphs</button>
          </div>
        </div>

        <!-- Formula Cards -->
        <div class="formula-cards-grid">
          ${lesson.formulaCards.map(fc => `
            <div class="formula-card">
              <span class="fc-name">${fc.name}</span>
              <div class="fc-formula"><code>${fc.formula}</code></div>
              <small class="fc-note">${fc.note}</small>
            </div>
          `).join('')}
        </div>

        <!-- Gradual Release Container -->
        <div class="gradual-release-container">
          <!-- Step 1: I Do -->
          <div class="gr-card gr-i-do">
            <div class="gr-header">
              <span class="gr-badge badge-i-do">I DO</span>
              <h3>${lesson.iDo.title}</h3>
            </div>
            <div class="gr-problem-box">
              <strong>Problem:</strong> <code>${lesson.iDo.problem}</code>
            </div>
            <div class="worked-steps-list">
              ${lesson.iDo.steps.map(s => `
                <div class="worked-step-item">
                  <div class="step-num">${s.step}</div>
                  <div class="step-math"><code>${s.math}</code></div>
                  <div class="step-reason">${s.reason}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: We Do -->
          <div class="gr-card gr-we-do">
            <div class="gr-header">
              <span class="gr-badge badge-we-do">WE DO</span>
              <h3>${lesson.weDo.title}</h3>
            </div>
            <div class="gr-problem-box">
              <strong>Problem:</strong> <code>${lesson.weDo.problem}</code>
            </div>
            <div class="hints-stepper">
              <p>Work step-by-step. Click each hint button when you need progressive guidance:</p>
              <div class="hints-buttons-strip">
                ${lesson.weDo.hints.map((h, i) => `
                  <button class="btn-hint-step" data-hint-idx="${i}">${h.label}</button>
                `).join('')}
              </div>
              <div class="hint-display-box" id="hint-display-box" style="display:none;"></div>
            </div>
          </div>

          <!-- Step 3: You Do -->
          <div class="gr-card gr-you-do">
            <div class="gr-header">
              <span class="gr-badge badge-you-do">YOU DO</span>
              <h3>${lesson.youDo.title}</h3>
            </div>
            <div class="gr-problem-box">
              <strong>Problem:</strong> <code>${lesson.youDo.problem}</code>
            </div>
            <div class="you-do-options" id="you-do-options">
              ${lesson.youDo.options.map((opt, i) => `
                <button class="btn-you-do-opt" data-opt-idx="${i}">${opt.text}</button>
              `).join('')}
            </div>
            <div class="you-do-feedback" id="you-do-feedback" style="display:none;"></div>
          </div>
        </div>

        <!-- Interactive Function & Vertical Line Plotter -->
        <div class="math-grapher-card">
          <div class="grapher-header">
            <h3>📈 Interactive Function Grapher & Vertical Line Test</h3>
            <p>Select a function to plot. Drag the vertical cursor line across the graph to visually test if it represents a valid function (each x has $\le 1$ y value).</p>
          </div>
          <div class="grapher-controls">
            <label>Function:</label>
            <select class="form-select" id="graph-func-select">
              <option value="linear">f(x) = 2x - 3 (Linear Function)</option>
              <option value="quadratic">f(x) = x² - 4 (Quadratic Parabola)</option>
              <option value="cubic">f(x) = x³ - 4x (Odd Function / Origin Symmetry)</option>
              <option value="circle">x² + y² = 16 (Circle - Fails Vertical Line Test)</option>
            </select>
          </div>
          <div class="canvas-container">
            <canvas id="math-plot-canvas" width="600" height="350"></canvas>
            <div class="graph-status-badge" id="graph-status-badge">PASSES VERTICAL LINE TEST: VALID FUNCTION</div>
          </div>
        </div>
      </div>
    `;

    bindMathEvents(container, lessonKey);
    initGrapher(container);
  }

  function bindMathEvents(container, currentKey) {
    // Switch between Grade 9 and Grade 11
    const g9Btn = container.querySelector('#btn-math-g9');
    const g11Btn = container.querySelector('#btn-math-g11');

    if (g9Btn) {
      g9Btn.addEventListener('click', () => {
        renderMathModule(container, 'math-g9-real-numbers');
      });
    }
    if (g11Btn) {
      g11Btn.addEventListener('click', () => {
        renderMathModule(container, 'math-g11-functions-graphs');
      });
    }

    // We Do Hints
    const lesson = LESSONS[currentKey] || LESSONS['math-g9-real-numbers'];
    const hintBox = container.querySelector('#hint-display-box');

    container.querySelectorAll('.btn-hint-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-hint-idx'), 10);
        const hint = lesson.weDo.hints[idx];
        hintBox.style.display = 'block';
        hintBox.innerHTML = `<strong>${hint.label}:</strong> ${hint.text}`;
        btn.classList.add('hint-viewed');
      });
    });

    // You Do Options
    const youDoFb = container.querySelector('#you-do-feedback');
    container.querySelectorAll('.btn-you-do-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        const option = lesson.youDo.options[idx];
        youDoFb.style.display = 'block';

        container.querySelectorAll('.btn-you-do-opt').forEach(b => {
          b.disabled = true;
          const optIdx = parseInt(b.getAttribute('data-opt-idx'), 10);
          if (lesson.youDo.options[optIdx].isCorrect) b.classList.add('opt-correct');
          else if (optIdx === idx) b.classList.add('opt-incorrect');
        });

        if (option.isCorrect) {
          youDoFb.className = 'you-do-feedback alert-success';
          youDoFb.innerHTML = `<strong>✓ Perfect!</strong> ${option.diagnosis}`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(lesson.id, 'math_problem_solving', true);
          }
        } else {
          youDoFb.className = 'you-do-feedback alert-warning';
          youDoFb.innerHTML = `<strong>⚠️ Misconception [${option.errorType.toUpperCase()}]:</strong> ${option.diagnosis}`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(lesson.id, 'math_problem_solving', false);
          }
        }
      });
    });
  }

  function initGrapher(container) {
    const canvas = container.querySelector('#math-plot-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const funcSelect = container.querySelector('#graph-func-select');
    const statusBadge = container.querySelector('#graph-status-badge');
    let verticalX = 0; // vertical line test position in math units

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const scale = 25; // 25 px per math unit

      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText('x', w - 15, cy - 8);
      ctx.fillText('y', cx + 8, 15);

      const fType = funcSelect.value;
      ctx.lineWidth = 2.5;

      if (fType === 'circle') {
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx, cy, 4 * scale, 0, Math.PI * 2);
        ctx.stroke();
        statusBadge.className = 'graph-status-badge badge-fail';
        statusBadge.textContent = 'FAILS VERTICAL LINE TEST: NOT A FUNCTION (Vertical line hits circle at 2 points!)';
      } else {
        ctx.strokeStyle = '#2563eb';
        ctx.beginPath();
        let started = false;

        for (let px = 0; px <= w; px += 2) {
          const mx = (px - cx) / scale;
          let my = 0;
          if (fType === 'linear') my = 2 * mx - 3;
          else if (fType === 'quadratic') my = mx * mx - 4;
          else if (fType === 'cubic') my = mx * mx * mx - 4 * mx;

          const py = cy - my * scale;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
        statusBadge.className = 'graph-status-badge badge-pass';
        statusBadge.textContent = 'PASSES VERTICAL LINE TEST: VALID FUNCTION (Every vertical line hits at most 1 point)';
      }

      // Draw Vertical Line Test cursor
      const vPx = cx + verticalX * scale;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(vPx, 0);
      ctx.lineTo(vPx, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label vertical line
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`x = ${verticalX.toFixed(1)}`, vPx + 5, 25);
    }

    draw();

    funcSelect.addEventListener('change', draw);

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const cx = canvas.width / 2;
      verticalX = (mouseX - cx) / 25;
      draw();
    });
  }

  return {
    getLessons: () => LESSONS,
    renderMathModule
  };
})();
