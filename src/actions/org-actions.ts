'use server'

import { createClient } from "@/utils/supabase/server";
import { getUser } from "./get-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OrganizationsTbl } from "@/types/types";


export async function joinOrg(formData: FormData) {
    const supabase = await createClient()

    const orgPassword = formData.get('orgPassword') as string
    const orgName = formData.get('orgName') as string

    //check if org exists
    const {data: orgData, error: selectOrgError } = await supabase.from("OrganizationsTbl")
    .select()
    .eq("orgName", orgName)
    .returns<OrganizationsTbl[]>()
    .single()

    console.log(orgData, orgPassword)

    //if doesn't exist, go to error
    if(selectOrgError){
        redirect('/error')
    }

    //if exist, check password
    if(orgData.orgPassword == orgPassword){
        //if password correct, create member then go home
        createMember(orgData.orgName, "member")
        redirect('/home') 
    }
    //else, go to error
    redirect('/error')
}


export async function createOrg(formData: FormData) {
    const supabase = await createClient()

    const orgName = formData.get('orgName') as string

    //insert to orgs table
    const {error} = await supabase.from("OrganizationsTbl").insert({
        orgName: orgName,
        orgPassword: formData.get('password')
    })

    console.log(error)
    if (error) {
        redirect('/error')
    }

    //create a member for the recently inserted org with the title auditor
    createMember(orgName, "auditor")

    //go home
    revalidatePath('/', 'layout')
    redirect('/home')

}

async function createMember(orgName: string, userType: string){
    const supabase = await createClient()
    const user = await getUser()

    //create new member
    const {error} = await supabase.from("OrganizationMembersTbl").insert({
        orgName: orgName,
        userId: user.userId,
        userType: userType
    });

    console.log(error)
    if (error) {
        redirect('/error')
    }
}