import pytest

from runapi.core import config
from runapi.core.errors import AuthenticationError, ValidationError
from runapi.qwen_2 import Qwen2Client
from runapi.qwen_2.resources.edit_image import EditImage
from runapi.qwen_2.resources.remix_image import RemixImage
from runapi.qwen_2.resources.text_to_image import TextToImage
from runapi.qwen_2.types import (
    CompletedTextToImageResponse,
    EditImageResponse,
    RemixImageResponse,
    TextToImageResponse,
)


class FakeHttp:
    def __init__(self, *responses):
        self._responses = list(responses)
        self.calls = []

    def request(self, method, path, body=None, options=None):
        self.calls.append((method, path, body))
        if self._responses:
            return self._responses.pop(0)
        return {"id": "task_1", "status": "pending"}


@pytest.fixture(autouse=True)
def reset_config(monkeypatch):
    monkeypatch.delenv("RUNAPI_API_KEY", raising=False)
    monkeypatch.setattr(config, "api_key", None)
    yield


# --- auth -----------------------------------------------------------------


def test_accepts_api_key_parameter():
    assert isinstance(Qwen2Client(api_key="k", http_client=FakeHttp()), Qwen2Client)


def test_falls_back_to_global(monkeypatch):
    monkeypatch.setattr(config, "api_key", "global-key")
    assert isinstance(Qwen2Client(http_client=FakeHttp()), Qwen2Client)


def test_falls_back_to_env(monkeypatch):
    monkeypatch.setenv("RUNAPI_API_KEY", "env-key")
    assert isinstance(Qwen2Client(http_client=FakeHttp()), Qwen2Client)


def test_raises_without_api_key():
    with pytest.raises(AuthenticationError, match="API key is required"):
        Qwen2Client()


# --- injection / accessors ------------------------------------------------


def test_uses_injected_http_client():
    fake = FakeHttp()
    client = Qwen2Client(api_key="k", http_client=fake)
    assert client.text_to_image._http is fake
    assert client.remix_image._http is fake
    assert client.edit_image._http is fake


def test_exposes_resource_accessors():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    assert isinstance(client.text_to_image, TextToImage)
    assert isinstance(client.remix_image, RemixImage)
    assert isinstance(client.edit_image, EditImage)


# --- request shapes -------------------------------------------------------


def test_create_posts_compacted_body():
    fake = FakeHttp({"id": "t1", "status": "pending"})
    client = Qwen2Client(api_key="k", http_client=fake)
    result = client.text_to_image.create(
        model="qwen-2-text-to-image", prompt="hello world", aspect_ratio="1:1", output_format=None
    )
    assert fake.calls == [
        ("post", "/api/v1/qwen_2/text_to_image", {"model": "qwen-2-text-to-image", "prompt": "hello world", "aspect_ratio": "1:1"}),
    ]
    assert isinstance(result, TextToImageResponse)


def test_get_fetches_by_id():
    fake = FakeHttp({"id": "t1", "status": "processing"})
    client = Qwen2Client(api_key="k", http_client=fake)
    client.text_to_image.get("t1")
    assert fake.calls == [("get", "/api/v1/qwen_2/text_to_image/t1", None)]


def test_edit_create_posts_compacted_body():
    fake = FakeHttp({"id": "e1", "status": "pending"})
    client = Qwen2Client(api_key="k", http_client=fake)
    result = client.edit_image.create(
        model="qwen-2-edit-image",
        prompt="make it pop",
        source_image_url="https://x/in.jpg",
    )
    assert fake.calls == [
        (
            "post",
            "/api/v1/qwen_2/edit_image",
            {"model": "qwen-2-edit-image", "prompt": "make it pop", "source_image_url": "https://x/in.jpg"},
        ),
    ]
    assert isinstance(result, EditImageResponse)


def test_remix_get_by_id():
    fake = FakeHttp({"id": "r1", "status": "processing"})
    client = Qwen2Client(api_key="k", http_client=fake)
    result = client.remix_image.get("r1")
    assert fake.calls == [("get", "/api/v1/qwen_2/remix_image/r1", None)]
    assert isinstance(result, RemixImageResponse)


def test_run_narrows_completed_type():
    fake = FakeHttp(
        {"id": "t1", "status": "pending"},
        {"id": "t1", "status": "completed", "images": [{"url": "https://x/y.png"}]},
    )
    client = Qwen2Client(api_key="k", http_client=fake)
    result = client.text_to_image.run(model="qwen-2-text-to-image", prompt="a serene lake")
    assert isinstance(result, CompletedTextToImageResponse)
    assert result.images[0].url == "https://x/y.png"


# --- validation -----------------------------------------------------------


def test_rejects_unknown_model():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="model must be one of"):
        client.text_to_image.create(model="nope", prompt="hi there")


def test_requires_prompt():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="prompt is required"):
        client.text_to_image.create(model="qwen-2-text-to-image")


def test_text_to_image_rejects_bad_aspect_ratio():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="aspect_ratio"):
        client.text_to_image.create(model="qwen-2-text-to-image", prompt="hi there", aspect_ratio="21:9")


def test_edit_requires_source_image_url():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="source_image_url is required"):
        client.edit_image.create(model="qwen-2-edit-image", prompt="make it pop")


def test_remix_requires_source_image_url():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="source_image_url is required"):
        client.remix_image.create(model="qwen-2-remix-image", prompt="remix this")


def test_rejects_bad_output_format():
    client = Qwen2Client(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="output_format"):
        client.remix_image.create(
            model="qwen-2-remix-image",
            prompt="remix this",
            source_image_url="https://x/in.jpg",
            output_format="webp",
        )
