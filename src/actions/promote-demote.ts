"use server"

import { revalidatePath } from "next/cache"
import { getOrgMember } from "./org-member-actions/get-org-member"
import { updateOrgMember } from "./org-member-actions/update-org-member"

export async function promote(formData: FormData) {
    change(formData, "auditor")
    revalidatePath('/', "layout")
}

export async function demote(formData: FormData) {
    change(formData, "member")
    revalidatePath('/', "layout")
}

async function change(formData: FormData, userType: string) {
    const orgName = formData.get('orgName') as string
    const userId = formData.get('userId') as string
    const data = await getOrgMember(orgName, userId)
    data.userType = userType
    updateOrgMember(data, orgName, userId)

    
}