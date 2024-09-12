# AI Email Writer Backend API

This project provides an API for generating emails to an extenion and website using different tones using OpenAI's GPT-3.5 model. The API serves two endpoints:

1.  **/api/generate-email**: Generates a full email based on the user's input.

2.  **/api/context-menu/generate-email**: Generates a single body paragraph for an email, intended to be used with a context menu feature.

## Requirements

- Node.js

- OpenAI API Key

## Installation & Startup

1. Clone the repository:

```bash
git  clone  https://github.com/Wlyates00/ai-email-scribe-API

cd <your-repository-folder>
```

2. Install dependencies:

```bash
npm  install
```

3. Create a .env file with your Open AI API key:

```.env
OPEN_API_KEY=your_openai_api_key
```

4. Start API:

```bash
node  api.js
```

## Endpoints

### 1. `/api/generate-email`

This endpoint generates a full email based on the user's input tone and prompt.

#### Method: `POST`

#### Request Body:

```json
{
  "tone": "Professional",

  "promptText": "I need to reschedule our meeting."
}
```

#### ResponseBody:

```json
{
  "generatedEmail": "Hi there, I wanted to let you know that I need to reschedule our meeting. Please let me know what time works best for you!"
}
```

### 2. `/api/context-menu/generate-email`

This endpoint generates a full email based on the user's input tone and prompt.

#### Method: `POST`

#### Request Body:

```json
{
  "tone": "Reasonable",

  "promptText": "I need to reschedule our meeting."
}
```

#### ResponseBody:

```json
{
  "generatedEmail": "Hi there, I wanted to let you know that I need to reschedule our meeting. Please let me know what time works best for you!"
}
```