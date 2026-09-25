# 🎬 Repeatable Educational Video Creation Workflow
**Target Product**: 5-Minute Bite-Sized English Lessons for Grades 3–6  
**Audience**: Young learners (Ages 8–12), ESL/ELL students, and supporting parents  
**Project Integration**: Tutoring Tracker Web App (`tutoring-tracker`) & YouTube Unlisted/Public Channel

---

## 1. Overview of the 7-Step Production Pipeline

```
[1. Script & Objective] ──> [2. Visual Slides] ──> [3. OBS Studio Recording] ──> 
[4. Non-Linear Editing] ──> [5. Multi-Target Export] ──> [6. Web Embedding] ──> [7. Mobile Verification]
```

### Step 1: Prepare the Lesson Objective & Pedagogical Script
- **Duration Budget**: Exactly 4:30 to 5:30 minutes.
- **Pedagogical Structure (AIDA for Education)**:
  - **Hook (0:00–0:45)**: Real-world riddle or exciting sentence mystery (e.g., *"Why did Detective Maya say the clue was 'conspicuous'?"*).
  - **Direct Instruction / Concept (0:45–2:15)**: Rule introduction with high-contrast visual examples (e.g., Context Clues: Definition, Synonym, Antonym, Inference).
  - **Guided Practice / "Your Turn" (2:15–3:45)**: Interactive freeze-frame where students pause the video for 10 seconds to solve a problem.
  - **Recap & Action (3:45–4:45)**: Summary bullet points + call to download the attached worksheet and take the 3-question quiz below the video player.
- **Pacing**: 120–140 words per minute. Elementary learners require clear enunciations, intentional pauses, and zero speed-talking.

### Step 2: Create High-Legibility Visual Slides
- **Aspect Ratio**: 16:9 widescreen (`1920×1080` standard).
- **Typography**: Large sans-serif or rounded fonts (minimum `36pt` for body text, `54pt` for headings).
- **Visual Design Rules**:
  - Maximum 15 words per slide.
  - Color-coded grammatical elements (e.g., Blue for verbs, Amber for adjectives, Green for context clues).
  - High contrast (dark text on cream background or clean white).
  - Leave bottom 20% clear for subtitles/captions.
  - Leave top-right or bottom-right corner empty if showing webcam.

### Step 3: Record Screen, Microphone, and Webcam via OBS Studio
- **Scene Setup**:
  - **Scene 1 (Intro/Outro)**: Fullscreen Teacher Webcam + Microphone.
  - **Scene 2 (Main Lesson)**: Fullscreen Slide Capture (Window or Display Capture) + Picture-in-Picture circular/rounded webcam in bottom-right corner.
- **Audio Pre-processing (OBS Filters on Mic Input)**:
  - **Noise Suppression**: RNNoise (Good quality, low CPU) or Speex.
  - **Noise Gate**: Close threshold `-42 dB`, Open threshold `-34 dB` (cuts out computer fan and room hum during pauses).
  - **Compressor**: Ratio `3:1`, Threshold `-18 dB`, Attack `6 ms`, Release `60 ms` (evens out voice volume spikes).
  - **Limiter**: Threshold `-1.5 dB` (guarantees zero clipping distortion).

### Step 4: Edit Pauses, Mistakes, Captions, Titles & Music
- Cut dead air, false starts, and tongue twisters.
- Add lower-third title card at 0:05: `Grade 4–5 English • Mastering Context Clues`.
- Add subtle sound effects (soft chime or "ding") when key definitions or answers appear on screen.
- Background music: Educational acoustic or lofi background music set at `-26 dB` relative to dialogue (voice must sit at `-14 LUFS` to `-16 LUFS`).

### Step 5: Export for YouTube & Web Embedding
- Export two versions:
  - **Master Archive / YouTube**: High bitrate (`1080p60` or `1080p30` @ `12–16 Mbps`).
  - **Web Embed Target**: Web-optimized MP4 (`1080p30` @ `3.5–5 Mbps` with `faststart / moov atom at beginning`).

### Step 6: Add Video to the Tutoring Website
- Place or link video in the `Video Lessons` component within `index.html`.
- Attach synchronized WebVTT captions (`.vtt`), lesson objective text, worksheet download link, and formative quiz link.

