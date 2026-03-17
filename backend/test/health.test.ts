import request from 'supertest';
import app from '../src/server';

describe('Health Check', () => {
  it('should return server status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
  });
});
