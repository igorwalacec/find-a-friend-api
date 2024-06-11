export class OrganizationEmailAlreadyExistsError extends Error {
  constructor() {
    super('Organization e-mail already exists')
  }
}
