import React, { useState } from 'react';
import useStore from '@store/store';

import AboutIcon from '@icon/AboutIcon';
import BaseButton from './BaseButton';
import PopupModal from '@components/PopupModal';

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentChatIndex = useStore((state) => state.currentChatIndex);
  const chats = useStore((state) => state.chats);

  const title = chats?chats[currentChatIndex].title:'Title';
  const info = chats?chats[currentChatIndex].moreInfo:''

  return (
    <>
      <BaseButton
        icon={<AboutIcon />}
        buttonProps={{ 'aria-label': 'more message info' }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
    
      {isModalOpen && (
        <PopupModal
          setIsModalOpen={setIsModalOpen}
          title={title + " Prompt"}
          cancelButton={false}
        >
          <div className='p-6 border-b border-gray-200 dark:border-gray-600 flex flex-col items-center gap-4'>
            <div className='flex flex-col gap-3'>
              <span className='text-white whitespace-pre-wrap'>{info}</span>
            </div>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default InfoButton;
