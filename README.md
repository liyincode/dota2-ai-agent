# Dota2 Match Agent

English | [简体中文](./README.zh-CN.md)

An AI assistant for retrieving Dota 2 match information.

![Dota2 Agent Logo](demo.png)


## Overview

Dota2 Match Agent is an AI agent specifically designed to query Dota 2 match data. By providing a match ID, users can obtain detailed match information including:

- Match duration
- Winning team (Radiant/Dire)
- Player information for both teams (hero IDs, kills, deaths, assists)

## Technical Implementation

This project utilizes the following technology stack:

- Mastra Core framework for creating AI agents and tools
- OpenAI's GPT-4o-mini model for conversational capabilities
- OpenDota API for retrieving real-time match data

## Installation Guide

### Prerequisites

- A valid OpenAI API key

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/dota2-match-agent.git
cd dota2-match-agent
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   Create a `.env.development` file in the project root directory and add the following:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the service
```bash
npm run dev
```

## API Reference

This project leverages OpenDota's public API to fetch match data. For API details, refer to: https://docs.opendota.com/#section/Introduction
