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