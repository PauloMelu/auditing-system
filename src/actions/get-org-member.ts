import { OrganizationMembersTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"

class WIthOrgName{

}

class WithOrgId{

}
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

