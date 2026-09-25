/**
 * Module 7: Chemistry Specialist (Agent 7)
 * Covers Grade 9 Nature of Matter & States (pp. 36–41)
 * and Grade 11 Thermochemistry: Enthalpy (ΔH) & Reaction Energetics (pp. 92–101).
 * Features particle-level state simulations (Solid/Liquid/Gas) and an interactive Reaction Coordinate Energy Profiler.
 */

window.ChemistryModule = (function () {
  'use strict';

  const LESSONS = {
    'chemistry-g11-energy-reactions': {
      id: 'chemistry-g11-energy-reactions',
      title: 'Thermochemistry: Energy and Chemical Reactions (ΔH)',
      grade: 'Grade 11',
      gradeCode: 'G11',
      subject: 'Chemistry',
      broadSubject: 'Chemistry',
      unit: 'Chapter 13: Thermochemistry',
      sourceFile: 'Vol 2 Ch 13 Thermochemistry (pp. 92–101) & G11 Checkpoint 1 Guide',
      pages: 'pp. 92–101',
      assessmentDate: '2026-10-12 (Monday)',
      targetStudents: ['Shadan (G11A)'],

      concepts: [
        {
          name: 'Enthalpy of Reaction (ΔH)',
          formula: 'ΔH = H_products - H_reactants',
          distinction: 'Model',
          explanation: 'The heat content of a chemical system at constant pressure.'
        },
        {
          name: 'Exothermic Reactions (ΔH < 0)',
          formula: 'Heat is Released to Surroundings',
          distinction: 'Conclusion',
          explanation: 'Reactants have higher potential energy than products. Surroundings feel warm (e.g., combustion of methane).'
        },
        {
          name: 'Endothermic Reactions (ΔH > 0)',
          formula: 'Heat is Absorbed from Surroundings',
          distinction: 'Conclusion',
          explanation: 'Products have higher potential energy than reactants. Surroundings feel cold (e.g., photosynthesis, instant cold pack).'
        },
        {
          name: 'Activation Energy (E_a)',
          formula: 'E_a = E_activated_complex - E_reactants',
          distinction: 'Model',
          explanation: 'Minimum kinetic energy colliding particles must possess to form the transition state and react.'
        }
      ],

      epistemologicalGuide: [
        { term: 'Observation', desc: 'Direct empirical measurement (e.g., "The thermometer reading dropped from 25°C to 18°C").' },
        { term: 'Interpretation', desc: 'Deduction from data (e.g., "The reaction absorbed thermal energy from the aqueous solution").' },
        { term: 'Model', desc: 'Theoretical representation (e.g., "Molecules collided with sufficient energy to surpass the activation energy barrier").' },
        { term: 'Conclusion', desc: 'Overarching chemical principle established (e.g., "Dissolving ammonium nitrate is an endothermic process with ΔH > 0").' }
      ]
    },

    'chemistry-g9-nature-matter': {
      id: 'chemistry-g9-nature-matter',
      title: 'The Nature of Matter, States & Phase Transitions',
      grade: 'Grade 9',
      gradeCode: 'G9',
      subject: 'Chemistry',
      broadSubject: 'Chemistry',
      unit: 'Chapter 2: Matter and Change',
      sourceFile: 'Vol 1 Ch 2 Chemistry: Lesson 1 The Nature of Matter (pp. 36–41)',
      pages: 'pp. 36–41',
      assessmentDate: '2026-10-12 (Monday)',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],

      concepts: [
        {
          name: 'Intensive Properties',
          formula: 'Independent of sample size (Density, Boiling Point, Melting Point)',
          distinction: 'Observation/Property',
          explanation: 'Useful for identifying unknown chemical substances.'
        },
        {
          name: 'Extensive Properties',
          formula: 'Depends on sample quantity (Mass, Volume, Length)',
          distinction: 'Observation/Property',
          explanation: 'Varies with the amount of matter present.'
        },
        {
          name: 'Physical vs. Chemical Change',
          formula: 'Physical: Identity preserved; Chemical: New substances formed',
          distinction: 'Interpretation',
          explanation: 'Four indicators of chemical change: gas evolution, precipitate formation, irreversible color change, energy transfer.'
        }
      ]
    }
  };

  function renderChemistryModule(container, lessonKey = 'chemistry-g11-energy-reactions') {
    if (!container) return;
    const lesson = LESSONS[lessonKey] || LESSONS['chemistry-g11-energy-reactions'];

    container.innerHTML = `
      <div class="chem-lab-shell">
        <div class="chem-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">Chemistry</span>
            <span class="badge-grade">${lesson.grade}</span>
            <span class="badge-date">Exam: ${lesson.assessmentDate}</span>
          </div>
          <h2>${lesson.title}</h2>
          <p>Explore particle-level behaviors, epistemological classification (Observation vs. Model), and reaction energetics.</p>

          <div class="grade-toggle-pills">
            <button class="pill-btn ${lessonKey === 'chemistry-g11-energy-reactions' ? 'active' : ''}" id="btn-chem-g11">Grade 11: Thermochemistry (ΔH)</button>
            <button class="pill-btn ${lessonKey === 'chemistry-g9-nature-matter' ? 'active' : ''}" id="btn-chem-g9">Grade 9: Nature of Matter & States</button>
          </div>
        </div>

        <!-- Epistemological Framework Strip -->
        <div class="epistemology-card">
          <h4>🧪 Scientific Inquiry Distinction: How Chemists Know What They Know</h4>
          <div class="epistemology-grid">
            <div class="epi-item epi-obs"><strong>Observation:</strong> What you directly measure (Thermometer drops).</div>
            <div class="epi-item epi-int"><strong>Interpretation:</strong> What the measurement means (Heat absorbed).</div>
            <div class="epi-item epi-mod"><strong>Model:</strong> Microscopic explanation (Particles surpass E_a barrier).</div>
            <div class="epi-item epi-con"><strong>Conclusion:</strong> General chemical law (Endothermic reaction with ΔH > 0).</div>
          </div>
        </div>

        <!-- Concept Cards -->
        <div class="formula-cards-grid">
          ${lesson.concepts.map(c => `
            <div class="formula-card">
              <span class="fc-name">${c.name}</span>
              <div class="fc-formula"><code>${c.formula}</code></div>
              <span class="badge-source">${c.distinction}</span>
              <p class="fc-note">${c.explanation}</p>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Particle State Simulator -->
        <div class="particle-sim-card">
          <h3>🔬 Sub-Microscopic Particle Simulator (Solid, Liquid, Gas)</h3>
          <p>Kinetic Molecular Theory in action: Observe how molecular motion, spacing, and intermolecular attraction change with state.</p>
          <div class="particle-controls">
            <button class="pill-btn active" id="btn-state-solid">Solid (Vibrating Lattice)</button>
            <button class="pill-btn" id="btn-state-liquid">Liquid (Fluid Sliding)</button>
            <button class="pill-btn" id="btn-state-gas">Gas (High Energy Random)</button>
          </div>
          <div class="canvas-container">
            <canvas id="particle-canvas" width="550" height="280"></canvas>
            <div class="particle-status" id="particle-status-desc">Solid: Particles packed tightly in a rigid, fixed arrangement with vibrational motion only.</div>
          </div>
        </div>

        <!-- Reaction Coordinate Diagram (for G11 Thermochemistry) -->
        <div class="reaction-profile-card">
          <h3>⚡ Reaction Energy Profile (Enthalpy ΔH & Activation Energy E_a)</h3>
          <p>Toggle between Exothermic and Endothermic pathways to inspect the potential energy curve:</p>
          <div class="profile-toggle">
            <button class="pill-btn active" id="btn-profile-exo">Exothermic (ΔH < 0, Heat Released)</button>
            <button class="pill-btn" id="btn-profile-endo">Endothermic (ΔH > 0, Heat Absorbed)</button>
          </div>
          <div class="canvas-container">
            <canvas id="reaction-profile-canvas" width="550" height="300"></canvas>
          </div>
        </div>
      </div>
    `;

    bindChemEvents(container, lessonKey);
    initParticleSim(container);
    initReactionProfile(container);
  }

  function bindChemEvents(container, currentKey) {
    const g11Btn = container.querySelector('#btn-chem-g11');
    const g9Btn = container.querySelector('#btn-chem-g9');

    if (g11Btn) {
      g11Btn.addEventListener('click', () => renderChemistryModule(container, 'chemistry-g11-energy-reactions'));
    }
    if (g9Btn) {
      g9Btn.addEventListener('click', () => renderChemistryModule(container, 'chemistry-g9-nature-matter'));
    }
  }

  function initParticleSim(container) {
    const canvas = container.querySelector('#particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const desc = container.querySelector('#particle-status-desc');

    let state = 'solid';
    const numParticles = 40;
    const particles = [];

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: 100 + (i % 8) * 45,
        baseY: 80 + Math.floor(i / 8) * 35,
        radius: 7
      });
    }

    container.querySelector('#btn-state-solid').addEventListener('click', (e) => {
      state = 'solid';
      setActiveBtn(e.target);
      desc.textContent = 'Solid: Particles packed tightly in a rigid, fixed arrangement with vibrational motion only. Definite shape and volume.';
    });
    container.querySelector('#btn-state-liquid').addEventListener('click', (e) => {
      state = 'liquid';
      setActiveBtn(e.target);
      desc.textContent = 'Liquid: Particles close together but free to slide past one another. Definite volume, takes shape of container.';
    });
    container.querySelector('#btn-state-gas').addEventListener('click', (e) => {
      state = 'gas';
      setActiveBtn(e.target);
      desc.textContent = 'Gas: Particles far apart moving at high speeds with rapid, random, elastic collisions. No definite shape or volume.';
    });

    function setActiveBtn(target) {
      container.querySelectorAll('.particle-controls .pill-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
    }

    let animationId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        if (state === 'solid') {
          // Vibrate around base grid position
          p.x = p.baseX + (Math.random() - 0.5) * 2.5;
          p.y = p.baseY + (Math.random() - 0.5) * 2.5;
          ctx.fillStyle = '#3b82f6';
        } else if (state === 'liquid') {
          // Flow along the bottom
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8;
          if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1;
          if (p.y < 120 || p.y > canvas.height - p.radius) p.vy *= -1;
          ctx.fillStyle = '#06b6d4';
        } else if (state === 'gas') {
          // Rapid random motion everywhere
          p.x += p.vx * 3.5;
          p.y += p.vy * 3.5;
          if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1;
          if (p.y < p.radius || p.y > canvas.height - p.radius) p.vy *= -1;
          ctx.fillStyle = '#ef4444';
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    }

    render();
  }

  function initReactionProfile(container) {
    const canvas = container.querySelector('#reaction-profile-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let profile = 'exo';

    const exoBtn = container.querySelector('#btn-profile-exo');
    const endoBtn = container.querySelector('#btn-profile-endo');

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(50, h - 40);
      ctx.lineTo(w - 30, h - 40);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText('Potential Energy (kJ/mol)', 10, 15);
      ctx.fillText('Reaction Progress ➔', w - 160, h - 15);

      if (profile === 'exo') {
        // Exothermic: Reactants at 150, Peak at 60, Products at 210
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(130, 150); // Reactants
        ctx.bezierCurveTo(200, 40, 250, 40, 320, 210); // Transition state hump
        ctx.lineTo(w - 50, 210); // Products
        ctx.stroke();

        // Reactants and Products labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Reactants', 60, 140);
        ctx.fillText('Products', w - 110, 200);

        // Transition State
        ctx.fillStyle = '#d97706';
        ctx.fillText('Activated Complex (Transition State)', 170, 35);

        // Delta H arrow
        ctx.strokeStyle = '#2563eb';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(130, 150);
        ctx.lineTo(400, 150);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#2563eb';
        ctx.fillText('ΔH < 0 (Negative: Heat Released)', 240, 185);
      } else {
        // Endothermic: Reactants at 210, Peak at 60, Products at 130
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 210);
        ctx.lineTo(130, 210); // Reactants
        ctx.bezierCurveTo(200, 40, 250, 40, 320, 130); // Transition state hump
        ctx.lineTo(w - 50, 130); // Products
        ctx.stroke();

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Reactants', 60, 200);
        ctx.fillText('Products', w - 110, 120);

        ctx.fillStyle = '#d97706';
        ctx.fillText('Activated Complex', 210, 35);

        // Delta H arrow
        ctx.strokeStyle = '#059669';
        ctx.fillStyle = '#059669';
        ctx.fillText('ΔH > 0 (Positive: Heat Absorbed)', 240, 175);
      }
    }

    draw();

    exoBtn.addEventListener('click', () => {
      profile = 'exo';
      exoBtn.classList.add('active');
      endoBtn.classList.remove('active');
      draw();
    });

    endoBtn.addEventListener('click', () => {
      profile = 'endo';
      endoBtn.classList.add('active');
      exoBtn.classList.remove('active');
      draw();
    });
  }

  return {
    getLessons: () => LESSONS,
    renderChemistryModule
  };
})();
