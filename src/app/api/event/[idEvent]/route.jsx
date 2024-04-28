import { NextResponse } from "next/server";
import {conn} from '../../../../libs/mysql'


export async function GET(request, {params}) {
  
  try{
    const res = await conn.query("SELECT * FROM events WHERE id = ?", params.idEvent )
    //const data = await res.json()
    return NextResponse.json(res)
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

export async function DELETE(request, {params}) {
  const res = await conn.query("DELETE FROM events WHERE id = ?", params.idEvent)
    
  return NextResponse.json("Eliminando evento  "+params.idEvent)
}

export async function PUT(request, {params}) {
  const data = await request.json()
  const res = await conn.query("UPDATE events SET ? WHERE id = ?", [data, params.idEvent])
  return NextResponse.json("Actualizando evento  "+params.idEvent)
}