### Step 7: Test Loading Speed & Mobile Playback
- Audit on iPhone Safari: Test responsive aspect ratio (16:9), native player controls, caption rendering, and offline fallback behavior.

---

## 2. Technical Production Specifications

### 2.1 Video & Audio Parameters

| Setting | Recommended Spec | Rationale |
|---|---|---|
| **Canvas & Output Resolution** | `1920 × 1080` (Full HD, 16:9) | Universal standard for Chromebooks, iPads, and MacBooks. |
| **Framerate** | `30 fps` (or `60 fps` if showing high-motion animations) | 30 fps produces smaller file sizes while remaining perfectly smooth for slides and lecture presentation. |
| **Video Codec** | H.264 (AVC) / Profile High / Level 4.2 | Supported by 99.9% of all mobile browsers, iOS Safari, and Android without transcoding. |
| **Color Space** | Rec. 709 / Color Range Partial | Standard broadcast and web dynamic range. |
| **Audio Format** | AAC-LC, Stereo, 48,000 Hz, 192 kbps | High-clarity vocal fidelity matching native macOS audio drivers. |
| **Integrated Loudness** | `-14 LUFS` (YouTube / Web Standard) | Prevents video from sounding quiet next to YouTube or other educational resources. |
| **True Peak** | `-1.0 dBTP` max | Prevents inter-sample clipping when compressed to lossy codecs. |

### 2.2 File Naming Conventions & Folder Architecture

Consistent file naming avoids broken links and lost project assets:

```
Pattern: GR[Grade]_[Subject]_[TopicCode]_[YYYYMMDD]_[AssetType]

Examples:
- GR4-5_ENG_ContextClues_20260925_Script.md
- GR4-5_ENG_ContextClues_20260925_Slides.pdf
- GR4-5_ENG_ContextClues_20260925_Raw_Take1.mkv
- GR4-5_ENG_ContextClues_20260925_Master_1080p.mp4
- GR4-5_ENG_ContextClues_20260925_Web_1080p.mp4
- GR4-5_ENG_ContextClues_20260925_Captions.vtt
- GR4-5_ENG_ContextClues_20260925_Thumbnail.jpg
```

#### Recommended macOS Folder Hierarchy
```
~/Documents/Tutoring-Content/
└── English/
    └── Grades-4-5/
        └── 2026-09-Context-Clues/
            ├── 01_PreProduction/
            │   ├── Script.md
            │   └── Slides.keynote (or .pptx)
            ├── 02_RawFootage/
            │   ├── Screen_Take1.mkv
            │   └── Audio_Voiceover.wav
            ├── 03_ProjectFiles/
            │   └── Lesson.kdenlive (or .drp / .mlt)
            ├── 04_Exports/
            │   ├── YouTube_Master_1080p.mp4
            │   └── Web_Optimized_1080p.mp4
            └── 05_WebAssets/
                ├── thumbnail.jpg
                ├── captions.vtt
                └── worksheet.pdf
```

---

## 3. Production Checklists

### 3.1 Pre-Recording Audio & Environment Checklist
- [ ] Room acoustics: Soft furnishings, curtains closed, avoid tiled rooms.
- [ ] Microphone positioning: 4–6 inches from mouth at a 45-degree angle to avoid plosives ('P' and 'B' pops).
- [ ] Pop filter or foam windscreen installed.
- [ ] OBS audio meter levels: Spoken voice sits comfortably in the **yellow zone (-18 dB to -10 dB)**; loud emphasis never hits the red (0 dB).
- [ ] Headphones worn to avoid audio feedback.

### 3.2 Thumbnail Checklist (YouTube & Web Component)
- [ ] Dimensions: `1280 × 720 px` (16:9), format: JPEG/WebP under 2 MB.
- [ ] High contrast: Vibrant background that pops on dark and light themes.
- [ ] Big, expressive teacher face or character visual on one side (occupying ~35% of canvas).
- [ ] Text: 3 to 4 words maximum in bold, legible font (e.g. *"Context Clues Fast!"*).
- [ ] Bottom-right timestamp safe zone: Keep bottom-right corner empty (video platforms place the duration timestamp badge there).

