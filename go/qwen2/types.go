package qwen2

type TaskStatus string

type TextToImageParams struct {
	Model               string   `json:"model" help:"required; qwen-2-text-to-image"`
	Prompt              string   `json:"prompt" help:"required; up to 5000 chars"`
	ImageSize           string   `json:"image_size,omitempty" help:"optional; square, square_hd, portrait_4_3, portrait_16_9, landscape_4_3, or landscape_16_9. Default: square_hd"`
	NumInferenceSteps   *int     `json:"num_inference_steps,omitempty" help:"optional; 2-250. Default: 30"`
	Seed                *int     `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	GuidanceScale       *float64 `json:"guidance_scale,omitempty" help:"optional; 0-20. Default: 2.5"`
	EnableSafetyChecker *bool    `json:"enable_safety_checker,omitempty" help:"optional; enable safety checking"`
	OutputFormat        string   `json:"output_format,omitempty" help:"optional; png or jpeg. Default: png"`
	NegativePrompt      string   `json:"negative_prompt,omitempty" help:"optional; up to 500 chars"`
	Acceleration        string   `json:"acceleration,omitempty" help:"optional; none, regular, or high. Default: none"`
	NsfwChecker         *bool    `json:"nsfw_checker,omitempty" help:"optional; when false, disables content filtering. Default: false"`
	CallbackURL         string   `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type ImageToImageParams struct {
	Model               string   `json:"model" help:"required; qwen-2-image-to-image"`
	Prompt              string   `json:"prompt" help:"required; up to 5000 chars"`
	ImageURL            string   `json:"image_url" help:"required; source image URL (JPEG/PNG/WebP, up to 10 MB)"`
	Strength            *float64 `json:"strength,omitempty" help:"optional; 0-1. Default: 0.8"`
	OutputFormat        string   `json:"output_format,omitempty" help:"optional; png or jpeg. Default: png"`
	Acceleration        string   `json:"acceleration,omitempty" help:"optional; none, regular, or high. Default: none"`
	NegativePrompt      string   `json:"negative_prompt,omitempty" help:"optional; up to 500 chars"`
	Seed                *int     `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	NumInferenceSteps   *int     `json:"num_inference_steps,omitempty" help:"optional; 2-250. Default: 30"`
	GuidanceScale       *float64 `json:"guidance_scale,omitempty" help:"optional; 0-20. Default: 2.5"`
	EnableSafetyChecker *bool    `json:"enable_safety_checker,omitempty" help:"optional; enable safety checking"`
	NsfwChecker         *bool    `json:"nsfw_checker,omitempty" help:"optional; when false, disables content filtering. Default: false"`
	CallbackURL         string   `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type EditImageParams struct {
	Model        string `json:"model" help:"required; qwen-2-image-edit"`
	Prompt       string `json:"prompt" help:"required; 1-800 chars"`
	ImageURL     string `json:"image_url" help:"required; source image URL (JPEG/PNG/WebP, up to 10 MB)"`
	ImageSize    string `json:"image_size,omitempty" help:"optional; 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9. Default: 16:9"`
	OutputFormat string `json:"output_format,omitempty" help:"optional; jpeg or png. Default: png"`
	Seed         *int   `json:"seed,omitempty" help:"optional; integer seed for reproducible results"`
	NsfwChecker  *bool  `json:"nsfw_checker,omitempty" help:"optional; when false, disables content filtering. Default: false"`
	CallbackURL  string `json:"callback_url,omitempty" help:"optional; webhook URL"`
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
type ImageToImageResponse = ImageTaskResponse
type EditImageResponse = ImageTaskResponse
