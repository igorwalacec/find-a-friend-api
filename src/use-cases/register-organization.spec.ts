import { OrganizationRepository } from '@/repositories/organization-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { randomUUID } from 'crypto'
import { compare, hash } from 'bcryptjs'
import { OrganizationEmailAlreadyExistsError } from './error/organization-email-already-exists-error'

let organizationRepository: OrganizationRepository
let sut: RegisterOrganizationUseCase
describe('Register Organizatio Use Case', () => {
  beforeEach(() => {
    organizationRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
    }
    sut = new RegisterOrganizationUseCase(organizationRepository)
  })

  it('should be able to register new organization', async () => {
    // arrange
    organizationRepository.findByEmail = vi.fn().mockResolvedValue(undefined)
    organizationRepository.create = vi.fn().mockResolvedValue({
      id: randomUUID(),
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password: '123456',
      whatsApp: '11 11234-1234',
    })

    // act
    const { organization } = await sut.execute({
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password: '123456',
      whatsApp: '11 11234-1234',
    })

    // assert
    expect(organization.id).toEqual(expect.any(String))
    expect(organizationRepository.create).toHaveBeenCalled()
  })

  it('should hash user password upon registration', async () => {
    // arrange
    organizationRepository.findByEmail = vi.fn().mockResolvedValue(undefined)
    organizationRepository.create = vi.fn().mockResolvedValue({
      id: randomUUID(),
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password_hash: await hash('123456', 6),
      whatsApp: '11 11234-1234',
    })

    // act
    const { organization } = await sut.execute({
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password: '123456',
      whatsApp: '11 11234-1234',
    })

    // assert
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    // arrange
    organizationRepository.findByEmail = vi.fn().mockResolvedValue({
      id: randomUUID(),
      nameOfPersonResponsible: 'Pet responsible',
      address: 'Rua das ruas, 123',
      cep: '12345-670',
      email: 'pet@pet.com',
      latitude: 0,
      longitude: 0,
      password_hash: await hash('123456', 6),
      whatsApp: '11 11234-1234',
    })

    // act/assert
    await expect(
      sut.execute({
        nameOfPersonResponsible: 'Pet responsible',
        address: 'Rua das ruas, 123',
        cep: '12345-670',
        email: 'pet@pet.com',
        latitude: 0,
        longitude: 0,
        password: '123456',
        whatsApp: '11 11234-1234',
      }),
    ).rejects.toBeInstanceOf(OrganizationEmailAlreadyExistsError)
  })
})
