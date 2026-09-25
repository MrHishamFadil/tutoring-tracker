/**
 * Master Application Controller: Interactive Study & Assessment System
 * Orchestrates the 10 subagent modules covering ONLY English, Math, and Sciences.
 */

window.StudyApp = (function () {
  'use strict';

  let currentSubject = 'literature'; // 'literature', 'grammar', 'math', 'physics', 'chemistry', 'biology'
  let currentView = 'home'; // 'home', 'viewer', 'concept-map', 'vocab', 'writing', 'math-lab', 'physics-lab', 'chem-lab', 'bio-lab', 'assessments', 'student-dash', 'teacher-dash'

  function init() {
    bindGlobalControls();
    updateSubjectView(currentSubject);
  }

  function bindGlobalControls() {
    // Subject Switcher in top navigation
    document.querySelectorAll('.btn-subject-nav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = btn.getAttribute('data-subject');
        setSubject(sub);
      });
    });

    // View Navigation Bar
    document.querySelectorAll('.btn-view-nav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-view');
        switchView(view);
      });
    });

    // Theme & Accessibility Toggles
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('study_theme_mode', isDark ? 'dark' : 'light');
      });
    }

    // High Contrast Toggle
    const contrastBtn = document.getElementById('btn-toggle-contrast');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
      });
    }

    // Restore saved theme
    if (localStorage.getItem('study_theme_mode') === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeBtn) themeBtn.textContent = '☀️ Light Mode';
    }
  }

  function setSubject(subjectKey) {
    currentSubject = subjectKey;
    document.querySelectorAll('.btn-subject-nav').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-subject') === subjectKey);
    });

    // Smart default view per subject
    if (subjectKey === 'math') {
      switchView('math-lab');
    } else if (subjectKey === 'physics') {
      switchView('physics-lab');
    } else if (subjectKey === 'chemistry') {
      switchView('chem-lab');
    } else if (subjectKey === 'biology') {
      switchView('bio-lab');
    } else if (subjectKey === 'grammar') {
      switchView('writing');
    } else {
      switchView('home');
    }
  }

  function switchView(viewName) {
    currentView = viewName;
    document.querySelectorAll('.btn-view-nav').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-view') === viewName);
    });

    const target = document.getElementById('main-study-viewport');
    if (!target) return;
    target.innerHTML = '';
    target.scrollTop = 0;

    switch (viewName) {
      case 'home':
        if (window.LiteratureTwoKinds) {
          window.LiteratureTwoKinds.renderLessonHome(target);
        }
        break;

      case 'viewer':
        if (window.ViewerEngine && window.LiteratureTwoKinds) {
          window.ViewerEngine.renderViewer(window.LiteratureTwoKinds.getLessonData(), target);
        }
        break;

      case 'concept-map':
        if (window.LiteratureTwoKinds) {
          window.LiteratureTwoKinds.renderConceptMap(target);
        }
        break;

      case 'vocab':
        if (window.LiteratureTwoKinds) {
          window.LiteratureTwoKinds.renderVocabActivities(target);
        }
        break;

      case 'writing':
        if (window.WritingGrammar) {
          window.WritingGrammar.renderWritingModule(target);
        }
        break;

      case 'math-lab':
        if (window.MathematicsModule) {
          window.MathematicsModule.renderMathModule(target);
        }
        break;

      case 'physics-lab':
        if (window.PhysicsModule) {
          window.PhysicsModule.renderPhysicsModule(target);
        }
        break;

      case 'chem-lab':
        if (window.ChemistryModule) {
          window.ChemistryModule.renderChemistryModule(target);
        }
        break;

      case 'bio-lab':
        if (window.BiologyModule) {
          window.BiologyModule.renderBiologyModule(target);
        }
        break;

      case 'assessments':
      case 'diagnostic':
        if (window.AssessmentEngine) {
          const subKey = (currentSubject === 'math' || currentSubject === 'physics' || currentSubject === 'chemistry' || currentSubject === 'biology')
            ? 'stem-checkpoint-combo'
            : 'literature-g9-two-kinds';
          window.AssessmentEngine.renderAssessmentHub(target, subKey);
        }
        break;

      case 'resource-bank':
        renderResourceBank(target);
        break;

      case 'student-dash':
        if (window.MasteryDashboard) {
          window.MasteryDashboard.renderStudentDashboard(target);
        }
        break;

      case 'teacher-dash':
        if (window.MasteryDashboard) {
          window.MasteryDashboard.renderTeacherDashboard(target);
        }
        break;

      default:
        if (window.LiteratureTwoKinds) {
          window.LiteratureTwoKinds.renderLessonHome(target);
        }
    }
  }

  function renderResourceBank(container) {
    if (!container || !window.ResourceBank) return;
    const repo = window.ResourceBank.REPOSITORY;

    container.innerHTML = `
      <div class="resource-bank-shell">
        <div class="rb-header" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-lg);padding:24px;margin-bottom:20px;">
          <div class="hero-badge-strip">
            <span class="badge-subject">Resource Bank</span>
            <span class="badge-grade">Grades 9–11</span>
            <span class="badge-date">Curriculum Aligned (Savvas Realize Style)</span>
          </div>
          <h2>Verified High-View Instructional Resource Bank</h2>
          <p style="color:var(--text-muted);margin-bottom:16px;">
            Clear, curriculum-aligned, high-reputation resources for <strong>Click ➔ Watch ➔ Study Rules ➔ Practice</strong>.
            Prioritizing Khan Academy, The Organic Chemistry Tutor, Amoeba Sisters, CrashCourse, Purdue OWL, CommonLit, and The Physics Classroom.
          </p>

          <!-- Subject Filter Pills -->
          <div class="filter-pills-strip" style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="pill-btn active" data-rbsubj="all">All Subjects</button>
            <button class="pill-btn" data-rbsubj="ela">📖 ELA / Literature</button>
            <button class="pill-btn" data-rbsubj="math">📐 Mathematics</button>
            <button class="pill-btn" data-rbsubj="physics">⚛️ Physics</button>
            <button class="pill-btn" data-rbsubj="chemistry">🧪 Chemistry</button>
            <button class="pill-btn" data-rbsubj="biology">🧬 Biology</button>
          </div>
        </div>

        <div class="rb-topics-grid" id="rb-topics-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:20px;">
          ${renderResourceCards(repo, 'all')}
        </div>
      </div>
    `;

    container.querySelectorAll('.filter-pills-strip .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-pills-strip .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const subj = btn.getAttribute('data-rbsubj');
        container.querySelector('#rb-topics-grid').innerHTML = renderResourceCards(repo, subj);
      });
    });
  }

  function renderResourceCards(repo, filterSubj) {
    let cardsHtml = '';

    for (const [subjKey, topics] of Object.entries(repo)) {
      if (filterSubj !== 'all' && filterSubj !== subjKey) continue;

      for (const [tKey, tData] of Object.entries(topics)) {
        cardsHtml += `
          <div class="rb-card" style="background:var(--bg-surface);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:20px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="badge-subject" style="text-transform:uppercase;">${subjKey}</span>
                <span class="badge-grade">${tData.grade}</span>
              </div>
              <h3 style="font-size:1.15rem;margin-bottom:12px;">${tData.topic}</h3>

              <!-- Watch Section -->
              ${tData.video || tData.generalSkillVideo ? `
                <div style="background:var(--bg-elevated);border-left:3px solid #ef4444;padding:10px 12px;border-radius:4px;margin-bottom:10px;">
                  <strong style="color:#dc2626;font-size:.82rem;display:block;">🎥 WATCH (Core Video)</strong>
                  <div style="font-weight:600;font-size:.9rem;margin:2px 0;">${(tData.video || tData.generalSkillVideo).title}</div>
                  <div style="font-size:.78rem;color:var(--text-muted);">${(tData.video || tData.generalSkillVideo).platform}</div>
                  <div style="font-size:.8rem;color:var(--text-main);margin-top:4px;"><em>"${(tData.video || tData.generalSkillVideo).rationale}"</em></div>
                  <a href="${(tData.video || tData.generalSkillVideo).url}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;font-size:.82rem;display:inline-block;margin-top:6px;">Open Video Tutorial ➔</a>
                </div>
              ` : ''}

              <!-- Study / Reading Section -->
              ${tData.textResource || tData.referencePage ? `
                <div style="background:var(--bg-elevated);border-left:3px solid #2563eb;padding:10px 12px;border-radius:4px;margin-bottom:10px;">
                  <strong style="color:#1d4ed8;font-size:.82rem;display:block;">📖 STUDY (Concept & Rules)</strong>
                  <div style="font-weight:600;font-size:.9rem;margin:2px 0;">${(tData.textResource || tData.referencePage).title}</div>
                  <div style="font-size:.78rem;color:var(--text-muted);">${(tData.textResource || tData.referencePage).platform}</div>
                  <div style="font-size:.8rem;color:var(--text-main);margin-top:4px;"><em>"${(tData.textResource || tData.referencePage).rationale}"</em></div>
                  <a href="${(tData.textResource || tData.referencePage).url}" target="_blank" rel="noopener noreferrer" style="color:#2563eb;font-weight:700;font-size:.82rem;display:inline-block;margin-top:6px;">Open Study Guide ➔</a>
                </div>
              ` : ''}

              <!-- Practice Section -->
              ${tData.practiceResource || tData.writingGrammarResource ? `
                <div style="background:var(--bg-elevated);border-left:3px solid #10b981;padding:10px 12px;border-radius:4px;margin-bottom:10px;">
                  <strong style="color:#047857;font-size:.82rem;display:block;">🎯 PRACTICE (Exercises & Solutions)</strong>
                  <div style="font-weight:600;font-size:.9rem;margin:2px 0;">${(tData.practiceResource || tData.writingGrammarResource).title}</div>
                  <div style="font-size:.78rem;color:var(--text-muted);">${(tData.practiceResource || tData.writingGrammarResource).platform}</div>
                  <div style="font-size:.8rem;color:var(--text-main);margin-top:4px;"><em>"${(tData.practiceResource || tData.writingGrammarResource).rationale}"</em></div>
                  <a href="${(tData.practiceResource || tData.writingGrammarResource).url}" target="_blank" rel="noopener noreferrer" style="color:#10b981;font-weight:700;font-size:.82rem;display:inline-block;margin-top:6px;">Open Practice Bank ➔</a>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }
    }

    return cardsHtml || '<p style="color:var(--text-muted);padding:20px;">No resources found for this filter.</p>';
  }

  function updateSubjectView(subjectKey) {
    setSubject(subjectKey);
  }

  return {
    init,
    setSubject,
    switchView
  };
})();

// Auto-boot on load
document.addEventListener('DOMContentLoaded', () => {
  if (window.StudyApp) window.StudyApp.init();
});
