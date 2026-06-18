import type { AsyncTaskStatus } from '@runapi.ai/core';

/** All Qwen 2 model variants, each dedicated to a single operation type. */
export type Qwen2Model = 'qwen-2-edit-image' | 'qwen-2-text-to-image' | 'qwen-2-remix-image';

/** Aspect ratio options for edit-image. Wider set than text-to-image, includes ultra-wide 21:9. */
export type EditImageAspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
/** Aspect ratio options for text-to-image generation. Default: 16:9. */
export type TextToImageAspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
/** Output image encoding format. */
export type OutputFormat = 'jpeg' | 'png';
/** Acceleration mode for remix. Higher acceleration trades quality for speed. Default: none. */
export type Acceleration = 'none' | 'regular' | 'high';

/** Parameters for text-to-image generation. Prompt up to 800 characters. */
export interface TextToImageParams {
  model: 'qwen-2-text-to-image';
  /** Image description (up to 800 chars). */
  prompt: string;
  aspect_ratio?: TextToImageAspectRatio;
  /** Integer seed for reproducible results. */
  seed?: number;
  output_format?: OutputFormat;
  /** Toggle content safety filtering. */
  enable_safety_checker?: boolean;
  /** Webhook URL for async completion notifications. */
  callback_url?: string;
}

/**
 * Parameters for remix-image. Creates a prompt-guided variation of a source image.
 * `strength` controls deviation from the source: 0 = faithful reproduction,
 * 1 = maximum creative freedom (default: 0.8).
 */
export interface RemixImageParams {
  model: 'qwen-2-remix-image';
  /** Variation description (up to 5000 chars). */
  prompt: string;
  /** Source image URL (JPEG/PNG/WebP, up to 10 MB). */
  source_image_url: string;
  /** How much the output deviates from the source. 0 = faithful, 1 = creative (default: 0.8). */
  strength?: number;
  output_format?: OutputFormat;
  acceleration?: Acceleration;
  /** What to avoid in the output (up to 500 chars). */
  negative_prompt?: string;
  /** Integer seed for reproducible results. */
  seed?: number;
  /** Denoising steps (2-250, default: 30). More steps = higher quality, slower. */
  num_inference_steps?: number;
  /** Classifier-free guidance scale (0-20, default: 2.5). Higher = stricter prompt adherence. */
  guidance_scale?: number;
  /** Toggle content safety filtering. */
  enable_safety_checker?: boolean;
  /** Webhook URL for async completion notifications. */
  callback_url?: string;
}

/** Parameters for edit-image. Applies prompt-described changes to a source image. */
export interface EditImageParams {
  model: 'qwen-2-edit-image';
  /** Edit instruction (1-800 chars). */
  prompt: string;
  /** Source image URL (JPEG/PNG/WebP, up to 10 MB). */
  source_image_url: string;
  aspect_ratio?: EditImageAspectRatio;
  output_format?: OutputFormat;
  /** Integer seed for reproducible results. */
  seed?: number;
  /** Toggle content safety filtering. */
  enable_safety_checker?: boolean;
  /** Webhook URL for async completion notifications. */
  callback_url?: string;
}

export interface TaskCreateResponse {
  id: string;
}

/** A single generated image result. */
export interface Image {
  /** CDN-delivered image URL. */
  url: string;
}

/** Shared task result for all Qwen 2 image operations. */
export interface ImageTaskResponse {
  id: string;
  status: AsyncTaskStatus;
  /** Output images, populated once the task completes successfully. */
  images?: Image[];
  /** Error message when the task has failed. */
  error?: string;
  [key: string]: unknown;
}

export type TextToImageResponse = ImageTaskResponse;
export type RemixImageResponse = ImageTaskResponse;
export type EditImageResponse = ImageTaskResponse;

/**
 * Resolved responses returned by the `run()` methods after polling sees
 * `status: 'completed'`. Narrows the base response so `images` is
 * guaranteed non-optional in user code.
 */
export type CompletedTextToImageResponse = TextToImageResponse & {
  status: 'completed';
  images: Image[];
};

export type CompletedRemixImageResponse = RemixImageResponse & {
  status: 'completed';
  images: Image[];
};

export type CompletedEditImageResponse = EditImageResponse & {
  status: 'completed';
  images: Image[];
};
