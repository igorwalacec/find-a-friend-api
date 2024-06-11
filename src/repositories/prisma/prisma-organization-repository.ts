import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
