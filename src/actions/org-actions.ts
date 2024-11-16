'use server'
import { OrganizationMembersTbl, OrganizationsTblType } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export async function joinOrg(formData: FormData) {

    const supabase = await createClient()

    const orgPassword = formData.get('orgPassword') as string
    const { data: { user } } = await supabase.auth.getUser();

    const {data: orgData, error: selectOrgError } = await supabase.from("OrganizationsTbl").select().eq("orgPassword", orgPassword).returns<OrganizationsTblType|null>().single()
    console.log(orgData, orgPassword)
    const { data: memberData, error: selectMemberError} = await supabase.from("OrganizationMembersTbl").select().eq("userId", user?.id).eq("orgId", orgData?.orgId).returns<OrganizationMembersTbl>().single()
    console.log("member data:")
    console.log(memberData, selectMemberError)

    if(selectMemberError)
        {
        console.log("member not found")
        requestJoin()
        }
    else
    {
        console.log("member found")
    }
        
    //ADD CODE:
    //make request to organization owner before inserting to members
    
    /*
    const { error } = await supabase.from("OrganizationMembersTbl").insert({
        orgId: orgData?.orgId,
        userId: user?.id
    });
    
      
    console.log(error)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/organization')
    */
}



async function requestJoin() {
    console.log("pajoin pls")
}

