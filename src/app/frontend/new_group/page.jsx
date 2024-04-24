"use client"
import { useState } from "react"


export default function NewGroup() {

  const [name, setName] = useState("")
  const [cast, setCast] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    console.log(name)
    console.log(cast)
    const res = await fetch(`../../api/group`, {
      method: "POST",
      body: JSON.stringify({
        name,
        cast
      })
    }) 
    location.reload()
  }
 
  return (
    <div className="flex bg-slate-500 w-1/2 justify-center m-10">       
        <form onSubmit={handleSubmit}  >
          <h2 className="font-bold my-3">Nuevo grupo</h2>
          <label>Nombre nuevo grupo</label>
          <input type="text" onChange={(e)=> setName(e.target.value)}/>
          <label>Nombres integrantes</label>
          <input type="text" onChange={(e)=> setCast(e.target.value)}/>
          <button  className="bg-blue-500 p-2 rounded-md my-4"   type="submit">Aceptar</button>
        </form>
    </div>
  )
}
