'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        studentNumber: formData.get('studentNumber') as string
    }

    const { error } = await supabase.auth.signUp({
        ...credentials,
        options: { data: { ...data } },
      });
      
    console.log(error)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/home', 'layout')
    redirect('/home')
}

export async function signOut() {

    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    console.log(error)
    if (error) {
        redirect('/error')
    }

    redirect('/login')
}