import { OrganizationEmailAlreadyExistsError } from '@/use-cases/error/organization-email-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrganization = z.object({
    nameOfPersonResponsible: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    whatsApp: z.string(),
    password: z.string(),
  })

  const {
    nameOfPersonResponsible,
    email,
    cep,
    address,
    latitude,
    longitude,
    whatsApp,
    password,
  } = registerOrganization.parse(request.body)

  try {
    const organizationUseCase = makeRegisterOrganizationUseCase()
    await organizationUseCase.execute({
      nameOfPersonResponsible,
      address,
      cep,
      email,
      latitude,
      longitude,
      password,
      whatsApp,
    })
  } catch (error) {
    if (error instanceof OrganizationEmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
  return reply.code(201).send()
}
