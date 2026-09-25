/**
 * Module 9: Assessment & Diagnostic Engine (Agent 9)
 * Multi-tiered testing: Diagnostic Quiz, Quick Checks, Section Quizzes, and
 * full-featured Timed Exam Mode with review screen and smallest-correction misconception diagnostics.
 */

window.AssessmentEngine = (function () {
  'use strict';

  // Master Question Bank for English, Math, and Sciences
  const QUESTION_BANK = {
    'literature-g9-two-kinds': [
      {
        id: 'q-lit-1',
        type: 'vocab',
        subject: 'Literature',
        prompt: 'In "Two Kinds," Jing-mei notes that her performance at the talent show was a "complete, humiliating fiasco." What is the precise meaning of "fiasco" in this context?',
        options: [
          'A quiet, private misunderstanding between friends.',
          'A catastrophic, ridiculous, and public disaster.',
          'A modest success that fell slightly short of perfection.',
          'A rehearsed comedic skit designed to make people laugh.'
        ],
        correctIndex: 1,
        sourceRef: 'Alpha Lit SB p. 10',
        misconceptions: {
          0: 'A fiasco is intensely public and catastrophic, not a quiet misunderstanding.',
          2: 'A fiasco represents total failure, not a near-success.',
          3: 'A fiasco is unintentional and embarrassing, not an intended comedy.'
        },
        correctionExplanation: '"Fiasco" means a complete, humiliating, and public failure.'
      },
      {
        id: 'q-lit-2',
        type: 'craft',
        subject: 'Literature',
        prompt: 'Why does Jing-mei\'s mother insist that there are "only two kinds of daughters"?',
        options: [
          'She believes daughters must either marry rich or work in the family business.',
          'She enforces traditional filial piety: daughters must either be completely obedient or live outside the family.',
          'She wants Jing-mei to choose between piano playing and academic tutoring.',
          'She is quoting an ancient Chinese folk legend about two sisters.'
        ],
        correctIndex: 1,
        sourceRef: 'Alpha Lit SB p. 14',
        misconceptions: {
          0: 'The division is strictly about obedience and family authority, not wealth.',
          2: 'Piano was just one vehicle; the ultimatum was total obedience.',
          3: 'She is not quoting a legend; this is her personal cultural worldview born of immigrant survival.'
        },
        correctionExplanation: 'The mother demands total obedience as the only acceptable expression of daughterly respect.'
      },
      {
        id: 'q-lit-3',
        type: 'theme',
        subject: 'Literature',
        prompt: 'At the end of the story, what does Jing-mei realize about "Pleading Child" and "Perfectly Contented"?',
        options: [
          'They were written by two completely different rival European composers.',
          'They represented two halves of the same song, symbolizing the harmony of her dual cultural identity.',
          'Her mother had hidden a secret will inside the sheet music.',
          'She had played the wrong notes during the talent show on purpose.'
        ],
        correctIndex: 1,
        sourceRef: 'Alpha Lit SB p. 17',
        misconceptions: {
          0: 'Both pieces were composed by Robert Schumann in Kinderszenen.',
          2: 'There was no hidden will; the discovery was purely musical and emotional.',
          3: 'Her mistakes at the talent show were accidental due to lack of real practice.'
        },
        correctionExplanation: 'The two pieces symbolize that her youthful pleading for acceptance and her adult peace of mind are two interconnected halves of her complete self.'
      },
      {
        id: 'q-lit-4',
        type: 'grammar',
        subject: 'Writing and Grammar',
        prompt: 'Which sentence correctly follows standard pronoun-antecedent agreement rules?',
        options: [
          'Each of the performers tuned their instrument before stepping onto the stage.',
          'Each of the performers tuned his or her instrument before stepping onto the stage.',
          'Both of the performers forgot his sheet music.',
          'Everybody in the room clapped their hands enthusiastically.'
        ],
        correctIndex: 1,
        sourceRef: 'Workbook pp. 4–5',
        misconceptions: {
          0: '"Each" is singular and cannot take the plural pronoun "their" in strict formal conventions.',
          2: '"Both" is plural and requires "their", not "his".',
          3: '"Everybody" is singular; standard convention uses "his or her".'
        },
        correctionExplanation: 'The indefinite pronoun "Each" is grammatically singular and requires the singular pronoun "his or her".'
      },
      {
        id: 'q-lit-5',
        type: 'ace_writing',
        subject: 'Literature',
        prompt: 'In an ACE evidence paragraph, what is the primary role of the "E" (Explanation) component?',
        options: [
          'To copy down another direct quote from a different page.',
          'To analyze how the cited evidence logically proves the central claim without merely retelling the plot.',
          'To write a short dictionary definition of any unfamiliar vocabulary words.',
          'To list the titles of other books by the same author.'
        ],
        correctIndex: 1,
        sourceRef: 'ACE Writing Rubric',
        misconceptions: {
          0: 'Citing quotes belongs in the "C" step; "E" is analytical commentary.',
          2: 'Definitions alone do not analyze evidence.',
          3: 'External book titles are irrelevant to paragraph analysis.'
        },
        correctionExplanation: 'The Explanation section must synthesize the textual evidence and demonstrate why it substantiates the thesis.'
      }
    ],

    'stem-checkpoint-combo': [
      {
        id: 'q-math-1',
        subject: 'Mathematics',
        prompt: 'Solve the linear equation: 5(2x - 3) = 4(2x + 1) + 2x - 19. What is the solution?',
        options: [
          'x = 0',
          'Infinitely Many Solutions (Identity)',
          'No Solution (Contradiction)',
          'x = 19'
        ],
        correctIndex: 1,
        sourceRef: 'EnVision Algebra 1 pp. 22–31',
        misconceptions: {
          0: 'Substitute x = 0: -15 = -15, which is true, but x can be any number.',
          2: 'Expanding both sides yields 10x - 15 = 10x - 15. Since -15 = -15 is always true, it is not a contradiction.'
        },
        correctionExplanation: 'Both sides simplify to 10x - 15 = 10x - 15. Subtracting 10x gives -15 = -15 (Identity: Infinitely Many Solutions).'
      },
      {
        id: 'q-phys-1',
        subject: 'Physics',
        prompt: 'According to fluid statics (P = P₀ + ρgh), if the depth h of a diver in water is doubled, what happens to the GAUGE pressure (ρgh)?',
        options: [
          'Gauge pressure remains constant.',
          'Gauge pressure doubles.',
          'Gauge pressure quadruples.',
          'Gauge pressure decreases by half.'
        ],
        correctIndex: 1,
        sourceRef: 'Physics Ch 12 pp. 116–127',
        misconceptions: {
          0: 'Gauge pressure depends directly on depth h (ρgh).',
          2: 'Depth h has an exponent of 1 (linear relationship), not squared.',
          3: 'Pressure increases with depth, never decreases.'
        },
        correctionExplanation: 'Since Gauge Pressure = ρgh, pressure is directly proportional to depth h. Doubling depth doubles gauge pressure.'
      },
      {
        id: 'q-chem-1',
        subject: 'Chemistry',
        prompt: 'In a chemical reaction coordinate diagram, if the energy level of the products is LOWER than the energy level of the reactants, what type of reaction is occurring?',
        options: [
          'Endothermic (ΔH > 0, heat absorbed)',
          'Exothermic (ΔH < 0, heat released)',
          'Nuclear fission',
          'Isothermal physical phase change'
        ],
        correctIndex: 1,
        sourceRef: 'Chemistry Ch 13 pp. 92–101',
        misconceptions: {
          0: 'In endothermic reactions, products have higher energy than reactants (ΔH > 0).',
          2: 'This is a standard chemical reaction, not nuclear.',
          3: 'A drop in chemical potential energy represents a chemical reaction.'
        },
        correctionExplanation: 'When products have less chemical potential energy than reactants, ΔH is negative (exothermic), releasing thermal energy to surroundings.'
      },
      {
        id: 'q-bio-1',
        subject: 'Biology',
        prompt: 'During which phase of the bacteriophage lytic cycle does the viral lysozyme hydrolyze the host bacterial cell wall from within?',
        options: [
          'Attachment',
          'Penetration (Entry)',
          'Biosynthesis',
          'Lysis and Release'
        ],
        correctIndex: 3,
        sourceRef: 'Biology Ch 19 pp. 6–13',
        misconceptions: {
          0: 'Attachment is when the tail fibers bind to surface receptors.',
          1: 'Penetration is when viral DNA is injected into the cytoplasm.',
          2: 'Biosynthesis is when viral proteins and genomes are replicated.'
        },
        correctionExplanation: 'Lysis and Release is the final stage where viral lysozyme bursts the peptidoglycan wall, releasing new phages.'
      }
    ]
  };

  let activeExamState = null;
  let examTimerInterval = null;

  function renderAssessmentHub(container, subjectKey = 'literature-g9-two-kinds') {
    if (!container) return;
    const questions = QUESTION_BANK[subjectKey] || QUESTION_BANK['literature-g9-two-kinds'];

    container.innerHTML = `
      <div class="assessment-hub-shell">
        <div class="assessment-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">Assessment Suite</span>
            <span class="badge-grade">Official Checkpoint 1</span>
          </div>
          <h2>Multi-Tier Assessment & Timed Exam Mode</h2>
          <p>Test your knowledge through formative Quick Checks or take a timed, exam-condition assessment with review screens and misconception diagnostics.</p>

          <div class="assessment-mode-selector">
            <button class="pill-btn active" id="btn-mode-practice">Section Quiz (Study Mode)</button>
            <button class="pill-btn" id="btn-mode-exam">⏱️ Timed Exam Mode (Exam Conditions)</button>
          </div>
        </div>

        <!-- Practice Quiz View -->
        <div class="assessment-view-pane active" id="pane-practice">
          <div class="quiz-questions-list">
            ${questions.map((q, idx) => `
              <div class="quiz-question-card" data-q-idx="${idx}">
                <div class="qq-meta">
                  <span class="badge-qnum">Question ${idx + 1}</span>
                  <span class="badge-qsubj">${q.subject}</span>
                  <span class="badge-qref">${q.sourceRef}</span>
                </div>
                <p class="qq-prompt">${q.prompt}</p>
                <div class="qq-options">
                  ${q.options.map((opt, oIdx) => `
                    <button class="qq-opt-btn" data-q="${idx}" data-o="${oIdx}">${opt}</button>
                  `).join('')}
                </div>
                <div class="qq-feedback" id="qq-fb-${idx}" style="display:none;"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Timed Exam Mode View -->
        <div class="assessment-view-pane" id="pane-exam" style="display:none;">
          <div class="exam-start-splash" id="exam-splash">
            <div class="splash-card">
              <h3>🚨 Timed Exam Conditions</h3>
              <ul>
                <li><strong>Duration:</strong> 15 Minutes</li>
                <li><strong>Questions:</strong> ${questions.length} Questions</li>
                <li><strong>Rules:</strong> No instant feedback during the test. Flag questions for review. Complete review screen before final submission.</li>
              </ul>
              <button class="btn-primary-lg" id="btn-begin-exam">Begin Exam Countdown</button>
            </div>
          </div>

          <!-- Active Exam Screen -->
          <div class="exam-active-screen" id="exam-active-screen" style="display:none;">
            <div class="exam-top-bar">
              <div class="exam-timer-box">
                ⏱️ Time Remaining: <strong id="exam-timer-clock">15:00</strong>
              </div>
              <div class="exam-progress-counter">
                Question <span id="active-q-num">1</span> of ${questions.length}
              </div>
              <button class="btn-warning-sm" id="btn-flag-q">🚩 Flag for Review</button>
            </div>

            <div class="exam-nav-strip" id="exam-nav-strip">
              <!-- Numbered Question Grid -->
              ${questions.map((_, i) => `
                <button class="btn-exam-nav ${i === 0 ? 'current' : ''}" data-nav-idx="${i}">${i + 1}</button>
              `).join('')}
            </div>

            <!-- Single Question Active Card -->
            <div class="active-exam-question-card" id="active-exam-question-card">
              <!-- Injected by JS -->
            </div>

            <div class="exam-footer-actions">
              <button class="btn-secondary" id="btn-exam-prev" disabled>◀ Previous</button>
              <button class="btn-secondary" id="btn-exam-next">Next ▶</button>
              <button class="btn-primary" id="btn-exam-review-submit">Review & Submit Exam</button>
            </div>
          </div>

          <!-- Review Before Submit Modal / Pane -->
          <div class="exam-review-summary" id="exam-review-summary" style="display:none;">
            <h3>📋 Exam Review Summary</h3>
            <p>Check your answers and flagged questions before final submission:</p>
            <div class="review-grid" id="review-grid-target"></div>
            <div class="review-actions">
              <button class="btn-secondary" id="btn-return-exam">Return to Exam</button>
              <button class="btn-success-lg" id="btn-confirm-submit-exam">Submit Final Exam</button>
            </div>
          </div>

          <!-- Final Score Report -->
          <div class="exam-results-report" id="exam-results-report" style="display:none;">
            <!-- Rendered Results Report -->
          </div>
        </div>
      </div>
    `;

    bindPracticeEvents(container, questions, subjectKey);
    bindExamEvents(container, questions, subjectKey);
  }

  function bindPracticeEvents(container, questions, subjectKey) {
    container.querySelectorAll('.qq-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.getAttribute('data-q'), 10);
        const oIdx = parseInt(btn.getAttribute('data-o'), 10);
        const q = questions[qIdx];
        const fb = container.querySelector('#qq-fb-' + qIdx);
        fb.style.display = 'block';

        const parent = btn.closest('.quiz-question-card');
        parent.querySelectorAll('.qq-opt-btn').forEach(b => {
          b.disabled = true;
          const idx = parseInt(b.getAttribute('data-o'), 10);
          if (idx === q.correctIndex) b.classList.add('opt-correct');
          else if (idx === oIdx) b.classList.add('opt-incorrect');
        });

        if (oIdx === q.correctIndex) {
          fb.className = 'qq-feedback alert-success';
          fb.innerHTML = `<strong>✓ Correct!</strong> ${q.correctionExplanation}`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(subjectKey, 'assessment_quiz', true);
          }
        } else {
          fb.className = 'qq-feedback alert-warning';
          const misc = (q.misconceptions && q.misconceptions[oIdx]) ? q.misconceptions[oIdx] : 'Review the source material.';
          fb.innerHTML = `
            <strong>⚠️ Misconception Identified:</strong> ${misc}
            <div class="smallest-correction">
              <strong>Smallest Correction:</strong> ${q.correctionExplanation}
            </div>
            <small class="text-muted">Source Citation: ${q.sourceRef}</small>
          `;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(subjectKey, 'assessment_quiz', false);
          }
        }
      });
    });

    // Mode Toggle
    const practiceBtn = container.querySelector('#btn-mode-practice');
    const examBtn = container.querySelector('#btn-mode-exam');
    const panePractice = container.querySelector('#pane-practice');
    const paneExam = container.querySelector('#pane-exam');

    practiceBtn.addEventListener('click', () => {
      practiceBtn.classList.add('active');
      examBtn.classList.remove('active');
      panePractice.style.display = 'block';
      paneExam.style.display = 'none';
    });

    examBtn.addEventListener('click', () => {
      examBtn.classList.add('active');
      practiceBtn.classList.remove('active');
      panePractice.style.display = 'none';
      paneExam.style.display = 'block';
    });
  }

  function bindExamEvents(container, questions, subjectKey) {
    const beginBtn = container.querySelector('#btn-begin-exam');
    const splash = container.querySelector('#exam-splash');
    const activeScreen = container.querySelector('#exam-active-screen');
    const qCard = container.querySelector('#active-exam-question-card');
    const timerClock = container.querySelector('#exam-timer-clock');
    const activeQNum = container.querySelector('#active-q-num');
    const flagBtn = container.querySelector('#btn-flag-q');
    const prevBtn = container.querySelector('#btn-exam-prev');
    const nextBtn = container.querySelector('#btn-exam-next');
    const reviewBtn = container.querySelector('#btn-exam-review-submit');
    const reviewSummary = container.querySelector('#exam-review-summary');
    const reviewGrid = container.querySelector('#review-grid-target');
    const resultsReport = container.querySelector('#exam-results-report');

    let currentQ = 0;
    let secondsLeft = 15 * 60;

    beginBtn.addEventListener('click', () => {
      activeExamState = {
        answers: {},
        flags: {},
        startTime: Date.now()
      };
      splash.style.display = 'none';
      activeScreen.style.display = 'block';
      renderExamQuestion(0);

      // Start timer
      clearInterval(examTimerInterval);
      examTimerInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          clearInterval(examTimerInterval);
          submitExam();
          return;
        }
        const mins = Math.floor(secondsLeft / 60);
        const secs = secondsLeft % 60;
        timerClock.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }, 1000);
    });

    function renderExamQuestion(idx) {
      currentQ = idx;
      activeQNum.textContent = idx + 1;
      const q = questions[idx];
      const selectedOpt = activeExamState.answers[idx];
      const isFlagged = !!activeExamState.flags[idx];

      flagBtn.textContent = isFlagged ? '🚩 Flagged' : '🏳️ Flag Question';
      flagBtn.className = isFlagged ? 'btn-danger-sm' : 'btn-warning-sm';

      qCard.innerHTML = `
        <div class="exam-q-prompt">
          <h4>Question ${idx + 1}</h4>
          <p>${q.prompt}</p>
        </div>
        <div class="exam-q-options">
          ${q.options.map((opt, oIdx) => `
            <label class="exam-opt-label ${selectedOpt === oIdx ? 'selected' : ''}">
              <input type="radio" name="exam-q-radio" value="${oIdx}" ${selectedOpt === oIdx ? 'checked' : ''}>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      `;

      qCard.querySelectorAll('input[name="exam-q-radio"]').forEach(r => {
        r.addEventListener('change', (e) => {
          activeExamState.answers[idx] = parseInt(e.target.value, 10);
          updateNavGrid();
          qCard.querySelectorAll('.exam-opt-label').forEach(l => l.classList.remove('selected'));
          r.closest('.exam-opt-label').classList.add('selected');
        });
      });

      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === questions.length - 1;
      updateNavGrid();
    }

    function updateNavGrid() {
      container.querySelectorAll('.btn-exam-nav').forEach((btn, i) => {
        btn.className = 'btn-exam-nav';
        if (i === currentQ) btn.classList.add('current');
        if (activeExamState.answers[i] !== undefined) btn.classList.add('answered');
        if (activeExamState.flags[i]) btn.classList.add('flagged');
      });
    }

    container.querySelectorAll('.btn-exam-nav').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-nav-idx'), 10);
        renderExamQuestion(idx);
      });
    });

    prevBtn.addEventListener('click', () => {
      if (currentQ > 0) renderExamQuestion(currentQ - 1);
    });
    nextBtn.addEventListener('click', () => {
      if (currentQ < questions.length - 1) renderExamQuestion(currentQ + 1);
    });

    flagBtn.addEventListener('click', () => {
      activeExamState.flags[currentQ] = !activeExamState.flags[currentQ];
      renderExamQuestion(currentQ);
    });

    // Review Summary Screen
    reviewBtn.addEventListener('click', () => {
      activeScreen.style.display = 'none';
      reviewSummary.style.display = 'block';

      reviewGrid.innerHTML = questions.map((q, i) => {
        const isAns = activeExamState.answers[i] !== undefined;
        const isFlg = !!activeExamState.flags[i];
        return `
          <div class="review-status-card ${isAns ? 'card-ans' : 'card-unans'}">
            <span class="review-qnum">Q${i + 1}</span>
            <span class="review-state">${isAns ? 'Answered' : '⚠️ Unanswered'}</span>
            ${isFlg ? '<span class="badge-flag">🚩 Flagged</span>' : ''}
            <button class="btn-link-sm btn-jump-review" data-idx="${i}">Jump to Question</button>
          </div>
        `;
      }).join('');

      reviewGrid.querySelectorAll('.btn-jump-review').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.getAttribute('data-idx'), 10);
          reviewSummary.style.display = 'none';
          activeScreen.style.display = 'block';
          renderExamQuestion(idx);
        });
      });
    });

    container.querySelector('#btn-return-exam').addEventListener('click', () => {
      reviewSummary.style.display = 'none';
      activeScreen.style.display = 'block';
    });

    container.querySelector('#btn-confirm-submit-exam').addEventListener('click', submitExam);

    function submitExam() {
      clearInterval(examTimerInterval);
      reviewSummary.style.display = 'none';
      activeScreen.style.display = 'none';
      resultsReport.style.display = 'block';

      let correctCount = 0;
      const breakdown = questions.map((q, i) => {
        const userChoice = activeExamState.answers[i];
        const isCorrect = userChoice === q.correctIndex;
        if (isCorrect) correctCount++;
        return {
          question: q,
          userChoice,
          isCorrect
        };
      });

      const scorePct = Math.round((correctCount / questions.length) * 100);

      resultsReport.innerHTML = `
        <div class="results-header-card">
          <h2>🎯 Exam Score Report</h2>
          <div class="results-score-badge ${scorePct >= 80 ? 'score-high' : 'score-mid'}">
            <span class="score-number">${scorePct}%</span>
            <span class="score-ratio">${correctCount} / ${questions.length} Correct</span>
          </div>
          <p class="score-status-text">
            ${scorePct >= 85 ? '🌟 Outstanding Mastery! Ready for Checkpoint 1 Assessment.' : 'Review recommended on flagged misconceptions below.'}
          </p>
        </div>

        <div class="results-breakdown-list">
          <h3>Question-by-Question Diagnostic Analysis</h3>
          ${breakdown.map((item, i) => `
            <div class="breakdown-card ${item.isCorrect ? 'bd-correct' : 'bd-incorrect'}">
              <div class="bd-header">
                <span class="bd-status-badge">${item.isCorrect ? '✓ CORRECT' : '❌ INCORRECT'}</span>
                <h4>Question ${i + 1} (${item.question.subject})</h4>
              </div>
              <p class="bd-prompt">${item.question.prompt}</p>
              <div class="bd-choices">
                <p><strong>Your Answer:</strong> ${item.userChoice !== undefined ? item.question.options[item.userChoice] : '<em>No answer provided</em>'}</p>
                ${!item.isCorrect ? `<p class="correct-highlight"><strong>Correct Answer:</strong> ${item.question.options[item.question.correctIndex]}</p>` : ''}
              </div>
              ${!item.isCorrect && item.question.misconceptions && item.question.misconceptions[item.userChoice] ? `
                <div class="bd-misconception-box">
                  <strong>⚠️ Misconception:</strong> ${item.question.misconceptions[item.userChoice]}
                  <div class="bd-correction"><strong>Smallest Correction:</strong> ${item.question.correctionExplanation}</div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <div class="results-actions">
          <button class="btn-primary" id="btn-retake-exam">Retake Exam</button>
          <button class="btn-secondary" id="btn-back-home">Back to Lesson</button>
        </div>
      `;

      if (window.MasteryDashboard) {
        window.MasteryDashboard.recordExamResult(subjectKey, scorePct, correctCount, questions.length);
      }

      resultsReport.querySelector('#btn-retake-exam').addEventListener('click', () => {
        resultsReport.style.display = 'none';
        splash.style.display = 'block';
      });
      resultsReport.querySelector('#btn-back-home').addEventListener('click', () => {
        if (window.StudyApp) window.StudyApp.switchView('home');
      });
    }
  }

  return {
    QUESTION_BANK,
    renderAssessmentHub
  };
})();
