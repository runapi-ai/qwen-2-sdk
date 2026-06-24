"""Qwen 2 remix-image resource."""

from __future__ import annotations

from typing import Any

from runapi.core import Resource

from ..contract_gen import CONTRACT
from ..types import (
    CompletedRemixImageResponse,
    RemixImageResponse,
)


class RemixImage(Resource):
    """Create prompt-guided variations from a source image."""

    ENDPOINT = "/api/v1/qwen_2/remix_image"

    RESPONSE_CLASS = RemixImageResponse
    COMPLETED_RESPONSE_CLASS = CompletedRemixImageResponse

    def run(self, **params: Any) -> Any:
        """Create a remix-image task and poll until it completes.

        Args:
            **params: Remix-image parameters (model, prompt, source_image_url, ...).

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a remix-image task and return immediately with an ``id``.

        Args:
            **params: Remix-image parameters (model, prompt, source_image_url, ...).

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_contract(CONTRACT["remix-image"], compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a remix-image task.

        Args:
            id: The task id.

        Returns:
            The current status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")
