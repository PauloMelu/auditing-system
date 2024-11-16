"use client"

import { OrganizationMembersTbl } from "@/types/types"
import { createContext, useContext } from "react"

type OrgMember = OrganizationMembersTbl

let defaultOrgMember: OrgMember = {
    orgId: null,
    userId: null,
    userType: "",
    money: 0
}

export const OrgMemberContext = createContext<OrgMember>(defaultOrgMember)


export const OrgMemberProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <OrgMemberContext.Provider value = {defaultOrgMember}>
            {children}
        </OrgMemberContext.Provider>
    )
}

export const useOrgMember = () => useContext(OrgMemberContext)