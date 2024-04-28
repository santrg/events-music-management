"use client"
import { useEffect, useState } from "react"
import {useRouter} from 'next/navigation'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";



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
    console.log(data.target.value)    
    const res = await fetch(`../api/event/${data.target.value}`,{
      method: "DELETE"
    })

    location.reload()

  }
  async function handleUpdate(data){
    router.push(`../frontend/new_event/${data.target.value}`)    
  }

  return (
    <div className="flex grid grid-cols-10 bg-slate-700  my-2">      
        <h1 className=" p-1 ">{FormatDate(event.value.date_event)}</h1>        
        <h1 className="col-span-2 p-1 mx-2">{group}</h1>        
        <h3 className="col-span-2 p-1 ">{event.value.place}</h3>
        <h3 className="col-span-1 p-1 ">{event.value.price}</h3>
        <div className="col-span-1">
          <h3 className=" text-yellow-400  ">{(event.value.reserved===1) ? ("RES") : ("")}</h3>
          <h3 className=" text-red-600   ">{(event.value.cancelled===1) ? ("CAN") : ("")}</h3>
        </div>
        <p className="col-span-2 p-1 ">{event.value.notes}</p>
        <div className="col-span-1">
          <button onClick={handleDelete} value={event.value.id} type="button" className="bg-red-500 w-1/3 p-1 rounded-md"><MdOutlineDelete />_</button>
          <button onClick={handleUpdate} value={event.value.id} type="button" className="bg-blue-500 w-1/3 p-1  rounded-md m-2 "> <FaRegEdit />_</button>
        </div>
    </div>
  )
}
