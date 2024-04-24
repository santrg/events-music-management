"use client"
import { useEffect, useState } from "react";
import EventCard from '../../components/EventCard'
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

function ListEvents() {
    const [events, setEvents] = useState([])
    const localizer = dayjsLocalizer(dayjs)
    const [calEvents, setCalEvents] = useState([])


    const EventToDateEvent = (list_events)=>{
      
      const list_cal_events = list_events.map(event => ({
        start: dayjs(event.date_event).toDate(),
        end: dayjs(event.date_event).toDate(),
        title: event.place
      }))
      //console.log(list_cal_events)
      return list_cal_events
    }

     
    useEffect(()=> {
      const myFn = async () =>{      
        try{         
          const res = await fetch(`../../api/event`,{
            method : "GET"
          })      
          const data = await res.json() 
          data.sort((a , b ) => a.date_event.localeCompare(b.date_event))
          console.log(data)      
         
          setEvents(data)      
          setCalEvents(EventToDateEvent(data))
        }catch(error){
          alert("No se encontraron eventos")
        }        
      }
      myFn()
    
    },[])
    

    return (
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <div>
              <h1>Lista de Eventos</h1>
              {events.map(event => <EventCard value={event} key={event.id}/>)}  
          </div>
        </div>
        <div className="col-span-2 p-6" style={{
          height: "85vh",
          width: "40vw",
        }}>
            <Calendar
              localizer={localizer}
              events={calEvents}
              // startAccessor="start"
              // endAccessor="end"
            />
        </div>   
      </div>
    );
}

export default ListEvents
