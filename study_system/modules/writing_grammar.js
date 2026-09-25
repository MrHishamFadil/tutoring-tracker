/**
 * Module 4: Writing & Grammar Specialist (Agent 4)
 * Covers Checkpoint 1 syllabus: Pronoun-Antecedent Agreement, avoiding vague pronouns,
 * sentence combining, and writing conventions for English Language Arts.
 */

window.WritingGrammar = (function () {
  'use strict';

  const LESSON_DATA = {
    id: 'writing-g9-pronoun-agreement',
    title: 'Pronoun-Antecedent Agreement & Vague Pronouns',
    subject: 'Writing and Grammar',
    broadSubject: 'English Language Arts',
    grade: 'Grade 9 & 11',
    gradeCode: 'G9/G11',
    unit: 'Conventions of Standard English',
    sourceFile: 'Grammar and Writing Workbook Grade 9 (pp. 4–5) & Checkpoint 1 Study Guide',
    pages: 'Workbook pp. 4–5',
    targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)', 'Shadan (G11A)'],
    assessmentDate: '2026-10-06 (Tuesday)',
    estimatedStudyTime: '40–50 mins',
    essentialQuestion: 'How does precise pronoun-antecedent agreement create clarity, authority, and flow in formal academic writing?',
    learningGoals: [
      'Ensure pronouns match their antecedents in number (singular/plural), gender, and person.',
      'Master indefinite pronouns: singular (everyone, each), plural (both, few), and SANAM variable pronouns.',
      'Identify and eliminate vague pronoun references (unclear uses of it, this, that, which).',
      'Apply sentence-combining strategies to enhance sentence variety and eliminate repetition.'
    ],

    rules: [
      {
        id: 'rule-number',
        title: 'Rule 1: Number Agreement (Singular vs. Plural)',
        explanation: 'A singular antecedent requires a singular pronoun; a plural antecedent requires a plural pronoun.',
        incorrectExample: 'Each of the girls gave their best effort during the talent show audition.',
        correctExample: 'Each of the girls gave her best effort during the talent show audition. (Or: All of the girls gave their best effort.)',
        whyItMatters: '"Each" is grammatically singular. Modifiers like "of the girls" do not change the number of the subject.'
      },
      {
        id: 'rule-indefinite',
        title: 'Rule 2: Indefinite Pronoun Agreement',
        explanation: 'Singular indefinite pronouns (anybody, anyone, each, either, everybody, everyone, neither, nobody, no one, somebody, someone) always take singular pronouns.',
        memoryTip: 'SANAM (Some, Any, None, All, Most) can be singular or plural depending on the object of the preposition: "All of the music was... its tempo" vs. "All of the notes were... their tone."',
        incorrectExample: 'Everyone in the auditorium held their breath when Jing-mei walked on stage.',
        correctExample: 'Everyone in the auditorium held his or her breath... (Or in revised plural: All audience members held their breath...)'
      },
      {
        id: 'rule-vague',
        title: 'Rule 3: Eliminating Vague Pronouns (this, that, which, it)',
        explanation: 'Every pronoun must point to a specific, unambiguous noun antecedent. Never use "this" or "it" to refer vaguely to an entire clause or idea.',
        incorrectExample: 'Jing-mei did not practice Schumann\'s piece properly for months. This caused a fiasco.',
        correctExample: 'Jing-mei did not practice Schumann\'s piece properly for months. This negligence caused a fiasco. (Or: Her lack of practice caused a fiasco.)',
        whyItMatters: 'Vague pronouns create confusion on standardized writing tests and weaken academic essays.'
      }
    ],

    // Interactive Error Correction Drills
    drills: [
      {
        id: 'drill-1',
        prompt: 'Choose the sentence with correct pronoun-antecedent agreement:',
        options: [
          'Neither of the sisters wanted their mother to choose the piano piece.',
          'Neither of the sisters wanted her mother to choose the piano piece.',
          'Neither of the sisters wanted they mother to choose the piano piece.',
          'Neither of the sisters wanted its mother to choose the piano piece.'
        ],
        correctIndex: 1,
        ruleRef: 'Rule 2: Indefinite Pronouns',
        explanation: '"Neither" is singular. Therefore, the singular possessive pronoun "her" is grammatically required.',
        misconception: 'Students hear "sisters" (plural) right before the pronoun and mistakenly pick "their". Always look at the true subject: "Neither".'
      },
      {
        id: 'drill-2',
        prompt: 'Identify the sentence with an UNAMBIGUOUS (correct) pronoun reference:',
        options: [
          'Amy Tan handed the manuscript to the publisher because she knew it was brilliant.',
          'Because the piano was out of tune, Jing-mei could not play it properly.',
          'When the mother scolded Jing-mei, it surprised her friend.',
          'In the story, it says that America is a land of opportunity.'
        ],
        correctIndex: 1,
        ruleRef: 'Rule 3: Vague Pronoun Elimination',
        explanation: '"It" clearly refers to the singular noun "piano". In option A, "she/it" is ambiguous. In option C, "it" lacks a noun antecedent. In option D, "it says" is a colloquial vague error.',
        misconception: 'Never start sentences with "In the book it says..." Always name the author or narrator directly: "Amy Tan argues that..."'
      },
      {
        id: 'drill-3',
        prompt: 'All of the students completed _____ independent reflection essays on time.',
        options: ['his', 'her', 'their', 'its'],
        correctIndex: 2,
        ruleRef: 'Rule 2: SANAM Pronoun Rule',
        explanation: '"All" is part of the SANAM group. Here, the object of the preposition is "students" (plural), so "All" is plural and takes "their".',
        misconception: 'Confusing "All" with "Each". "Each" is always singular; "All" takes its number from the prepositional phrase.'
      }
    ]
  };

  function renderWritingModule(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="grammar-lab-shell">
        <div class="grammar-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">${LESSON_DATA.subject}</span>
            <span class="badge-grade">${LESSON_DATA.grade}</span>
            <span class="badge-date">Workbook pp. 4–5</span>
          </div>
          <h2>Conventions & Grammar Masterclass: Pronoun Agreement</h2>
          <p>Master precise pronoun-antecedent agreement, indefinite pronoun rules, and eliminate vague pronouns from your analytical essays.</p>
        </div>

        <!-- Rules Accordion/Cards -->
        <div class="rules-grid">
          ${LESSON_DATA.rules.map(r => `
            <div class="rule-card">
              <div class="rule-title-bar">
                <h4>${r.title}</h4>
              </div>
              <p class="rule-desc">${r.explanation}</p>
              ${r.memoryTip ? `<div class="memory-tip-box">💡 <strong>Pro-Tip:</strong> ${r.memoryTip}</div>` : ''}
              <div class="contrast-examples">
                <div class="example-bad">
                  <span class="tag-incorrect">❌ INCORRECT</span>
                  <code>${r.incorrectExample}</code>
                </div>
                <div class="example-good">
                  <span class="tag-correct">✓ REVISED</span>
                  <code>${r.correctExample}</code>
                </div>
              </div>
              ${r.whyItMatters ? `<small class="text-muted"><strong>Why it matters:</strong> ${r.whyItMatters}</small>` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Interactive Error Correction Workshop -->
        <div class="grammar-interactive-section">
          <h3>Interactive Diagnostic Drills (Checkpoint 1 Ready)</h3>
          <p>Solve each grammar dilemma. Immediate feedback will diagnose your grammatical reasoning.</p>
          <div class="drills-stack" id="grammar-drills-stack">
            ${LESSON_DATA.drills.map((d, dIdx) => `
              <div class="drill-card" data-drill-index="${dIdx}">
                <p class="drill-prompt"><strong>Question ${dIdx + 1}:</strong> ${d.prompt}</p>
                <div class="drill-options">
                  ${d.options.map((opt, oIdx) => `
                    <button class="drill-opt-btn" data-drill="${dIdx}" data-option="${oIdx}">${opt}</button>
                  `).join('')}
                </div>
                <div class="drill-feedback-box" id="drill-fb-${dIdx}" style="display:none;"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Sentence Combining Lab -->
        <div class="sentence-combining-lab">
          <h3>Sentence Variety & Combining Workshop</h3>
          <p>Eliminate choppy sentences by combining these two clauses using a relative pronoun (<em>who, which, that</em>) or a subordinating conjunction:</p>
          <div class="combining-exercise-box">
            <div class="source-sentences">
              <p>1. <em>Jing-mei's mother had endured devastating losses in China.</em></p>
              <p>2. <em>She arrived in San Francisco with unwavering determination.</em></p>
            </div>
            <textarea class="form-control" id="combine-input" rows="2" placeholder="Combine into one sophisticated complex sentence..."></textarea>
            <div class="combining-actions">
              <button class="btn-secondary" id="btn-show-model-combine">Check Suggested Revisions</button>
            </div>
            <div class="model-combinations" id="model-combinations-box" style="display:none;">
              <h5>Model Combining Variations:</h5>
              <ul>
                <li><strong>Complex with 'who':</strong> "Jing-mei's mother, who had endured devastating losses in China, arrived in San Francisco with unwavering determination."</li>
                <li><strong>Participial Phrase:</strong> "Having endured devastating losses in China, Jing-mei's mother arrived in San Francisco with unwavering determination."</li>
                <li><strong>Adverbial Clause with 'Although':</strong> "Although she had endured devastating losses in China, Jing-mei's mother arrived in San Francisco with unwavering determination."</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Drills
    container.querySelectorAll('.drill-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dIdx = parseInt(btn.getAttribute('data-drill'), 10);
        const oIdx = parseInt(btn.getAttribute('data-option'), 10);
        const drill = LESSON_DATA.drills[dIdx];
        const fb = container.querySelector('#drill-fb-' + dIdx);
        fb.style.display = 'block';

        const parent = btn.closest('.drill-card');
        parent.querySelectorAll('.drill-opt-btn').forEach(b => {
          b.disabled = true;
          const idx = parseInt(b.getAttribute('data-option'), 10);
          if (idx === drill.correctIndex) b.classList.add('opt-correct');
          else if (idx === oIdx) b.classList.add('opt-incorrect');
        });

        if (oIdx === drill.correctIndex) {
          fb.className = 'drill-feedback-box alert-success';
          fb.innerHTML = `<strong>✓ Excellent Grammar Logic!</strong> ${drill.explanation}`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt('writing-g9-pronoun-agreement', 'pronoun_agreement', true);
          }
        } else {
          fb.className = 'drill-feedback-box alert-warning';
          fb.innerHTML = `<strong>⚠️ Misconception:</strong> ${drill.misconception}<br><small><strong>Rule:</strong> ${drill.explanation}</small>`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt('writing-g9-pronoun-agreement', 'pronoun_agreement', false);
          }
        }
      });
    });

    // Model combine button
    container.querySelector('#btn-show-model-combine').addEventListener('click', () => {
      const box = container.querySelector('#model-combinations-box');
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });
  }

  return {
    getLessonData: () => LESSON_DATA,
    renderWritingModule
  };
})();
