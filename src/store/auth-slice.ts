import { defaultAPIEndpoint } from '@constants/auth';
import { StoreSlice } from './store';

export interface AuthSlice {
  apiKey?: string;
  userId?: string;
  userKey?: string;
  apiEndpoint: string;
  serverEndpoint: string;
  firstVisit: boolean;
  setApiKey: (apiKey: string) => void;
  setUserKey: (userKey: string) => void;
  setUserId: (userId: string) => void;
  setApiEndpoint: (apiEndpoint: string) => void;
  setFirstVisit: (firstVisit: boolean) => void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = (set, get) => ({
  userId: "",
  userKey: "",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || undefined,
  serverEndpoint: import.meta.env.VITE_SERVER_ENDPOINT,
  apiEndpoint: defaultAPIEndpoint,
  firstVisit: true,
  setUserId: (userId: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      userId: userId,
    }));
  },
  setUserKey: (userKey: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      userKey: userKey,
    }));
  },
  setApiKey: (apiKey: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiKey: apiKey,
    }));
  },
  setApiEndpoint: (apiEndpoint: string) => {
    set((prev: AuthSlice) => ({
      ...prev,
      apiEndpoint: apiEndpoint,
    }));
  },
  setFirstVisit: (firstVisit: boolean) => {
    set((prev: AuthSlice) => ({
      ...prev,
      firstVisit: firstVisit,
    }));
  },
});
