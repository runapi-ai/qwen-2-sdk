import type { AsyncTaskStatus } from '@runapi.ai/core';

export type Qwen2Model = 'qwen-2-edit-image' | 'qwen-2-text-to-image' | 'qwen-2-remix-image';

export type EditImageAspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type TextToImageAspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
export type OutputFormat = 'jpeg' | 'png';
export type Acceleration = 'none' | 'regular' | 'high';

export interface TextToImageParams {
  model: 'qwen-2-text-to-image';
  prompt: string;
  aspect_ratio?: TextToImageAspectRatio;
  seed?: number;
  output_format?: OutputFormat;
  enable_safety_checker?: boolean;
  callback_url?: string;
}

export interface RemixImageParams {
  model: 'qwen-2-remix-image';
  prompt: string;
  source_image_url: string;
  strength?: number;
  output_format?: OutputFormat;
  acceleration?: Acceleration;
  negative_prompt?: string;
  seed?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  enable_safety_checker?: boolean;
  callback_url?: string;
}

export interface EditImageParams {
  model: 'qwen-2-edit-image';
  prompt: string;
  source_image_url: string;
  aspect_ratio?: EditImageAspectRatio;
  output_format?: OutputFormat;
  seed?: number;
  enable_safety_checker?: boolean;
  callback_url?: string;
}

export interface TaskCreateResponse {
  id: string;
}

export interface Image {
  url: string;
}

export interface ImageTaskResponse {
  id: string;
  status: AsyncTaskStatus;
  images?: Image[];
  error?: string;
  [key: string]: unknown;
}

export type TextToImageResponse = ImageTaskResponse;
export type RemixImageResponse = ImageTaskResponse;
export type EditImageResponse = ImageTaskResponse;

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
