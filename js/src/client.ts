import { createHttpClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';
import { ImageToImage } from './resources/image-to-image';
import { EditImage } from './resources/edit-image';

/**
 * Qwen 2 image API client.
 *
 * @example
 * ```typescript
 * const client = new Qwen2Client({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://runapi.ai',
 * });
 *
 * const result = await client.editImage.run({
 *   model: 'qwen-2-image-edit',
 *   prompt: 'Replace the background with a neon-lit city skyline',
 *   image_url: 'https://example.com/input.jpg',
 * });
 * ```
 */
export class Qwen2Client {
  /** Text-to-image operations. */
  public readonly textToImage: TextToImage;
  /** Image-to-image operations. */
  public readonly imageToImage: ImageToImage;
  /** Edit-image operations. */
  public readonly editImage: EditImage;

  constructor(options: ClientOptions = {}) {
    const http = createHttpClient(options);
    this.textToImage = new TextToImage(http);
    this.imageToImage = new ImageToImage(http);
    this.editImage = new EditImage(http);
  }
}
