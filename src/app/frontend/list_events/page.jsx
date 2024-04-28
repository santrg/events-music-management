"use client"
import { useEffect, useState } from "react";
import EventCard from '../../components/EventCard'
import dayjs from 'dayjs';
import { Calendar, Week, dayjsLocalizer, Views } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { months } from "moment/moment";

function ListEvents() {
    const [events, setEvents] = useState([])
    const localizer = dayjsLocalizer(dayjs)
    const [calEvents, setCalEvents] = useState([])
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const components = {
      event: props =>{
        let group_colour = "gray"
        switch(props.event.group){
          case 1: 
            group_colour = "orange"
            break;
          case 2: 
            group_colour = "blue  "
            break;
          case 3: 
            group_colour = "black"
            break;
          case 4: 
            group_colour = "green"
            break;
        }
                
        return <div style={{background: group_colour}}>{ props.title}</div>
        
      }
    }
    const EventToDateEvent = (list_events)=>{
      
      const list_cal_events = list_events.map(event => ({
        start: dayjs(event.date_event).toDate(),
        end: dayjs(event.date_event).toDate(),
        title: event.place,
        group: event.id_group
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
          // console.log(data)      
         
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
              views={[Views.MONTH, Views.WEEK, Views.DAY]} //NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              defaultView={view} //NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              view={view} // Include the view prop // NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              date={date} // Include the date prop //NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              onView={(view) => setView(view)} //NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              onNavigate={(date) => {
                   setDate(new Date(date));  //NO TOCAR!! solución a error en Next.js 14 de Big-Calendar
              }}
              components={components}
            />
        </div>   
      </div>
    );
}

export default ListEvents
