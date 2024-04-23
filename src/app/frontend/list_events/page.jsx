"use client"
import { useEffect, useState } from "react";
import EventCard from '../../components/EventCard'

function ListEvents() {
    const [events, setEvents] = useState([])
  
    useEffect(()=> {
      const myFn = async () =>{      
        try{         
          const res = await fetch(`../../api/event`,{
            method : "GET"
          })      
          const data = await res.json()        
          setEvents(data)      
        }catch(error){
          alert("No se encontraron eventos")
        }        
      }
      myFn()
    },[])
    

    return (
      <div>
          <h1>Lista de Eventos</h1>
          {events.map(event => <EventCard value={event} key={event.id}/>)}  
      </div>
    );
}

export default ListEvents
