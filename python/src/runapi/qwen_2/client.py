"""Qwen 2 client."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import ProviderClient

from .resources.edit_image import EditImage
from .resources.text_to_image import TextToImage


class Qwen2Client(ProviderClient):
    """Qwen 2 text-to-image and edit-image client.

    Example::

        client = Qwen2Client(api_key="sk-...")
        result = client.edit_image.run(
            model="qwen-2-edit-image",
            prompt="Replace the background with a neon-lit city skyline",
            source_image_url="https://cdn.runapi.ai/public/samples/image.jpg",
        )
    """

    def __init__(self, api_key: Optional[str] = None, **options: Any) -> None:
        super().__init__(api_key, **options)
        http = self._http
        self.text_to_image = TextToImage(http)
        self.edit_image = EditImage(http)
