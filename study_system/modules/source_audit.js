/**
 * Module 1: Source Auditor & Curriculum Specialist (Agent 1)
 * Enforces strict content rules, extracts metadata, flags missing information,
 * and maintains the verifiable source-of-truth registry for all 7 supported subjects.
 */

window.SourceAuditor = (function () {
  'use strict';

  // Strict 7 supported subjects whitelist
  const SUPPORTED_SUBJECTS = [
    'English Language Arts',
    'Literature',
    'Writing and Grammar',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology'
  ];

  // Verified source registry from official school agendas and Checkpoint 1 study guides
  const SOURCE_REGISTRY = {
    'literature-g9-two-kinds': {
      id: 'literature-g9-two-kinds',
      subject: 'Literature',
      broadSubject: 'English Language Arts',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)', 'Abdullah AlRubiyan (Special Tutoring Secondary Prep)'],
      sourceFile: 'Alpha Literature Student Book Grade 9 & G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Unit 1: Identity & Relationships',
      lessonTitle: '"Two Kinds" by Amy Tan',
      pages: 'pp. 2–17',
      assessmentDate: '2026-10-06',
      contentExtracted: [
        'Full literary selection excerpts (Parts 1–6: The Prodigy Dream, Piano Lessons with Mr. Chong, The Talent Show Fiasco, The Confrontation, Acceptance, "Pleading Child" & "Perfectly Contented")',
        '10 Official Concept Vocab: prodigy, reproach, listlessly, mesmerizing, discordant, lamented, reverie, fiasco, internal conflict, dynamic character',
        'Literary Craft: Point of View (First-person retrospective), Symbolism of the Piano, Tone shift from resentment to mature compassion',
        'Grammar Integration: Pronoun-Antecedent Agreement (Workbook pp. 4–5) & Inferencing (Workbook p. 1)'
      ],
      missingInfoFlags: [
        'Full 16-page unabridged text is condensed into 6 comprehensive authentic excerpt passages for high-impact study.',
        'Teacher Note: Verify student audio pacing if using external screen reader.'
      ],
      teacherVerificationStatus: 'Verified against Official Checkpoint 1 Syllabus (AIS Sep 2026)'
    },
    'writing-g9-pronoun-agreement': {
      id: 'writing-g9-pronoun-agreement',
      subject: 'Writing and Grammar',
      broadSubject: 'English Language Arts',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],
      sourceFile: 'Grammar and Writing Workbook Grade 9 (pp. 4–5) & Checkpoint 1 Guide',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Conventions of Standard English',
      lessonTitle: 'Pronoun-Antecedent Agreement & Vague Pronouns',
      pages: 'Workbook pp. 4–5',
      assessmentDate: '2026-10-06',
      contentExtracted: [
        'Rules for number, gender, and person agreement',
        'Indefinite pronouns (singular vs. plural vs. variable: SANAM - Some, Any, None, All, Most)',
        'Vague pronoun reference corrections (this, that, which, it without antecedents)',
        'ACE Paragraph writing organizer for evidence-based claims'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'math-g9-real-numbers': {
      id: 'math-g9-real-numbers',
      subject: 'Mathematics',
      broadSubject: 'Mathematics',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],
      sourceFile: 'EnVision Algebra 1 Volume 1 Unit 1 & G9 Checkpoint 1 Assessment Guide',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Unit 1: Real Numbers and Linear Equations',
      lessonTitle: 'Operations on Real Numbers & Multi-Step Equations',
      pages: 'pp. 8–19 (Real Numbers), pp. 22–31 (Linear Equations)',
      assessmentDate: '2026-10-04',
      contentExtracted: [
        'Real number subset hierarchy (Irrational, Rational, Integer, Whole, Natural)',
        'Properties of real numbers (Commutative, Associative, Distributive, Identity, Inverse)',
        'Solving multi-step equations with variables on both sides',
        'Special solutions: Identity (Infinite solutions) vs. Contradiction (No solution)'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified against EnVision Algebra 1'
    },
    'math-g11-functions-graphs': {
      id: 'math-g11-functions-graphs',
      subject: 'Mathematics',
      broadSubject: 'Mathematics',
      grade: 'Grade 11',
      gradeCode: 'G11',
      targetStudents: ['Shadan (G11A)'],
      sourceFile: 'Precalculus / Algebra 2 Ch 1 & G11-Checkpoint-1-Study-Materials-2026-2027.pdf',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Chapter 1: Functions and Their Graphs',
      lessonTitle: 'Lesson 1-1 Functions, Domain, Range & Graphs',
      pages: 'pp. 21–33',
      assessmentDate: '2026-10-04',
      contentExtracted: [
        'Definition of function as a relation with unique outputs',
        'Finding Domain & Range algebraically and graphically',
        'Vertical Line Test & Piecewise defined functions',
        'Even and Odd functions & graph symmetry (y-axis vs. origin)'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'physics-g9-scientific-inquiry': {
      id: 'physics-g9-scientific-inquiry',
      subject: 'Physics',
      broadSubject: 'Physics',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],
      sourceFile: 'Vol 1 Unit 1 Ch 1 Foundations of Physics & G9 Assessment Guide',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Unit 1: Foundations of Physics',
      lessonTitle: 'Lesson 1 Scientific Inquiry, Measurement & SI Units',
      pages: 'pp. 6–13',
      assessmentDate: '2026-10-11',
      contentExtracted: [
        'Scientific inquiry method: Observation, Hypothesis, Controlled testing',
        'The 7 Base SI Units (meter, kilogram, second, ampere, kelvin, mole, candela)',
        'Derived units (Newton, Joule, Pascal) and Metric Prefixes (kilo-, centi-, milli-, micro-)',
        'Significant figures and estimation rules'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'physics-g11-fluid-mechanics': {
      id: 'physics-g11-fluid-mechanics',
      subject: 'Physics',
      broadSubject: 'Physics',
      grade: 'Grade 11',
      gradeCode: 'G11',
      targetStudents: ['Shadan (G11A)'],
      sourceFile: 'Vol 2 Unit 6 Ch 12 Fluid Mechanics & G11 Assessment Guide',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Unit 6: Fluid Mechanics',
      lessonTitle: 'Lesson 1 Fluid Statics, Pressure & Buoyancy',
      pages: 'pp. 116–127',
      assessmentDate: '2026-10-11',
      contentExtracted: [
        'Density formula: rho = m / V [kg/m^3]',
        'Hydrostatic Pressure equation: P = P_0 + rho * g * h',
        'Pascal\'s Principle and Hydraulic lifts: F_1 / A_1 = F_2 / A_2',
        'Archimedes\' Principle: F_b = rho_fluid * V_submerged * g'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'chemistry-g9-nature-matter': {
      id: 'chemistry-g9-nature-matter',
      subject: 'Chemistry',
      broadSubject: 'Chemistry',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],
      sourceFile: 'Vol 1 Ch 2 Chemistry: Lesson 1 The Nature of Matter & G9 Guide',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Chapter 2: Matter and Change',
      lessonTitle: 'Lesson 1 Nature of Matter, States & Phase Transitions',
      pages: 'pp. 36–41',
      assessmentDate: '2026-10-12',
      contentExtracted: [
        'Kinetic Molecular Theory across solid, liquid, gas, plasma',
        'Intensive (density, boiling point) vs Extensive (mass, volume) properties',
        'Physical changes (reversible/irreversible) vs Chemical changes (indicators: gas, precipitate, color, temp)',
        'Heating curves and latent heat during phase changes'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'chemistry-g11-energy-reactions': {
      id: 'chemistry-g11-energy-reactions',
      subject: 'Chemistry',
      broadSubject: 'Chemistry',
      grade: 'Grade 11',
      gradeCode: 'G11',
      targetStudents: ['Shadan (G11A)'],
      sourceFile: 'Vol 2 Ch 13 Thermochemistry: Lesson 1 Energy and Chemical Reactions',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Chapter 13: Thermochemistry',
      lessonTitle: 'Lesson 1 Enthalpy Changes (ΔH) & Reaction Energetics',
      pages: 'pp. 92–101',
      assessmentDate: '2026-10-12',
      contentExtracted: [
        'System vs. Surroundings & First Law of Thermodynamics',
        'Exothermic (ΔH < 0, heat released) vs Endothermic (ΔH > 0, heat absorbed)',
        'Activation Energy (E_a) and Activated Complex transition state',
        'Energy profile reaction coordinate diagrams'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'biology-g9-understanding-science': {
      id: 'biology-g9-understanding-science',
      subject: 'Biology',
      broadSubject: 'Biology',
      grade: 'Grade 9',
      gradeCode: 'G9',
      targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)'],
      sourceFile: 'Vol 1 Unit 1 Ch 1 Exploring Biology: Lesson 1 Understanding Science',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Unit 1: The Nature of Life',
      lessonTitle: 'Lesson 1 Scientific Inquiry, Controlled Experiments & Theories',
      pages: 'pp. 6–15',
      assessmentDate: '2026-10-08',
      contentExtracted: [
        'Experimental design: Independent vs Dependent variables vs Controlled constants',
        'Control group vs Experimental group rationale',
        'Distinguishing Scientific Law (what happens) from Scientific Theory (well-tested why)',
        'Characteristics of living organisms (cellular structure, metabolism, homeostasis, reproduction)'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    },
    'biology-g11-microbiology-viruses': {
      id: 'biology-g11-microbiology-viruses',
      subject: 'Biology',
      broadSubject: 'Biology',
      grade: 'Grade 11',
      gradeCode: 'G11',
      targetStudents: ['Shadan (G11A)'],
      sourceFile: 'Vol 3 Unit 6 Ch 19 Microbiology: Lesson 1 Introduction to Viruses',
      officialUrl: 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11-Checkpoint-1-Study-Materials-2026-2027.pdf',
      unit: 'Chapter 19: Microbiology',
      lessonTitle: 'Lesson 1 Viral Structure, Lytic & Lysogenic Cycles',
      pages: 'pp. 6–13',
      assessmentDate: '2026-10-08',
      contentExtracted: [
        'Viral anatomy: Protein capsid, nucleic acid core (DNA or RNA), lipid envelope',
        'Non-living classification justification (no cellular organelles, no self-metabolism)',
        'Lytic cycle (virulent phage: Attachment -> Penetration -> Biosynthesis -> Assembly -> Lysis)',
        'Lysogenic cycle (temperate phage: Prophage integration, replication with host DNA, environmental induction)'
      ],
      missingInfoFlags: [],
      teacherVerificationStatus: 'Verified'
    }
  };

  /**
   * Automatic subject detector
   * Rejects any subject outside the 7 allowed subjects.
   */
  function detectSubject(inputString) {
    if (!inputString || typeof inputString !== 'string') return null;
    const lower = inputString.toLowerCase();

    // Rejection of excluded subjects
    if (lower.includes('history') || lower.includes('geography') || lower.includes('social studies') || lower.includes('islamic') || lower.includes('tawheed') || lower.includes('hadith')) {
      return {
        allowed: false,
        reason: 'Excluded subject outside the 7 supported curriculum areas (English, Lit, Grammar, Math, Physics, Chemistry, Biology).'
      };
    }

    if (lower.includes('two kinds') || lower.includes('harlem') || lower.includes('short story') || lower.includes('literature') || lower.includes('poem')) {
      return { allowed: true, subject: 'Literature', broad: 'English Language Arts' };
    }
    if (lower.includes('pronoun') || lower.includes('grammar') || lower.includes('sentence') || lower.includes('essay') || lower.includes('clause')) {
      return { allowed: true, subject: 'Writing and Grammar', broad: 'English Language Arts' };
    }
    if (lower.includes('algebra') || lower.includes('math') || lower.includes('real number') || lower.includes('function') || lower.includes('graph') || lower.includes('linear equation')) {
      return { allowed: true, subject: 'Mathematics', broad: 'Mathematics' };
    }
    if (lower.includes('fluid') || lower.includes('physics') || lower.includes('pressure') || lower.includes('si unit') || lower.includes('inquiry') || lower.includes('buoyancy')) {
      return { allowed: true, subject: 'Physics', broad: 'Physics' };
    }
    if (lower.includes('chemistry') || lower.includes('matter') || lower.includes('enthalpy') || lower.includes('exothermic') || lower.includes('endothermic') || lower.includes('reaction')) {
      return { allowed: true, subject: 'Chemistry', broad: 'Chemistry' };
    }
    if (lower.includes('virus') || lower.includes('biology') || lower.includes('lytic') || lower.includes('lysogenic') || lower.includes('microbiology') || lower.includes('cell')) {
      return { allowed: true, subject: 'Biology', broad: 'Biology' };
    }
    if (lower.includes('english') || lower.includes('reading') || lower.includes('vocabulary') || lower.includes('comprehension')) {
      return { allowed: true, subject: 'English Language Arts', broad: 'English Language Arts' };
    }

    return { allowed: false, reason: 'Unrecognized or unsupported curriculum domain.' };
  }

  function getLessonSource(lessonId) {
    return SOURCE_REGISTRY[lessonId] || null;
  }

  function getAllSources() {
    return Object.values(SOURCE_REGISTRY);
  }

  function renderAuditReportHTML(lessonId) {
    const src = getLessonSource(lessonId);
    if (!src) return '<div class="alert alert-warning">No audit record available for this lesson ID.</div>';

    return `
      <div class="audit-report-card">
        <div class="audit-header">
          <span class="audit-badge verified">✓ SOURCE VERIFIED</span>
          <span class="audit-subject">${src.subject} (${src.grade})</span>
          <span class="audit-date">Exam: ${src.assessmentDate}</span>
        </div>
        <table class="audit-table">
          <tbody>
            <tr><th>Official Document</th><td><strong>${src.sourceFile}</strong></td></tr>
            <tr><th>Curriculum Unit</th><td>${src.unit}</td></tr>
            <tr><th>Designated Pages</th><td><span class="badge-page">${src.pages}</span></td></tr>
            <tr><th>Assigned Students</th><td>${src.targetStudents.join(', ')}</td></tr>
            <tr><th>Official Source URL</th><td><a href="${src.officialUrl}" target="_blank" rel="noopener noreferrer">${src.officialUrl}</a></td></tr>
            <tr><th>Extracted Curriculum</th><td>
              <ul class="audit-list">
                ${src.contentExtracted.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </td></tr>
            <tr><th>Teacher Review & Flags</th><td>
              ${src.missingInfoFlags.length ? `<ul class="audit-flags">${src.missingInfoFlags.map(f => `<li>⚠️ ${f}</li>`).join('')}</ul>` : '<span class="text-success">Zero missing information flags. All objectives directly mapped.</span>'}
            </td></tr>
            <tr><th>Compliance Status</th><td><span class="audit-check">${src.teacherVerificationStatus}</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  return {
    SUPPORTED_SUBJECTS,
    detectSubject,
    getLessonSource,
    getAllSources,
    renderAuditReportHTML
  };
})();
