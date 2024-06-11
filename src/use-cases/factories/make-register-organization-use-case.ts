import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterOrganizationUseCase } from '../register-organization'

export function makeRegisterOrganizationUseCase() {
  const gymsRepository = new PrismaOrganizationRepository()
  const useCase = new RegisterOrganizationUseCase(gymsRepository)

  return useCase
}
