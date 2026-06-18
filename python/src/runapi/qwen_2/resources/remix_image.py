"""Qwen 2 remix-image resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource, ValidationError

from ..types import (
    OUTPUT_FORMATS,
    REMIX_IMAGE_MODELS,
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
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a remix-image task.

        Args:
            id: The task id.

        Returns:
            The current status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        if not params.get("model"):
            raise ValidationError("model is required")
        if not params.get("prompt"):
            raise ValidationError("prompt is required")
        if not params.get("source_image_url"):
            raise ValidationError("source_image_url is required")

        model = params.get("model")
        if model not in REMIX_IMAGE_MODELS:
            raise ValidationError(f"Invalid model: {model}. Must be one of: {', '.join(REMIX_IMAGE_MODELS)}")

        self._validate_optional(params, "output_format", OUTPUT_FORMATS)
