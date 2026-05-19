import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { AuthenticationError } from '@runapi.ai/core';
import { Qwen2Client } from '../../src';

const originalEnv = process.env.RUNAPI_API_KEY;

describe('Qwen2Client', () => {
  beforeEach(() => {
    delete process.env.RUNAPI_API_KEY;
  });

  afterAll(() => {
    if (originalEnv === undefined) {
      delete process.env.RUNAPI_API_KEY;
    } else {
      process.env.RUNAPI_API_KEY = originalEnv;
    }
  });

  it('initializes with an API key', () => {
    const client = new Qwen2Client({ apiKey: 'test-key' });
    expect(client.editImage).toBeDefined();
  });

  it('throws when apiKey missing and env unset', () => {
    expect(() => new Qwen2Client()).toThrow(AuthenticationError);
    expect(() => new Qwen2Client({ apiKey: '' })).toThrow(AuthenticationError);
  });

  it('reads apiKey from RUNAPI_API_KEY env var', () => {
    process.env.RUNAPI_API_KEY = 'env-key';
    const client = new Qwen2Client();
    expect(client.editImage).toBeDefined();
  });

  it('exposes editImage resource', () => {
    const client = new Qwen2Client({ apiKey: 'test-key' });
    expect(client.editImage).toBeDefined();
    expect(typeof client.editImage.run).toBe('function');
    expect(typeof client.editImage.create).toBe('function');
    expect(typeof client.editImage.get).toBe('function');
  });
});
