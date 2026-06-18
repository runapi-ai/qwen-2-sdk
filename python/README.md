# Qwen 2 Python SDK for RunAPI

The Qwen 2 Python SDK is the language-specific package for Qwen 2 on RunAPI. Use this qwen package for text-to-image, image editing, and creative production flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in Python.

This qwen README is the Python package guide inside the public `qwen2-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/qwen-2; for API reference, use https://runapi.ai/docs#qwen-2; for SDK docs, use https://runapi.ai/docs#sdk-qwen-2.

## Install

```bash
pip install runapi-qwen-2
```

## Quick start

```python
from runapi.qwen_2 import Qwen2Client

client = Qwen2Client()  # reads RUNAPI_API_KEY, or pass api_key="sk-..."

task = client.text_to_image.create(
    model="qwen-2-text-to-image",
    prompt="A neon city street after rain, cinematic",
    aspect_ratio="16:9",
)
status = client.text_to_image.get(task.id)

edit = client.edit_image.create(
    model="qwen-2-edit-image",
    prompt="Replace the background with a neon-lit city skyline",
    source_image_url="https://example.com/source.jpg",
)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion:

```python
result = client.text_to_image.run(
    model="qwen-2-text-to-image",
    prompt="A serene mountain lake at dawn",
)
print(result.images[0].url)
```

In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Pass parameters as keyword arguments and catch the `runapi.qwen_2` error classes when building image jobs, workers, or scripts. The available resources are `text_to_image`, `remix_image`, and `edit_image`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

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
