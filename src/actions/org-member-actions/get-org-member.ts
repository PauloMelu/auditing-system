import { OrganizationMembersTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"


export async function getOrgMember(orgName: string, userId: string) {
    const supabase = await createClient()

    const { data: orgMember, error } = await supabase.from("OrganizationMembersTbl")
        .select()
        .eq("orgName", orgName)
        .eq("userId", userId)
        .returns<OrganizationMembersTbl[]>()
        .single()

    return orgMember
};

export async function getOrgMembers(orgName: string, userId: string) {
    const supabase = await createClient()

    const { data: orgMembers, error } = await supabase.from("OrganizationMembersTbl")
        .select(`
        userId,
        orgName,
        userType,
        money,
        UsersTbl(
          firstName,
          lastName
        )
        `)
        .eq("orgName", orgName)
        .neq("userId", userId)
        .returns<{
            userId: string, 
            orgName: string, 
            userType: string, 
            money: number, 
            UsersTbl: { 
                firstName: string, 
                lastName: string 
            }}[]>()

    return orgMembers
}