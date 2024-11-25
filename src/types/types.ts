export type OrganizationsTblType = {
    orgId: number,
    orgName: string,
    orgPassword: string
}

export type OrganizationMembersTbl = {
    orgId: number,
    userId: string,
    userType: string,
    money: number
}

export type UsersTbl = {
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    studentNumber: string
}