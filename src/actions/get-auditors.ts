import { OrganizationMembersTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"

export async function getAuditors(orgName: string) {
    const supabase = await createClient()

    const { data: auditors, error } = await supabase.from("OrganizationMembersTbl")
        .select()
        .eq("orgName", orgName)
        .eq("userType", "auditor")
        .returns<OrganizationMembersTbl[]>()

    return auditors
};