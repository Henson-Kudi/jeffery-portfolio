import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect, { User } from '@/lib/mongoose/models'

export async function POST(request: Request) {
    await dbConnect()
    const { userName, email } = await request.json()

    const found = await User.findOne({
        email,
        name: userName
    })

    if (!found) {
        return NextResponse.json({ success: false, message: 'Invalid credentials', data: null }, {
            status: 400,
        })
    }

    // Here you would typically validate the user credentials against a database
    // For this example, we'll just set the cookies directly
    const Cookies = await cookies()

    Cookies.set('userName', userName, { httpOnly: true })
    Cookies.set('userEmail', email, { httpOnly: true })

    return NextResponse.json({ success: true, data: found.toJSON() })
}

