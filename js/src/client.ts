import { BaseClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';
import { EditImage } from './resources/edit-image';

/**
 * Qwen 2 image generation and editing API client.
 *
 * Text-to-image generation and targeted modifications to source images.
 *
 * @example
 * ```typescript
 * const client = new Qwen2Client({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://runapi.ai',
 * });
 *
 * const result = await client.editImage.run({
 *   model: 'qwen-2-edit-image',
 *   prompt: 'Replace the background with a neon-lit city skyline',
 *   source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
 * });
 * ```
 */
export class Qwen2Client extends BaseClient {
  /** Generate images from text prompts. */
  public readonly textToImage: TextToImage;
  /** Apply targeted edits to a source image using natural-language prompts. */
  public readonly editImage: EditImage;

  constructor(options: ClientOptions = {}) {
    super(options);
    this.textToImage = new TextToImage(this.http);
    this.editImage = new EditImage(this.http);
  }
}
