import React, { useEffect, useState } from 'react';
import useStore from '@store/store';
import { useTranslation, Trans } from 'react-i18next';
import Papa from 'papaparse';

import PopupModal from '@components/PopupModal';
import CrossIcon from '@icon/CrossIcon';
import useSubmit from '@hooks/useSubmit';
import { ChatInterface } from '@type/chat';

const SessionPopup = () => {
  const { t } = useTranslation(['main', 'session']);

  const userId = useStore((state) => state.userId);
  const userKey = useStore((state) => state.userKey);
  const setUserId = useStore((state) => state.setUserId);
  const setUserKey = useStore((state) => state.setUserKey);
  const firstVisit = useStore((state) => state.firstVisit);
  const setFirstVisit = useStore((state) => state.setFirstVisit);

  const [_userId, _setUserId] = useState<string>(userId || '');
  const [_userKey, _setUserKey] = useState<string>(userKey || '');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    !userKey && !userId
  );
  const [error, setError] = useState<string>('');

  const { handleSubmit } = useSubmit();

  const tasks = useStore((state) => state.tasks);
  const setChats = useStore((state) => state.setChats);

  const generateChat = (userId?: String) => {
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );

    updatedChats.forEach((chats, idx) => {
      chats.messages.push({ role: 'user', content: tasks ? tasks[idx].prompt : '' })
    });
    setChats(updatedChats);

    handleSubmit(userId?userId:'');
  }

  const handleConfirm = async () => {
    if (_userId.length === 0 || _userKey.length === 0) {
      setError(t('sessionWarning', { ns: 'session' }) as string);
    } else {
      // grab users information
      let users:any[] = [];

      await fetch("/users.csv")
        .then(response => response.text())
        .then(text => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              users = [...result.data]
            },
          });
      });

      const user = users.find(user => user.email == _userId)
      if (user.token == _userKey) {
        setError('');
        setUserId(_userId);
        setUserKey(_userKey);

        generateChat(user.email);

        setIsModalOpen(false);
      } else {
        setError(t('sessionWarning2', { ns: 'session' }) as string);
      }
    }
  };

  useEffect(() => {
    setFirstVisit(false);
  }, []);

  return isModalOpen ? (
    <PopupModal
      title='Setup your session'
      handleConfirm={handleConfirm}
      setIsModalOpen={setIsModalOpen}
      cancelButton={false}
    >
      <div className='p-6 border-b border-gray-200 dark:border-gray-600'>
        <div className='flex gap-2 items-center justify-center mt-2'>
          <div className='min-w-fit text-gray-900 dark:text-gray-300 text-sm'>
            {t('session.userIdLabel', { ns: 'session' })}
          </div>
          <input
            type='text'
            className='text-gray-800 dark:text-white p-3 text-sm border-none bg-gray-200 dark:bg-gray-600 rounded-md m-0 w-full mr-0 h-8 focus:outline-none'
            value={_userId}
            onChange={(e) => {
              _setUserId(e.target.value);
            }}
          />
        </div>
        <div className='flex gap-2 items-center justify-center mt-2'>
          <div className='min-w-fit text-gray-900 dark:text-gray-300 text-sm'>
            {t('session.userKeyLabel', { ns: 'session' })}
          </div>
          <input
            type='text'
            className='text-gray-800 dark:text-white p-3 text-sm border-none bg-gray-200 dark:bg-gray-600 rounded-md m-0 w-full mr-0 h-8 focus:outline-none'
            value={_userKey}
            onChange={(e) => {
              _setUserKey(e.target.value);
            }}
          />
        </div>


        {error.length > 0 && (
          <div className='relative py-2 px-3 w-full mt-3 border rounded-md border-red-500 bg-red-500/10'>
            <div className='text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap'>
              {error}
            </div>
            <div
              className='text-white absolute top-1 right-1 cursor-pointer'
              onClick={() => {
                setError('');
              }}
            >
              <CrossIcon />
            </div>
          </div>
        )}
      </div>
    </PopupModal>
  ) : (
    <></>
  );
};

export default SessionPopup;
