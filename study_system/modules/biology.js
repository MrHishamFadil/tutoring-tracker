/**
 * Module 8: Biology Specialist (Agent 8)
 * Covers Grade 9 Understanding Science & Controlled Experiments (pp. 6–15)
 * and Grade 11 Microbiology: Viruses, Capsid Structure, Lytic & Lysogenic Cycles (pp. 6–13).
 * Implements Process-Cause-Result frameworks, interactive virus cycle sequencing, and misconception diagnostics.
 */

window.BiologyModule = (function () {
  'use strict';

  const LESSONS = {
    'biology-g11-microbiology-viruses': {
      id: 'biology-g11-microbiology-viruses',
      title: 'Microbiology: Viral Architecture & Reproductive Cycles',
      grade: 'Grade 11',
      gradeCode: 'G11',
      subject: 'Biology',
      broadSubject: 'Biology',
      unit: 'Chapter 19: Microbiology',
      sourceFile: 'Vol 3 Unit 6 Ch 19 Microbiology (pp. 6–13) & G11 Checkpoint 1 Guide',
      pages: 'pp. 6–13',
      assessmentDate: '2026-10-08 (Thursday)',
      targetStudents: ['Shadan (G11A)'],

      anatomicalComponents: [
        { part: 'Protein Capsid', function: 'Protective protein shell enclosing viral nucleic acid; determines host cell specificity.' },
        { part: 'Genetic Material (Core)', function: 'Either DNA or RNA (single- or double-stranded), encoding instructions to hijack host cells.' },
        { part: 'Lipid Envelope (some)', function: 'Outer membrane derived from host cell membrane with glycoprotein spikes (e.g., Influenza, HIV).' },
        { part: 'Tail Fibers (Bacteriophage)', function: 'Specialized pins and fibers that recognize and bind to bacterial outer wall receptors.' }
      ],

      // Process - Cause - Result Framework
      processFramework: {
        title: 'Bacteriophage Lytic Cycle: Process ➔ Cause ➔ Result',
        stages: [
          {
            stepNum: 1,
            name: 'Attachment',
            whatHappens: 'Phage tail fibers bind to specific complementary receptor proteins on bacterial cell wall.',
            whyItHappens: 'Chemical attraction and molecular complementarity between viral proteins and host cell surface.',
            result: 'Virus is firmly anchored to the target bacterium.'
          },
          {
            stepNum: 2,
            name: 'Penetration (Entry)',
            whatHappens: 'Phage sheath contracts, injecting viral DNA/RNA into the cytoplasm; empty capsid stays outside.',
            whyItHappens: 'Viral lysozyme weakens cell wall, and hollow core punctures through membrane.',
            result: 'Host bacterium is now genetically infected.'
          },
          {
            stepNum: 3,
            name: 'Biosynthesis',
            whatHappens: 'Host bacterial chromosome is degraded; host ribosomes and RNA polymerases synthesize viral components.',
            whyItHappens: 'Viral genes take transcriptional control of host metabolic machinery.',
            result: 'Bacterial cell is converted into a viral production factory.'
          },
          {
            stepNum: 4,
            name: 'Maturation (Assembly)',
            whatHappens: 'Viral heads, tails, and newly replicated genomes assemble into hundreds of complete infectious virions.',
            whyItHappens: 'Spontaneous self-assembly governed by biochemical affinity.',
            result: 'Interior of bacterium is packed with hundreds of mature phages.'
          },
          {
            stepNum: 5,
            name: 'Lysis & Release',
            whatHappens: 'Viral lysozyme hydrolyzes bacterial peptidoglycan wall from inside, causing osmotic bursting.',
            whyItHappens: 'Accumulated viral enzymes weaken cell wall until osmotic pressure bursts the membrane.',
            result: 'Host cell dies; ~200 new bacteriophages are released to infect adjacent bacteria.'
          }
        ]
      },

      lysogenicComparison: {
        title: 'Lytic vs. Lysogenic Reproductive Cycles',
        lyticTraits: ['Virulent phage pathway', 'Rapid host cell destruction (lysis)', 'No dormant prophage stage', 'Produces acute symptoms quickly'],
        lysogenicTraits: ['Temperate phage pathway', 'Viral DNA integrates into bacterial chromosome as a Prophage', 'Host cell survives and replicates viral DNA during binary fission', 'Environmental trigger (UV light, stress) induces entry into lytic cycle']
      }
    },

    'biology-g9-understanding-science': {
      id: 'biology-g9-understanding-science',
      title: 'Exploring Biology: Scientific Method & Controlled Experiments',
      grade: 'Grade 9',
      gradeCode: 'G9',
      subject: 'Biology',
      broadSubject: 'Biology',
      unit: 'Unit 1: The Nature of Life',
      sourceFile: 'Vol 1 Unit 1 Ch 1 Exploring Biology (pp. 6–15) & G9 Guide',
      pages: 'pp. 6–15',
      assessmentDate: '2026-10-08 (Thursday)',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],

      concepts: [
        { name: 'Independent Variable', desc: 'The factor deliberately manipulated by the experimenter (the cause).' },
        { name: 'Dependent Variable', desc: 'The responding factor measured to observe the effect (the outcome).' },
        { name: 'Controlled Group', desc: 'The baseline group kept in normal/unaltered conditions to provide a valid standard for comparison.' },
        { name: 'Constants', desc: 'All variables deliberately kept identical across all trials to prevent confounding results.' }
      ]
    }
  };

  function renderBiologyModule(container, lessonKey = 'biology-g11-microbiology-viruses') {
    if (!container) return;
    const lesson = LESSONS[lessonKey] || LESSONS['biology-g11-microbiology-viruses'];

    container.innerHTML = `
      <div class="bio-lab-shell">
        <div class="bio-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">Biology</span>
            <span class="badge-grade">${lesson.grade}</span>
            <span class="badge-date">Exam: ${lesson.assessmentDate}</span>
          </div>
          <h2>${lesson.title}</h2>
          <p>Examine biological structures, systems thinking, and the Process ➔ Cause ➔ Result mechanism.</p>

          <div class="grade-toggle-pills">
            <button class="pill-btn ${lessonKey === 'biology-g11-microbiology-viruses' ? 'active' : ''}" id="btn-bio-g11">Grade 11: Microbiology & Viruses</button>
            <button class="pill-btn ${lessonKey === 'biology-g9-understanding-science' ? 'active' : ''}" id="btn-bio-g9">Grade 9: Scientific Method & Controls</button>
          </div>
        </div>

        <!-- Biological Misconceptions Alert Box -->
        <div class="bio-alert-box">
          <h4>🚨 Essential Biological Fact: Why Viruses Are Classified as Non-Living</h4>
          <ul>
            <li><strong>No Cellular Structure:</strong> Viruses lack cell membranes, cytoplasm, ribosomes, and organelles.</li>
            <li><strong>No Independent Metabolism:</strong> Viruses cannot generate ATP, synthesize proteins, or replicate without commandeering a living host cell.</li>
            <li><strong>Medical Impact:</strong> Antibiotics inhibit bacterial cell wall synthesis or 70S ribosomes; they have <strong>zero effect on viral infections</strong>.</li>
          </ul>
        </div>

        <!-- Anatomy / Key Concepts Grid -->
        ${lesson.anatomicalComponents ? `
          <div class="formula-cards-grid">
            ${lesson.anatomicalComponents.map(ac => `
              <div class="formula-card">
                <span class="fc-name">${ac.part}</span>
                <p class="fc-note">${ac.function}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Process - Cause - Result Interactive Sequencing -->
        ${lesson.processFramework ? `
          <div class="process-framework-card">
            <h3>🔄 ${lesson.processFramework.title}</h3>
            <p>Drag or click each sequential stage to analyze the physiological chain of events:</p>
            <div class="process-steps-stack">
              ${lesson.processFramework.stages.map(st => `
                <div class="pcr-card" data-stage="${st.stepNum}">
                  <div class="pcr-header">
                    <span class="pcr-badge">STAGE ${st.stepNum}</span>
                    <h4>${st.name}</h4>
                  </div>
                  <div class="pcr-body">
                    <div class="pcr-col">
                      <span class="pcr-label">WHAT HAPPENS</span>
                      <p>${st.whatHappens}</p>
                    </div>
                    <div class="pcr-col">
                      <span class="pcr-label">WHY / CAUSE</span>
                      <p>${st.whyItHappens}</p>
                    </div>
                    <div class="pcr-col highlight-result">
                      <span class="pcr-label">PHYSIOLOGICAL RESULT</span>
                      <p>${st.result}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Lytic vs Lysogenic Comparison Table -->
          <div class="comparison-table-card">
            <h3>🔬 Comparative Analysis: Lytic vs. Lysogenic Pathways</h3>
            <div class="comp-grid">
              <div class="comp-col col-lytic">
                <h4>Lytic Cycle (Virulent)</h4>
                <ul>
                  ${lesson.lysogenicComparison.lyticTraits.map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
              <div class="comp-col col-lysogenic">
                <h4>Lysogenic Cycle (Temperate)</h4>
                <ul>
                  ${lesson.lysogenicComparison.lysogenicTraits.map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    bindBioEvents(container, lessonKey);
  }

  function bindBioEvents(container, currentKey) {
    const g11Btn = container.querySelector('#btn-bio-g11');
    const g9Btn = container.querySelector('#btn-bio-g9');

    if (g11Btn) {
      g11Btn.addEventListener('click', () => renderBiologyModule(container, 'biology-g11-microbiology-viruses'));
    }
    if (g9Btn) {
      g9Btn.addEventListener('click', () => renderBiologyModule(container, 'biology-g9-understanding-science'));
    }
  }

  return {
    getLessons: () => LESSONS,
    renderBiologyModule
  };
})();
