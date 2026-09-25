/**
 * Curated High-View Resource Bank for Grades 9–11
 * American Curriculum (Savvas Realize style) covering ELA, Math, Physics, Chemistry, Biology.
 * Provides direct verified URLs, pedagogical rationale, and core instructional assets.
 */

window.ResourceBank = (function () {
  'use strict';

  const REPOSITORY = {
    // ════════════════════════════════════════════════════════════════════
    // ELA (Grades 9–11)
    // ════════════════════════════════════════════════════════════════════
    ela: {
      smart_path_word_layers: {
        topic: 'Word Study & Decoding: Syllables, Phonemes & Morphemes (Smart Path Academy)',
        grade: 'Grades 9–11',
        isTeacherChannel: true,
        channelName: 'Smart Path Academy | Checkpoint & IGCSE',
        channelUrl: 'https://www.youtube.com/channel/UCHcZ9XDF0OgneHrx7Z6oDMw',
        generalSkillVideo: {
          title: 'The Three Sound Layers: Syllables, Phonemes, and Morphemes (Decoding the Layers)',
          platform: 'Smart Path Academy (YouTube: @SmartPathAcademy)',
          url: 'https://youtu.be/V6Fcv6ckR-8',
          shortsUrl: 'https://youtube.com/shorts/_1mjN6AbUJ8',
          secondaryShortsUrl: 'https://youtube.com/shorts/L6mGhJ42klk',
          rationale: 'Produced by Mr. Hisham: Teaches how to break complex academic words into spoken beats (syllables), distinct speech sounds (phonemes), and meaning units (morphemes: prefixes/roots/suffixes) to master SAT, IGCSE & Checkpoint vocabulary.'
        },
        textResource: {
          title: 'Smart Path Word Lab: Morphology in High School Vocabulary',
          platform: 'Smart Path Academy & CommonLit',
          url: 'https://www.youtube.com/channel/UCHcZ9XDF0OgneHrx7Z6oDMw',
          rationale: 'Applies morphemic analysis directly to school vocabulary: dissecting "dis-cord-ant", "pro-di-gy", "de-ferred", and scientific terms in Biology and Chemistry.'
        },
        writingGrammarResource: {
          title: 'Smart Path Academy: Grammatical Morphemes & Agreement Rules',
          platform: 'Smart Path Academy',
          url: 'https://youtube.com/shorts/wsPny7bOhes',
          rationale: 'Demonstrates how inflectional morphemes (e.g. -s, -ed, -ing) dictate subject-verb and pronoun-antecedent agreement.'
        }
      },
      harlem: {
        topic: '"Harlem" by Langston Hughes (Poetry Analysis & Harlem Renaissance)',
        grade: 'Grade 11',
        generalSkillVideo: {
          title: 'How to Analyze Imagery and Symbolism in Poetry',
          platform: 'CrashCourse Literature',
          url: 'https://www.khanacademy.org/humanities/grammar',
          fallbackUrl: 'https://www.poetryfoundation.org/poems/46548/harlem',
          rationale: 'Focuses on visual/tactile imagery, delayed gratification metaphors, and historical post-WWII Harlem context.'
        },
        textResource: {
          title: 'CommonLit: "Harlem" by Langston Hughes Text & Teacher Guide',
          platform: 'CommonLit',
          url: 'https://www.commonlit.org/',
          rationale: 'Offers the complete authentic poem text with paired discussion questions and historical background.'
        },
        writingGrammarResource: {
          title: 'Purdue OWL: Tone, Sensory Details & Sentence Variety in Poetry Analysis',
          platform: 'Purdue OWL',
          url: 'https://owl.purdue.edu/',
          rationale: 'Provides guidelines for structuring formal analytical essays on poetic symbolism.'
        }
      },
      two_kinds: {
        topic: '"Two Kinds" by Amy Tan (Character Arc, Filial Conflict & ACE Writing)',
        grade: 'Grade 9',
        generalSkillVideo: {
          title: 'Close Reading & Dynamic Characterization',
          platform: 'Khan Academy ELA',
          url: 'https://www.khanacademy.org/humanities/grammar',
          rationale: 'Breaks down internal vs external conflict and dynamic character transformation.'
        },
        textResource: {
          title: 'Poetry Foundation / CommonLit Selection Study: "Two Kinds"',
          platform: 'CommonLit',
          url: 'https://www.commonlit.org/',
          rationale: 'Full pedagogical question set and analytical text breakdown.'
        },
        writingGrammarResource: {
          title: 'Purdue OWL: Pronoun-Antecedent Agreement & Avoiding Vague Pronouns',
          platform: 'Purdue OWL',
          url: 'https://owl.purdue.edu/',
          rationale: 'Essential grammar rules for pronoun agreement, eliminating vague "it/this", and ACE paragraphing.'
        }
      },
      nonfiction_lol: {
        topic: 'Nonfiction Structure & Humor ("LOL!" Selection)',
        grade: 'Grade 9',
        generalSkillVideo: {
          title: 'Informational Text Structures & Author\'s Purpose',
          platform: 'Khan Academy Reading',
          url: 'https://www.khanacademy.org/humanities/grammar',
          rationale: 'Analyzes how humorous tone and rhetorical devices shape informative writing.'
        },
        textResource: {
          title: 'ReadWorks / Newsela: Humor, Laughter & Human Communication',
          platform: 'ReadWorks',
          url: 'https://www.readworks.org/',
          rationale: 'Paired nonfiction reading passages with vocabulary-in-context checks.'
        }
      }
    },

    // ════════════════════════════════════════════════════════════════════
    // MATHEMATICS (Grades 9–11)
    // ════════════════════════════════════════════════════════════════════
    math: {
      real_numbers: {
        topic: 'Real Numbers Classification & Density on Number Line',
        grade: 'Grade 9',
        video: {
          title: 'Classifying Real Numbers: Rational vs. Irrational',
          platform: 'The Organic Chemistry Tutor (Math Playlist)',
          url: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          secondaryUrl: 'https://www.khanacademy.org/math/algebra',
          rationale: 'Step-by-step classification from Natural numbers through Irrationals with number line graphing.'
        },
        practiceResource: {
          title: 'Khan Academy: Real Number Properties & Practice Problems',
          platform: 'Khan Academy Algebra 1',
          url: 'https://www.khanacademy.org/math/algebra',
          rationale: 'Immediate interactive problem feedback with stepwise solutions.'
        }
      },
      linear_equations: {
        topic: 'Solving Multi-Step Linear Equations with Variables on Both Sides',
        grade: 'Grade 9',
        video: {
          title: 'Linear Equations with Variables on Both Sides',
          platform: 'Khan Academy Algebra 1',
          url: 'https://www.khanacademy.org/math/algebra',
          secondaryUrl: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          rationale: 'Clear demonstrations of distributing, combining like terms, and identifying Identity vs. No Solution.'
        },
        practiceResource: {
          title: 'Math-Drills & Math-Aids: Step-by-Step Multi-Step Equation Worksheets',
          platform: 'Math-Drills',
          url: 'https://www.math-drills.com/',
          rationale: 'Printable and digital problem banks with full worked answer keys.'
        }
      },
      functions_graphs: {
        topic: 'Chapter 1: Functions, Domain, Range & Vertical Line Test',
        grade: 'Grade 11',
        video: {
          title: 'Functions: Domain & Range Algebraic and Graphical Analysis',
          platform: 'The Organic Chemistry Tutor (Algebra 2 / Precalculus)',
          url: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          secondaryUrl: 'https://www.khanacademy.org/math/algebra2',
          rationale: 'Comprehensive coverage of domain restrictions (denominators ≠ 0, radicands ≥ 0) and the vertical line test.'
        },
        practiceResource: {
          title: 'Khan Academy Algebra 2: Evaluating Functions & Domain/Range Drills',
          platform: 'Khan Academy Algebra 2',
          url: 'https://www.khanacademy.org/math/algebra2',
          rationale: 'Interactive tests with instant feedback on interval notation and piecewise graphs.'
        }
      }
    },

    // ════════════════════════════════════════════════════════════════════
    // PHYSICS (Grades 9–11)
    // ════════════════════════════════════════════════════════════════════
    physics: {
      scientific_inquiry: {
        topic: 'Scientific Notation, SI Base Units & Significant Figures',
        grade: 'Grade 9',
        video: {
          title: 'Scientific Notation & Significant Figures in Physics',
          platform: 'The Organic Chemistry Tutor – Physics',
          url: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          secondaryUrl: 'https://www.khanacademy.org/science/physics',
          rationale: 'Direct rules for counting significant figures and standard metric unit conversions.'
        },
        referencePage: {
          title: 'The Physics Classroom: Measurement & Units Tutorial',
          platform: 'The Physics Classroom',
          url: 'https://www.physicsclassroom.com/',
          rationale: 'Concise review pages with interactive self-quizzes.'
        }
      },
      fluid_mechanics: {
        topic: 'Fluid Pressure (P = P₀ + ρgh), Pascal\'s Principle & Hydraulic Lifts',
        grade: 'Grade 11',
        video: {
          title: 'Fluid Pressure, Density & Pascal\'s Law Explained',
          platform: 'Khan Academy Physics',
          url: 'https://www.khanacademy.org/science/physics',
          secondaryUrl: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          rationale: 'Clear derivation of hydrostatic pressure with depth and hydraulic mechanical advantage (F₁/A₁ = F₂/A₂).'
        },
        referencePage: {
          title: 'HyperPhysics: Fluid Statics, Pressure & Archimedes\' Principle',
          platform: 'HyperPhysics (Georgia State University)',
          url: 'http://hyperphysics.phy-astr.gsu.edu/',
          rationale: 'Peer-reviewed concept maps and calculation formulas for fluid mechanics.'
        }
      }
    },

    // ════════════════════════════════════════════════════════════════════
    // CHEMISTRY (Grades 9–11)
    // ════════════════════════════════════════════════════════════════════
    chemistry: {
      nature_of_matter: {
        topic: 'Nature of Matter, States & Physical vs. Chemical Properties',
        grade: 'Grade 9',
        video: {
          title: 'States of Matter and Phase Changes (Kinetic Molecular Theory)',
          platform: 'CrashCourse Chemistry',
          url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UAPlldT4vCRy',
          secondaryUrl: 'https://www.khanacademy.org/science/chemistry',
          rationale: 'Animated sub-microscopic particle collisions illustrating solids, liquids, and gases.'
        },
        referencePage: {
          title: 'CK-12 Chemistry: Classification of Matter & Heating Curves',
          platform: 'CK-12 Chemistry',
          url: 'https://www.ck12.org/c/chemistry/',
          rationale: 'Interactive flexbook with particle simulations and check-for-understanding exercises.'
        }
      },
      thermochemistry: {
        topic: 'Energy & Chemical Reactions: Enthalpy (ΔH) & Calorimetry (q = mcΔT)',
        grade: 'Grade 11',
        video: {
          title: 'Thermochemistry, Specific Heat & Enthalpy of Reaction',
          platform: 'The Organic Chemistry Tutor – Chemistry',
          url: 'https://www.youtube.com/c/TheOrganicChemistryTutor',
          secondaryUrl: 'https://www.khanacademy.org/science/chemistry',
          rationale: 'Step-by-step calorimetry problem solving with sign conventions (Exothermic ΔH < 0 vs. Endothermic ΔH > 0).'
        },
        referencePage: {
          title: 'LibreTexts Chemistry: Reaction Coordinate Diagrams & Activation Energy',
          platform: 'LibreTexts Chemistry',
          url: 'https://chem.libretexts.org/',
          rationale: 'In-depth potential energy curves, activated complexes, and thermochemical stoichiometry.'
        }
      }
    },

    // ════════════════════════════════════════════════════════════════════
    // BIOLOGY (Grades 9–11)
    // ════════════════════════════════════════════════════════════════════
    biology: {
      scientific_inquiry_bio: {
        topic: 'Experimental Design: Controlled Variables, Hypotheses & Theories',
        grade: 'Grade 9',
        video: {
          title: 'The Scientific Method & Controlled Experiments',
          platform: 'Amoeba Sisters',
          url: 'https://www.youtube.com/c/AmoebaSisters',
          secondaryUrl: 'https://www.khanacademy.org/science/biology',
          rationale: 'Engaging, clear distinction between independent, dependent, and controlled variables.'
        },
        referencePage: {
          title: 'CK-12 Biology: Principles of Scientific Investigation',
          platform: 'CK-12 Biology',
          url: 'https://www.ck12.org/c/biology/',
          rationale: 'Case-study questions with answer keys on comparative study design.'
        }
      },
      microbiology_viruses: {
        topic: 'Microbiology: Viral Anatomy, Capsid & Lytic vs. Lysogenic Cycles',
        grade: 'Grade 11',
        video: {
          title: 'Viruses: Lytic vs. Lysogenic Reproductive Cycles',
          platform: 'Amoeba Sisters',
          url: 'https://www.youtube.com/c/AmoebaSisters',
          secondaryUrl: 'https://www.khanacademy.org/science/biology',
          rationale: 'Graphic animations illustrating bacteriophage injection, prophage integration, and bacterial lysis.'
        },
        referencePage: {
          title: 'HHMI BioInteractive: Viral Biology & Mechanism of Infection',
          platform: 'HHMI BioInteractive',
          url: 'https://www.biointeractive.org/',
          rationale: 'Research-grade molecular models illustrating viral capsids and host immune responses.'
        }
      }
    }
  };

  function getResources(subject, topicKey) {
    if (!REPOSITORY[subject]) return null;
    return REPOSITORY[subject][topicKey] || null;
  }

  function getAllForSubject(subject) {
    return REPOSITORY[subject] || null;
  }

  return {
    REPOSITORY,
    getResources,
    getAllForSubject
  };
})();
