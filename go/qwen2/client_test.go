package qwen2

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/runapi-ai/core-sdk/go/core"
)

type stubHTTPClient struct {
	method   string
	path     string
	body     any
	response json.RawMessage
}

func (s *stubHTTPClient) Request(_ context.Context, method, path string, opts *core.HTTPRequestOptions) (json.RawMessage, error) {
	s.method = method
	s.path = path
	if opts != nil {
		s.body = opts.Body
	}
	return s.response, nil
}

func TestEditImageCreate(t *testing.T) {
	stub := &stubHTTPClient{
		response: json.RawMessage(`{"id":"task_123","status":"processing"}`),
	}
	client := NewClientWithHTTP(stub)
	resp, err := client.EditImage.Create(context.Background(), EditImageParams{
		Model:    "qwen-2-image-edit",
		Prompt:   "make it pop",
		ImageURL: "https://example.com/in.jpg",
	})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != "/api/v1/qwen_2/edit_image" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	body := stub.body.(map[string]any)
	if body["model"] != "qwen-2-image-edit" {
		t.Fatalf("unexpected model: %v", body["model"])
	}
	if body["prompt"] != "make it pop" {
		t.Fatalf("unexpected prompt: %v", body["prompt"])
	}
	if body["image_url"] != "https://example.com/in.jpg" {
		t.Fatalf("unexpected image_url: %v", body["image_url"])
	}
	if resp.ID != "task_123" {
		t.Fatalf("unexpected task ID: %v", resp.ID)
	}
}

func TestTextToImageCreate(t *testing.T) {
	stub := &stubHTTPClient{
		response: json.RawMessage(`{"id":"task_123","status":"processing"}`),
	}
	client := NewClientWithHTTP(stub)
	resp, err := client.TextToImage.Create(context.Background(), TextToImageParams{
		Model:     "qwen-2-text-to-image",
		Prompt:    "make it pop",
		ImageSize: "square_hd",
	})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != "/api/v1/qwen_2/text_to_image" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	body := stub.body.(map[string]any)
	if body["model"] != "qwen-2-text-to-image" {
		t.Fatalf("unexpected model: %v", body["model"])
	}
	if body["image_size"] != "square_hd" {
		t.Fatalf("unexpected image_size: %v", body["image_size"])
	}
	if resp.ID != "task_123" {
		t.Fatalf("unexpected task ID: %v", resp.ID)
	}
}

func TestImageToImageCreate(t *testing.T) {
	stub := &stubHTTPClient{
		response: json.RawMessage(`{"id":"task_123","status":"processing"}`),
	}
	client := NewClientWithHTTP(stub)
	strength := 0.8
	resp, err := client.ImageToImage.Create(context.Background(), ImageToImageParams{
		Model:    "qwen-2-image-to-image",
		Prompt:   "make it pop",
		ImageURL: "https://example.com/in.jpg",
		Strength: &strength,
	})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != "/api/v1/qwen_2/image_to_image" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	body := stub.body.(map[string]any)
	if body["model"] != "qwen-2-image-to-image" {
		t.Fatalf("unexpected model: %v", body["model"])
	}
	if body["image_url"] != "https://example.com/in.jpg" {
		t.Fatalf("unexpected image_url: %v", body["image_url"])
	}
	if resp.ID != "task_123" {
		t.Fatalf("unexpected task ID: %v", resp.ID)
	}
}

func TestEditImageGet(t *testing.T) {
	stub := &stubHTTPClient{
		response: json.RawMessage(`{"id":"task_456","status":"completed","images":[{"url":"https://example.com/result.jpg"}]}`),
	}
	client := NewClientWithHTTP(stub)
	resp, err := client.EditImage.Get(context.Background(), "task_abc")
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "GET" || stub.path != "/api/v1/qwen_2/edit_image/task_abc" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	if resp.ID != "task_456" {
		t.Fatalf("unexpected ID: %v", resp.ID)
	}
	if string(resp.Status) != "completed" {
		t.Fatalf("unexpected status: %v", resp.Status)
	}
	if len(resp.Images) != 1 || resp.Images[0].URL != "https://example.com/result.jpg" {
		t.Fatalf("unexpected images: %v", resp.Images)
	}
}
