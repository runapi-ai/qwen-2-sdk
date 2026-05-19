// Package qwen2 provides the Qwen2 text-to-image and edit API client.
package qwen2

import (
	"context"

	"github.com/runapi-ai/core-sdk/go/core"
	"github.com/runapi-ai/core-sdk/go/option"
)

const (
	textToImagePath   = "/api/v1/qwen_2/text_to_image"
	imageToImagePath = "/api/v1/qwen_2/image_to_image"
	editImagePath     = "/api/v1/qwen_2/edit_image"
)

// Client is the Qwen2 text-to-image and edit API client.
type Client struct {
	// TextToImage provides text-to-image operations.
	TextToImage *TextToImage
	// ImageToImage provides image-to-image operations.
	ImageToImage *ImageToImage
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
		TextToImage:  &TextToImage{http: httpClient},
		ImageToImage: &ImageToImage{http: httpClient},
		EditImage:    &EditImage{http: httpClient},
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

type ImageToImage struct{ http core.HTTPClient }

func (r *ImageToImage) Create(ctx context.Context, params ImageToImageParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, imageToImagePath, core.CompactParams(params), requestOptions)
}
func (r *ImageToImage) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ImageToImageResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ImageToImageResponse](ctx, r.http, core.ResourcePath(imageToImagePath, id), requestOptions)
}
func (r *ImageToImage) Run(ctx context.Context, params ImageToImageParams, opts ...option.RequestOption) (*ImageToImageResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ImageToImageResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
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
