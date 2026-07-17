# Qwen 2 API Go SDK for RunAPI

The Qwen 2 Go SDK is the language-specific package for Qwen 2 on RunAPI. Use this package for image generation, image editing, and creative production workflows when your application needs request bodies, task status lookup, and consistent RunAPI errors in Go.

This README is the Go package guide inside the public `qwen-2-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/qwen-2; for API reference, use https://runapi.ai/docs#qwen-2; for SDK docs, use https://runapi.ai/docs#sdk-qwen-2.

## Install

```bash
go get github.com/runapi-ai/qwen2-sdk/go@latest
```

## Quick start

```go
import (
  "context"

  "github.com/runapi-ai/qwen-2-sdk/go/qwen2"
)

client, err := qwen2.NewClient()
task, err := client.TextToImage.Create(context.Background(), qwen2.TextToImageParams{
  // Pass the Qwen 2 JSON request body from https://runapi.ai/docs#qwen-2.
})
status, err := client.TextToImage.Get(context.Background(), task.ID)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Use the public Go module with `github.com/runapi-ai/core-sdk/go` options when building image services, CLIs, or workers. The available resources are `TextToImage`, `RemixImage`, and `EditImage`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/qwen-2
- SDK docs: https://runapi.ai/docs#sdk-qwen-2
- Product docs: https://runapi.ai/docs#qwen-2
- Pricing and rate limits: https://runapi.ai/models/qwen-2/text-to-image
- Provider comparison: https://runapi.ai/providers/alibaba
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/qwen2-sdk

## License

Licensed under the Apache License, Version 2.0.
