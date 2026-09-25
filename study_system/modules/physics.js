/**
 * Module 6: Physics Specialist (Agent 6)
 * Covers Grade 9 Scientific Inquiry & SI Units (pp. 6–13)
 * and Grade 11 Fluid Mechanics, Hydrostatic Pressure & Buoyancy (pp. 116–127).
 * Implements the mandatory 8-Step Numerical Problem Solver and an interactive Fluid Pressure Simulator.
 */

window.PhysicsModule = (function () {
  'use strict';

  const LESSONS = {
    'physics-g11-fluid-mechanics': {
      id: 'physics-g11-fluid-mechanics',
      title: 'Fluid Mechanics: Pressure, Depth & Pascal\'s Principle',
      grade: 'Grade 11',
      gradeCode: 'G11',
      subject: 'Physics',
      broadSubject: 'Physics',
      unit: 'Unit 6: Fluid Mechanics',
      sourceFile: 'Vol 2 Unit 6 Ch 12 Fluid Mechanics (pp. 116–127) & Checkpoint 1 Guide',
      pages: 'pp. 116–127',
      assessmentDate: '2026-10-11 (Sunday)',
      targetStudents: ['Shadan (G11A)'],

      formulas: [
        { name: 'Density', eq: 'ρ = m / V', units: 'kg/m³', desc: 'Mass per unit volume of fluid.' },
        { name: 'Hydrostatic Fluid Pressure', eq: 'P = P₀ + ρgh', units: 'Pa (N/m²)', desc: 'Total pressure at depth h below surface.' },
        { name: 'Pascal\'s Hydraulic Law', eq: 'F₁ / A₁ = F₂ / A₂', units: 'N / m²', desc: 'Pressure exerted equally in all directions through enclosed fluid.' },
        { name: 'Archimedes\' Buoyant Force', eq: 'F_b = ρ_fluid · V_sub · g', units: 'N', desc: 'Upward force equals the weight of displaced fluid.' }
      ],

      // Mandatory 8-Step Numerical Solver Example
      eightStepProblem: {
        title: '8-Step Numerical Problem: Submarine Hydrostatic Pressure',
        scenario: 'A research submarine dives to a depth of 150 meters in seawater (density ρ = 1025 kg/m³). Atmospheric pressure at the surface is P₀ = 1.013 × 10⁵ Pa, and gravitational acceleration is g = 9.80 m/s². What is the total absolute pressure on the submarine\'s hull?',
        steps: [
          { num: 1, title: 'Identify the Known Information', content: 'h = 150 m,  ρ = 1025 kg/m³,  P₀ = 1.013 × 10⁵ Pa,  g = 9.80 m/s²' },
          { num: 2, title: 'Identify the Unknown', content: 'Total absolute pressure P in Pascals (Pa)' },
          { num: 3, title: 'Select the Equation', content: 'P = P₀ + ρ · g · h  (Hydrostatic Pressure Equation)' },
          { num: 4, title: 'Rearrange the Equation', content: 'Equation is already isolated for total pressure P.' },
          { num: 5, title: 'Substitute Values with Units', content: 'P = 1.013 × 10⁵ Pa + (1025 kg/m³)(9.80 m/s²)(150 m)' },
          { num: 6, title: 'Calculate Intermediate & Final Values', content: 'Gauge Pressure: (1025)(9.80)(150) = 1,506,750 Pa = 1.507 × 10⁶ Pa.\nTotal Pressure P = 101,300 Pa + 1,506,750 Pa = 1,608,050 Pa = 1.61 × 10⁶ Pa' },
          { num: 7, title: 'Include Correct Units & Significant Figures', content: 'P = 1.61 × 10⁶ Pa (or 1.61 MPa / ~15.9 atm) [3 significant figures]' },
          { num: 8, title: 'Check Reasonableness & Physical Reality', content: 'Water pressure increases by roughly 1 atm (~10⁵ Pa) for every 10 meters of depth. At 150 m, we expect ~15 atm of gauge pressure + 1 atm surface = ~16 atm (1.6 MPa). The result matches expected physical reality perfectly.' }
        ]
      }
    },

    'physics-g9-scientific-inquiry': {
      id: 'physics-g9-scientific-inquiry',
      title: 'Scientific Inquiry, Measurement & SI Base Units',
      grade: 'Grade 9',
      gradeCode: 'G9',
      subject: 'Physics',
      broadSubject: 'Physics',
      unit: 'Unit 1: Foundations of Physics',
      sourceFile: 'Vol 1 Unit 1 Ch 1 Foundations of Physics (pp. 6–13) & G9 Guide',
      pages: 'pp. 6–13',
      assessmentDate: '2026-10-11 (Sunday)',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],

      formulas: [
        { name: 'Velocity', eq: 'v = Δx / Δt', units: 'm/s', desc: 'Displacement per unit time.' },
        { name: 'Acceleration', eq: 'a = Δv / Δt', units: 'm/s²', desc: 'Rate of change of velocity.' },
        { name: 'Force (Newton\'s 2nd Law)', eq: 'F = m · a', units: 'N = kg·m/s²', desc: 'Mass times acceleration.' }
      ],

      eightStepProblem: {
        title: '8-Step Numerical Problem: Derived SI Units for Force',
        scenario: 'A force of 45.0 N acts on an object of mass 2.50 kg. Express the resulting acceleration in fundamental SI base units and check if the magnitude is physically realistic for a laboratory cart.',
        steps: [
          { num: 1, title: 'Identify Knowns', content: 'F = 45.0 N,  m = 2.50 kg' },
          { num: 2, title: 'Identify Unknown', content: 'Acceleration a' },
          { num: 3, title: 'Select Equation', content: 'F = m · a' },
          { num: 4, title: 'Rearrange Equation', content: 'a = F / m' },
          { num: 5, title: 'Substitute Values', content: 'a = (45.0 kg·m/s²) / (2.50 kg)' },
          { num: 6, title: 'Calculate', content: 'a = 18.0' },
          { num: 7, title: 'Units & Significant Figures', content: 'a = 18.0 m/s² (3 significant figures)' },
          { num: 8, title: 'Reasonableness Check', content: 'Acceleration is roughly 1.8g, which is a brisk, realistic acceleration for a powered lab cart.' }
        ]
      }
    }
  };

  function renderPhysicsModule(container, lessonKey = 'physics-g11-fluid-mechanics') {
    if (!container) return;
    const lesson = LESSONS[lessonKey] || LESSONS['physics-g11-fluid-mechanics'];

    container.innerHTML = `
      <div class="physics-lab-shell">
        <div class="physics-header">
          <div class="hero-badge-strip">
            <span class="badge-subject">Physics</span>
            <span class="badge-grade">${lesson.grade}</span>
            <span class="badge-date">Exam: ${lesson.assessmentDate}</span>
          </div>
          <h2>${lesson.title}</h2>
          <p>Rigorous physics problem solving: equations, unit verification, and physical reasonableness checks.</p>

          <div class="grade-toggle-pills">
            <button class="pill-btn ${lessonKey === 'physics-g11-fluid-mechanics' ? 'active' : ''}" id="btn-phys-g11">Grade 11: Fluid Mechanics</button>
            <button class="pill-btn ${lessonKey === 'physics-g9-scientific-inquiry' ? 'active' : ''}" id="btn-phys-g9">Grade 9: Scientific Inquiry & SI Units</button>
          </div>
        </div>

        <!-- Formula Bank -->
        <div class="formula-cards-grid">
          ${lesson.formulas.map(f => `
            <div class="formula-card">
              <span class="fc-name">${f.name}</span>
              <div class="fc-formula"><code>${f.eq}</code></div>
              <div class="fc-units">SI Units: <strong>${f.units}</strong></div>
              <small class="fc-note">${f.desc}</small>
            </div>
          `).join('')}
        </div>

        <!-- 8-Step Numerical Problem Solver -->
        <div class="eight-step-solver-card">
          <div class="solver-header">
            <span class="badge-solver">MANDATORY 8-STEP PROTOCOL</span>
            <h3>${lesson.eightStepProblem.title}</h3>
            <p class="scenario-text"><strong>Scenario:</strong> ${lesson.eightStepProblem.scenario}</p>
          </div>

          <div class="solver-stepper">
            ${lesson.eightStepProblem.steps.map(s => `
              <div class="solver-step-card">
                <div class="step-badge-circle">${s.num}</div>
                <div class="step-info">
                  <h4>Step ${s.num}: ${s.title}</h4>
                  <pre class="step-code-box"><code>${escapeHtml(s.content)}</code></pre>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Fluid Pressure Simulator (for G11 Fluid Mechanics) -->
        <div class="physics-sim-card" id="fluid-sim-section">
          <h3>🌊 Interactive Fluid Pressure Calculator & Depth Simulator</h3>
          <p>Experiment with fluid depth and density to observe how hydrostatic pressure $P = P_0 + \rho g h$ scales in real time.</p>

          <div class="sim-controls-grid">
            <div class="sim-ctrl-item">
              <label>Select Fluid Type:</label>
              <select class="form-select" id="fluid-type-select">
                <option value="1000">Freshwater (ρ = 1,000 kg/m³)</option>
                <option value="1025" selected>Seawater (ρ = 1,025 kg/m³)</option>
                <option value="800">Oil (ρ = 800 kg/m³)</option>
                <option value="13600">Mercury (ρ = 13,600 kg/m³)</option>
              </select>
            </div>

            <div class="sim-ctrl-item">
              <label>Depth (h): <strong id="depth-val-label">50</strong> meters</label>
              <input type="range" class="form-range" id="depth-slider" min="0" max="250" step="5" value="50">
            </div>
          </div>

          <div class="sim-output-box">
            <div class="output-metric">
              <span class="metric-label">Atmospheric Pressure (P₀)</span>
              <span class="metric-val">101.3 kPa (1.00 atm)</span>
            </div>
            <div class="output-metric">
              <span class="metric-label">Gauge Pressure (ρgh)</span>
              <span class="metric-val" id="gauge-pressure-val">502.3 kPa</span>
            </div>
            <div class="output-metric highlight-metric">
              <span class="metric-label">Total Absolute Pressure (P)</span>
              <span class="metric-val" id="total-pressure-val">603.6 kPa (~5.96 atm)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    bindPhysicsEvents(container, lessonKey);
  }

  function bindPhysicsEvents(container, currentKey) {
    const g11Btn = container.querySelector('#btn-phys-g11');
    const g9Btn = container.querySelector('#btn-phys-g9');

    if (g11Btn) {
      g11Btn.addEventListener('click', () => renderPhysicsModule(container, 'physics-g11-fluid-mechanics'));
    }
    if (g9Btn) {
      g9Btn.addEventListener('click', () => renderPhysicsModule(container, 'physics-g9-scientific-inquiry'));
    }

    // Fluid Simulator
    const fluidSelect = container.querySelector('#fluid-type-select');
    const depthSlider = container.querySelector('#depth-slider');
    const depthLabel = container.querySelector('#depth-val-label');
    const gaugeVal = container.querySelector('#gauge-pressure-val');
    const totalVal = container.querySelector('#total-pressure-val');

    function updateSim() {
      if (!fluidSelect || !depthSlider) return;
      const rho = parseFloat(fluidSelect.value);
      const h = parseFloat(depthSlider.value);
      depthLabel.textContent = h;

      const g = 9.80;
      const P0 = 101325; // Pa
      const gaugePa = rho * g * h;
      const totalPa = P0 + gaugePa;

      const gaugeKPa = (gaugePa / 1000).toFixed(1);
      const totalKPa = (totalPa / 1000).toFixed(1);
      const atm = (totalPa / 101325).toFixed(2);

      gaugeVal.textContent = `${gaugeKPa} kPa`;
      totalVal.textContent = `${totalKPa} kPa (~${atm} atm)`;
    }

    if (fluidSelect && depthSlider) {
      fluidSelect.addEventListener('change', updateSim);
      depthSlider.addEventListener('input', updateSim);
      updateSim();
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  return {
    getLessons: () => LESSONS,
    renderPhysicsModule
  };
})();
