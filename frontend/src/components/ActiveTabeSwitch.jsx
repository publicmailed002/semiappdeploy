import React from 'react'
import { useChatStore } from '../store/useChatStore'


function ActiveTabeSwitch() {
   
     const {activeTab , setActiveTab} = useChatStore();
 
  return (
    <div  className='tabs tabs-box bg-transparent p-2 m-2'>

      <button onClick={() =>setActiveTab('chats')}
        className={`tap ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
        >Chats</button>
      <button onClick={()=> setActiveTab('contacts')}
        className={`tap ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
        >Contacts</button>
      
    </div>
  )
}

export default ActiveTabeSwitch
