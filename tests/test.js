const request = require('supertest');
const app = require('../app');

jest.mock('../config/datasource', () => ({
    pool: {
      query: jest.fn()
    }
}));
var { pool } = require('../config/datasource');

// Test #1
describe('GET /api/dashboard/line-chart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return chart data with labels and datasets', async () => {
    const mockResults = [
      { month: 'Apr', mobile_apps: 100, websites: 200 },
      { month: 'May', mobile_apps: 150, websites: 250 },
      { month: 'Jun', mobile_apps: 200, websites: 300 },
      { month: 'Jul', mobile_apps: 220, websites: 330 },
      { month: 'Aug', mobile_apps: 240, websites: 350 },
      { month: 'Sep', mobile_apps: 260, websites: 370 },
      { month: 'Oct', mobile_apps: 280, websites: 390 },
      { month: 'Nov', mobile_apps: 300, websites: 410 },
      { month: 'Dec', mobile_apps: 320, websites: 430 },
    ];

    pool.query.mockImplementation((sql, callback) => {
      callback(null, mockResults);
    });

    const res = await request(app).get('/api/dashboard/line-chart');

    expect(res.statusCode).toBe(200);
    expect(res.body.labels).toEqual(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    expect(res.body.datasets[0].label).toBe('Mobile apps');
    expect(res.body.datasets[0].data).toEqual([100, 150, 200, 220, 240, 260, 280, 300, 320]);
    expect(res.body.datasets[1].label).toBe('Websites');
    expect(res.body.datasets[1].data).toEqual([200, 250, 300, 330, 350, 370, 390, 410, 430]);
  });

});

// Test #2
describe('GET /api/authors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of authors where IS_DELETED = 0', async () => {
    const mockResults = [
      {
        ID: 1,
        CREATE_DATE: '2024-01-01',
        IMG_DIR: '/images/author1.jpg',
        NAME: 'Agatha Christie',
        EMAIL: 'john@example.com',
        JOB_TITLE: 'Writer',
        SUB_SUBTITLE: 'Tech & Culture',
        STATUS: 'active',
        EMPLOYED_DATE: '2022-05-10',
        IS_DELETED: 0
      },
    ];

    pool.query.mockImplementation((sql, callback) => {
      callback(null, mockResults);
    });

    const res = await request(app).get('/api/authors');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('ID', 1);
    expect(res.body[0]).toHaveProperty('NAME', 'Agatha Christie');
    expect(res.body[0].IS_DELETED).toBe(0);
  });
});
