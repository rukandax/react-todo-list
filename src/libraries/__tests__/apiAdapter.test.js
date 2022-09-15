import { getFetch, postFetch, deleteFetch } from 'libraries/apiAdapter'

describe('API Adapter Test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    })
  })

  test('postFetch', async () => {
    getFetch('http://localhost/task')
    expect(fetch).toHaveBeenCalledWith('http://localhost/task', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
  })

  test('postFetch', async () => {
    postFetch('http://localhost/task', {
      title: 'This payload is from unit test',
    })
    expect(fetch).toHaveBeenCalledWith('http://localhost/task', {
      body: '{"title":"This payload is from unit test"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
  })

  test('deleteFetch', async () => {
    deleteFetch('http://localhost/task/1')
    expect(fetch).toHaveBeenCalledWith('http://localhost/task/1', {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    })
  })
})
