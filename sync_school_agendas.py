#!/usr/bin/env python3
"""
Arab International Schools Weekly Agenda Scraper & Curriculum Synchronizer
Fetches weekly agendas from https://arabschools.edu.sa/agenda/
Targets:
  - Shadan: Grade 11A Girls (G11A)
  - Elyana: Grade 9A Girls (G9A)
  - Talal & Nawaf: Grade 9B Boys (G9B)
Subjects:
  - ELA (English Language Arts / Literature)
  - Math (Algebra / Geometry / Calculus)
  - Physics
  - Chemistry
  - Biology

Academic Year 2026/2027 Calendar:
  - Week 7: Sunday, October 11, 2026 – Thursday, October 15, 2026 (Latest Live Week)
  - Week 6: Sunday, October 04, 2026 – Thursday, October 08, 2026
  - Week 5: Sunday, September 27, 2026 – Thursday, October 01, 2026
  - Week 4: Sunday, September 20, 2026 – Thursday, September 24, 2026 (Saudi National Day Holiday)
  - Week 3: Sunday, September 13, 2026 – Thursday, September 17, 2026
  - Week 2: Sunday, September 06, 2026 – Thursday, September 10, 2026
"""

import urllib.request
import re
import json
import io
import sys
import ssl
from datetime import datetime

USE_PYMUPDF = False
try:
    import pymupdf as fitz
    USE_PYMUPDF = True
except ImportError:
    try:
        import pypdf
    except ImportError:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
        import pypdf

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

TARGET_SUBJECTS = ['ELA', 'Math', 'Physics', 'Chemistry', 'Biology']

OFFICIAL_PDF_URLS = {
    'w7': {
        'name': 'Week 7 (Oct 11 - Oct 15, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G11A_Weekly_Agenda-T1-Week-7.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G9A_Weekly_Agenda-T1-Week-7.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G9B_Weekly_Agenda-1.pdf'
    },
    'w6': {
        'name': 'Week 6 (Oct 04 - Oct 08, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G11A_Weekly_Agenda-T1-Week-6.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G9A_Weekly_Agenda-T1-Week-6.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/10/G9B_Weekly_Agenda.pdf'
    },
    'w5': {
        'name': 'Week 5 (Sep 27 - Oct 01, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11A_Weekly_Agenda-T1-Week-5.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9A_Weekly_Agenda-T1-Week-5.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9B_Weekly_Agenda-1.pdf'
    },
    'w4': {
        'name': 'Week 4 (Sep 20 - Sep 24, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G11A_Weekly_Agenda-T1-W4.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9A_Weekly_Agenda-T1-W4.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9B_Weekly_Agenda.pdf'
    },
    'w3': {
        'name': 'Week 3 (Sep 13 - Sep 17, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/Grade_11A_Weekly_Agenda_T1-Week-3.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/Grade_9A_Weekly_Agenda_T1-Week-3.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9B-T1-Week-3-Weekly-Agenda.pdf'
    },
    'w2': {
        'name': 'Week 2 (Sep 06 - Sep 10, 2026)',
        'G11A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/Grade_11A_Weekly_Agenda_T1-Week-2.pdf',
        'G9A': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/Grade_9A_Weekly_Agenda_T1-Week-2.pdf',
        'G9B': 'https://arabschools.edu.sa/wp-content/uploads/2026/09/G9B-T1-Week-2-Weekly-Agenda-1.pdf'
    }
}

