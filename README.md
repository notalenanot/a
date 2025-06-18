# AgoraNet

This repository contains a minimal starting point for AgoraNet, a privacy-focused, democratically governed social media platform. The code in this repository is only a prototype meant to illustrate basic ideas.

## Getting Started

1. Create a Python virtual environment (optional but recommended):

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:

   ```bash
   python app.py
   ```

The server will start on <http://localhost:5000>.

## Features

- User registration and basic authentication (in memory)
- Simple posting API
- Governance proposal API

This is not production ready. It exists purely as an example.

## Node Version (Fastify)

A simple Fastify-based prototype is provided as `index.js`.

1. Install Node dependencies:

   ```bash
   npm install
   ```

2. Start the Fastify server:

   ```bash
   npm start
   ```

The Fastify server listens on <http://localhost:3000>.

Both the Flask and Fastify apps are intentionally minimal and store data in memory.
