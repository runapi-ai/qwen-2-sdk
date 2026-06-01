import { createHttpClient, type ClientOptions } from '@runapi.ai/core';
import { TextToImage } from './resources/text-to-image';
import { RemixImage } from './resources/remix-image';
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
 *   model: 'qwen-2-edit-image',
 *   prompt: 'Replace the background with a neon-lit city skyline',
 *   source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
 * });
 * ```
 */
export class Qwen2Client {
  /** Text-to-image operations. */
  public readonly textToImage: TextToImage;
  /** Image remix operations. */
  public readonly remixImage: RemixImage;
  /** Edit-image operations. */
  public readonly editImage: EditImage;

  constructor(options: ClientOptions = {}) {
    const http = createHttpClient(options);
    this.textToImage = new TextToImage(http);
    this.remixImage = new RemixImage(http);
    this.editImage = new EditImage(http);
  }
}
