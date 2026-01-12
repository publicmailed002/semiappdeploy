import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserLodingSkalten from './UserLodingSkalten';

function ContactList() {

  const {getAllContacts , allContects , setSelectedUser , isUserLoding} = useChatStore();


  useEffect(() => {
    getAllContacts()
  },[getAllContacts])

  if(isUserLoding) return <UserLodingSkalten/>

  return (
     <>
         {allContects.map((contact) =>(
          <div key={contact._id}
           className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
           onClick={() => setSelectedUser(contact)}
          >
            <div className='flex items-center gap-3'>
              {/* TODO : FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
              <div className='avatar avatar-online'>
                <div className='size-12 rounded-full'>
                  <img  src={contact.ProfilePic || "/avatar.png"} alt={contact.FullName} />
                  
                </div>

              </div>
                 <h4 className='text-slate-200 font-medium truncate'> {contact.FullName} </h4>
            </div>

          </div>
         ))}
       </>
  )
}

export default ContactList
