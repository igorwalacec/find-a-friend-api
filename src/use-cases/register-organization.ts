import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationEmailAlreadyExistsError } from './error/organization-email-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  nameOfPersonResponsible: string
  email: string
  cep: string
  address: string
  latitude: number
  longitude: number
  whatsApp: string
  password: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    nameOfPersonResponsible,
    email,
    cep,
    address,
    latitude,
    longitude,
    whatsApp,
    password,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail)
      throw new OrganizationEmailAlreadyExistsError()

    const organization = await this.organizationRepository.create({
      nameOfPersonResponsible,
      email,
      cep,
      address,
      latitude,
      longitude,
      whatsApp,
      password_hash,
    })

    return {
      organization,
    }
  }
}
