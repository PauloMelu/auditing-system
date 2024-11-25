'use server'
import { createClient } from "@/utils/supabase/server";
import { getUser } from "./get-user";

export async function returnMoney(formData: FormData) {
   const user = getUser()
    const supabase = await createClient()

    //const error = await supabase.from("OrganizationMembersTbl").update()
}