"use server"
import { createClient } from "@/utils/supabase/server"

type Props = {}

export async function getName(userId: string) {
    const supabase = await createClient()
    const { data: names, error } = await supabase.from("UsersTbl")
    .select(`
        firstName,
        lastName
    `)
    .eq("userId", userId)
    .returns<{firstName: string, lastName: string}[]>()
    .single()

    return names
};