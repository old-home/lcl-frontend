import { describe, it, expect, vi } from 'vitest'
import routes from './routes'

// Mock the react-router/dev/routes module
vi.mock('@react-router/dev/routes', () => ({
  route: (path: string, component: string) => ({
    path,
    component,
  }),
}))

describe('Routes configuration', () => {
  it('should define the correct routes', () => {
    expect(routes).toHaveLength(2)

    // Check the login route
    expect(routes[0]).toEqual({
      path: '/login',
      component: 'routes/login.tsx',
    })

    // Check the register route
    expect(routes[1]).toEqual({
      path: '/users/register',
      component: 'routes/users/register.tsx',
    })
  })
})
