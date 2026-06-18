"""Qwen 2 client."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import ClientOptions, HttpClient, resolve_api_key

from .resources.edit_image import EditImage
from .resources.remix_image import RemixImage
from .resources.text_to_image import TextToImage


class Qwen2Client:
    """Qwen 2 text-to-image, remix-image, and edit-image client.

    Example::

        client = Qwen2Client(api_key="sk-...")
        result = client.edit_image.run(
            model="qwen-2-edit-image",
            prompt="Replace the background with a neon-lit city skyline",
            source_image_url="https://example.com/input.jpg",
        )
    """

    def __init__(self, api_key: Optional[str] = None, **options: Any) -> None:
        resolved_api_key = resolve_api_key(api_key)
        client_options = ClientOptions(api_key=resolved_api_key, **options)
        http = client_options.http_client or HttpClient(client_options)
        self.text_to_image = TextToImage(http)
        self.remix_image = RemixImage(http)
        self.edit_image = EditImage(http)
