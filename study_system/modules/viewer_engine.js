/**
 * Module 2: Direct-Study Material Viewer Engine (Agent 2)
 * Renders verified textbook pages/excerpts with page-by-page navigation,
 * text-to-speech, interactive terms, annotation/highlighting, notes,
 * and the 3-tier popup drawer: "Explain this", "Give me an example", "Test me on this".
 */

window.ViewerEngine = (function () {
  'use strict';

  let currentLesson = null;
  let currentPageIndex = 0;
  let activeSpeechUtterance = null;
  let isSpeaking = false;
  let userNotes = {};
  let userHighlights = {};

  // Load persisted notes and highlights
  try {
    const savedNotes = localStorage.getItem('study_user_notes');
    if (savedNotes) userNotes = JSON.parse(savedNotes);
    const savedHigh = localStorage.getItem('study_user_highlights');
    if (savedHigh) userHighlights = JSON.parse(savedHigh);
  } catch (e) {
    console.warn('Storage access warning:', e);
  }

  function saveStorage() {
    try {
      localStorage.setItem('study_user_notes', JSON.stringify(userNotes));
      localStorage.setItem('study_user_highlights', JSON.stringify(userHighlights));
    } catch (e) {
      console.warn('Error saving study notes/highlights:', e);
    }
  }

  function renderViewer(lessonData, containerElement) {
    if (!lessonData || !containerElement) return;
    currentLesson = lessonData;
    currentPageIndex = 0;

    containerElement.innerHTML = `
      <div class="viewer-shell" id="viewer-shell">
        <!-- Viewer Control Toolbar -->
        <div class="viewer-toolbar" role="toolbar" aria-label="Study Material Tools">
          <div class="toolbar-group">
            <span class="toolbar-source-tag"><span class="badge-source">ORIGINAL SOURCE MATERIAL</span> ${lessonData.sourceFile} (${lessonData.pages})</span>
          </div>

          <div class="toolbar-controls">
            <!-- Text to Speech -->
            <button class="btn-tool" id="btn-tts-toggle" title="Read Aloud with Text-to-Speech" aria-label="Read Aloud">
              <span class="tool-icon">🔊</span> <span class="tool-label" id="tts-label">Listen</span>
            </button>

            <!-- Text Size Controls -->
            <button class="btn-tool" id="btn-zoom-out" title="Decrease Text Size" aria-label="Decrease text size">A-</button>
            <button class="btn-tool" id="btn-zoom-in" title="Increase Text Size" aria-label="Increase text size">A+</button>

            <!-- Highlighting Colors -->
            <div class="highlight-palette" role="group" aria-label="Highlight Color">
              <button class="btn-color hl-yellow active" data-color="yellow" title="Yellow Highlight"></button>
              <button class="btn-color hl-green" data-color="green" title="Green Highlight"></button>
              <button class="btn-color hl-pink" data-color="pink" title="Pink Highlight"></button>
            </div>

            <!-- Notes Sidebar Toggle -->
            <button class="btn-tool" id="btn-notes-toggle" title="Open My Study Notes">
              <span class="tool-icon">📝</span> Notes (<span id="notes-count">0</span>)
            </button>
          </div>
        </div>

        <!-- Main Viewer Content Canvas -->
        <div class="viewer-main-canvas">
          <!-- Text and Excerpt Viewport -->
          <div class="viewer-viewport" id="viewer-viewport">
            <div class="page-header-nav">
              <div class="page-indicator">
                Page <span id="current-page-num">1</span> of <span id="total-pages-num">${lessonData.studyPages.length}</span>
                <span class="page-title-badge" id="current-page-title">${lessonData.studyPages[0].title}</span>
              </div>
              <div class="page-arrows">
                <button class="btn-page-arrow" id="btn-prev-page" disabled title="Previous Page">◀ Previous</button>
                <button class="btn-page-arrow" id="btn-next-page" ${lessonData.studyPages.length <= 1 ? 'disabled' : ''} title="Next Page">Next ▶</button>
              </div>
            </div>

            <!-- Page Body -->
            <div class="page-rendered-content" id="page-content-target" tabindex="0" aria-label="Study Text Content">
              ${renderPageContent(lessonData.studyPages[0])}
            </div>

            <!-- Page Footer Progress -->
            <div class="page-footer-nav">
              <div class="read-progress-bar">
                <div class="read-progress-fill" id="read-progress-fill" style="width: ${(1 / lessonData.studyPages.length) * 100}%"></div>
              </div>
            </div>
          </div>

          <!-- Notes Drawer / Sidebar -->
          <aside class="viewer-notes-sidebar" id="viewer-notes-sidebar" aria-label="Student Notes Panel">
            <div class="notes-sidebar-header">
              <h3>📌 My Study Notes</h3>
              <button class="btn-close-notes" id="btn-close-notes" aria-label="Close notes">&times;</button>
            </div>
            <div class="notes-input-area">
              <textarea id="note-input-text" placeholder="Type an insight, question, or reminder for this page..." rows="3"></textarea>
              <button class="btn-primary-sm" id="btn-save-note">Save Note</button>
            </div>
            <div class="notes-list" id="notes-list-target">
              <!-- Rendered notes list -->
            </div>
          </aside>
        </div>

        <!-- Interactive Definition & Explanation Bottom Drawer Modal -->
        <div class="concept-popup-drawer" id="concept-popup-drawer" aria-hidden="true" role="dialog" aria-labelledby="popup-term-title">
          <div class="drawer-header">
            <div class="drawer-term-badge">
              <span class="term-type-tag" id="popup-term-type">CONCEPT</span>
              <h3 id="popup-term-title">Term</h3>
            </div>
            <button class="btn-close-drawer" id="btn-close-drawer" aria-label="Close Drawer">&times;</button>
          </div>

          <div class="drawer-body">
            <!-- 3 Tabs: Explain This, Give Me An Example, Test Me On This -->
            <div class="drawer-tabs">
              <button class="tab-drawer-btn active" data-target="drawer-explain">💡 Explain This</button>
              <button class="tab-drawer-btn" data-target="drawer-example">🔍 Give Me An Example</button>
              <button class="tab-drawer-btn" data-target="drawer-test">🎯 Test Me On This</button>
            </div>

            <div class="drawer-tab-pane active" id="drawer-explain">
              <div class="explanation-box">
                <p class="student-def" id="popup-student-def"></p>
                <div class="academic-def-box">
                  <strong>Academic Rigor:</strong> <span id="popup-academic-def"></span>
                </div>
                <div class="why-matters-box">
                  <strong>Why it matters:</strong> <span id="popup-why-matters"></span>
                </div>
                <div class="common-mistake-box">
                  <strong>⚠️ Common Misconception:</strong> <span id="popup-misconception"></span>
                </div>
              </div>
            </div>

            <div class="drawer-tab-pane" id="drawer-example">
              <div class="example-box">
                <div class="model-example" id="popup-model-example"></div>
                <div class="source-citation" id="popup-source-citation"></div>
              </div>
            </div>

            <div class="drawer-tab-pane" id="drawer-test">
              <div class="quick-check-interactive" id="popup-quick-check">
                <!-- Injected Quick Check Question -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindViewerEvents(containerElement);
    updateNotesList();
  }

  function renderPageContent(page) {
    if (!page) return '';
    let html = `
      <div class="page-meta-strip">
        <span class="source-ref">${page.citation || 'Official Study Material'}</span>
        <span class="page-type-tag ${page.isAuthentic ? 'tag-authentic' : 'tag-curated'}">
          ${page.isAuthentic ? 'ORIGINAL TEXT EXCERPT' : 'CURRICULUM STUDY GUIDE'}
        </span>
      </div>
      <h2 class="page-heading">${page.title}</h2>
    `;

    if (page.summaryContext) {
      html += `<div class="summary-callout"><strong>Context & Plot Stage:</strong> ${page.summaryContext}</div>`;
    }

    html += `<div class="page-text-body">${page.htmlContent}</div>`;

    if (page.sourceFootnote) {
      html += `<div class="source-footnote"><em>${page.sourceFootnote}</em></div>`;
    }

    return html;
  }

  function bindViewerEvents(container) {
    const prevBtn = container.querySelector('#btn-prev-page');
    const nextBtn = container.querySelector('#btn-next-page');
    const pageNumEl = container.querySelector('#current-page-num');
    const pageTitleEl = container.querySelector('#current-page-title');
    const contentEl = container.querySelector('#page-content-target');
    const progressFill = container.querySelector('#read-progress-fill');

    // Page navigation
    function updatePage(newIndex) {
      if (!currentLesson || newIndex < 0 || newIndex >= currentLesson.studyPages.length) return;
      currentPageIndex = newIndex;
      pageNumEl.textContent = currentPageIndex + 1;
      pageTitleEl.textContent = currentLesson.studyPages[currentPageIndex].title;
      contentEl.innerHTML = renderPageContent(currentLesson.studyPages[currentPageIndex]);
      prevBtn.disabled = currentPageIndex === 0;
      nextBtn.disabled = currentPageIndex === currentLesson.studyPages.length - 1;
      progressFill.style.width = `${((currentPageIndex + 1) / currentLesson.studyPages.length) * 100}%`;
      contentEl.scrollTop = 0;

      // Re-bind interactive term popups in page
      bindInteractiveTerms(contentEl);
      updateNotesList();
    }

    prevBtn.addEventListener('click', () => updatePage(currentPageIndex - 1));
    nextBtn.addEventListener('click', () => updatePage(currentPageIndex + 1));

    // Text to Speech
    const ttsBtn = container.querySelector('#btn-tts-toggle');
    const ttsLabel = container.querySelector('#tts-label');

    ttsBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        alert('Text-to-speech is not supported in this browser.');
        return;
      }
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        ttsLabel.textContent = 'Listen';
        ttsBtn.classList.remove('speaking');
      } else {
        const textToRead = contentEl.innerText;
        activeSpeechUtterance = new SpeechSynthesisUtterance(textToRead);
        activeSpeechUtterance.rate = 0.95;
        activeSpeechUtterance.lang = 'en-US';
        activeSpeechUtterance.onend = () => {
          isSpeaking = false;
          ttsLabel.textContent = 'Listen';
          ttsBtn.classList.remove('speaking');
        };
        activeSpeechUtterance.onerror = () => {
          isSpeaking = false;
          ttsLabel.textContent = 'Listen';
          ttsBtn.classList.remove('speaking');
        };
        window.speechSynthesis.speak(activeSpeechUtterance);
        isSpeaking = true;
        ttsLabel.textContent = 'Pause';
        ttsBtn.classList.add('speaking');
      }
    });

    // Zoom font size
    let currentFontSize = 16;
    container.querySelector('#btn-zoom-in').addEventListener('click', () => {
      if (currentFontSize < 24) {
        currentFontSize += 2;
        contentEl.style.fontSize = `${currentFontSize}px`;
      }
    });
    container.querySelector('#btn-zoom-out').addEventListener('click', () => {
      if (currentFontSize > 14) {
        currentFontSize -= 2;
        contentEl.style.fontSize = `${currentFontSize}px`;
      }
    });

    // Notes Sidebar
    const notesSidebar = container.querySelector('#viewer-notes-sidebar');
    container.querySelector('#btn-notes-toggle').addEventListener('click', () => {
      notesSidebar.classList.toggle('open');
    });
    container.querySelector('#btn-close-notes').addEventListener('click', () => {
      notesSidebar.classList.remove('open');
    });

    container.querySelector('#btn-save-note').addEventListener('click', () => {
      const input = container.querySelector('#note-input-text');
      const text = input.value.trim();
      if (!text || !currentLesson) return;
      const lessonKey = currentLesson.id;
      if (!userNotes[lessonKey]) userNotes[lessonKey] = [];
      userNotes[lessonKey].push({
        id: 'note_' + Date.now(),
        page: currentPageIndex + 1,
        pageTitle: currentLesson.studyPages[currentPageIndex].title,
        text: text,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      saveStorage();
      input.value = '';
      updateNotesList();
    });

    // Popup Drawer close & tabs
    const popupDrawer = container.querySelector('#concept-popup-drawer');
    container.querySelector('#btn-close-drawer').addEventListener('click', () => {
      popupDrawer.classList.remove('open');
      popupDrawer.setAttribute('aria-hidden', 'true');
    });

    container.querySelectorAll('.tab-drawer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.tab-drawer-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.drawer-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const pane = container.querySelector('#' + targetId);
        if (pane) pane.classList.add('active');
      });
    });

    // Initial binding for interactive terms
    bindInteractiveTerms(contentEl);
  }

  function bindInteractiveTerms(contentElement) {
    if (!contentElement) return;
    const clickableTerms = contentElement.querySelectorAll('.interactive-term, .clickable-formula, .clickable-concept');
    clickableTerms.forEach(term => {
      term.addEventListener('click', () => {
        const termKey = term.getAttribute('data-term-key');
        openTermDrawer(termKey);
      });
    });
  }

  function openTermDrawer(termKey) {
    if (!currentLesson || !currentLesson.terminology || !currentLesson.terminology[termKey]) return;
    const termData = currentLesson.terminology[termKey];
    const drawer = document.getElementById('concept-popup-drawer');
    if (!drawer) return;

    document.getElementById('popup-term-type').textContent = termData.type || 'LITERARY TERM';
    document.getElementById('popup-term-title').textContent = termData.term;
    document.getElementById('popup-student-def').textContent = termData.studentDef;
    document.getElementById('popup-academic-def').textContent = termData.academicDef;
    document.getElementById('popup-why-matters').textContent = termData.whyItMatters;
    document.getElementById('popup-misconception').textContent = termData.misconception;
    document.getElementById('popup-model-example').innerHTML = `
      <blockquote>"${termData.exampleQuote}"</blockquote>
      <p class="example-explanation">${termData.exampleExplanation}</p>
    `;
    document.getElementById('popup-source-citation').textContent = `Source Reference: ${termData.sourceCitation || currentLesson.sourceFile}`;

    // Render Quick Check inside drawer
    renderDrawerQuickCheck(termData.quickCheck);

    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function renderDrawerQuickCheck(qc) {
    const target = document.getElementById('popup-quick-check');
    if (!target) return;
    if (!qc) {
      target.innerHTML = '<p class="text-muted">No immediate quick check registered for this item.</p>';
      return;
    }

    target.innerHTML = `
      <div class="qc-question-card">
        <p class="qc-prompt"><strong>Quick Diagnostic Check:</strong> ${qc.prompt}</p>
        <div class="qc-options">
          ${qc.options.map((opt, i) => `
            <button class="qc-opt-btn" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        <div class="qc-feedback-box" style="display:none;" id="qc-feedback"></div>
      </div>
    `;

    target.querySelectorAll('.qc-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.getAttribute('data-index'), 10);
        const fb = target.querySelector('#qc-feedback');
        fb.style.display = 'block';

        target.querySelectorAll('.qc-opt-btn').forEach(b => {
          b.disabled = true;
          const idx = parseInt(b.getAttribute('data-index'), 10);
          if (idx === qc.correctIndex) b.classList.add('opt-correct');
          else if (idx === selected) b.classList.add('opt-incorrect');
        });

        if (selected === qc.correctIndex) {
          fb.className = 'qc-feedback-box qc-correct';
          fb.innerHTML = `<strong>✓ Spot On!</strong> ${qc.correctExplanation}`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(currentLesson.id, qc.skillKey || 'concept_vocab', true);
          }
        } else {
          fb.className = 'qc-feedback-box qc-incorrect';
          fb.innerHTML = `<strong>⚠️ Misconception Detected:</strong> ${qc.misconceptions[selected] || qc.generalMisconception}<br><small><strong>Correction:</strong> ${qc.correctExplanation}</small>`;
          if (window.MasteryDashboard) {
            window.MasteryDashboard.recordSkillAttempt(currentLesson.id, qc.skillKey || 'concept_vocab', false);
          }
        }
      });
    });
  }

  function updateNotesList() {
    const list = document.getElementById('notes-list-target');
    const countEl = document.getElementById('notes-count');
    if (!list || !currentLesson) return;
    const notes = userNotes[currentLesson.id] || [];
    if (countEl) countEl.textContent = notes.length;

    if (notes.length === 0) {
      list.innerHTML = '<p class="empty-notes-hint">No notes yet on this lesson. Type above to add your own study thoughts!</p>';
      return;
    }

    list.innerHTML = notes.map((n, i) => `
      <div class="note-card">
        <div class="note-card-meta">
          <span class="badge-page-mini">Page ${n.page}</span>
          <span class="note-time">${n.date}</span>
          <button class="btn-delete-note" data-idx="${i}" title="Delete Note">&times;</button>
        </div>
        <p class="note-text">${escapeHtml(n.text)}</p>
      </div>
    `).join('');

    list.querySelectorAll('.btn-delete-note').forEach(b => {
      b.addEventListener('click', (e) => {
        const idx = parseInt(b.getAttribute('data-idx'), 10);
        userNotes[currentLesson.id].splice(idx, 1);
        saveStorage();
        updateNotesList();
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  return {
    renderViewer,
    openTermDrawer
  };
})();
