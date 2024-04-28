"use client";

import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'

function NewEvent() {
  const [date_event, setDate_event] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [notes, setNotes] = useState("");
  const [groups, setGroups] = useState([])
  const [id_group, setId_group] = useState(0)
  const router = useRouter()

  useEffect(()=>{
    const myFn = async ()=>{
      const res = await fetch(`../../api/group`,{
        method : "GET"
      })
      const data = await res.json()      
      setGroups(data)
    }
    myFn()  
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    (reserved==='on') && setReserved(true)
    try {
      const res = await fetch(`../api/event`, {
        method: "POST",
        body: JSON.stringify({
          date_event,
          place,
          price,
          reserved,
          cancelled,
          notes,
          id_group : id_group +1
        }),
      });
      router.push("../frontend/list_events")
    } catch (error) {
      return NextResponse.json({
        message: error.message,
      });
    }
  }

  return (    
    <div>
      <div>
        <h1 className="flex justify-center w-full bg-slate-700">NUEVO EVENTO</h1>
      </div>
      <div className="flex justify-center my-10">      
        <div>
          <form onSubmit={handleSubmit} className="bg-slate-400 p-2">
            <label htmlFor="date_event">Fecha del Evento</label>
            <input
              className="text-black my-1 rounded-md px-2"
              type="date"
              id="date_event"
              name="date_event"
              required
              onChange={(e) => setDate_event(e.target.value)}
            />
            <label htmlFor="place">Lugar del Evento</label>
            <input
              className="text-black my-1 rounded-md px-2"
              type="text"
              id="place"
              name="place"
              onChange={(e) => setPlace(e.target.value)}
            />
            <label htmlFor="price">Precio</label>
            <input
              className="text-black my-1 rounded-md px-2"
              type="number"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="reserved">¿Reserva?</label>
            <input
              className="text-black my-1 rounded-md "
              type="checkbox"
              id="reserved"
              name="reserved"
              onChange={(e) => { (e.target.value==="on") ? setReserved(1) : setReserved(0)}}
            />
            <label htmlFor="cancelled">¿Cancelado?</label>
            <input
              className="text-black my-1 rounded-md  "
              type="checkbox"
              id="cancelled"
              name="cancelled"
              onChange={(e) => { (e.target.value==="on") ? setCancelled(1) : setCancelled(0)}}
            />
            <label htmlFor="notes">Notas</label>
            <input
              className="text-black my-1 rounded-md px-2"
              type="text"
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
            />
            <select onChange={(e)=> setId_group(e.target.options.selectedIndex)} className="text-black">    
                {groups.map((group)=>{return <option key={group.id}>{group.id+"  "+group.name}</option>})}
            </select>
            <button type="submit" className=" bg-blue-700 my-4 p-3 rounded-md">
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default NewEvent;
