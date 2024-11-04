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
    let chats: any[] = [];

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

    conversations.forEach(obj => chats.push(generateDefaultChat(obj.title, "", obj.message)));

    setChats(chats);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
