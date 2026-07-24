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
	stub := &stubHTTPClient{response: json.RawMessage(`{"id":"task_123","status":"processing"}`)}
	client := NewClientWithHTTP(stub)
	resp, err := client.EditImage.Create(context.Background(), EditImageParams{
		Model: "qwen-2-edit-image", Prompt: "make it pop", SourceImageURL: "https://cdn.runapi.ai/public/samples/input.jpg",
	})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != "/api/v1/qwen_2/edit_image" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	if stub.body.(map[string]any)["model"] != "qwen-2-edit-image" {
		t.Fatalf("unexpected model: %v", stub.body.(map[string]any)["model"])
	}
	if resp.ID != "task_123" {
		t.Fatalf("unexpected task ID: %v", resp.ID)
	}
}

func TestTextToImageCreate(t *testing.T) {
	stub := &stubHTTPClient{response: json.RawMessage(`{"id":"task_123","status":"processing"}`)}
	client := NewClientWithHTTP(stub)
	resp, err := client.TextToImage.Create(context.Background(), TextToImageParams{Model: "qwen-2-text-to-image", Prompt: "make it pop", AspectRatio: "16:9"})
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "POST" || stub.path != "/api/v1/qwen_2/text_to_image" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	if resp.ID != "task_123" {
		t.Fatalf("unexpected task ID: %v", resp.ID)
	}
}

func TestEditImageGet(t *testing.T) {
	stub := &stubHTTPClient{response: json.RawMessage(`{"id":"task_456","status":"completed","images":[{"url":"https://file.runapi.ai/result.jpg"}]}`)}
	client := NewClientWithHTTP(stub)
	resp, err := client.EditImage.Get(context.Background(), "task_abc")
	if err != nil {
		t.Fatal(err)
	}
	if stub.method != "GET" || stub.path != "/api/v1/qwen_2/edit_image/task_abc" {
		t.Fatalf("unexpected request: %s %s", stub.method, stub.path)
	}
	if resp.ID != "task_456" || len(resp.Images) != 1 {
		t.Fatalf("unexpected response: %#v", resp)
	}
}
