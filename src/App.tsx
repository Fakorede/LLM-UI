import React, { useEffect } from 'react';
import useStore from '@store/store';
import i18n from './i18n';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';
import SessionPopup from '@components/SessionPopup';
import Toast from '@components/Toast';

function App() {
  const initialiseNewChat = useInitialiseNewChat();
  const setChats = useStore((state) => state.setChats);
  const setTasks = useStore((state) => state.setTasks);
  const setTheme = useStore((state) => state.setTheme);
  const setApiKey = useStore((state) => state.setApiKey);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  useEffect(() => {
    // legacy local storage
    const oldChats = localStorage.getItem('chats');
    const apiKey = localStorage.getItem('apiKey');
    const theme = localStorage.getItem('theme');

    if (apiKey) {
      // legacy local storage
      setApiKey(apiKey);
      localStorage.removeItem('apiKey');
    }

    if (theme) {
      // legacy local storage
      setTheme(theme as Theme);
      localStorage.removeItem('theme');
    }

    if (oldChats) {
      // legacy local storage
      try {
        const chats: ChatInterface[] = JSON.parse(oldChats);
        if (chats.length > 0) {
          setChats(chats);
          setCurrentChatIndex(0);
        } else {
          initialiseNewChat();
        }
      } catch (e: unknown) {
        console.log(e);
        initialiseNewChat();
      }
      localStorage.removeItem('chats');
    } else {
      // existing local storage
      const chats = useStore.getState().chats;
      const currentChatIndex = useStore.getState().currentChatIndex;
      if (!chats || chats.length === 0) {
        initialiseNewChat();
      }
      if (
        chats &&
        !(currentChatIndex >= 0 && currentChatIndex < chats.length)
      ) {
        setCurrentChatIndex(0);
      }

      if (chats && chats.length > 0) {
        const rawData = localStorage.getItem('free-chat-gpt')

        if (!rawData) return;
        
        const parsedData = JSON.parse(rawData);
        const tasks = parsedData?.state?.tasks;
        const tasksChat = parsedData?.state?.chats;

        if (tasks && tasks.length > 3) {
          tasks[3].additionalPrompt = "Input are two strings a and b consisting only of 1s and 0s.\nPerform binary XOR on these inputs and return result also as a string.\n\n\nTest Cases: \n\n('111000', '101010') == '010010' \n\n('1', '1') == '0' \n\n('0101', '0000') == '0101' \n\n";
        }

        if (tasksChat && tasksChat.length > 3) {
          tasksChat[3].moreInfo = "Input are two strings a and b consisting only of 1s and 0s.\nPerform binary XOR on these inputs and return result also as a string.\n\n\nTest Cases: \n\n('111000', '101010') == '010010' \n\n('1', '1') == '0' \n\n('0101', '0000') == '0101' \n\n";
        }

        localStorage.setItem('free-chat-gpt', JSON.stringify(parsedData));

        setTasks(tasks);
        setChats(tasksChat);
      }
    }
  }, []);

  return (
    <div className='overflow-hidden w-full h-full relative'>
      <Menu />
      <Chat />
      <SessionPopup />
      <Toast />
    </div>
  );
}

export default App;
