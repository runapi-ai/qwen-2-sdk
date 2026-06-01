// Package qwen2 provides the Qwen2 image generation and edit API client.
package qwen2

import (
	"context"

	"github.com/runapi-ai/core-sdk/go/core"
	"github.com/runapi-ai/core-sdk/go/option"
)

const (
	textToImagePath = "/api/v1/qwen_2/text_to_image"
	remixImagePath = "/api/v1/qwen_2/remix_image"
	editImagePath   = "/api/v1/qwen_2/edit_image"
)

// Client is the Qwen2 image generation and edit API client.
type Client struct {
	// TextToImage provides text-to-image operations.
	TextToImage *TextToImage
	// RemixImage provides image remix operations.
	RemixImage *RemixImage
	// EditImage provides image edit operations.
	EditImage *EditImage
}

// NewClient creates a Qwen2 client with the given options.
func NewClient(opts ...option.ClientOption) (*Client, error) {
	resolved, err := option.ResolveClientOptions(opts...)
	if err != nil {
		return nil, err
	}
	httpClient, err := core.NewHTTPClient(resolved)
	if err != nil {
		return nil, err
	}
	return NewClientWithHTTP(httpClient), nil
}

// NewClientWithHTTP creates a Qwen2 client with a pre-configured HTTP transport.
func NewClientWithHTTP(httpClient core.HTTPClient) *Client {
	return &Client{
		TextToImage: &TextToImage{http: httpClient},
		RemixImage: &RemixImage{http: httpClient},
		EditImage:  &EditImage{http: httpClient},
	}
}

type TextToImage struct{ http core.HTTPClient }

func (r *TextToImage) Create(ctx context.Context, params TextToImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToImagePath, core.CompactParams(params), requestOptions)
}
func (r *TextToImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToImageResponse](ctx, r.http, core.ResourcePath(textToImagePath, id), requestOptions)
}
func (r *TextToImage) Run(ctx context.Context, params TextToImageParams, opts ...option.RequestOption) (*TextToImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*TextToImageResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// RemixImage creates prompt-guided variations from a source image.
type RemixImage struct{ http core.HTTPClient }

func (r *RemixImage) Create(ctx context.Context, params RemixImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, remixImagePath, core.CompactParams(params), requestOptions)
}
func (r *RemixImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*RemixImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[RemixImageResponse](ctx, r.http, core.ResourcePath(remixImagePath, id), requestOptions)
}
func (r *RemixImage) Run(ctx context.Context, params RemixImageParams, opts ...option.RequestOption) (*RemixImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*RemixImageResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// EditImage edits input images according to a natural-language prompt.
type EditImage struct{ http core.HTTPClient }

func (r *EditImage) Create(ctx context.Context, params EditImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, editImagePath, core.CompactParams(params), requestOptions)
}
func (r *EditImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*EditImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[EditImageResponse](ctx, r.http, core.ResourcePath(editImagePath, id), requestOptions)
}
func (r *EditImage) Run(ctx context.Context, params EditImageParams, opts ...option.RequestOption) (*EditImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*EditImageResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}
