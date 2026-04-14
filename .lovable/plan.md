

# Query GoHighLevel AI Bots

## What we'll do

Create a temporary edge function (or use a one-off script via the existing `ghl-sync` infrastructure) to call the GHL Conversation AI API and retrieve all AI bot/agent configurations from your account.

## Steps

1. **Call the GHL API** — Hit `GET https://services.leadconnectorhq.com/conversation-ai/agents/search?limit=100` using your existing `GHL_API_KEY` and `GHL_LOCATION_ID` secrets. The API requires `Version: 2021-04-15` header.

2. **Retrieve full agent details** — For each agent returned, call `GET /conversation-ai/agents/{agentId}` to get the complete configuration (name, status, model, prompt/instructions, actions, channels, settings).

3. **List actions per agent** — Call `GET /conversation-ai/agents/{agentId}/actions/list` to see what each bot can do (book appointments, transfer calls, etc.).

4. **Report findings** — Compile everything into a clear summary: agent names, statuses, what channels they're active on, their configured actions, and any relevant settings.

## Technical approach

I'll use `code--exec` to run a quick script that calls the GHL API using your existing secrets (`GHL_API_KEY`, `GHL_LOCATION_ID`) from the edge function environment. No permanent code changes needed — this is a one-time information-gathering task.

## No code changes to your project

This is purely a read-only investigation. No files in your codebase will be modified.

