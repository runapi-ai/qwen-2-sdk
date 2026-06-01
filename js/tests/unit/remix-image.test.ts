import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RemixImage } from '../../src/resources/remix-image';
import type { HttpClient } from '@runapi.ai/core';
import type { RemixImageResponse, TaskCreateResponse } from '../../src/types';

describe('RemixImage', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('sends POST /api/v1/qwen_2/remix_image with flat params', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const remixImage = new RemixImage(mockHttp);
      const result = await remixImage.create({
        model: 'qwen-2-remix-image',
        prompt: 'make it pop',
        source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
        strength: 0.8,
        output_format: 'png',
        seed: 42,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/remix_image',
        {
          body: {
            model: 'qwen-2-remix-image',
            prompt: 'make it pop',
            source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
            strength: 0.8,
            output_format: 'png',
            seed: 42,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('compacts undefined params', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'task-xyz' });

      const remixImage = new RemixImage(mockHttp);
      await remixImage.create({
        model: 'qwen-2-remix-image',
        prompt: 'x',
        source_image_url: 'https://cdn.runapi.ai/public/samples/result.jpg',
        strength: undefined,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/remix_image',
        {
          body: {
            model: 'qwen-2-remix-image',
            prompt: 'x',
            source_image_url: 'https://cdn.runapi.ai/public/samples/result.jpg',
          },
        }
      );
    });
  });

  describe('get', () => {
    it('sends GET /api/v1/qwen_2/remix_image/:id', async () => {
      const mockResponse: RemixImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [{ url: 'https://file.runapi.ai/out.png' }],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const remixImage = new RemixImage(mockHttp);
      const result = await remixImage.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/qwen_2/remix_image/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
