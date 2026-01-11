import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {useChatStore} from '../store/useChatStore'
import BorderAniamtedContainer from '../components/BorderAnimatedContainer';
import ActiveTabeSwitch from '../components/ActiveTabeSwitch'
import ChatContainer from '../components/ChatContainer'
import ChatsList from '../components/ChatsList'
import ContactList from '../components/ContactList'
import NoconversationPlaceHolder from '../components/NoconversationPlaceHolder'
import ProfileHeader from '../components/ProfileHeader'

function ChatPage() {
  const {logout} = useAuthStore();
  const {activeTab,selectedUser}  = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-200'>

      <BorderAniamtedContainer>
          {/* LEFT SIDE */}
          <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>

           <ProfileHeader/>
           <ActiveTabeSwitch/>

           <div className='flex-1 overflow-y-auto p-4 space-y-2'>

            {activeTab === "chats" ? <ChatsList/> : <ContactList/>}

           </div>
          </div>
          {/* RIGHT SIDE */}
          <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>

           {selectedUser ? <ChatContainer/> : <NoconversationPlaceHolder/>}

          </div>
      </BorderAniamtedContainer>
      
    </div>
  )
}

export default ChatPage
