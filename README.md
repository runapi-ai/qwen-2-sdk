# Qwen Image API SDK for RunAPI

The qwen image api SDK packages JavaScript, Ruby, and Go clients for Qwen 2 on RunAPI. Use this qwen image api SDK for text-to-image, image-to-image, edit, and creative production workflows that need typed installs, JSON request bodies, task polling, and consistent RunAPI errors across services.

Qwen 2 belongs to the Alibaba catalog on RunAPI. The public model page is https://runapi.ai/models/qwen-2; variant pages below carry pricing, rate-limit, and commercial-usage details. The public `qwen-2-sdk` repository groups the JavaScript, Ruby, and Go packages for this model.

## Install

```bash
npm install @runapi.ai/qwen-2
gem install runapi-qwen_2
go get github.com/runapi-ai/qwen-2-sdk/go@latest
```

## What you can build

- Build product imagery, creative automation, design previews, and agent image workflows with the qwen image api SDK.
- Keep one model-specific repository while installing only the language package your app needs.
- Use `create` for submit-only jobs, `get` for status lookup, and `run` for submit-and-poll scripts.
- Handle authentication, validation, rate limits, insufficient credits, task failures, and polling timeouts through RunAPI SDK errors.

The JavaScript client exposes textToImage, imageToImage, and editImage resources, and the Ruby and Go packages mirror the same RunAPI task lifecycle.

## JavaScript quick start

```typescript
import { Qwen2Client } from '@runapi.ai/qwen-2';

const client = new Qwen2Client();

const task = await client.textToImage.create({
  model: 'qwen-2-text-to-image',
  prompt: 'A cinematic glass city at sunrise',
});

const status = await client.textToImage.get(task.id);
```

For short scripts, use `run` with the same JSON body to create the task and wait for completion. For web request handlers, prefer `create` plus webhook or later `get` polling so the server does not hold a worker open.

## Repository layout

- `js/` publishes `@runapi.ai/qwen-2`.
- `ruby/` publishes `runapi-qwen_2` when RubyGems publishing resumes.
- `go/` publishes `github.com/runapi-ai/qwen-2-sdk/go` and depends on `github.com/runapi-ai/core-sdk/go`.

## Public links

- Model page: https://runapi.ai/models/qwen-2
- SDK docs: https://runapi.ai/docs#sdk-qwen_2
- Product docs: https://runapi.ai/docs#qwen_2
- SDK repository: https://github.com/runapi-ai/qwen-2-sdk
- Skill repository: https://github.com/runapi-ai/qwen2
- Provider comparison: https://runapi.ai/providers/alibaba
- Full catalog: https://runapi.ai/models

## Pricing and variants

Use the most specific qwen image api variant page for pricing, rate limits, and commercial usage:
- [Text to image](https://runapi.ai/models/qwen-2/text-to-image)
- [Image to image](https://runapi.ai/models/qwen-2/image-to-image)
- [Image edit](https://runapi.ai/models/qwen-2/image-edit)

Default pricing link for the qwen image api SDK: https://runapi.ai/models/qwen-2/text-to-image

## FAQ

### Which package should I install for qwen image api work?

Install the model package for your language: `@runapi.ai/qwen-2`, `runapi-qwen_2`, or `github.com/runapi-ai/qwen-2-sdk/go`. Install core SDK packages only when you are building shared SDK infrastructure.

### Where should public links point?

Primary qwen image api links point to https://runapi.ai/models/qwen-2. Pricing and usage-policy links point to variant pages such as https://runapi.ai/models/qwen-2/text-to-image. Provider comparisons point to https://runapi.ai/providers/alibaba, and broad browsing points to https://runapi.ai/models.

## License

Licensed under the Apache License, Version 2.0.
