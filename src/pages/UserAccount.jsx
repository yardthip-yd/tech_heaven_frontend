// Import
import UserProfile from '@/components/user/UserProfile'
import UserSidebar from '@/components/user/UserSidebar'
import React, { useState } from 'react'


const UserAccount = () => {

  // useState for select content
  const [selectedContent, setSelectedContent] = useState('profile')

  // Mapping Content
  const contentMap = {
    profile: <UserProfile />,
  }

  return (
    <div className="min-w-[1080px] flex flex-row gap-2 items-start rounded-2xl mb-8 shadow-lg mx-auto">
      <UserSidebar onSelect={setSelectedContent}/>
      {contentMap[selectedContent]}
    </div>
  )
}

export default UserAccount