import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImageToImage } from '../../src/resources/image-to-image';
import type { HttpClient } from '@runapi.ai/core';
import type { ImageToImageResponse, TaskCreateResponse } from '../../src/types';

describe('ImageToImage', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('sends POST /api/v1/qwen_2/image_to_image with flat params', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const imageToImage = new ImageToImage(mockHttp);
      const result = await imageToImage.create({
        model: 'qwen-2-image-to-image',
        prompt: 'make it pop',
        image_url: 'https://example.com/in.jpg',
        strength: 0.8,
        output_format: 'png',
        seed: 42,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/image_to_image',
        {
          body: {
            model: 'qwen-2-image-to-image',
            prompt: 'make it pop',
            image_url: 'https://example.com/in.jpg',
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

      const imageToImage = new ImageToImage(mockHttp);
      await imageToImage.create({
        model: 'qwen-2-image-to-image',
        prompt: 'x',
        image_url: 'https://example.com/a.jpg',
        strength: undefined,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/image_to_image',
        {
          body: {
            model: 'qwen-2-image-to-image',
            prompt: 'x',
            image_url: 'https://example.com/a.jpg',
          },
        }
      );
    });
  });

  describe('get', () => {
    it('sends GET /api/v1/qwen_2/image_to_image/:id', async () => {
      const mockResponse: ImageToImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [{ url: 'https://file.runapi.ai/out.png' }],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const imageToImage = new ImageToImage(mockHttp);
      const result = await imageToImage.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/qwen_2/image_to_image/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
