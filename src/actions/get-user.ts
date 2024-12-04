
import { UsersTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"


export async function getUser(): Promise<UsersTbl>{
    const supabase = await createClient()
    const { data, error} = await supabase.auth.getUser()

    
    const {data: userData, error: selectError} = await supabase.from("UsersTbl")
    .select()
    .eq("userId", data.user.id)
    .returns<UsersTbl[]>()
    .single()


    if (selectError || !data?.user) {
      redirect('/')
    }
    return userData
}