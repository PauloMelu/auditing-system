"use server"
import { ReceiptsTbl } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"



export async function uploadReceipt(formData: FormData) {
    const supabase = await createClient()
    let data: ReceiptsTbl = {} as ReceiptsTbl

    data.orgName = formData.get('orgName') as string    
    data.userId = formData.get('userId') as string
    data.eventName = formData.get('eventName') as string
    data.ORNumber = formData.get('ORNumber') as string
    data.amount = parseFloat(formData.get('amount') as string)
    data.category = formData.get('category') as string

    const {error: insertError} = await supabase.from("ReceiptsTbl").insert(data)
    console.log(insertError)
    if(insertError){
        console.log("Go to error")
        redirect('/error')
    }

    revalidatePath('/', "layout")
};