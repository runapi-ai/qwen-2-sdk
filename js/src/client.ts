import { BaseClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';
import { RemixImage } from './resources/remix-image';
import { EditImage } from './resources/edit-image';

/**
 * Qwen 2 image generation, remixing, and editing API client.
 *
 * Three operations: pure text-to-image generation, remix (prompt-guided
 * variation of a source image with configurable strength), and edit
 * (targeted modifications to a source image).
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
  /** Create prompt-guided variations from a source image with adjustable strength. */
  public readonly remixImage: RemixImage;
  /** Apply targeted edits to a source image using natural-language prompts. */
  public readonly editImage: EditImage;

  constructor(options: ClientOptions = {}) {
    super(options);
    this.textToImage = new TextToImage(this.http);
    this.remixImage = new RemixImage(this.http);
    this.editImage = new EditImage(this.http);
  }
}
