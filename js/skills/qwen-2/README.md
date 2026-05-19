# Qwen 2 Image API Skill for RunAPI

Generate, transform, and edit images with Qwen 2 text-to-image, image-to-image, and image editing. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Qwen 2 through RunAPI.

The canonical agent file is `skills/qwen-2/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/qwen2 -g
```

Or manually: clone this repo and copy `skills/qwen-2/` into your agent's skills directory.

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
