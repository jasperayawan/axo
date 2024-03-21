import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'

export async function POST(request: Request){
    try{
        await dbConnect();
        const body = await request.json();
        const {
            username,
            email,
            password,
        } = body;

        if(!username || !email || !password){
            return new NextResponse('Missing info', {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userName = generateUsername(username);

        const user = await User.create({
            username, email, hashedPassword
        })

        return NextResponse.json(user)
    }
    catch(error: any){
        console.log('REGISTRATION ERROR: ', error);
        console.error(
        'Some error happened while accessing POST at /api/register at route.ts: ',
        error
        );
        return new NextResponse('Internal Error', { status: 500 });
    }
}


function generateUsername(firstName: string): string {
    const firstNameWithoutSpaces = firstName.toLowerCase().replace(/\s/g, '');
    const randomDigits = Math.floor(Math.random() * 90) + 10; // Generate random two-digit number
    return `@${firstNameWithoutSpaces}${randomDigits}`;
  }