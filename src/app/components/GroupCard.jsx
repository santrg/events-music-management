"use client"
//import {useRouter} from 'next/navigation'


export default function GroupCard(group) {
  
  async function handleDeleteGroup(){
    console.log("borrando", group.value.id)
    const res = await fetch(`../api/group/${group.value.id}`,{
      method : "DELETE", 
    })
    console.log(res)
   //location.reload()

  }

  return (
    <div className="flex bg-slate-800 p-2 my-2">        
        <p className="font-bold bg-slate-500 p-2">{group.value.name}</p>
        <p className=" p-2 mx-3">{" Integrantes: " + group.value.cast}</p>
        <button onClick={handleDeleteGroup} className="flex bg-red-500 p-2" type="button">Eliminar</button>
        <button className="flex bg-blue-500 p-2" type="button">Editar</button>
    </div>
  )
}
