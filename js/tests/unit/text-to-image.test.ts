import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TextToImage } from '../../src/resources/text-to-image';
import type { HttpClient } from '@runapi.ai/core';
import type { TextToImageResponse, TaskCreateResponse } from '../../src/types';

describe('TextToImage', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('sends POST /api/v1/qwen_2/text_to_image with flat params', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.create({
        model: 'qwen-2-text-to-image',
        prompt: 'make it pop',
        aspect_ratio: '16:9',
        output_format: 'png',
        seed: 42,
        enable_safety_checker: false,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/text_to_image',
        {
          body: {
            model: 'qwen-2-text-to-image',
            prompt: 'make it pop',
            aspect_ratio: '16:9',
            output_format: 'png',
            seed: 42,
            enable_safety_checker: false,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('compacts undefined params', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'task-xyz' });

      const textToImage = new TextToImage(mockHttp);
      await textToImage.create({
        model: 'qwen-2-text-to-image',
        prompt: 'x',
        aspect_ratio: undefined,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/text_to_image',
        {
          body: {
            model: 'qwen-2-text-to-image',
            prompt: 'x',
          },
        }
      );
    });
  });

  describe('get', () => {
    it('sends GET /api/v1/qwen_2/text_to_image/:id', async () => {
      const mockResponse: TextToImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [{ url: 'https://file.runapi.ai/out.png' }],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const textToImage = new TextToImage(mockHttp);
      const result = await textToImage.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/qwen_2/text_to_image/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
