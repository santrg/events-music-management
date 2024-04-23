import {conn} from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function GET() {
    try{
        const res = await conn.query("SELECT * FROM groups_table")     
        return NextResponse.json(res)
    }catch(error){
        return NextResponse.json({
            message: error.message
        })
    }
}

export async function POST(request) {
    const data = await request.json()
    const res = await conn.query("INSERT INTO groups_table SET ?", data)
    return NextResponse.json(res)
  }
  
  