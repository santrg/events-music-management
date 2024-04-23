import { NextResponse } from "next/server";
import {conn} from '../../../../libs/mysql'


export async function GET(request,  {params}) {
    const res = await conn.query("SELECT * FROM groups_table WHERE id = ?", params.idGroup)
  return NextResponse.json(res)
}
export async function DELETE(request,  {params}) {
    const res = await conn.query("DELETE FROM groups_table WHERE id = ?", params.idGroup)
  return NextResponse.json(res)
}
