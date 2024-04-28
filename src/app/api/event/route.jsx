import {NextResponse} from 'next/server'
import {conn} from '@/libs/mysql'

export async function GET() {
    const res = await conn.query("SELECT * FROM events")
  return NextResponse.json(res)
}


export async function POST(request) {
 try{
    const data = await request.json()
    console.log(data)
    const res = await conn.query("INSERT INTO events SET ?", data)
    return NextResponse.json("Nueva evento de entrada ")
 }
  catch(eror){
    console.log(error)
    return NextResponse.json(
      {
        message : error.message,
      },
      {
          status : 500,
      })
  }
}



