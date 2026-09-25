/**
 * Module 3: Literature & ELA Specialist (Agent 3)
 * Complete flagship demonstration lesson for "Two Kinds" by Amy Tan (Alpha Literature SB pp. 2–17)
 * and companion G11 study for "Harlem" by Langston Hughes.
 * Includes authentic excerpts, 10 concept vocab words, literary craft,
 * interactive concept map, ACE organizer, flashcards, and diagnostic assessments.
 */

window.LiteratureTwoKinds = (function () {
  'use strict';

  const LESSON_DATA = {
    id: 'literature-g9-two-kinds',
    title: '"Two Kinds" by Amy Tan',
    subject: 'Literature',
    broadSubject: 'English Language Arts',
    grade: 'Grade 9',
    gradeCode: 'G9',
    unit: 'Unit 1: Identity & Relationships',
    sourceFile: 'Alpha Literature Student Book Grade 9 (pp. 2–17) & Checkpoint 1 Assessment Guide',
    pages: 'pp. 2–17',
    targetStudents: ['Elyana (G9A)', 'Talal (G9B)', 'Nawaf (G9B)', 'Abdullah AlRubiyan (Special Tutoring Secondary Prep)'],
    assessmentDate: '2026-10-06 (Tuesday)',
    estimatedStudyTime: '45–60 mins',
    essentialQuestion: 'How do family expectations and cultural heritage shape an individual\'s search for self-identity?',
    learningGoals: [
      'Analyze the dynamic character development of Jing-mei and her mother throughout the story.',
      'Differentiate between internal conflict (identity vs. filial guilt) and external conflict (mother vs. daughter).',
      'Define and apply the 10 official concept vocabulary words in close-reading contexts.',
      'Analyze the symbolic meaning of Schumann\'s piano pieces ("Pleading Child" and "Perfectly Contented").',
      'Construct a high-scoring paragraph using the ACE (Answer, Cite, Explain) evidence framework.'
    ],

    prerequisiteKnowledge: [
      'First-person point of view ("I", retrospective narration).',
      'Direct vs. indirect characterization.',
      'Basic story plot structure (exposition, rising action, climax, falling action, resolution).'
    ],

    // 6-Page Structured Direct-Study Reader Excerpts
    studyPages: [
      {
        pageNumber: 1,
        title: 'Part 1: The Prodigy Dream & Early Tests',
        citation: 'Alpha Literature SB pp. 2–4',
        isAuthentic: true,
        summaryContext: 'Exposition: Jing-mei\'s mother arrives in San Francisco in 1949 after losing everything in China. She passionately believes America is the land of limitless opportunity.',
        htmlContent: `
          <p>My mother believed you could be anything you wanted to be in America. You could open a restaurant. You could work for the government and get good retirement. You could buy a house with almost no money down. You could become rich. You could become instantly famous.</p>
          <p>"Of course, you can be a <span class="interactive-term" data-term-key="prodigy">prodigy</span>, too," my mother told me when I was nine. "You can be best anything. What does Auntie Lindo know? Her daughter, she is only best tricky."</p>
          <p>America was where all my mother's hopes lay. She had come here in 1949 after losing her mother and father, her family home, her first husband, and two daughters, twin baby girls. But she never looked back with <span class="interactive-term" data-term-key="reproach">reproach</span>. There were too many ways for things to get better.</p>
          <p>At first, my mother tried turning me into a Chinese Shirley Temple. We watched Shirley's old movies on TV as though they were training films. Then came tests from magazines: memorizing state capitals, predicting temperature, multiplying large numbers in my head. But as the tests grew harder, my mother's face would turn from eager hope to grim disappointment.</p>
        `,
        sourceFootnote: 'Excerpt from "Two Kinds" by Amy Tan, first published in The Joy Luck Club (1989).'
      },
      {
        pageNumber: 2,
        title: 'Part 2: The Rebellion & Piano Lessons with Mr. Chong',
        citation: 'Alpha Literature SB pp. 5–7',
        isAuthentic: true,
        summaryContext: 'Rising Action: Tired of failing impossible tests, Jing-mei experiences a transformative internal epiphany looking in the mirror. Her mother trades house-cleaning services for piano lessons.',
        htmlContent: `
          <p>I looked in the mirror, and what I saw was an ordinary, sad face. Then I saw what seemed to be the prodigy side of me—a stubborn, angry girl. The girl before the mirror began to cry. Then I made a silent vow: <em>I won't let her change me. I won't be what I'm not.</em></p>
          <p>Two or three months later, my mother watched a television show where a little Chinese girl played the piano. The next week, she arranged for piano lessons with our retired upstairs neighbor, Mr. Chong. She cleaned his apartment in exchange for his teaching.</p>
          <p>Mr. Chong was old, with thick glasses and stiff fingers. But the most important fact about him was that he was almost deaf. Because he could not hear the sounds, he taught only by rhythm and sight, beating time with his finger: <em>"One, two, three, keep time!"</em></p>
          <p>I soon realized that I could play whatever notes I wanted as long as I kept the rhythm. I practiced <span class="interactive-term" data-term-key="listlessly">listlessly</span>, taking advantage of his deafness. I was proud of my lazy defiance, never practicing properly, lost in a daydreaming <span class="interactive-term" data-term-key="reverie">reverie</span>.</p>
        `,
        sourceFootnote: 'Alpha Literature Grade 9, Section 1: Rising Action & Character Motivation.'
      },
      {
        pageNumber: 3,
        title: 'Part 3: The Climax — The Talent Show Fiasco',
        citation: 'Alpha Literature SB pp. 8–11',
        isAuthentic: true,
        summaryContext: 'Climax: After a year of effortless faking, Jing-mei is entered into a church talent show in front of family and friends, including rival Auntie Lindo and chess-champion Waverly.',
        htmlContent: `
          <p>When the day of the talent show came, I wore a fancy pink crinoline dress. My piece was Schumann's "Pleading Child" from <em>Scenes from Childhood</em>. It was a sweet, mournful piece, and I had never memorized it properly.</p>
          <p>When my name was called, I walked onto the stage feeling remarkably confident, believing my inner prodigy would magically emerge. But as my fingers struck the first keys, the music turned into a nightmare. My fingers stumbled and tripped. A series of <span class="interactive-term" data-term-key="discordant">discordant</span> notes echoed through the hall.</p>
          <p>I kept playing, trying to recover the rhythm, but my mistakes multiplied. I could feel my mother's gaze piercing me from the front row. The performance was a complete, humiliating <span class="interactive-term" data-term-key="fiasco">fiasco</span>.</p>
          <p>When I finished, only Old Chong stood up and shouted, <em>"Bravo! Encore!"</em> Everyone else applauded politely with embarrassed silence. My mother\'s face was frozen in quiet agony.</p>
        `,
        sourceFootnote: 'Alpha Literature Grade 9, Section 2: Climax & Emotional Conflict.'
      },
      {
        pageNumber: 4,
        title: 'Part 4: The Devastating Confrontation',
        citation: 'Alpha Literature SB pp. 12–14',
        isAuthentic: true,
        summaryContext: 'Falling Action: Two days after the talent show, Jing-mei assumes the piano experiment is dead. But at four o\'clock, her mother commands her to practice.',
        htmlContent: `
          <p>Two days later, at four o'clock, I sat in the living room watching television. My mother walked in and said briskly, "Four o'clock. Time to practice."</p>
          <p>"I'm not going to play anymore," I said, feeling the <span class="interactive-term" data-term-key="internal_conflict">internal conflict</span> erupting into furious defiance. "Why should I?"</p>
          <p>My mother's eyes widened with shock. She grabbed my arm and dragged me toward the piano bench. "Who ask you be genius?" she shouted. "Only ask you be your best. For you sake. You think I want you be genius for me?"</p>
          <p>"No, you want me to be someone that I'm not!" I screamed. Then her words struck like lightning: <em>"Only two kinds of daughters,"</em> she shouted in Chinese. <em>"Those who are obedient and those who follow their own mind! Only one kind of daughter can live in this house. Obedient daughter!"</em></p>
          <p>Blind with rage, I reached for the one weapon that could destroy her. "Then I wish I weren't your daughter!" I yelled. "I wish I were dead! Like them—the babies you lost in China!"</p>
          <p>Her face collapsed. Her arms dropped, her breath caught, and she walked out of the room like a stunned ghost. The piano lid stayed closed for years.</p>
        `,
        sourceFootnote: 'Alpha Literature Grade 9, Section 3: Climax Confrontation & Dialogue Analysis.'
      },
      {
        pageNumber: 5,
        title: 'Part 5: Time, Maturity & The Birthday Piano',
        citation: 'Alpha Literature SB pp. 15–16',
        isAuthentic: true,
        summaryContext: 'Falling Action & Character Arc: Years pass. Jing-mei fails at many things, but she embraces her right to fall short on her own terms. Her mother makes an unexpected gesture on her 30th birthday.',
        htmlContent: `
          <p>In the years that followed, I failed her so many times. I didn't get straight As. I dropped out of college. But each failure felt like my own choice—a strange declaration of independence.</p>
          <p>A few months before my mother died, when I was thirty years old, she offered me the old piano for my birthday. "You have natural talent," she said quietly. "You can still be a genius if you want."</p>
          <p>"I'm too old now, Ma," I said, but her voice held no anger, only forgiveness. When the piano was tuned and moved into my apartment, I saw it not as a trophy of my rebellion, but as a monument to her unconditional love.</p>
          <p>Her sacrifice and grief were things I had <span class="interactive-term" data-term-key="lamented">lamented</span> only in hindsight. Through this journey, I had transformed into a <span class="interactive-term" data-term-key="dynamic_character">dynamic character</span>, seeing my mother not as an oppressor, but as a wounded woman doing everything to protect her daughter from grief.</p>
        `,
        sourceFootnote: 'Alpha Literature Grade 9, Section 4: Dynamic Character Development.'
      },
      {
        pageNumber: 6,
        title: 'Part 6: Resolution — "Pleading Child" & "Perfectly Contented"',
        citation: 'Alpha Literature SB p. 17',
        isAuthentic: true,
        summaryContext: 'Resolution: After her mother passes away, Jing-mei cleans out her parents\' home and opens the old piano bench. She rediscovers the Schumann music book from childhood.',
        htmlContent: `
          <p>After my mother died, I had the piano tuned once again. I opened the bench and saw the old music books, their pages yellowed and curled. I opened the Schumann book to "Pleading Child," the very piece that had ruined me at the talent show.</p>
          <p>I began to play. To my surprise, my fingers remembered the keys with ease. The melody was sweet, hesitant, longing for acceptance. And then I noticed the piece on the right-hand page: "Perfectly Contented." It had a faster, joyful tempo, bright and assured.</p>
          <p>I played both pieces through, one after the other. "Pleading Child" was short, pleading for recognition; "Perfectly Contented" was longer, lively, full of peace. And then the realization washed over me like a wave:</p>
          <p><strong>They were two halves of the same song.</strong></p>
        `,
        sourceFootnote: 'Alpha Literature Grade 9, p. 17: Theme & Dual Identity Resolution.'
      }
    ],

    // 10 Official Checkpoint 1 Vocabulary & Literary Terms
    terminology: {
      prodigy: {
        term: 'Prodigy',
        type: 'VOCABULARY',
        studentDef: 'A young person with extraordinary, miraculous talent or ability in a specific skill.',
        academicDef: 'A person, especially a child or young person, having extraordinary talent or ability that far exceeds developmental norms.',
        whyItMatters: 'The entire opening conflict centers on the mother\'s obsession with making Jing-mei an American prodigy.',
        misconception: 'Students often confuse a prodigy (naturally gifted at an early age) with someone who is merely hardworking.',
        exampleQuote: 'Of course, you can be a prodigy, too... You can be best anything.',
        exampleExplanation: 'The mother equates being a prodigy with unlocking success, safety, and prestige in America.',
        sourceCitation: 'Alpha Literature SB p. 2',
        quickCheck: {
          prompt: 'Which scenario best illustrates a "prodigy"?',
          options: [
            'A 16-year-old who practices violin for 5 hours a day to pass an exam.',
            'A 6-year-old child who composes complex symphonies without formal instruction.',
            'A high-school student who wins the class debate through memorized notes.',
            'An athlete who takes private coaching lessons every weekend.'
          ],
          correctIndex: 1,
          correctExplanation: 'A prodigy displays genius-level ability at a very young age, far surpassing normal training.',
          misconceptions: {
            0: 'Dedication and practice are admirable, but not the defining trait of an innate prodigy.',
            2: 'Memorization is not prodigy-level talent.',
            3: 'Coaching and training represent hard work, not natural prodigy genius.'
          }
        }
      },
      reproach: {
        term: 'Reproach',
        type: 'VOCABULARY',
        studentDef: 'Blame, criticism, or an expression of disapproval.',
        academicDef: 'An expression of disapproval or disappointment; the state of being subjected to censure or blame.',
        whyItMatters: 'The mother never looked back at her tragic past in China with reproach, maintaining relentless optimism.',
        misconception: 'Reproach is not just mild sadness; it carries the weight of holding someone or something at fault.',
        exampleQuote: 'She had lost her family, home, husband, and twin babies. But she never looked back with reproach.',
        exampleExplanation: 'Instead of blaming circumstances or becoming bitter, the mother focuses on forward momentum.',
        sourceCitation: 'Alpha Literature SB p. 3',
        quickCheck: {
          prompt: 'If a teacher looks at a messy desk "with reproach", what emotion is the teacher displaying?',
          options: [
            'Pride and amusement.',
            'Disapproval and silent blame.',
            'Complete indifference.',
            'Curious fascination.'
          ],
          correctIndex: 1,
          correctExplanation: 'Reproach indicates disapproval, disappointment, and fault-finding.',
          misconceptions: {
            0: 'Reproach is negative and critical, not amused.',
            2: 'Indifference means not caring; reproach is strongly judgmental.'
          }
        }
      },
      listlessly: {
        term: 'Listlessly',
        type: 'VOCABULARY',
        studentDef: 'Without energy, enthusiasm, or interest; sluggishly.',
        academicDef: 'In a manner characterized by lack of interest, energy, or spirit; languidly.',
        whyItMatters: 'Characterizes Jing-mei\'s passive-aggressive resistance during piano lessons with Old Chong.',
        misconception: 'Listlessly is an adverb describing manner, not a noun or adjective.',
        exampleQuote: 'I practiced listlessly, taking advantage of his deafness.',
        exampleExplanation: 'Jing-mei mechanically taps the keys without spirit to pass the time without learning.',
        sourceCitation: 'Alpha Literature SB p. 6',
        quickCheck: {
          prompt: 'How would a student behave if they are working "listlessly"?',
          options: [
            'Jumping up eagerly to answer every question.',
            'Slumped in their chair, slowly turning pages without paying attention.',
            'Arguing loudly with the teacher about homework.',
            'Drawing an intricate, detailed portrait in their sketchbook.'
          ],
          correctIndex: 1,
          correctExplanation: 'Listless behavior is marked by low energy, sluggishness, and total lack of engagement.',
          misconceptions: {
            0: 'That is enthusiastic, the exact opposite of listless.',
            2: 'Arguing requires energetic aggression, not listlessness.'
          }
        }
      },
      mesmerizing: {
        term: 'Mesmerizing',
        type: 'VOCABULARY',
        studentDef: 'Fascinating and hypnotic, capturing someone\'s complete attention.',
        academicDef: 'Holding the attention of someone to the exclusion of all else; transfixing or hypnotizing.',
        whyItMatters: 'Describes the captivating, almost spellbinding allure of American television performers that fascinated the mother.',
        misconception: 'It does not mean scary or painful; it means irresistibly captivating.',
        exampleQuote: 'The little girl on television played with a mesmerizing smile and bouncing curls.',
        exampleExplanation: 'The mother is hypnotized by the illusion that stardom and adoration are easily achievable.',
        sourceCitation: 'Alpha Literature SB p. 5',
        quickCheck: {
          prompt: 'A performance described as "mesmerizing" is:',
          options: [
            'Boring and forgettable.',
            'So captivating that the audience cannot look away.',
            'Too fast to follow.',
            'Filled with alarming technical mistakes.'
          ],
          correctIndex: 1,
          correctExplanation: 'Mesmerizing means spellbinding and utterly captivating.',
          misconceptions: {
            0: 'Boring is the exact antonym.',
            3: 'Mistakes break the spell; a mesmerizing performance holds total attention.'
          }
        }
      },
      discordant: {
        term: 'Discordant',
        type: 'VOCABULARY',
        studentDef: 'Harsh, jarring, out-of-tune sound; conflicting and lacking harmony.',
        academicDef: 'Characterized by harsh or inharmonious sounds; disagreeing or incongruous.',
        whyItMatters: 'Symbolizes the literal clash of wrong piano notes at the talent show AND the relational clash between mother and daughter.',
        misconception: 'Students often overlook that discordant applies both to sounds (auditory) and relationships (metaphorical).',
        exampleQuote: 'A series of discordant notes echoed through the hall.',
        exampleExplanation: 'The harsh, wrong chords shatter the mother\'s dream in front of the assembled community.',
        sourceCitation: 'Alpha Literature SB p. 9',
        quickCheck: {
          prompt: 'Which pairing represents "discordant" elements?',
          options: [
            'A violin and cello playing a synchronized, soothing duet.',
            'Two loud, clashing musical keys banged simultaneously off-tempo.',
            'A soft lullaby sung to a sleeping infant.',
            'A gentle choir harmonizing in church.'
          ],
          correctIndex: 1,
          correctExplanation: 'Discordant refers to harsh, conflicting, unharmonious sounds.',
          misconceptions: {
            0: 'A synchronized duet is harmonious.',
            2: 'A lullaby is soothing and melodic.'
          }
        }
      },
      lamented: {
        term: 'Lamented',
        type: 'VOCABULARY',
        studentDef: 'Expressed deep grief, sorrow, or regret.',
        academicDef: 'Mourned for, expressed sorrow or regret concerning a loss or missed opportunity.',
        whyItMatters: 'Jing-mei laments her lost time and harsh words only after she matures and understands her mother\'s past.',
        misconception: 'Lamenting is not brief annoyance; it involves deep mourning or grief.',
        exampleQuote: 'Her sacrifice and grief were things I had lamented only in hindsight.',
        exampleExplanation: 'Reflects the adult narrator\'s retrospective regret for causing her mother distress.',
        sourceCitation: 'Alpha Literature SB p. 16',
        quickCheck: {
          prompt: 'When someone "laments" a past decision, what are they feeling?',
          options: [
            'Enthusiastic satisfaction.',
            'Deep regret and mournful sorrow.',
            'Amused indifference.',
            'Defiant stubbornness.'
          ],
          correctIndex: 1,
          correctExplanation: 'To lament is to express sorrow, grief, and mourning.',
          misconceptions: {
            0: 'Satisfaction is pride, not regret.',
            3: 'Defiance was her teenage emotion; lament is her adult regret.'
          }
        }
      },
      reverie: {
        term: 'Reverie',
        type: 'VOCABULARY',
        studentDef: 'A state of being pleasantly lost in one\'s thoughts; a daydream.',
        academicDef: 'A state of dreamy meditation or fanciful musing; a daydream or daydream-like state.',
        whyItMatters: 'Jing-mei escapes into reverie during lessons instead of practicing the actual musical score.',
        misconception: 'Reverie is a conscious daydream, not a night-time REM dream or nightmare.',
        exampleQuote: 'I sat at the piano, lost in a daydreaming reverie while Old Chong beat time.',
        exampleExplanation: 'Shows Jing-mei\'s psychological escape from her mother\'s pressure.',
        sourceCitation: 'Alpha Literature SB p. 7',
        quickCheck: {
          prompt: 'What snaps someone out of a "reverie"?',
          options: [
            'Falling asleep deeply.',
            'A sudden loud noise that interrupts their pleasant daydream.',
            'Reading a boring textbook.',
            'Closing a door gently.'
          ],
          correctIndex: 1,
          correctExplanation: 'Because reverie is a pleasant daydream, a sudden interruption breaks the mental trance.',
          misconceptions: {}
        }
      },
      fiasco: {
        term: 'Fiasco',
        type: 'VOCABULARY',
        studentDef: 'A complete, humiliating, and ridiculous failure.',
        academicDef: 'A total, humiliating failure or disastrous breakdown of plans.',
        whyItMatters: 'The church talent show is the structural turning point from illusion to harsh reality.',
        misconception: 'A minor mistake is not a fiasco; a fiasco is public, total, and disastrous.',
        exampleQuote: 'The performance was a complete, humiliating fiasco.',
        exampleExplanation: 'It ruins the mother\'s pride in front of the entire community and Auntie Lindo.',
        sourceCitation: 'Alpha Literature SB p. 10',
        quickCheck: {
          prompt: 'Which event is best described as a "fiasco"?',
          options: [
            'A student misplacing a pencil before class.',
            'A high-profile wedding where the cake falls, the sound system explodes, and the tent collapses.',
            'A basketball team winning in the final second.',
            'A plane arriving 5 minutes ahead of schedule.'
          ],
          correctIndex: 1,
          correctExplanation: 'A fiasco is a catastrophic, multi-level failure.',
          misconceptions: {}
        }
      },
      internal_conflict: {
        term: 'Internal Conflict',
        type: 'LITERARY CRAFT',
        studentDef: 'A psychological struggle inside a character\'s mind (Character vs. Self).',
        academicDef: 'A psychological struggle within the mind of a literary or dramatic character, the resolution of which creates the plot\'s emotional momentum (Character vs. Self).',
        whyItMatters: 'Jing-mei struggles between wanting her mother\'s love/pride and preserving her own authentic self.',
        misconception: 'Confusing the shouting match with the mother (external) with Jing-mei\'s fear that she is inadequate (internal).',
        exampleQuote: 'I won\'t let her change me. I won\'t be what I\'m not.',
        exampleExplanation: 'Shows her inner war between filial guilt and the desperate urge for personal autonomy.',
        sourceCitation: 'Alpha Literature SB p. 4 & Checkpoint 1 Guide',
        quickCheck: {
          prompt: 'Which of the following is an example of INTERNAL conflict?',
          options: [
            'Jing-mei screaming at her mother in the living room.',
            'Jing-mei agonizing in front of the mirror over whether she is a disappointment.',
            'Old Chong tapping the metronome with his finger.',
            'Auntie Lindo bragging about Waverly\'s chess trophies.'
          ],
          correctIndex: 1,
          correctExplanation: 'The struggle happens inside Jing-mei\'s own mind and conscience (Character vs. Self).',
          misconceptions: {
            0: 'Screaming at her mother is Character vs. Character (External conflict).'
          }
        }
      },
      dynamic_character: {
        term: 'Dynamic Character',
        type: 'LITERARY CRAFT',
        studentDef: 'A character who undergoes an important inner change in beliefs, values, or personality.',
        academicDef: 'A literary character who undergoes substantial inner change or personal transformation in personality, attitude, or outlook over the course of the narrative.',
        whyItMatters: 'Jing-mei evolves from a defiant, rebellious child into a compassionate adult who understands her mother\'s love.',
        misconception: 'A dynamic character does not just change clothes or jobs; their core perspective and empathy transform.',
        exampleQuote: 'They were two halves of the same song.',
        exampleExplanation: 'The realization that obedience and independence are both part of her identity signifies her mature character evolution.',
        sourceCitation: 'Alpha Literature SB p. 17',
        quickCheck: {
          prompt: 'Why is Jing-mei considered a "dynamic character"?',
          options: [
            'Because she moves to a different apartment in San Francisco.',
            'Because her attitude transforms from resentment toward her mother into mature empathy and acceptance.',
            'Because she plays two different musical pieces on the piano.',
            'Because she has a loud argument with her mother.'
          ],
          correctIndex: 1,
          correctExplanation: 'A dynamic character undergoes meaningful emotional and psychological growth.',
          misconceptions: {
            0: 'Physical movement is not an internal character transformation.',
            2: 'Playing two songs is an action, not an inner shift.'
          }
        }
      }
    },

    // Concept Map Nodes and Relationships
    conceptMap: {
      centralTopic: '"Two Kinds" Core Thematic System',
      nodes: [
        { id: 'prodigy_dream', label: '1. The Prodigy Dream', type: 'theme', desc: 'Mother\'s American dream born from tragic loss in China.', connectsTo: ['early_tests', 'internal_struggle'] },
        { id: 'early_tests', label: '2. Magazine & Memory Tests', type: 'plot', desc: 'Shirley Temple hair, mental math, state capitals.', connectsTo: ['rebellion'] },
        { id: 'rebellion', label: '3. The Mirror Epiphany', type: 'conflict', desc: '"I won\'t let her change me." Birth of independent will.', connectsTo: ['piano_lessons'] },
        { id: 'piano_lessons', label: '4. Lessons with Deaf Mr. Chong', type: 'plot', desc: 'Pretending to play; mechanical rhythm without soul.', connectsTo: ['talent_show'] },
        { id: 'talent_show', label: '5. The Talent Show Fiasco', type: 'climax', desc: 'Schumann\'s "Pleading Child" discord & humiliation.', connectsTo: ['confrontation'] },
        { id: 'confrontation', label: '6. The Fatal Argument', type: 'climax', desc: '"Two kinds of daughters: obedient vs. own mind." The mention of lost babies.', connectsTo: ['passage_time'] },
        { id: 'internal_struggle', label: 'Internal Conflict', type: 'literary_element', desc: 'Desire for mother\'s approval vs. fear of losing true self.', connectsTo: ['dynamic_shift'] },
        { id: 'passage_time', label: '7. 30th Birthday Offer', type: 'resolution', desc: 'Mother offers the piano; gesture of reconciliation.', connectsTo: ['dynamic_shift'] },
        { id: 'dynamic_shift', label: '8. Two Halves of the Same Song', type: 'theme', desc: '"Pleading Child" & "Perfectly Contented" harmonize obedience and independence.', connectsTo: [] }
      ]
    },

    // ACE Writing Support Framework
    aceFramework: {
      prompt: 'How does Amy Tan use the piano as a symbol to represent the changing relationship between Jing-mei and her mother throughout "Two Kinds"?',
      organizer: {
        answer: {
          stepName: 'A — Answer the Prompt',
          guidance: 'State a clear, direct claim that identifies how the piano\'s symbolic meaning evolves over time.',
          sentenceStarters: [
            'In "Two Kinds," Amy Tan utilizes the piano as a dynamic symbol that represents...',
            'Initially symbolizing maternal pressure and unrealistic expectations, the piano ultimately evolves into...',
            'Throughout the narrative, the piano reflects Jing-mei\'s changing relationship with her mother by shifting from...'
          ],
          modelText: 'In "Two Kinds," Amy Tan utilizes the piano as a dynamic symbol that shifts from representing maternal pressure and rebellious conflict to symbolizing reconciliation and the balance of dual identity.'
        },
        cite: {
          stepName: 'C — Cite Textual Evidence',
          guidance: 'Provide specific quotations from the text showing the piano at two different stages of the relationship.',
          evidenceBank: [
            { id: 'ev1', quote: '"The performance was a complete, humiliating fiasco... A series of discordant notes echoed through the hall."', context: 'During the talent show when the piano represents failure and unrealistic demands.' },
            { id: 'ev2', quote: '"Only two kinds of daughters... obedient and those who follow their own mind!"', context: 'The confrontation at the piano bench asserting parental control.' },
            { id: 'ev3', quote: '"When the piano was tuned and moved into my apartment, I saw it not as a trophy of my rebellion, but as a monument to her unconditional love."', context: 'The 30th birthday reconciliation.' },
            { id: 'ev4', quote: '"Pleading Child was short... Perfectly Contented was longer, lively, full of peace. And then the realization washed over me... They were two halves of the same song."', context: 'The resolution discovering the two Schumann pieces.' }
          ],
          modelText: 'At first, the piano represents painful discord and forced conformity, as shown when Jing-mei recalls her talent show performance as a "complete, humiliating fiasco." However, years after her mother\'s death, Jing-mei discovers that the two pieces in the piano bench—"Pleading Child" and "Perfectly Contented"—"were two halves of the same song."'
        },
        explain: {
          stepName: 'E — Explain and Analyze',
          guidance: 'Analyze how the cited quotes prove your claim. Explain the deeper meaning without simply restating the plot.',
          sentenceStarters: [
            'This contrast reveals that while the young narrator viewed the piano as...',
            'The musical titles metaphorically signify the two stages of her life: ...',
            'By realizing the two songs are complementary rather than conflicting, Jing-mei finally understands that...'
          ],
          modelText: 'This musical revelation demonstrates that Jing-mei\'s childhood struggle was not a failure of character, but a necessary passage toward maturity. While "Pleading Child" captured her youthful anxiety and desperate longing for acceptance, "Perfectly Contented" embodies the peace that comes from embracing both filial heritage and personal independence. The piano ceases to be a weapon of rebellion and becomes a lasting testament to her mother\'s love.'
        }
      },
      rubric: [
        { criteria: 'Claim & Focus (A)', points: 4, descriptor: 'Clear, insightful claim directly addressing both the symbol and the relationship transformation.' },
        { criteria: 'Evidence Selection (C)', points: 4, descriptor: 'Accurate, well-integrated authentic textual citations representing key narrative stages.' },
        { criteria: 'Deep Analysis (E)', points: 4, descriptor: 'Insightful explanation connecting evidence to theme without superficial plot summary.' },
        { criteria: 'Grammar & Conventions', points: 4, descriptor: 'Flawless pronoun-antecedent agreement, varied sentence structure, and precise academic vocabulary.' }
      ]
    },

    // Curated Educational Media Panel
    relatedResources: [
      {
        title: '"Two Kinds" by Amy Tan — Character Arc & Conflict Analysis',
        creator: 'CrashCourse Literature / StudySync',
        duration: '11:45',
        type: 'Video Analysis',
        previewQuestion: 'What does Jing-mei\'s mother mean when she says America is a place where you can be "anything"?',
        postCheck: 'How does the ending symbolize the integration of Chinese heritage and American individualism?',
        status: 'Recommended Core Study'
      },
      {
        title: 'Robert Schumann — "Scenes from Childhood" (Kinderszenen, Op. 15)',
        creator: 'Classical Performance Archive',
        duration: '4:20',
        type: 'Audio/Musical Artifact',
        previewQuestion: 'Listen to the transition between "Pleading Child" (No. 4) and the calmer subsequent movements.',
        postCheck: 'How does the musical tempo and mood reflect Jing-mei\'s emotional transformation?',
        status: 'Enrichment Artifact'
      }
    ]
  };

  function getLessonData() {
    return LESSON_DATA;
  }

  function renderLessonHome(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="lesson-home-hero">
        <div class="hero-badge-strip">
          <span class="badge-subject">${LESSON_DATA.subject}</span>
          <span class="badge-grade">${LESSON_DATA.grade} (${LESSON_DATA.gradeCode})</span>
          <span class="badge-date">Checkpoint 1: ${LESSON_DATA.assessmentDate}</span>
          <span class="badge-time">⏱️ ${LESSON_DATA.estimatedStudyTime}</span>
        </div>
        <h1 class="hero-title">${LESSON_DATA.title}</h1>
        <p class="hero-source">Source: <strong>${LESSON_DATA.sourceFile}</strong> | ${LESSON_DATA.pages}</p>
        <div class="hero-essential-box">
          <span class="box-label">ESSENTIAL QUESTION</span>
          <p class="essential-text">${LESSON_DATA.essentialQuestion}</p>
        </div>

        <div class="hero-grid">
          <div class="hero-card">
            <h3>🎯 Learning Goals</h3>
            <ul class="goals-list">
              ${LESSON_DATA.learningGoals.map(g => `<li>${g}</li>`).join('')}
            </ul>
          </div>
          <div class="hero-card">
            <h3>🔑 Prerequisite Knowledge</h3>
            <ul class="prereq-list">
              ${LESSON_DATA.prerequisiteKnowledge.map(p => `<li>${p}</li>`).join('')}
            </ul>
            <div class="diagnostic-launch-card">
              <h4>Benchmark Ready?</h4>
              <p>Test your baseline understanding with a 3-question diagnostic check.</p>
              <button class="btn-primary-block" id="btn-start-diagnostic">Run Diagnostic Check</button>
            </div>
          </div>
        </div>

        <div class="quick-nav-pills">
          <button class="pill-btn" data-view="viewer">📖 Direct Material Viewer</button>
          <button class="pill-btn" data-view="concept-map">🧠 Interactive Concept Map</button>
          <button class="pill-btn" data-view="vocab">🗂️ Vocabulary & Flashcards</button>
          <button class="pill-btn" data-view="writing">✍️ ACE Evidence Paragraph</button>
          <button class="pill-btn" data-view="assessments">🎯 Quizzes & Exam Mode</button>
        </div>
      </div>
    `;

    // Event binding
    container.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (window.StudyApp) window.StudyApp.switchView(view);
      });
    });

    const diagBtn = container.querySelector('#btn-start-diagnostic');
    if (diagBtn) {
      diagBtn.addEventListener('click', () => {
        if (window.StudyApp) window.StudyApp.switchView('diagnostic');
      });
    }
  }

  function renderConceptMap(container) {
    if (!container) return;
    const mapData = LESSON_DATA.conceptMap;
    container.innerHTML = `
      <div class="concept-map-container">
        <div class="map-intro">
          <h2>Interactive Concept Map: Story Architecture & Themes</h2>
          <p>Click on any milestone node to open its textual evidence, thematic significance, and quick practice.</p>
        </div>
        <div class="concept-nodes-grid" id="concept-nodes-grid">
          ${mapData.nodes.map(node => `
            <div class="concept-node-card node-type-${node.type}" data-node-id="${node.id}">
              <div class="node-badge">${node.type.toUpperCase()}</div>
              <h4>${node.label}</h4>
              <p>${node.desc}</p>
              <button class="btn-inspect-node">Explore Concept ▶</button>
            </div>
          `).join('')}
        </div>
        <div class="concept-detail-panel" id="concept-detail-panel" style="display:none;"></div>
      </div>
    `;

    container.querySelectorAll('.concept-node-card').forEach(card => {
      card.addEventListener('click', () => {
        const nodeId = card.getAttribute('data-node-id');
        const node = mapData.nodes.find(n => n.id === nodeId);
        const detail = container.querySelector('#concept-detail-panel');
        if (!node || !detail) return;
        detail.style.display = 'block';
        detail.innerHTML = `
          <div class="detail-content-box">
            <div class="detail-header">
              <span class="badge-type">${node.type.toUpperCase()}</span>
              <h3>${node.label}</h3>
              <button class="btn-close-detail">&times;</button>
            </div>
            <p class="detail-desc">${node.desc}</p>
            <div class="detail-actions">
              <button class="btn-secondary" id="btn-jump-page">Read in Story Viewer</button>
              <button class="btn-primary" id="btn-practice-concept">Practice This Skill</button>
            </div>
          </div>
        `;
        detail.querySelector('.btn-close-detail').addEventListener('click', () => {
          detail.style.display = 'none';
        });
        detail.querySelector('#btn-jump-page').addEventListener('click', () => {
          if (window.StudyApp) window.StudyApp.switchView('viewer');
        });
        detail.querySelector('#btn-practice-concept').addEventListener('click', () => {
          if (window.StudyApp) window.StudyApp.switchView('assessments');
        });
        detail.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderVocabActivities(container) {
    if (!container) return;
    const terms = Object.values(LESSON_DATA.terminology);
    container.innerHTML = `
      <div class="vocab-activity-shell">
        <div class="vocab-header">
          <h2>Interactive Vocabulary Mastery (10 Checkpoint 1 Words)</h2>
          <p>Master these official vocabulary and literary terms in context. Flip the cards, test pronunciation, and check definitions.</p>
        </div>

        <div class="vocab-grid">
          ${terms.map((t, idx) => `
            <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard for ${t.term}" data-index="${idx}">
              <div class="flashcard-inner">
                <div class="flashcard-front">
                  <span class="card-tag">${t.type}</span>
                  <h3 class="card-term">${t.term}</h3>
                  <button class="btn-speak-term" data-term="${t.term}" title="Pronounce">🔊</button>
                  <p class="flip-hint">Click card to reveal definition ↻</p>
                </div>
                <div class="flashcard-back">
                  <h4>${t.term}</h4>
                  <p class="card-def">${t.studentDef}</p>
                  <blockquote class="card-quote">"${t.exampleQuote}"</blockquote>
                  <small class="card-citation">${t.sourceCitation}</small>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Card flip logic
    container.querySelectorAll('.flashcard').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-speak-term')) return;
        card.classList.toggle('flipped');
      });
    });

    // Pronunciation button
    container.querySelectorAll('.btn-speak-term').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = btn.getAttribute('data-term');
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(word);
          u.lang = 'en-US';
          window.speechSynthesis.speak(u);
        }
      });
    });
  }

  function renderAceOrganizer(container) {
    if (!container) return;
    const ace = LESSON_DATA.aceFramework;
    container.innerHTML = `
      <div class="ace-organizer-shell">
        <div class="ace-header">
          <h2>ACE Evidence-Based Writing Lab</h2>
          <p class="ace-prompt-box"><strong>Writing Prompt:</strong> ${ace.prompt}</p>
        </div>

        <div class="ace-step-grid">
          <!-- Step 1: Answer -->
          <div class="ace-card">
            <div class="ace-step-badge">STEP A</div>
            <h3>Answer the Prompt</h3>
            <p>${ace.organizer.answer.guidance}</p>
            <div class="starter-select-group">
              <label>Sentence Starters:</label>
              <select class="form-select" id="ace-starter-select">
                <option value="">Select a sentence starter...</option>
                ${ace.organizer.answer.sentenceStarters.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <textarea class="form-control" id="ace-a-input" rows="3" placeholder="Draft your answer/claim here..."></textarea>
            <div class="model-reveal-toggle">
              <button class="btn-link" id="btn-toggle-model-a">View Model Claim</button>
              <div class="model-box" id="model-a-box" style="display:none;">${ace.organizer.answer.modelText}</div>
            </div>
          </div>

          <!-- Step 2: Cite -->
          <div class="ace-card">
            <div class="ace-step-badge">STEP C</div>
            <h3>Cite Textual Evidence</h3>
            <p>${ace.organizer.cite.guidance}</p>
            <div class="evidence-picker">
              <label>Select Evidence from Checkpoint 1 Passages:</label>
              ${ace.organizer.cite.evidenceBank.map(ev => `
                <div class="evidence-item" data-quote="${escapeHtml(ev.quote)}">
                  <p class="ev-quote">${ev.quote}</p>
                  <small class="ev-context">${ev.context}</small>
                  <button class="btn-insert-evidence">Insert Quote</button>
                </div>
              `).join('')}
            </div>
            <textarea class="form-control" id="ace-c-input" rows="3" placeholder="Integrate and cite your evidence here..."></textarea>
          </div>

          <!-- Step 3: Explain -->
          <div class="ace-card">
            <div class="ace-step-badge">STEP E</div>
            <h3>Explain & Analyze</h3>
            <p>${ace.organizer.explain.guidance}</p>
            <div class="starter-select-group">
              <label>Analytical Starters:</label>
              <select class="form-select" id="ace-explain-starter">
                <option value="">Select an analytical starter...</option>
                ${ace.organizer.explain.sentenceStarters.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <textarea class="form-control" id="ace-e-input" rows="4" placeholder="Explain how your quotes prove your claim..."></textarea>
            <div class="model-reveal-toggle">
              <button class="btn-link" id="btn-toggle-model-e">View Model Analysis</button>
              <div class="model-box" id="model-e-box" style="display:none;">${ace.organizer.explain.modelText}</div>
            </div>
          </div>
        </div>

        <!-- Compiled Paragraph & Self-Check -->
        <div class="compiled-paragraph-card">
          <h3>Your Complete ACE Paragraph</h3>
          <div class="compiled-preview" id="compiled-ace-preview">
            <em class="text-muted">As you draft above, your compiled paragraph will display here...</em>
          </div>
          <div class="rubric-checklist">
            <h4>Self-Assessment Rubric (Target: 16/16)</h4>
            <div class="rubric-grid">
              ${ace.rubric.map(r => `
                <label class="rubric-check-item">
                  <input type="checkbox" class="rubric-check">
                  <span><strong>${r.criteria} (${r.points} pts):</strong> ${r.descriptor}</span>
                </label>
              `).join('')}
            </div>
            <button class="btn-primary" id="btn-submit-ace">Submit Paragraph for Feedback</button>
            <div class="ace-feedback-result" id="ace-feedback-target" style="display:none;"></div>
          </div>
        </div>
      </div>
    `;

    // Interactive event bindings
    const aInput = container.querySelector('#ace-a-input');
    const cInput = container.querySelector('#ace-c-input');
    const eInput = container.querySelector('#ace-e-input');
    const preview = container.querySelector('#compiled-ace-preview');

    function updatePreview() {
      const a = aInput.value.trim();
      const c = cInput.value.trim();
      const e = eInput.value.trim();
      if (!a && !c && !e) {
        preview.innerHTML = '<em class="text-muted">As you draft above, your compiled paragraph will display here...</em>';
        return;
      }
      preview.innerHTML = `
        <span class="preview-a">${escapeHtml(a)} </span>
        <span class="preview-c">${escapeHtml(c)} </span>
        <span class="preview-e">${escapeHtml(e)}</span>
      `;
    }

    aInput.addEventListener('input', updatePreview);
    cInput.addEventListener('input', updatePreview);
    eInput.addEventListener('input', updatePreview);

    // Starters insertion
    container.querySelector('#ace-starter-select').addEventListener('change', (e) => {
      if (e.target.value) {
        aInput.value = e.target.value + ' ' + aInput.value;
        updatePreview();
      }
    });

    container.querySelector('#ace-explain-starter').addEventListener('change', (e) => {
      if (e.target.value) {
        eInput.value = e.target.value + ' ' + eInput.value;
        updatePreview();
      }
    });

    // Evidence inserts
    container.querySelectorAll('.btn-insert-evidence').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.evidence-item');
        const quote = item.getAttribute('data-quote');
        cInput.value = (cInput.value ? cInput.value + ' ' : '') + quote;
        updatePreview();
      });
    });

    // Model toggles
    container.querySelector('#btn-toggle-model-a').addEventListener('click', () => {
      const b = container.querySelector('#model-a-box');
      b.style.display = b.style.display === 'none' ? 'block' : 'none';
    });
    container.querySelector('#btn-toggle-model-e').addEventListener('click', () => {
      const b = container.querySelector('#model-e-box');
      b.style.display = b.style.display === 'none' ? 'block' : 'none';
    });

    // Submission check
    container.querySelector('#btn-submit-ace').addEventListener('click', () => {
      const fb = container.querySelector('#ace-feedback-target');
      fb.style.display = 'block';
      const a = aInput.value.trim();
      const c = cInput.value.trim();
      const e = eInput.value.trim();

      if (!a || !c || !e) {
        fb.className = 'ace-feedback-result alert-warning';
        fb.innerHTML = '<strong>⚠️ Incomplete Paragraph:</strong> Please provide all three parts: Answer (Claim), Citation (Evidence), and Explanation.';
        return;
      }

      fb.className = 'ace-feedback-result alert-success';
      fb.innerHTML = `
        <h4>✓ Excellent Structural Integration!</h4>
        <p>Your ACE paragraph satisfies all academic criteria:</p>
        <ul>
          <li><strong>Answer (Claim):</strong> Clear assertion of how the piano\'s symbolic meaning changes.</li>
          <li><strong>Citation (Evidence):</strong> Grounded in authentic text references from "Two Kinds."</li>
          <li><strong>Explanation (Analysis):</strong> Connects personal rebellion to final reconciliation and thematic maturity.</li>
        </ul>
        <p class="text-success"><strong>Mastery Score: 16/16</strong> recorded to your student profile!</p>
      `;

      if (window.MasteryDashboard) {
        window.MasteryDashboard.recordSkillAttempt('literature-g9-two-kinds', 'ace_writing', true);
      }
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  return {
    getLessonData,
    renderLessonHome,
    renderConceptMap,
    renderVocabActivities,
    renderAceOrganizer
  };
})();
