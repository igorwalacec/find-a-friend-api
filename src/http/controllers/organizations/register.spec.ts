import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register new organization', async () => {
    const response = await request(app.server).post('/organization').send({
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password: '123456',
      whatsApp: '11 11234-1234',
    })

    expect(response.statusCode).toEqual(201)
  })
})