### 3.3 Caption & Accessibility Checklist (WebVTT)
- [ ] File format: UTF-8 plain text `.vtt` with `WEBVTT` header.
- [ ] Line count: Maximum 2 lines per subtitle cue.
- [ ] Character length: Maximum 37 characters per line.
- [ ] Reading speed: 120–140 words per minute for Grade 3–6 students.
- [ ] Synchronization: Cues match spoken word start within 100 milliseconds.
- [ ] Sound effects & pauses indicated in brackets: `[upbeat music]`, `[10-second student pause]`.

### 3.4 Web Export Checklist
- [ ] FastStart / Web-Optimized flag enabled (moves `moov` index atom to the start of the file for instant buffering).
- [ ] Bitrate capped between `3500 kbps` and `5000 kbps` for smooth 4G/5G mobile streaming without buffering.
- [ ] Audio encoded at AAC-LC 160–192 kbps, 48 kHz.
- [ ] No variable frame rate (VFR) — enforce constant frame rate (CFR 30.0 fps).

---

## 4. Two Workflow Profiles: Low-Cost vs. Higher-Quality

### Profile A: Zero / Low-Cost Workflow (100% Free & Open Source)
Best for fast turnaround, lightweight hardware, zero subscription cost:

1. **Slide Creation**: Apple Keynote (free on macOS) or Google Slides. Export as PDF or present in window.
2. **Recording**: **OBS Studio** (Free & Open Source). Records screen + webcam + mic with live audio filters directly to `.mkv` (crash-proof).
3. **Audio Polishing**: **Audacity** (Free & Open Source) or built-in OBS filters.
4. **Video Editing**: **Shotcut** or **Kdenlive** (Free & Open Source). Lightweight, fast cutting, easy subtitle burn-in, cross-platform.
5. **Transcription / Subtitles**: Local **Whisper CLI** (via `openai-whisper` or `whisper.cpp` on Apple Silicon). Generates `.vtt` files in seconds for free with zero cloud latency.
6. **Compression**: **HandBrake** (Free & Open Source) using the "Web 1080p30" preset with "Web Optimized" checkbox ticked.

### Profile B: Higher-Quality Workflow (Professional Grade)
Best for broadcast-quality lessons, advanced color grading, studio audio:

1. **Slide Creation**: Figma or Adobe Illustrator for custom vectors and educational infographics.
2. **Recording**: OBS Studio configured with high-bitrate Apple ProRes or HEVC NVENC/Apple Silicon Hardware Encoding.
3. **Hardware**: Dedicated USB/XLR microphone (e.g., Shure MV7 or Rode PodMic USB), key light, and 1080p/4K webcam (e.g., Elgato Facecam or mirrorless camera via Cam Link).
4. **Video Editing**: **DaVinci Resolve** (Free standard version or Studio).
   - Multi-track timeline, Fairlight audio mastering (Voice Isolation, EQ, dialogue leveling).
   - Fusion motion graphics for animated arrows and vocabulary callouts.
   - Built-in subtitle generator and YouTube direct render preset.
5. **Web Delivery**: Cloudflare Stream, Vimeo OTT, or YouTube Unlisted embed with custom iframe API controls.

---

## 5. Official Documentation References

Do not rely on guesswork or static presets across different editor versions. Always verify encoding options in the official references:

- **OBS Studio Official Wiki**: [https://obsproject.com/wiki/](https://obsproject.com/wiki/) (Refer to "Audio Filters Guide" and "Output Settings for Web Streaming").
- **Shotcut Documentation**: [https://www.shotcut.org/howtos/](https://www.shotcut.org/howtos/) (Refer to "Export Presets > H.264 Main Profile").
- **Kdenlive Manual**: [https://docs.kdenlive.org/](https://docs.kdenlive.org/) (Refer to "Rendering and Subtitles").
- **Blackmagic DaVinci Resolve Reference**: [https://www.blackmagicdesign.com/support/](https://www.blackmagicdesign.com/support/) (Refer to "Fairlight Page" and "Deliver Page QuickTime / MP4 settings").
- **FFmpeg H.264 Encoding Guide**: [https://trac.ffmpeg.org/wiki/Encode/H.264](https://trac.ffmpeg.org/wiki/Encode/H.264) (Authoritative source on `-movflags +faststart` and Constant Rate Factor `-crf 22`).
- **W3C WebVTT Specification**: [https://www.w3.org/TR/webvtt1/](https://www.w3.org/TR/webvtt1/) (Formatting rules for timed text and accessibility).
