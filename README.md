# AI Transcript Summarizer

A lightweight web app that turns raw transcripts into clear, structured summaries using LLMs.

## Overview

AI Transcript Summarizer helps transform long-form transcript text into a professional summary format that is easier to read, review, and share. The app is designed for fast summarization of discussions, interviews, talks, lectures, and other transcript-based content.

The current version focuses on transcript-first summarization to keep the workflow simple, reliable, and practical for early users.

## Features

- Clean transcript input interface
- Professional structured summary output
- Executive summary generation
- Ordered main points
- Important insights
- Final takeaway section
- Simple browser-based experience
- LLM-powered summarization using Groq

## Output Format

The app generates summaries in four sections:

- Executive Summary
- Main Points
- Important Insights
- Final Takeaway

This makes the result more useful than raw AI output and easier to scan quickly.

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Groq API
- Llama model for summarization

## How It Works

1. Paste a transcript into the app
2. Enter your Groq API key
3. Click `Generate Summary`
4. Receive a structured professional summary

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/monikamunusamy/ai-transcript-summarizer.git
cd ai-transcript-summarizer
2. Install Dependencies
npm install
3. Run the Project
npm start
Then open the app in your browser at:

http://localhost:3000
Usage
Paste your transcript into the input field
Enter your Groq API key
Click Generate Summary
Review the structured output
Current Scope
This MVP currently focuses on transcript-based summarization.

Video-link summarization was explored during development, but the project was intentionally narrowed to transcript-only summarization for a cleaner, more reliable, and more practical first release.

Why This Project
This project was built as part of a commitment to build and ship one AI project every week.

The goal is simple:
learn by building, stay consistent, and create practical AI tools around real user problems.

Roadmap
Potential next improvements include:

Better visual presentation of summary sections
Copy-to-clipboard support for generated summaries
Export as PDF or Markdown
Transcript file upload support
Smarter formatting for different transcript types
Multiple summarization styles
Author
Built by Monika Munusamy


A few small improvements I made:
- more professional capitalization
- cleaner step wording
- more natural product language
- stronger roadmap wording
- your name linked to GitHub

One important note:
if your project has **no dependencies**, then `npm install` is not really needed. In that case we can simplify it to:

```md
### 2. Run the Project

```bash
npm start
