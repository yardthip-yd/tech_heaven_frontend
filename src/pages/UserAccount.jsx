// Import
import UserProfile from '@/components/user/UserProfile';
import UserSidebar from '@/components/user/UserSidebar';
import Wishlist from '@/pages/Wishlist';
import Purchase from '@/pages/Purchase';
import React, { useState } from 'react';

const UserAccount = () => {
  // useState for select content
  const [selectedContent, setSelectedContent] = useState('profile');

  // Mapping Content
  const contentMap = {
    profile: <UserProfile />,
    wishlist: <Wishlist />,
    purchase: <Purchase />,
  };

  return (
    <div className="w-[1440px] min-h-[500px] flex flex-row gap-2 items-start rounded-2xl shadow-lg mx-auto my-[100px]">
      <UserSidebar onSelect={setSelectedContent} />
      <div className="flex-1 p-6">
        {contentMap[selectedContent]}
      </div>
    </div>
  );
};

export default UserAccount;
