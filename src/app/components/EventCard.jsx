"use client"
import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation'


export default function EventCard(event) {
  const [group, setGroup] = useState("")
  const router = useRouter()

  function FormatDate(string){
      const t = new Date()  
      t.setTime(Date.parse(string))
      const temp1 = t.toLocaleDateString()
    return temp1
  }

  useEffect(()=>{
    const myFn = async () => {
      const res = await fetch(`../api/group/${event.value.id_group}`, {
        method : "GET"
      })
      const data = await res.json()

      setGroup(data[0].name)
    }
    myFn()
  },[])

  async function handleDelete(data){
        
    const res = await fetch(`../api/event/${data.target.value}`,{
      method: "DELETE"
    })
    //router.refresh()
    location.reload()
    //router.push("../frontend/list_events")
  }
  async function handleUpdate(data){
    router.push(`../frontend/new_event/${data.target.value}`)
    //console.log(data.target.value)
    //const res = await fetch(`../api/event/${id}`)
  }

  return (
    <div className="flex grid grid-cols-8 bg-slate-700  my-2">      
        <h1 className="font-bold p-1 mx-2">{FormatDate(event.value.date_event)}</h1>        
        <h1 className="font-bold p-1 mx-2">{group}</h1>        
        <h3 className="font-bold p-1 mx-2">{event.value.place}</h3>
        <h3 className="font-bold p-1 mx-2">{event.value.price}</h3>
        <h3 className="text-yellow-400 font-bold p-1 mx-2">{(event.value.reserved===1) ? ("RESERVA") : ("")}</h3>
        <h3 className="text-red-600 font-bold p-1 mx-2">{(event.value.cancelled===1) ? ("CANCELADO") : ("")}</h3>
        <p className="font-bold p-1 mx-2">{event.value.notes}</p>
        <div>
          <button onClick={handleDelete} value={event.value.id} type="button" className="bg-red-500 w-1/3 p-2 rounded-md">Eliminar</button>
          <button onClick={handleUpdate} value={event.value.id} type="button" className="bg-blue-500 w-1/3 p-2 rounded-md m-2">Editar</button>
        </div>
    </div>
  )
}
