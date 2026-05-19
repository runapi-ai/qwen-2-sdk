import type { AsyncTaskStatus } from '@runapi.ai/core';

export type Qwen2Model = 'qwen-2-image-edit' | 'qwen-2-text-to-image' | 'qwen-2-image-to-image';

export type EditImageSize = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type QwenImageSize = 'square' | 'square_hd' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9';
export type OutputFormat = 'jpeg' | 'png';
export type Acceleration = 'none' | 'regular' | 'high';

export interface TextToImageParams {
  model: 'qwen-2-text-to-image';
  prompt: string;
  image_size?: QwenImageSize;
  num_inference_steps?: number;
  seed?: number;
  guidance_scale?: number;
  enable_safety_checker?: boolean;
  output_format?: OutputFormat;
  negative_prompt?: string;
  acceleration?: Acceleration;
  nsfw_checker?: boolean;
  callback_url?: string;
}

export interface ImageToImageParams {
  model: 'qwen-2-image-to-image';
  prompt: string;
  image_url: string;
  strength?: number;
  output_format?: OutputFormat;
  acceleration?: Acceleration;
  negative_prompt?: string;
  seed?: number;
  num_inference_steps?: number;
  guidance_scale?: number;
  enable_safety_checker?: boolean;
  nsfw_checker?: boolean;
  callback_url?: string;
}

export interface EditImageParams {
  model: 'qwen-2-image-edit';
  prompt: string;
  image_url: string;
  image_size?: EditImageSize;
  output_format?: OutputFormat;
  seed?: number;
  nsfw_checker?: boolean;
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
export type ImageToImageResponse = ImageTaskResponse;
export type EditImageResponse = ImageTaskResponse;

export type CompletedTextToImageResponse = TextToImageResponse & {
  status: 'completed';
  images: Image[];
};

export type CompletedImageToImageResponse = ImageToImageResponse & {
  status: 'completed';
  images: Image[];
};

export type CompletedEditImageResponse = EditImageResponse & {
  status: 'completed';
  images: Image[];
};
