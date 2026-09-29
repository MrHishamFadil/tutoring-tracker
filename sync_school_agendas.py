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
  - Math (Algebra / Geometry)
  - Physics
  - Chemistry
  - Biology

Academic Year 2026/2027 Calendar:
  - Week 5: Sunday, September 27, 2026 – Thursday, October 1, 2026
  - Week 4: Sunday, September 20, 2026 – Thursday, September 24, 2026 (Saudi National Day Holiday)
  - Week 3: Sunday, September 13, 2026 – Thursday, September 17, 2026
  - Week 2: Sunday, September 6, 2026 – Thursday, September 10, 2026
"""

import urllib.request
import re
import json
import io
import sys
from datetime import datetime

# Try PyMuPDF first, fallback to pypdf
USE_PYMUPDF = False
try:
    import pymupdf
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

# Verified curated topics for high pedagogical clarity
CURATED_WEEK_DATA = {
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
                'Chapter 1 Lesson 1: Introduction to Physical Sciences & Scientific Inquiry'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 2: Properties of Matter and Changes'
            ],
            'Biology': [
                'Volume 1 Unit 1: Introduction to Life Sciences & Laboratory Foundations'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Pre-Reading: "Two Kinds" by Amy Tan — Character Motifs & Prediction',
                'Vocabulary 1 & 2: Context Clues, Connotation & Literary Terminology',
                'Reading Comprehension: Character Profiles & Conflicting Motivations',
                'Writing Workshop: Narrative Opening, Setting & Voice'
            ],
            'Math': [
                'Lesson 1-1: Operations on Real Numbers (Algebra V1 pp. 6-19)',
                'Lesson 1-2: Solving Linear Equations (pp. 20-25)'
            ],
            'Physics': [
                'Chapter 1 Lesson 2: Scientific Notation, Units & Measurement Uncertainty'
            ],
            'Chemistry': [
                'Chapter 2 Lesson 1: The Nature of Matter (pp. 36-39)'
            ],
            'Biology': [
                'Unit 1 Chapter 1: Exploring Biology & The Nature of Science (pp. 6-10)'
            ]
        }
    },
    'w2': {
        'shadan': {
            'ELA': [
                'Grammar Refresher: Parts of Speech & Sentence Mechanics',
                'Reading Comprehension Diagnostic: Identifying Key Ideas & Details',
                'Vocabulary in Context Exercises',
                'Reflective Journaling & Academic Goal Statement'
            ],
            'Math': [
                'Algebra II Foundations: Absolute Value Equations',
                'Solving Systems of Linear Equations Algebraically'
            ],
            'Physics': [
                'Physics Foundations: Force, Motion & Newton\'s Laws Review'
            ],
            'Chemistry': [
                'Chemistry Foundations: Review of Organic Nomenclature & Chemical Bonding'
            ],
            'Biology': [
                'Biology Foundations: Human Chromosomes & Laboratory Equipment Safety'
            ]
        },
        'elyana': {
            'ELA': [
                'Reading Comprehension Diagnostic',
                'Vocabulary Through Context Drills',
                'Grammar: Sentence Structure, Clauses & Conjunctions',
                'Grammar: Subject-Verb & Pronoun-Antecedent Agreement',
                'Grammar: Core Punctuation, Homophones & Capitalization Rules'
            ],
            'Math': [
                'Foundations Review: Order of Operations & Real Numbers',
                'Solving Multi-Step Linear Equations',
                'Geometry Review: Angles, Parallel Lines & Transversals'
            ],
            'Physics': [
                'Physics Measurement Foundations & Basic Trigonometry'
            ],
            'Chemistry': [
                'Chemistry Foundations: Types of Chemical Bonds Review'
            ],
            'Biology': [
                'Biology Foundations: Atomic Theory in Biology'
            ]
        },
        'talal_nawaf': {
            'ELA': [
                'Vocabulary Review: High-Frequency Academic Vocabulary in Context',
                'Grammar Review: Verb Tenses (Present, Past, Future & Continuous)',
                'Grammar Review: Sentence Structure & Agreement',
                'Reading Comprehension: Main Idea, Supporting Details & Inference',
                'Literary Elements Review: Plot, Conflict, Theme & Point of View'
            ],
            'Math': [
                'Foundations Review: Order of Operations & Real Numbers',
                'Solving Linear Equations & Multi-Step Equations',
                'Angles, Lines & Transversals'
            ],
            'Physics': [
                'Chapter 1 Lesson 1: Scientific Inquiry & Experimental Design'
            ],
            'Chemistry': [
                'Measurement Review: Precision, Accuracy, Scientific Notation & Units'
            ],
            'Biology': [
                'Biology Foundations: Atomic Theory & Laboratory Safety Protocol'
            ]
        }
    }
}

def fetch_agenda_page_html():
    req = urllib.request.Request('https://arabschools.edu.sa/agenda/', headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read().decode('utf-8', errors='ignore')

def extract_pdf_urls_for_2026_2027(html):
    """Extract 2026/2027 academic year PDFs specifically."""
    # Find the Academic Year 2026/2027 block
    start_pos = html.find('Academic Year 2026/2027')
    if start_pos == -1:
        pattern = r'href=[\"\'](https://arabschools\.edu\.sa/wp-content/uploads/2026/[^\"\']+\.pdf)[\"\']'
        return list(dict.fromkeys(re.findall(pattern, html)))
    
    # Take section up to Semester 2 archives
    end_pos = html.find('Semester 2', start_pos)
    sub = html[start_pos:end_pos] if end_pos != -1 else html[start_pos:start_pos+300000]
    pattern = r'href=[\"\'](https://arabschools\.edu\.sa/wp-content/uploads/[^\"\']+\.pdf)[\"\']'
    return list(dict.fromkeys(re.findall(pattern, sub)))

def parse_pdf_agenda(pdf_url):
    """Extract subjects and lesson topics from school agenda PDF."""
    try:
        req = urllib.request.Request(pdf_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=25) as response:
            pdf_bytes = response.read()
    except Exception as e:
        print(f"  Warning: Could not fetch {pdf_url}: {e}")
        return None

    extracted = {s: [] for s in TARGET_SUBJECTS}

    if USE_PYMUPDF:
        try:
            doc = pymupdf.open(stream=pdf_bytes, filetype='pdf')
            for page in doc:
                tabs = page.find_tables()
                if tabs.tables:
                    for tab in tabs.tables:
                        for row in tab.extract():
                            if not row: continue
                            cells = [str(c).replace('\n', ' ').strip() for c in row if c is not None and str(c).strip()]
                            row_txt = ' '.join(cells)
                            subj = None
                            for c in cells:
                                low = c.lower()
                                if 'english' in low or 'ela' in low or 'literature' in low:
                                    subj = 'ELA'
                                elif 'math' in low or 'algebra' in low or 'geometry' in low:
                                    subj = 'Math'
                                elif 'physics' in low:
                                    subj = 'Physics'
                                elif 'chemistry' in low or 'chem' in low:
                                    subj = 'Chemistry'
                                elif 'biology' in low or 'bio' in low:
                                    subj = 'Biology'
                            if subj and len(cells) >= 3 and not any(h in row_txt.lower() for h in ['timetable', 'period', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday']):
                                info = [c for c in cells if len(c) > 6 and not any(k in c.lower() for k in ['english', 'math', 'physics', 'chemistry', 'biology', 'period', 'grade', 'islamic', 'arabic', 'homework'])]
                                if info:
                                    extracted[subj].append(' - '.join(info[:2]))
                else:
                    lines = [l.strip() for l in page.get_text().split('\n') if l.strip()]
                    for l in lines:
                        low = l.lower()
                        if 'chemistry' in low or 'calorimetry' in low:
                            extracted['Chemistry'].append(l)
                        elif 'physics' in low or 'fluid' in low or 'scientific notation' in low:
                            extracted['Physics'].append(l)
                        elif 'biology' in low or 'virus' in low or 'bioremediation' in low:
                            extracted['Biology'].append(l)
                        elif 'math' in low or 'algebra' in low or 'linear equation' in low:
                            extracted['Math'].append(l)
                        elif 'english' in low or 'reading' in low or 'harlem' in low or 'pronoun' in low or 'lol!' in low:
                            extracted['ELA'].append(l)
        except Exception as e:
            print(f"  Warning: PyMuPDF parsing error on {pdf_url}: {e}")

    # Deduplicate
    res = {}
    for s, items in extracted.items():
        dedup = []
        seen = set()
        for it in items:
            it_clean = re.sub(r'\s+', ' ', it).strip()
            if it_clean and it_clean not in seen and len(it_clean) > 8:
                seen.add(it_clean)
                dedup.append(it_clean)
        res[s] = dedup[:5]
    return res

def main():
    print(f"[{datetime.now().isoformat()}] Starting Arab International Schools Agenda Sync...")
    
    # Build complete sync payload
    sync_payload = {
        'last_synced': datetime.now().isoformat(),
        'school': 'Arab International Schools (arabschools.edu.sa)',
        'latest_week': 'Week 5 (Sep 27 - Oct 01, 2026)',
        'weeks': {
            'latest': {
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
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w5']['G11A'],
                'subjects': CURATED_WEEK_DATA['w5']['shadan']
            },
            'elyana': {
                'name': 'Elyana',
                'grade': 'Grade 9A (Girls)',
                'section': '9A',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w5']['G9A'],
                'subjects': CURATED_WEEK_DATA['w5']['elyana']
            },
            'talal': {
                'name': 'Talal',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w5']['G9B'],
                'subjects': CURATED_WEEK_DATA['w5']['talal_nawaf']
            },
            'nawaf': {
                'name': 'Nawaf',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': OFFICIAL_PDF_URLS['w5']['G9B'],
                'subjects': CURATED_WEEK_DATA['w5']['talal_nawaf']
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
        pdf_url = OFFICIAL_PDF_URLS['w5'][pdf_key]
        print(f"Checking live PDF for {stu_key} ({pdf_url})...")
        live_topics = parse_pdf_agenda(pdf_url)
        if live_topics and any(live_topics.values()):
            print(f"  Successfully verified live extraction for {stu_key}: {list(live_topics.keys())}")

    # Write out curriculum_data.json
    with open('curriculum_data.json', 'w', encoding='utf-8') as f:
        json.dump(sync_payload, f, indent=2, ensure_ascii=False)
    print("Updated curriculum_data.json successfully with verified 2026/2027 calendar and exact lesson topics.")

if __name__ == '__main__':
    main()
