"use client"
import {useRouter} from 'next/navigation'
import { useEffect, useState } from "react"
import GroupCard from '@/app/components/GroupCard'



export default function ListGroups() {

  const router = useRouter()
  const [groups, setGroups] = useState([])

  useEffect(()=>{
    const myFn = async () => {
      const res = await fetch(`../../../api/group`,{
        method: "GET",
      })
      const data = await res.json()
      setGroups(data)    
    }
    myFn()   
  },[])
  
  function handleClick(){
    router.push("../frontend/new_group")
  }
  return (
    <div>
      <div>
        <h1>Lista de grupos</h1>
        {groups.map(group => <GroupCard value={group} key={group.id}/>)}
      </div>
      <div>
        <button onClick={handleClick} className="flex bg-blue-500 p-2 w-full" type="button" >Nuevo Grupo</button> 
      </div>
      
    </div>
  )
}
