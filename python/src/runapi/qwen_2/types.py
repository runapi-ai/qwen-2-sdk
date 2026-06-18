"""Qwen 2 model lists, enums, and response models."""

from __future__ import annotations

from runapi.core import BaseModel, TaskResponse, optional, required

MODELS = ["qwen-2-edit-image", "qwen-2-text-to-image", "qwen-2-remix-image"]
EDIT_MODELS = ["qwen-2-edit-image"]
TEXT_TO_IMAGE_MODELS = ["qwen-2-text-to-image"]
REMIX_IMAGE_MODELS = ["qwen-2-remix-image"]
EDIT_IMAGE_ASPECT_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"]
TEXT_TO_IMAGE_ASPECT_RATIOS = ["1:1", "3:4", "4:3", "9:16", "16:9"]
OUTPUT_FORMATS = ["jpeg", "png"]


class Image(BaseModel):
    """A generated image reference."""

    url = optional(str)


class ImageTaskResponse(TaskResponse):
    """Base response for an image task."""

    id = required(str)
    status = optional(str, enum=lambda: TaskResponse.Status.ALL)
    images = optional([lambda: Image])
    error = optional(str)


class TextToImageResponse(ImageTaskResponse):
    """Response for a text-to-image task."""

    pass


class RemixImageResponse(ImageTaskResponse):
    """Response for a remix-image task."""

    pass


class EditImageResponse(ImageTaskResponse):
    """Response for an edit-image task."""

    pass


class CompletedTextToImageResponse(TextToImageResponse):
    """Narrowed response from ``run()`` once polling observes completion."""

    images = required([lambda: Image])


class CompletedRemixImageResponse(RemixImageResponse):
    """Narrowed response from ``run()`` once polling observes completion."""

    images = required([lambda: Image])


class CompletedEditImageResponse(EditImageResponse):
    """Narrowed response from ``run()`` once polling observes completion."""

    images = required([lambda: Image])
