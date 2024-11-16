import { createClient } from "@/utils/supabase/server"

export async function getUser(){
    const supabase = await createClient()
    const { data, error} = await supabase.auth.getUser()
    if(error)
        return null
    return data
}