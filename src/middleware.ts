import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./actions/get-user"
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
    const supabase = await createClient()
    const { data, error} = await supabase.auth.getUser()
    console.log("triggered by: ", request.nextUrl.pathname)
    if (error || !data?.user) {
        return NextResponse.redirect('http://localhost:3000/')
    }

}

export const config = {
    matcher: [
        '/organization/:path*',
        '/home/:path*',
    ],
  };