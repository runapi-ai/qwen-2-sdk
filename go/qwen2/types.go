package qwen2

type TaskStatus string

type TextToImageParams struct {
	Model               string `json:"model" help:"required; model slug"`
	Prompt              string `json:"prompt" help:"required; up to 800 chars"`
	AspectRatio         string `json:"aspect_ratio,omitempty" help:"optional; output aspect ratio; Default: 16:9"`
	Seed                *int   `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	OutputFormat        string `json:"output_format,omitempty" help:"optional; output format; Default: png"`
	EnableSafetyChecker *bool  `json:"enable_safety_checker,omitempty" help:"optional; content safety check toggle"`
	CallbackURL         string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type RemixImageParams struct {
	Model               string   `json:"model" help:"required; model slug"`
	Prompt              string   `json:"prompt" help:"required; up to 5000 chars"`
	SourceImageURL      string   `json:"source_image_url" help:"required; source image URL (JPEG/PNG/WebP, up to 10 MB)"`
	Strength            *float64 `json:"strength,omitempty" help:"optional; 0-1. Default: 0.8"`
	OutputFormat        string   `json:"output_format,omitempty" help:"optional; output format; Default: png"`
	Acceleration        string   `json:"acceleration,omitempty" help:"optional; acceleration mode; Default: none"`
	NegativePrompt      string   `json:"negative_prompt,omitempty" help:"optional; up to 500 chars"`
	Seed                *int     `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	NumInferenceSteps   *int     `json:"num_inference_steps,omitempty" help:"optional; 2-250. Default: 30"`
	GuidanceScale       *float64 `json:"guidance_scale,omitempty" help:"optional; 0-20. Default: 2.5"`
	EnableSafetyChecker *bool    `json:"enable_safety_checker,omitempty" help:"optional; content safety check toggle"`
	CallbackURL         string   `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type EditImageParams struct {
	Model               string `json:"model" help:"required; model slug"`
	Prompt              string `json:"prompt" help:"required; 1-800 chars"`
	SourceImageURL      string `json:"source_image_url" help:"required; source image URL (JPEG/PNG/WebP, up to 10 MB)"`
	AspectRatio         string `json:"aspect_ratio,omitempty" help:"optional; output aspect ratio; Default: 16:9"`
	OutputFormat        string `json:"output_format,omitempty" help:"optional; output format; Default: png"`
	Seed                *int   `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	EnableSafetyChecker *bool  `json:"enable_safety_checker,omitempty" help:"optional; content safety check toggle"`
	CallbackURL         string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type AsyncTaskResponse struct {
	ID     string     `json:"id"`
	Status TaskStatus `json:"status"`
	Error  string     `json:"error,omitempty"`
}

func (r AsyncTaskResponse) GetID() string     { return r.ID }
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }
func (r AsyncTaskResponse) GetError() string  { return r.Error }

type Image struct {
	URL string `json:"url"`
}

type ImageTaskResponse struct {
	AsyncTaskResponse
	Images []Image `json:"images,omitempty"`
}

type TextToImageResponse = ImageTaskResponse
type RemixImageResponse = ImageTaskResponse
type EditImageResponse = ImageTaskResponse
