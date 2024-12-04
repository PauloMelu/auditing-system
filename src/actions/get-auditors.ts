import { createClient } from "@/utils/supabase/server"

export async function getAuditors(orgName: string) {
    const supabase = await createClient()

    const { data: auditors, error } = await supabase.from("OrganizationMembersTbl")
        .select(`
        userId,
        UsersTbl(
          firstName,
          lastName
        )
        `)
        .eq("orgName", orgName)
        .eq("userType", "auditor")
        .returns<{ userId: string, UsersTbl: { firstName: string, lastName: string } }[]>()


    return auditors
};