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

### 1. Clone the repository

```bash
git clone https://github.com/monikamunusamy/ai-transcript-summarizer.git
cd ai-transcript-summarizer
2. Install dependencies
If you are using a package-based version of the project:

npm install
3. Run the project
npm start
Then open:

http://localhost:3000
Usage
Paste your transcript into the transcript field
Add your Groq API key
Generate the summary
Review the structured output
Current Scope
This MVP currently supports transcript-based summarization.

Video-link summarization was explored during development, but the project was intentionally narrowed to transcript-only summarization for a cleaner and more dependable first release.

Why This Project
This project was built as part of a commitment to build and ship one AI project every week.

The goal is to learn by building, stay consistent, and create practical AI tools around real user problems.

Roadmap
Potential next improvements:

Better visual presentation of summary sections
Copy-to-clipboard for generated summaries
Download summary as PDF or Markdown
Transcript file upload
Smarter formatting for different transcript types
Support for multiple summarization styles
Author
Built by Monika Munusamy
