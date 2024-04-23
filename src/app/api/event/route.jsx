import {NextResponse} from 'next/server'
import {conn} from '@/libs/mysql'

export async function GET() {
    const res = await conn.query("SELECT * FROM events")
  return NextResponse.json(res)
}


export async function POST(request) {
    const data = await request.json()
    console.log(data)
    const res = await conn.query("INSERT INTO events SET ?", data)
  return NextResponse.json("Nueva evento de entrada ")
}



