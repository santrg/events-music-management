"use client";

import { NextResponse } from "next/server";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

function UpdateEvent({ params }) {
  const [date_event, setDate_event] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [notes, setNotes] = useState("");
  const [groups, setGroups] = useState([]);
  const [id_group, setId_group] = useState(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  function Date_format(string) {
    const date = new Date(string);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  }

  useEffect(() => {
    const myFn = async () => {
      setIsLoading(true);
      const res = await fetch(`../../api/group`, {
        method: "GET",
      });
      const list_groups = await res.json();
      setGroups(list_groups);

      const res1 = await fetch(`../../api/event/${params.idEvent}`, {
        method: "GET",
      });
      const array_event = await res1.json();

      const date_old = Date_format(array_event[0].date_event);
      setDate_event(date_old);
      setPlace(array_event[0].place);
      setPrice(array_event[0].price);
      setReserved(array_event[0].reserved);
      setCancelled(array_event[0].cancelled);
      setNotes(array_event[0].notes);
      setId_group(array_event[0].id_group);

      setIsLoading(false);
    };
    myFn();
    console.log("id_group",id_group);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`../../api/event/${params.idEvent}`, {
        method: "PUT",
        body: JSON.stringify({
          date_event,
          place,
          price,
          reserved,
          cancelled,
          notes,
          id_group,
        }),
      });
      router.push("../../frontend/list_events");
    } catch (error) {
      return NextResponse.json({
        message: error.message,
      });
    }
  }

  function handleSelect(event) {
    setId_group(event.value);
  }

  function handleGroup() {
    if (id_group != 0) {
      console.log("distinto de cero", groups[id_group - 1].name);
      return {
        label: groups[id_group - 1].name,
        value: groups[id_group - 1].name,
      };
    }
  }

  if (isLoading) return <>Cargando...</>;

  return (
    <div>
      <div>
        <h1 className="flex justify-center w-full bg-blue-700">
          ACTUALIZAR EVENTO
        </h1>
      </div>
      <div className="flex justify-center my-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-slate-400 p-4">
            <label htmlFor="date_event">Fecha del Evento</label>
            <input
              value={date_event}
              className="text-black my-1 rounded-md px-2"
              type="date"
              id="date_event"
              name="date_event"
              onChange={(e) => setDate_event(e.target.value)}
            />
            <label htmlFor="place">Lugar del Evento</label>
            <input
              value={place}
              className="text-black my-1 rounded-md px-2"
              type="text"
              id="place"
              name="place"
              onChange={(e) => setPlace(e.target.value)}
            />
            <label htmlFor="price">Precio</label>
            <input
              value={price}
              className="text-black my-1 rounded-md px-2"
              type="number"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="reserved">¿Reserva?</label>
            <input
              checked={reserved}
              className="text-black my-1 rounded-md  "
              type="checkbox"
              id="reserved"
              name="reserved"
              onChange={() => {
                reserved == 1 ? setReserved(0) : setReserved(1);
              }}
            />
            <label htmlFor="cancelled">¿Cancelado?</label>
            <input
              checked={cancelled}
              className="text-black my-1 rounded-md  "
              type="checkbox"
              id="cancelled"
              name="cancelled"
              onChange={() => {
                cancelled == 1 ? setCancelled(0) : setCancelled(1);
              }}
            />
            <label htmlFor="notes">Notas</label>
            <input
              value={notes}
              className="text-black my-1 rounded-md px-2"
              type="text"
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
            />

            <Select
              id="1"
              defaultValue={handleGroup}
              options={groups.map((group) => ({
                value: group.id,
                label: group.name,
              }))}
              onChange={handleSelect}
            />

            <button type="submit" className=" bg-blue-700 my-4 p-3 rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateEvent;
