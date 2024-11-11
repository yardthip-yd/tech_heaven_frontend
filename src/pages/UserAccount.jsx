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
    <div className="w-[1080px] flex flex-row gap-2 items-start rounded-2xl shadow-lg mx-auto my-[100px]">
      <UserSidebar onSelect={setSelectedContent}/>
      {contentMap[selectedContent]}
    </div>
  )
}

export default UserAccount