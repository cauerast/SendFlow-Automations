# Sendflow Analytics Integration for n8n

This Node.js script automates the extraction of leads (contacts) from a specific **Sendflow** release and sends them directly to an **n8n** webhook for further processing.

## How It Works

1. The script sends a `GET` request to the Sendflow API to fetch analytics data for the configured release.
2. It extracts the contact list (`contacts`).
3. If leads are found, it formats a payload containing the list, total count, release ID, and current timestamp.
4. The payload is sent via a `POST` request to the n8n test webhook.

## Prerequisites

Before running the script, make sure you have the following installed:
* [Node.js](https://nodejs.org) (version 14 or higher)
* NPM or Yarn

## Installation

1. Clone or download this repository.
2. Install the required dependencies by running:

```bash
npm install axios dotenv
```

## Configuration

Create a file named `.env` in the root directory of your project and configure the following environment variables:

```env
RELEASE_ID=your_release_id_here
API_KEY=your_sendflow_api_token_here
```

## How to Run

To run the script and trigger the data transfer to n8n, use the following command:

```bash
node your_file.js
```

## Payload Sent to n8n

The n8n webhook will receive a JSON structure similar to this:

```json
{
  "leads": [
    { ... contact 1 data ... },
    { ... contact 2 data ... }
  ],
  "total_count": 2,
  "release_id": "your_release_id_here",
  "data_extracao": "2026-11-10T16:35:00.000Z"
}
```
