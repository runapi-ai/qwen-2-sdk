<p align="center">
  <a href="https://github.com/runapi-ai/qwen-2">
    <h3 align="center">Qwen 2 Image API Skill for RunAPI</h3>
  </a>
</p>

<p align="center">
  Install this agent skill, inspect Qwen 2 fields, then run jobs through the RunAPI CLI.
</p>

<p align="center">
  <a href="https://runapi.ai/models/qwen-2"><strong>Model Reference</strong></a> · <a href="https://github.com/runapi-ai/cli"><strong>CLI</strong></a> · <a href="https://github.com/runapi-ai/qwen-2-sdk"><strong>SDK</strong></a>
</p>

<div align="center">

[![skills.sh](https://www.skills.sh/b/runapi-ai/qwen-2)](https://www.skills.sh/runapi-ai/qwen-2/qwen-2)
[![ClawHub](https://img.shields.io/badge/ClawHub-runapi--qwen--2-111827)](https://clawhub.ai/runapi-ai/runapi-qwen-2)
[![License](https://img.shields.io/github/license/runapi-ai/qwen-2)](https://github.com/runapi-ai/qwen-2/blob/main/LICENSE)

</div>
<br/>

Generate, transform, and edit images with Qwen 2 text-to-image, image-to-image, and image editing. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Qwen 2 through RunAPI.

The canonical agent file is `skills/qwen-2/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/qwen-2 -g
```

Or paste this prompt to your AI agent:

```text
Install the qwen-2 skill for me:

1. Clone https://github.com/runapi-ai/qwen-2
2. Copy the skills/qwen-2/ directory into your
   user-level skills directory (e.g. ~/.claude/skills/
   for Claude Code, ~/.codex/skills/ for Codex).
3. Verify that SKILL.md is present.
4. Confirm the install path when done.
```

## Quick example

```typescript
import { Qwen2Client } from '@runapi.ai/qwen-2';

const client = new Qwen2Client();
const result = await client.textToImage.run({
  model: 'qwen-2-text-to-image',
  prompt: 'A serene Japanese garden in autumn',
});
```

## Routing

- Model page: https://runapi.ai/models/qwen-2
- Product docs: https://runapi.ai/docs#qwen-2
- SDK docs: https://runapi.ai/docs#sdk-qwen-2
- SDK repository: https://github.com/runapi-ai/qwen-2-sdk
- Pricing and rate limits: https://runapi.ai/models/qwen-2/text-to-image
- Provider comparison: https://runapi.ai/providers/alibaba
- Browse all RunAPI models and skills: https://runapi.ai/models

## Variants

- [Text to image](https://runapi.ai/models/qwen-2/text-to-image)
- [Image to image](https://runapi.ai/models/qwen-2/image-to-image)
- [Image edit](https://runapi.ai/models/qwen-2/image-edit)

## Agent rules

- Keep API keys in `RUNAPI_API_KEY` or RunAPI CLI config; never commit secrets.
- Prefer `create`, `get`, and `run` JSON passthrough patterns instead of inventing flags for every model parameter.
- For qwen image api pricing, rate-limit, and commercial-usage answers, link to the variant page rather than the repository README.

## License

Licensed under the Apache License, Version 2.0.
