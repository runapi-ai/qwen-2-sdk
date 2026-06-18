import type { HttpClient, RequestOptions, PollingOptions } from '@runapi.ai/core';
import { compactParams } from '@runapi.ai/core';
import { pollUntilComplete } from '@runapi.ai/core/internal';
import type {
  CompletedRemixImageResponse,
  RemixImageParams,
  RemixImageResponse,
  TaskCreateResponse,
} from '../types';

const ENDPOINT = '/api/v1/qwen_2/remix_image';

/** Creates prompt-guided variations from a source image. Strength controls how much the output deviates from the source (0 = faithful, 1 = creative). */
export class RemixImage {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a prompt-guided variation from a source image and wait until complete.
   * @param params Remix-image parameters.
   * @param options Per-request and polling overrides.
   * @returns The completed remix-image result.
   */
  async run(params: RemixImageParams, options?: RequestOptions & PollingOptions): Promise<CompletedRemixImageResponse> {
    const { id } = await this.create(params, options);
    const response = await pollUntilComplete<RemixImageResponse>(() => this.get(id, options), {
      maxWaitMs: options?.maxWaitMs,
      pollIntervalMs: options?.pollIntervalMs,
    });
    return response as CompletedRemixImageResponse;
  }

  /**
   * Create a remix-image task; returns immediately with a task id.
   * @param params Remix-image parameters.
   * @param options Per-request overrides.
   * @returns The task creation result with id.
   */
  async create(params: RemixImageParams, options?: RequestOptions): Promise<TaskCreateResponse> {
    return this.http.request<TaskCreateResponse>('POST', ENDPOINT, {
      body: compactParams(params),
      ...options,
    });
  }

  /**
   * Fetch the current status of a remix-image task.
   * @param id The task id.
   * @param options Per-request overrides.
   * @returns The current remix-image task status.
   */
  async get(id: string, options?: RequestOptions): Promise<RemixImageResponse> {
    return this.http.request<RemixImageResponse>('GET', `${ENDPOINT}/${id}`, {
      ...options,
    });
  }
}
