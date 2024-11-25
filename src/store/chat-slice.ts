import { StoreSlice } from './store';
import { ChatInterface, FolderCollection, MessageInterface, TaskInterface } from '@type/chat';

export interface ChatSlice {
  allowChats: boolean,
  messages: MessageInterface[];
  chats?: ChatInterface[];
  currentChatIndex: number;
  generating: boolean;
  error: string;
  folders: FolderCollection;
  tasks?: TaskInterface[];
  setMessages: (messages: MessageInterface[]) => void;
  setChats: (chats: ChatInterface[]) => void;
  setTasks: (tasks: TaskInterface[]) => void;
  setCurrentChatIndex: (currentChatIndex: number) => void;
  setGenerating: (generating: boolean) => void;
  setError: (error: string) => void;
  setFolders: (folders: FolderCollection) => void;
}

export const createChatSlice: StoreSlice<ChatSlice> = (set, get) => ({
  allowChats: import.meta.env.VITE_ALLOW_CHATS || true,
  messages: [],
  currentChatIndex: -1,
  generating: false,
  error: '',
  folders: {},
  tasks: [],
  setAllowChats: (allowChats: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      allowChats: allowChats,
    }));
  },
  setMessages: (messages: MessageInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      messages: messages,
    }));
  },
  setChats: (chats: ChatInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      chats: chats,
    }));
  },
  setTasks: (tasks: TaskInterface[]) => {
    set((prev: ChatSlice) => ({
      ...prev,
      tasks: tasks,
    }));
  },
  setCurrentChatIndex: (currentChatIndex: number) => {
    set((prev: ChatSlice) => ({
      ...prev,
      currentChatIndex: currentChatIndex,
    }));
  },
  setGenerating: (generating: boolean) => {
    set((prev: ChatSlice) => ({
      ...prev,
      generating: generating,
    }));
  },
  setError: (error: string) => {
    set((prev: ChatSlice) => ({
      ...prev,
      error: error,
    }));
  },
  setFolders: (folders: FolderCollection) => {
    set((prev: ChatSlice) => ({
      ...prev,
      folders: folders,
    }));
  },
});
