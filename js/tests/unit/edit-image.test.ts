import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditImage } from '../../src/resources/edit-image';
import type { HttpClient } from '@runapi.ai/core';
import type { EditImageResponse, TaskCreateResponse } from '../../src/types';

describe('EditImage', () => {
  const mockHttp: HttpClient = {
    request: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('sends POST /api/v1/qwen_2/edit_image with flat params', async () => {
      const mockResponse: TaskCreateResponse = { id: 'task-123' };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const editImage = new EditImage(mockHttp);
      const result = await editImage.create({
        model: 'qwen-2-edit-image',
        prompt: 'make it pop',
        source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
        aspect_ratio: '1:1',
        output_format: 'png',
        seed: 42,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/edit_image',
        {
          body: {
            model: 'qwen-2-edit-image',
            prompt: 'make it pop',
            source_image_url: 'https://cdn.runapi.ai/public/samples/input.jpg',
            aspect_ratio: '1:1',
            output_format: 'png',
            seed: 42,
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('compacts undefined params', async () => {
      vi.mocked(mockHttp.request).mockResolvedValueOnce({ id: 'task-xyz' });

      const editImage = new EditImage(mockHttp);
      await editImage.create({
        model: 'qwen-2-edit-image',
        prompt: 'x',
        source_image_url: 'https://cdn.runapi.ai/public/samples/result.jpg',
        aspect_ratio: undefined,
      });

      expect(mockHttp.request).toHaveBeenCalledWith(
        'POST',
        '/api/v1/qwen_2/edit_image',
        {
          body: {
            model: 'qwen-2-edit-image',
            prompt: 'x',
            source_image_url: 'https://cdn.runapi.ai/public/samples/result.jpg',
          },
        }
      );
    });
  });

  describe('get', () => {
    it('sends GET /api/v1/qwen_2/edit_image/:id', async () => {
      const mockResponse: EditImageResponse = {
        id: 'task-123',
        status: 'completed',
        images: [{ url: 'https://file.runapi.ai/out.png' }],
      };
      vi.mocked(mockHttp.request).mockResolvedValueOnce(mockResponse);

      const editImage = new EditImage(mockHttp);
      const result = await editImage.get('task-123');

      expect(mockHttp.request).toHaveBeenCalledWith(
        'GET',
        '/api/v1/qwen_2/edit_image/task-123',
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
