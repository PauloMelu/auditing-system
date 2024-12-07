export type OrganizationsTbl = {
    orgName: string,
    orgPassword: string
}

export type OrganizationMembersTbl = {
    orgName: string,
    userId: string,
    userType: string,
    money: number,
    firstName?: string,
    lastName?: string
}

export type UsersTbl = {
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    studentNumber: string
}

export type ReceiptsTbl = {
    id: number,
    userId: string,
    orgName: string,
    eventName: string,
    date: Date,
    ORNumber: string,
    amount: number,
    category: string,
    verified: boolean
}

export type EventsTbl = {
    orgName: string,
    eventName: string,
    budget: number,
    active: boolean,
    budgetTaken: boolean
}