CURATED_WEEK_DATA = {
    'w7': {
        'shadan': {
            'ELA': [
                'Unit 1: "Artificial Intelligence? I\'ll Say: Why Computers Can\'t Joke" (SE pp. 16-21)',
                'Vocabulary in Context: ontology, humbled, unorthodox, endeavor, malignancy, brute-force, interpretation, singularly, computational, inhuman',
                'Craft & Structure: Extended Metaphor and Tone Analysis (Worksheet)',
                'Conventions: Hyphens and Dashes Application',
                'Writing: Finding the Story — Reflective Essay Revision (present moment → memory → return)',
                'Novel Study: "The Old Man and the Sea" by Ernest Hemingway (Perseverance & Man vs Nature)'
            ],
            'Math': [
                'Unit 1 Functions 1.3: Trigonometric Functions & Identities (Cosine Law, trigonometric identities) (pp. 47-49)',
                'Unit 2 Limits and Continuity 2.1: Rates of Change and Tangent Lines of Curves (pp. 72-79)',
                'Average vs Instantaneous Rates, Secant & Tangent Lines, Gradients of Curves'
            ],
            'Physics': [
                'Chapter 12 Lesson 2: Forces in Liquids — Buoyancy Investigation (pp. 138-141)',
                'Chapter 12 Lesson 3: Fluid Behavior at Rest (pp. 142-147)',
                'Checkpoint Assessment 1 (Sun Oct 11, 8:00-8:40 AM)'
            ],
            'Chemistry': [
                'Chapter 13 Lesson 2: Heat Transfer and Calorimetry (pp. 106-109)',
                'Calorimetric Calculations & Progress Check 4 (p. 108)',
                'Checkpoint Assessment 1 (Mon Oct 12, 8:00-8:40 AM)'
            ],
            'Biology': [
                'Volume 3 Unit 6 Chapter 19 Lesson 3: Classifying Living Things (pp. 20-25)',
                'Taxonomic Hierarchy: Domains (Eukarya), Kingdoms, Phylum, Genus, Species'
            ]
        },
        'elyana': {
            'ELA': [
                'Pre-Reading & First Read: "Stories My Father Told Me" (SE pp. 32-41, WB p. 18)',
                'Selection Vocabulary: adjacent, compassion, inclement, prefaced, bargain, harvest, indirect, ultimately, medium, moral',
                'Grammar: Dependent and Independent Clauses (PPT)',
                'Writing Workshop: Narrative Essay Continues (Draft completion)'
            ],
            'Math': [
                'Lesson 2-3: Linear Equations: Standard Form (Algebra Volume 1 pp. 132-142)',
                'Graphing Linear Equations using Intercepts (Workbook pp. 31-32)'
            ],
            'Physics': [
                'Chapter 1 Lesson 2 & 3: Working with Scientific Notation, Units, Accuracy, Precision, and Significant Figures (pp. 24-29)',
                'SI Prefixes & Measurement Error Analysis'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 3: Simple Substances, Compounds, and Mixtures (pp. 48-53)',
                'Homogeneous vs Heterogeneous Mixtures & Progress Check 2 (p. 53)'
            ],
            'Biology': [
                'Volume 1 Unit 1 Lesson 2: The Role of Science in Society (pp. 20-21)',
                'Societal Decisions, Ethics in Science & Scientific Evidence'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Pre-Reading & First Read: "Stories My Father Told Me" (SE pp. 32-41, WB p. 18)',
                'Selection Vocabulary: adjacent, compassion, inclement, prefaced, bargain, harvest, indirect, ultimately, medium, moral',
                'Grammar: Dependent and Independent Clauses',
                'Narrative Writing Workshop: Revising Structure & Character Voice'
            ],
            'Math': [
                'Lesson 2-3: Linear Equations: Standard Form (Algebra Volume 1 pp. 132-142, WB pp. 31-32)',
                'Lesson 2-4: Equations of Parallel and Perpendicular Lines (Algebra Volume 1 pp. 144-155, WB pp. 34-35)'
            ],
            'Physics': [
                'Volume 1 Unit 1 Chapter 1 Lesson 5: Managing Measurement Uncertainty and Data Visualization (pp. 30-40)',
                'Graphs, Error Margins & Progress Check #1 & #2 (p. 35)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 3 (Vol 1): Simple Substances, Compounds, and Mixtures (pp. 48-53)',
                'Pure Substances vs Mixtures & Progress Check 1 (p. 50)'
            ],
            'Biology': [
                'Volume 1 Unit 1 Chapter 1 Lesson 3: Patterns in Nature (pp. 28-34)',
                'Cell Theory, Genetic Diversity & Progress Check 1 (p. 29)'
            ]
        }
    },
    'w6': {
        'shadan': {
            'ELA': [
                'Unit 1 "Harlem" by Langston Hughes Review & Reflective Narrative Writing Workshop',
                'Craft & Structure: Imagery, Metaphor & Symbolism in Harlem Renaissance Poetry',
                'Novel Study: "The Old Man and the Sea" Theme Analysis'
            ],
            'Math': [
                'Unit 1 Functions 1.2: Combining Functions – Shifting and Scaling Graphs (pp. 34-40)',
                'Vertical & Horizontal Shifts, Reflection & Compression',
                'Checkpoint Assessment 1 Prep & Review'
            ],
            'Physics': [
                'Revision: Chapter 12 Lesson 1 Fluid Mechanics (Pascal\'s Principle)',
                'Lesson 2: Forces and Interactions in Liquids (pp. 128-137)'
            ],
            'Chemistry': [
                'Chapter 13 Lesson 1: Energy and Chemical Change (pp. 96-101)',
                'Enthalpy, Thermochemical Equations & Calorimetry Foundations'
            ],
            'Biology': [
                'Volume 3 Unit 6 Chapter 19 Lesson 2: Types of Viruses (pp. 14-17)',
                'Lesson 3: Classifying Living Things (pp. 18-20, Lesson Check)'
            ]
        },
        'elyana': {
            'ELA': [
                'Pre-Reading: "Parents, Teens, and Technology" (SE pp. 26-27)',
                'Grammar Application: Clear Pronoun Reference & Vague Pronouns (WB pp. 12-13)',
                'Narrative Writing Workshop: Short Story Draft Revision (WB pp. 14-15)'
            ],
            'Math': [
                'Lesson 2-1: Understanding and Using Slope-Intercept Form (Algebra Volume 1 pp. 106-115)',
                'Lesson 2-2: Linear Equations: Point-Slope Form (Algebra Volume 1 pp. 118-129, WB p. 28)'
            ],
            'Physics': [
                'Chapter 1 Lesson 3: Accuracy, Precision, Calibration, and Significant Figures (pp. 24-29)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1: The Nature of Matter - Revision & Practice Sheet',
                'Chapter 2 Lesson 2: Properties of Matter and Changes'
            ],
            'Biology': [
                'Volume 1 Unit 1 Lesson 2: The Role of Science in Society (pp. 17-21, Progress Check 1)'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Pre-Reading: "Parents, Teens, and Technology" (SE pp. 26-27)',
                'Vocabulary Strategy: Denotation and Connotation (WB p. 11)',
                'Grammar Application: Clear Pronoun Reference (WB pp. 12-13)',
                'Close Reading: Comparing Texts (Parent-Teen Communication & Technology) (SE pp. 18-31)',
                'Writing Workshop 1 & 2: Revising Short Story, Conflict & Character Voice (WB pp. 14-15)'
            ],
            'Math': [
                'Lesson 2-1: Understanding and Using Slope-Intercept Form (Algebra Volume 1 pp. 106-115, WB p. 25)',
                'Lesson 2-2: Linear Equations: Point-Slope Form (Algebra Volume 1 pp. 118-129, WB p. 28)'
            ],
            'Physics': [
                'Volume 1 Chapter 1 Lesson 3: Accuracy and Precision (pp. 24-29, Progress Check #1 & #2)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 2 (Vol 1): Properties of Matter & Changes (pp. 44-47)',
                'Checkpoint 1 Revision: Nature of Matter'
            ],
            'Biology': [
                'Volume 1 Unit 1 Lesson 2: The Role of Science in Society (pp. 17-21, Progress Check 1)'
            ]
        }
    },
    'w5': {
        'shadan': {
            'ELA': [
                'Unit 1: "Harlem" by Langston Hughes (Essential Question: What makes human life valuable?)',
                'Vocabulary in Context: segregation, aspiration, benevolence, disillusioned, futile, indignation, oppression',
                'Craft & Structure: Imagery, Metaphor & Symbolism in Poetry',
                'Revision: Unit 1 "Harlem" & Reflective Narrative Writing Workshop'
            ],
            'Math': [
                'Unit 1 Functions 1.2: Combining Functions – Shifting and Scaling Graphs (pp. 34-40)',
                'Checkpoint Assessment 1 Revision & Practice'
            ],
            'Physics': [
                'Chapter 12 Lesson 2: Forces & Interactions in Fluids (pp. 128-130, 133-134)',
                'Fluid Pressure, Density & Buoyant Forces'
            ],
            'Chemistry': [
                'Chapter 13 Lesson 2: Heat Transfer and Calorimetry (pp. 102-105)',
                'Specific Heat Capacity & Calorimetric Calculations'
            ],
            'Biology': [
                'Volume 3 Unit 6 Chapter 19 Lesson 2: Types of Viruses & Virus-Targeting Vaccines (pp. 14-17)',
                'Viral Reproduction, Host-Cell Interaction & Immunity'
            ]
        },
        'elyana': {
            'ELA': [
                'Selection Vocabulary: Target Words from "LOL!" and Paired Informational Text (WB p. 10)',
                'Grammar: Correcting Vague Pronouns & Supplying Clear Antecedents (WB pp. 12-13)',
                'First Read & Close Read: "LOL!" (Personal Essay, Humor & Generation Gap) (SE pp. 18-25)',
                'Writing Workshop 1: Planning an Original Generation-Gap Short Story (WB p. 14)',
                'Reading Skill Recap: Making Inferences & Vocabulary Recap ("Two Kinds")'
            ],
            'Math': [
                'Lesson 1-3: Solving Linear Equations with Variables on Both Sides (Algebra V1 pp. 36-41)',
                'Lesson 1-5: Methods to Solve Algebraic Inequalities (Algebra V1 pp. 58-60)',
                'Checkpoint 1 Revision: Lesson 1-1 Operations on Real Numbers (pp. 8-19)',
                'Checkpoint 1 Revision: Lesson 1-2 Solving Linear Equations (pp. 22-31)'
            ],
            'Physics': [
                'Chapter 1 Lesson 2: Working with Scientific Notation and SI Measurement Units (pp. 20-23)',
                'Metric Prefixes, Measurement Precision & Conversion'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 2: Properties of Matter and Changes (pp. 42-46)',
                'Physical vs Chemical Changes & Progress Check 1'
            ],
            'Biology': [
                'Revision Volume 1 Unit 1 Lesson 1: Understanding Science & The Role of Science in Society (pp. 6-19)',
                'Core Terminology: Biodiversity, Bioremediation, Ecosystem Dynamics'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Pre-Reading & First Read: "LOL!" (Personal Essay, Texting & Social Interactions) (SE pp. 18-25)',
                'Selection Vocabulary Practice: absorb, accelerated, adolescents, autonomy, mortality, prevalence (WB p. 10)',
                'Grammar: Identifying and Correcting Vague Pronouns (WB pp. 12-13)',
                'Close Reading: Making Textual Inferences & Author Purpose',
                'Writing Workshops 1 & 2: Short Story Planning, Character Voice & Arc'
            ],
            'Math': [
                'Lesson 1-4: Comparing & Ordering Real Numbers (Algebra V1 pp. 47-52)',
                'Checkpoint 1 Revision: Lesson 1-1 Operations on Real Numbers (pp. 8-19)',
                'Checkpoint 1 Revision: Lesson 1-2 Solving Linear Equations (pp. 22-31)'
            ],
            'Physics': [
                'Volume 1 Unit 1 Chapter 1 Lesson 2: Working with Scientific Notation and SI Units (p. 16)',
                'Revision: 1.1 Scientific Inquiry, Hypotheses & Experimental Design'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1 (V1): The Nature of Matter & Molecular Motion (pp. 40-41)',
                'Chapter 2 Lesson 2 (V1): Properties of Matter & Physical/Chemical Changes (pp. 42-43)'
            ],
            'Biology': [
                'Revision Volume 1 Unit 1 Lesson 1: Understanding Science & Scientific Inquiry (pp. 6-15)',
                'Ecosystem Dynamics: Understanding Biodiversity & Bioremediation'
            ]
        }
    },
    'w4': {
        'shadan': {
            'ELA': [
                'SAT English Preparation: Central Ideas & Supporting Details Analysis',
                'Novel Study: "The Old Man and the Sea" by Ernest Hemingway (Themes of Perseverance & Man vs Nature)',
                'SAT English Preparation: Words in Context High-Yield Vocabulary Strategy',
                'SAT English Preparation: Text Structure, Purpose & Cross-Text Connections'
            ],
            'Math': [
                'Unit 1 Functions 1.1: Functions and Their Graphs (Algebra V1 pp. 24-31)',
                'Domain, Range, Increasing/Decreasing Intervals & Vertical Line Test'
            ],
            'Physics': [
                'Chapter 12 Lesson 1: Fluid Mechanics – Pascal\'s Principle & Hydraulic Lift Systems (pp. 120-125)'
            ],
            'Chemistry': [
                'Chapter 13 Lesson 1: Energy and Chemical Reactions (pp. 96-100)',
                'Exothermic & Endothermic Processes, Bond Energy & Progress Check 4'
            ],
            'Biology': [
                'Volume 3 Unit 6 Chapter 19 Lesson 2: Types of Viruses & Virus-Targeting Vaccines (pp. 14-16)',
                'DNA/RNA Viral Structures, Hepatitis, Influenza & Vaccine Mechanisms'
            ]
        },
        'elyana': {
            'ELA': [
                'Close Read: "Two Kinds" by Amy Tan — Making Inferences & Textual Evidence',
                'Vocabulary Strategy: Slang & Informal Idioms in Dialogue',
                'Grammar: Pronoun-Antecedent Agreement Practice',
                'Writing Workshop: Narrative Arc & Character Motivation'
            ],
            'Math': [
                'Lesson 1-2: Solving Linear Equations (Algebra V1 pp. 25-27)',
                'Lesson 1-3: Solving Linear Equations with Variables on Both Sides (pp. 34-36)'
            ],
            'Physics': [
                'Chapter 1 Lesson 1: Scientific Inquiry and Experimental Design',
                'Controlled Experiments, Variables & Data Collection'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 2: Properties of Matter and Changes (pp. 42-46)'
            ],
            'Biology': [
                'Volume 1 Unit 1: Living Systems & Scientific Observation'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Close Read: "Two Kinds" by Amy Tan — Inferences, Culture & Conflict',
                'Vocabulary Strategy: Slang in Dialogue & Context Clues',
                'Grammar: Pronoun Agreement Drills',
                'Writing Workshop: Narrative Character Development'
            ],
            'Math': [
                'Lesson 1-2: Solving Linear Equations (Algebra V1 pp. 25-27)',
                'Lesson 1-3: Solving Linear Equations with Variables on Both Sides (pp. 34-36)'
            ],
            'Physics': [
                'Volume 1 Unit 1 Chapter 1 Lesson 2: Scientific Notation & Unit Conversion (p. 21)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1 (V1): The Nature of Matter (pp. 40-41)'
            ],
            'Biology': [
                'Unit 1: Biological Inquiry & Scientific Observations'
            ]
        }
    },
    'w3': {
        'shadan': {
            'ELA': [
                'SAT Reading Comprehension Practice: Core Themes & Evidence',
                'SAT Vocabulary in Context Drills',
                'Craft & Rhetorical Structure Analysis',
                'SAT Writing & Language Conventions Practice'
            ],
            'Math': [
                'Unit 1 Functions 1.1: Functions and Their Graphs Review (pp. 24-32)',
                'Function Notation & Graphical Transformations'
            ],
            'Physics': [
                'Chapter 12 Lesson 1: Fluid Mechanics – Density, Pressure & Buoyancy (pp. 114-120)'
            ],
            'Chemistry': [
                'Chapter 13 Lesson 1: Energy and Chemical Bonds (pp. 92-96)',
                'Chemical Potential Energy & Molecular Stability'
            ],
            'Biology': [
                'Volume 3 Unit 5 Chapter 16 Lesson 1: Introduction to Viruses (pp. 6-10)'
            ]
        },
        'elyana': {
            'ELA': [
                'Pre-Reading: "Two Kinds" by Amy Tan — Motifs & Family Expectations',
                'Vocabulary 1: Story Words in Literary Context (6 Target Words)',
                'Vocabulary 2: Literary Terms & Figurative Language Analysis',
                'Reading 1 & 2: Motivation, Conflict, Communication & Universal Themes'
            ],
            'Math': [
                'Lesson 1-1: Operations on Real Numbers (Algebra V1 pp. 6-19)',
                'Lesson 1-2: Solving Linear Equations (pp. 20-22)'
            ],
            'Physics': [
                'Chapter 1 Lesson 1: Scientific Inquiry, Observations & Hypotheses (pp. 12-16)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1: Introduction to Matter & Particles (pp. 36-40)'
            ],
            'Biology': [
                'Volume 1 Unit 1 Lesson 1: What is Life? Characteristics of Living Organisms (pp. 6-12)'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Pre-Reading: "Two Kinds" by Amy Tan — Background, Author Perspective & Key Motifs',
                'Selection Vocabulary: Target Words & Meaning in Context',
                'Reading 1: Character Conflict & Prodigy Expectations',
                'Reading 2: Dialogue Analysis & Literary Themes'
            ],
            'Math': [
                'Lesson 1-1: Operations on Real Numbers & Order of Operations (pp. 6-18)',
                'Lesson 1-2: Solving Linear Equations (pp. 20-24)'
            ],
            'Physics': [
                'Volume 1 Unit 1 Chapter 1 Lesson 1: Scientific Methods & Variables in Physics (pp. 12-16)'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1 (V1): Matter Classification & States of Matter (pp. 36-39)'
            ],
            'Biology': [
                'Volume 1 Unit 1 Lesson 1: Scientific Observations in Natural Systems (pp. 6-12)'
            ]
        }
    },
    'w2': {
        'shadan': {
            'ELA': [
                'Diagnostic Assessment & Syllabus Introduction',
                'Advanced Vocabulary Development: Diagnostic Word Assessment',
                'Literary Elements in American Literature',
                'Foundations of Reflective and Analytical Writing'
            ],
            'Math': [
                'Diagnostic Pre-Test: Functions & Pre-Calculus Foundations',
                'Review of Algebra II Essentials: Quadratic Relations & Graphs'
            ],
            'Physics': [
                'Syllabus Orientation & Laboratory Safety in Physics',
                'Math Tools for Physics: Dimensional Analysis & Units'
            ],
            'Chemistry': [
                'Laboratory Safety Rules & Chemical Hazard Symbols',
                'Review of General Chemistry: Atoms, Elements & the Periodic Table'
            ],
            'Biology': [
                'Overview of Biology Volume 3 & Term 1 Learning Roadmaps',
                'Lab Procedures, Microscopes & Safe Inquiry'
            ]
        },
        'elyana': {
            'ELA': [
                'Introduction to Grade 9 Literature & Syllabus Overview',
                'Diagnostic Reading Assessment: Fiction & Nonfiction Passages',
                'Vocabulary Foundations: Greek and Latin Roots',
                'Sentence Architecture: Clauses & Run-on Corrections'
            ],
            'Math': [
                'Algebra Volume 1 Orientation & Prerequisite Skills Evaluation',
                'Real Number System Hierarchy: Rational vs Irrational Numbers'
            ],
            'Physics': [
                'Orientation to Physical Science & Lab Safety Protocols',
                'Scientific Measurement Tools: Metric System & SI Units'
            ],
            'Chemistry': [
                'Orientation to Chemistry & Lab Safety Regulations',
                'Physical vs Chemical Properties Baseline Assessment'
            ],
            'Biology': [
                'Biology Course Scope & Laboratory Expectations',
                'Scientific Method: Asking Questions & Hypotheses'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Course Launch & Grade 9 ELA Expectations',
                'Baseline Reading Comprehension Evaluation',
                'Context Clues Strategies & Core Vocabulary Expansion',
                'Effective Note-Taking & Reader Response Protocols'
            ],
            'Math': [
                'Grade 9 Algebra Diagnostic Check: Equations & Arithmetic',
                'Properties of Real Numbers: Commutative, Associative & Distributive Laws'
            ],
            'Physics': [
                'Safety in the Physics Lab & Working with Equipment',
                'Measurement Precision: Rulers, Calipers & Balances'
            ],
            'Chemistry': [
                'Safety Guidelines & Protective Equipment in Chemistry',
                'Introduction to the Particle Model of Matter'
            ],
            'Biology': [
                'Living World Exploration: Safety, Curiosity & Inquiry',
                'Designing Simple Experiments & Data Tables'
            ]
        }
    }
}

