import React from 'react';
import useStore from '@store/store';
import { MessageInterface } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';
import Papa from 'papaparse';

const useInitialiseNewChat = () => {
  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const initialiseNewChat = async () => {
    let conversations: any[] = [];

    await fetch("/conversations.csv")
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            conversations = [...result.data]
          },
        });
    });

    setChats([
      generateDefaultChat(conversations[0].title, "", conversations[0].message),
      generateDefaultChat(conversations[1].title, "", conversations[1].message),
      generateDefaultChat(conversations[2].title, "", conversations[2].message),
    ]);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
