"use server"
import { OrganizationMembersTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"

export async function updateOrgMember(data: OrganizationMembersTbl, orgName: string, userId: string) {
    const supabase = await createClient()
    const error = await supabase.from("OrganizationMembersTbl")
        .update(data)
        .eq("orgName", orgName)
        .eq("userId", userId)
}