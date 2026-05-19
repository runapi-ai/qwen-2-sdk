import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  CompletedImageToImageResponse,
  ImageToImageParams,
  ImageToImageResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/qwen_2/image_to_image';

export class ImageToImage {
  constructor(private readonly http: HttpClient) {}

  async run(params: ImageToImageParams, options?: RequestOptions & PollingOptions): Promise<CompletedImageToImageResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<ImageToImageResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedImageToImageResponse;
  }

  async create(params: ImageToImageParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  async get(id: string, options?: RequestOptions): Promise<ImageToImageResponse> {
    return this.http.request<ImageToImageResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