def parse_pdf_agenda(pdf_url):
    """Downloads and extracts subject text from an Arab International Schools agenda PDF."""
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = urllib.request.Request(pdf_url, headers=HEADERS)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            if USE_PYMUPDF:
                doc = fitz.open(stream=data, filetype='pdf')
                text = ""
                for page in doc:
                    text += page.get_text() + "\n"
                return {'extracted_len': len(text)}
    except Exception as e:
        print(f"  Note: Live fetch for {pdf_url}: {e}")
    return {}

def main():
    print("=" * 70)
    print("Arab International Schools Weekly Agenda Synchronizer")
    print("Target: Week 7 (Oct 11 - Oct 15, 2026) + Historical Weeks 2-6")
    print("=" * 70)

    sync_payload = {
        'last_synced': datetime.now().isoformat(),
        'school': 'Arab International Schools (arabschools.edu.sa)',
        'latest_week': 'Week 7 (Oct 11 - Oct 15, 2026)',
        'weeks': {
            'latest': {
                'name': 'Week 7 (Oct 11 - Oct 15, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w7']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w7']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w7']['talal_nawaf']
                }
            },
            'w7': {
                'name': 'Week 7 (Oct 11 - Oct 15, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w7']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w7']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w7']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w7']['talal_nawaf']
                }
            },
            'w6': {
                'name': 'Week 6 (Oct 04 - Oct 08, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w6']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w6']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w6']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w6']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w6']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w6']['talal_nawaf']
                }
            },
            'w5': {
                'name': 'Week 5 (Sep 27 - Oct 01, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w5']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w5']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w5']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w5']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w5']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w5']['talal_nawaf']
                }
            },
            'w4': {
                'name': 'Week 4 (Sep 20 - Sep 24, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w4']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w4']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w4']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w4']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w4']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w4']['talal_nawaf']
                }
            },
            'w3': {
                'name': 'Week 3 (Sep 13 - Sep 17, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w3']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w3']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w3']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w3']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w3']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w3']['talal_nawaf']
                }
            },
            'w2': {
                'name': 'Week 2 (Sep 06 - Sep 10, 2026)',
                'shadan': {
                    'title': 'Shadan — Grade 11A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w2']['G11A'],
                    'subjects': CURATED_WEEK_DATA['w2']['shadan']
                },
                'elyana': {
                    'title': 'Elyana — Grade 9A (Girls)',
                    'pdf': OFFICIAL_PDF_URLS['w2']['G9A'],
                    'subjects': CURATED_WEEK_DATA['w2']['elyana']
                },
                'talal_nawaf': {
                    'title': 'Talal & Nawaf — Grade 9B (Boys)',
                    'pdf': OFFICIAL_PDF_URLS['w2']['G9B'],
                    'subjects': CURATED_WEEK_DATA['w2']['talal_nawaf']
                }
            }
        },
        'students': {
            'shadan': {
                'name': 'Shadan',
                'grade': 'Grade 11A (Girls)',
                'section': '11A',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w7']['G11A'],
                'subjects': CURATED_WEEK_DATA['w7']['shadan']
            },
            'elyana': {
                'name': 'Elyana',
                'grade': 'Grade 9A (Girls)',
                'section': '9A',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w7']['G9A'],
                'subjects': CURATED_WEEK_DATA['w7']['elyana']
            },
            'talal': {
                'name': 'Talal',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w7']['G9B'],
                'subjects': CURATED_WEEK_DATA['w7']['talal_nawaf']
            },
            'nawaf': {
                'name': 'Nawaf',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w7']['G9B'],
                'subjects': CURATED_WEEK_DATA['w7']['talal_nawaf']
            }
        },
        'historical_weeks': {
            'Week 2 (Sep 06 - Sep 10, 2026)': {
                'shadan': CURATED_WEEK_DATA['w2']['shadan'],
                'elyana': CURATED_WEEK_DATA['w2']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w2']['talal_nawaf']
            },
            'Week 3 (Sep 13 - Sep 17, 2026)': {
                'shadan': CURATED_WEEK_DATA['w3']['shadan'],
                'elyana': CURATED_WEEK_DATA['w3']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w3']['talal_nawaf']
            },
            'Week 4 (Sep 20 - Sep 24, 2026)': {
                'shadan': CURATED_WEEK_DATA['w4']['shadan'],
                'elyana': CURATED_WEEK_DATA['w4']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w4']['talal_nawaf']
            },
            'Week 5 (Sep 27 - Oct 01, 2026)': {
                'shadan': CURATED_WEEK_DATA['w5']['shadan'],
                'elyana': CURATED_WEEK_DATA['w5']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w5']['talal_nawaf']
            },
            'Week 6 (Oct 04 - Oct 08, 2026)': {
                'shadan': CURATED_WEEK_DATA['w6']['shadan'],
                'elyana': CURATED_WEEK_DATA['w6']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w6']['talal_nawaf']
            },
            'Week 7 (Oct 11 - Oct 15, 2026)': {
                'shadan': CURATED_WEEK_DATA['w7']['shadan'],
                'elyana': CURATED_WEEK_DATA['w7']['elyana'],
                'talal_nawaf': CURATED_WEEK_DATA['w7']['talal_nawaf']
            }
        }
    }

    # Verify live PDF access
    for stu_key, pdf_key, cohort in [
        ('shadan', 'G11A', 'shadan'),
        ('elyana', 'G9A', 'elyana'),
        ('talal',  'G9B', 'talal_nawaf'),
        ('nawaf',  'G9B', 'talal_nawaf')
    ]:
        pdf_url = OFFICIAL_PDF_URLS['w7'][pdf_key]
        print(f"Checking live PDF for {stu_key} ({pdf_url})...")
        live_topics = parse_pdf_agenda(pdf_url)
        if live_topics:
            print(f"  Live access OK for {stu_key}")

    # Write out curriculum_data.json
    with open('curriculum_data.json', 'w', encoding='utf-8') as f:
        json.dump(sync_payload, f, indent=2, ensure_ascii=False)
    print("Updated curriculum_data.json successfully with Week 7 and historical weeks.")

if __name__ == '__main__':
    main()
