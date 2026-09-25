#!/usr/bin/env python3
"""
Arab International Schools Weekly Agenda Scraper & Curriculum Synchronizer
Fetches weekly agendas from https://arabschools.edu.sa/agenda/
Targets:
  - Shadan: Grade 11A Girls
  - Elyana: Grade 9A Girls
  - Talal & Nawaf: Grade 9B Boys
Subjects:
  - ELA (English Language Arts / Literature)
  - Math (Algebra / Geometry)
  - Physics
  - Chemistry
  - Biology
"""

import urllib.request
import re
import json
import io
import sys
from datetime import datetime

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

def fetch_agenda_page_html():
    req = urllib.request.Request('https://arabschools.edu.sa/agenda/', headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read().decode('utf-8', errors='ignore')

def extract_pdf_urls(html):
    pattern = r'href=[\"\'](https://arabschools\.edu\.sa/wp-content/uploads/[^\"\']+\.pdf)[\"\']'
    return list(dict.fromkeys(re.findall(pattern, html)))

def clean_text_line(l):
    cleaned = re.sub(r'^\d+\s+', '', l).strip()
    cleaned = re.sub(r'\s+', ' ', cleaned)
    return cleaned

def parse_pdf_agenda(pdf_url):
    req = urllib.request.Request(pdf_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=25) as response:
        pdf_bytes = response.read()
    
    reader = pypdf.PdfReader(io.BytesIO(pdf_bytes))
    full_text = '\n'.join([page.extract_text() or '' for page in reader.pages])
    
    lines = [clean_text_line(l) for l in full_text.split('\n') if l.strip()]
    
    subjects_data = {s: [] for s in TARGET_SUBJECTS}
    
    ignore_keywords = [
        'timetable', 'period', 'schedule', 'arabic', 'islamic', 'pe', 'ict', 
        'saudi history', 'be well', 'library', 'activity'
    ]
    
    for l in lines:
        low = l.lower()
        if any(ign in low for ign in ignore_keywords):
            continue
        if len(l) < 12:
            continue
            
        if 'chemistry' in low or 'chem' in low:
            subjects_data['Chemistry'].append(l)
        elif 'physics' in low or 'fluid' in low or 'scientific notation' in low:
            subjects_data['Physics'].append(l)
        elif 'biology' in low or 'biodiversity' in low or 'bioremediation' in low:
            subjects_data['Biology'].append(l)
        elif 'math' in low or 'algebra' in low or 'linear equation' in low or 'inequalit' in low:
            subjects_data['Math'].append(l)
        elif 'english' in low or 'reading' in low or 'vocabulary' in low or 'grammar' in low or 'sat' in low or 'pronoun' in low or 'narrative' in low or 'harlem' in low:
            subjects_data['ELA'].append(l)
            
    # Deduplicate and keep top informative entries
    result = {}
    for s, items in subjects_data.items():
        deduped = []
        seen = set()
        for item in items:
            if item not in seen:
                seen.add(item)
                deduped.append(item)
        result[s] = deduped[:5]
        
    return result

def main():
    print(f"[{datetime.now().isoformat()}] Starting Arab International Schools Agenda Sync...")
    try:
        html = fetch_agenda_page_html()
        pdf_urls = extract_pdf_urls(html)
        print(f"Found {len(pdf_urls)} PDF links on school agenda portal.")
    except Exception as e:
        print(f"Error fetching agenda portal: {e}")
        return

    # Filter for G11A, G9A, G9B
    g11a_urls = [u for u in pdf_urls if any(k in u for k in ['G11A', '11A'])]
    g9a_urls  = [u for u in pdf_urls if any(k in u for k in ['G9A', '9A'])]
    g9b_urls  = [u for u in pdf_urls if any(k in u for k in ['G9B', '9B'])]

    sync_payload = {
        'last_synced': datetime.now().isoformat(),
        'school': 'Arab International Schools (arabschools.edu.sa)',
        'students': {
            'shadan': {
                'name': 'Shadan',
                'grade': 'Grade 11A (Girls)',
                'section': '11A',
                'latest_agenda_pdf': g11a_urls[0] if g11a_urls else None,
                'subjects': {}
            },
            'elyana': {
                'name': 'Elyana',
                'grade': 'Grade 9A (Girls)',
                'section': '9A',
                'latest_agenda_pdf': g9a_urls[0] if g9a_urls else None,
                'subjects': {}
            },
            'talal': {
                'name': 'Talal',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': g9b_urls[0] if g9b_urls else None,
                'subjects': {}
            },
            'nawaf': {
                'name': 'Nawaf',
                'grade': 'Grade 9B (Boys)',
                'section': '9B',
                'latest_agenda_pdf': g9b_urls[0] if g9b_urls else None,
                'subjects': {}
            }
        },
        'historical_weeks': {
            'Week 3 (Sep 06 - 10)': {
                'shadan': {
                    'ELA': ['SAT Reading Comprehension Practice', 'SAT Vocabulary Practice', 'Craft & Structure Practice'],
                    'Math': ['Functions & Algebraic Modeling'],
                    'Physics': ['Chapter 12 Lesson 1: Fluid Mechanics - Density & Pressure'],
                    'Chemistry': ['Chapter 13 Lesson 1: Energy & Chemical Bonds (pp. 92-97)'],
                    'Biology': ['Volume 3 Unit 5 Chapter 16: Introduction to Genetics']
                },
                'elyana': {
                    'ELA': ['Pre-reading: "Two Kinds" - Motifs & Themes', 'Vocabulary: Story Words in Context', 'Grammar: Pronoun Agreement'],
                    'Math': ['Lesson 1-2: Solving Linear Equations (Algebra V1 pp. 20-22)'],
                    'Physics': ['Unit 1 Chapter 1: Introduction to Physical Sciences'],
                    'Chemistry': ['Chapter 2 Lesson 1: Properties of Matter'],
                    'Biology': ['Exploring Biology Lesson 1: Characteristics of Life']
                },
                'talal_nawaf': {
                    'ELA': ['Pre-reading: "Two Kinds" by Amy Tan', 'Vocabulary & Literary Terms', 'Active Reading Strategies'],
                    'Math': ['Lesson 1-2: Solving Linear Equations (Algebra V1 pp. 20-25)'],
                    'Physics': ['Chapter 1 Lesson 2: Scientific Notation & SI Units'],
                    'Chemistry': ['Chapter 2 Lesson 1: The Nature of Matter (pp. 36-39)'],
                    'Biology': ['Unit 1 Chapter 1: Exploring Biology']
                }
            },
            'Week 4 (Sep 13 - 17)': {
                'shadan': {
                    'ELA': ['SAT English Preparation: Central Ideas & Text Evidence', 'Words in Context Vocabulary Strategy', 'Text Structure & Author Purpose'],
                    'Math': ['Quadratic Expressions & Function Transformations'],
                    'Physics': ['Fluid Mechanics: Pascal\'s Principle & Hydraulic Lift Systems'],
                    'Chemistry': ['Chapter 13 Lesson 1: Bond Energy & Exothermic Reactions'],
                    'Biology': ['Cell Division & Genetic Regulation']
                },
                'elyana': {
                    'ELA': ['Close Read: "Two Kinds" - Making Inferences', 'Vocabulary Strategy: Slang & Idioms in Dialogue', 'Pronoun-Antecedent Agreement'],
                    'Math': ['Lesson 1-3: Linear Equations with Variables on Both Sides'],
                    'Physics': ['Scientific Notation Calculations & Precision'],
                    'Chemistry': ['Properties of Matter: Physical vs Chemical Changes'],
                    'Biology': ['Cellular Organization & Taxonomy']
                },
                'talal_nawaf': {
                    'ELA': ['Close Read: "Two Kinds" - Making Inferences & Textual Evidence', 'Slang & Dialogue Vocabulary', 'Pronoun Agreement Drills'],
                    'Math': ['Lesson 1-3: Solving Linear Equations with Variables on Both Sides'],
                    'Physics': ['Working with Scientific Notation & Measurement Conversions'],
                    'Chemistry': ['The Nature of Matter: Atomic Theory Review'],
                    'Biology': ['Biological Inquiry & Experimental Design']
                }
            },
            'Week 5 (Sep 20 - 24)': {
                'shadan': {
                    'ELA': ['Unit 1: "Harlem" by Langston Hughes - Historical Context', 'Craft & Structure: Imagery, Metaphor & Symbolism', 'Vocabulary in Context: Segregation & Aspiration', 'Reflective Narrative Writing Workshop'],
                    'Math': ['Checkpoint Assessment 1 Revision & Polynomial Operations'],
                    'Physics': ['Chapter 12 Lesson 2: Forces & Interactions in Fluids (pp. 128-130)'],
                    'Chemistry': ['Chapter 13 Lesson 2: Heat Transfer & Calorimetry (pp. 102-105)'],
                    'Biology': ['Genetic Inheritance & Punnett Square Modeling']
                },
                'elyana': {
                    'ELA': ['Vocabulary: Selection Words from "LOL!"', 'Grammar: Correcting Vague Pronouns in Student Drafts', 'First Read: Informational Text Structure & Humor', 'Writing Workshop: Planning an Original Short Story'],
                    'Math': ['Lesson 1-3 Review: Multi-Step Equations', 'Lesson 1-5: Methods to Solve Algebraic Inequalities'],
                    'Physics': ['Chapter 1 Lesson 2: Scientific Notation in Physics Measurements'],
                    'Chemistry': ['Properties of Matter: Chemical Reactions Lab Overview'],
                    'Biology': ['Unit 1 Revision: Biodiversity & Bioremediation Ecosystem Roles']
                },
                'talal_nawaf': {
                    'ELA': ['Pre-Reading & First Read: "LOL!" (Student Edition pp. 18-25)', 'Selection Vocabulary Workbook Practice (p. 10)', 'Grammar: Correcting Vague Pronouns (WB pp. 12-14)', 'Writing Workshop: Story Arc, Characterization & Voice'],
                    'Math': ['Lesson 1-4: Comparing & Ordering Real Numbers on the Number Line'],
                    'Physics': ['Chapter 1 Lesson 2: Working with Measurement Uncertainty & Scientific Notation'],
                    'Chemistry': ['Chapter 2 Lesson 1: States of Matter & Molecular Motion'],
                    'Biology': ['Unit 1 Revision: Understanding Ecosystems, Biodiversity & Bioremediation']
                }
            }
        }
    }

    # Fetch live PDF details for current week
    for key, c_info in [
        ('shadan', sync_payload['students']['shadan']),
        ('elyana', sync_payload['students']['elyana']),
        ('talal',  sync_payload['students']['talal']),
        ('nawaf',  sync_payload['students']['nawaf'])
    ]:
        pdf_url = c_info['latest_agenda_pdf']
        if pdf_url:
            try:
                print(f"Extracting live topics for {c_info['name']} from {pdf_url}...")
                c_info['subjects'] = parse_pdf_agenda(pdf_url)
            except Exception as e:
                print(f"Error parsing PDF for {c_info['name']}: {e}")
                # Fallback to week 5 topics if PDF download fails
                w5 = sync_payload['historical_weeks']['Week 5 (Sep 20 - 24)']
                c_info['subjects'] = w5.get(key, w5.get('talal_nawaf', {}))
        else:
            w5 = sync_payload['historical_weeks']['Week 5 (Sep 20 - 24)']
            c_info['subjects'] = w5.get(key, w5.get('talal_nawaf', {}))

    with open('curriculum_data.json', 'w', encoding='utf-8') as f:
        json.dump(sync_payload, f, indent=2, ensure_ascii=False)
    print("Updated curriculum_data.json successfully.")

if __name__ == '__main__':
    main()
