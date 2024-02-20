import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authStoreProps, claim } from '../models/model';

const getAccessToken = () => '';
const getRefreshToken = () => '';

export const authStore = create<authStoreProps>()(
  devtools(
    persist(
      (set, get) => ({
        status: 'idle',
        accessToken: null,
        refreshToken: null,
        credentials: [],
        errors: [],
        setCredentials: (credentials: claim[]) =>
          set({ credentials: credentials }),
        signIn: (token, refreshT) => {
          set({
            status: 'signIn',
            accessToken: token,
            refreshToken: refreshT,
          });
        },
        signOut: () => {
          set({
            status: 'signOut',
            accessToken: null,
            refreshToken: null,
          });
        },
        hydrate: () => {
          const token = getAccessToken();
          const refreshToken = getRefreshToken();
          if (token !== null && refreshToken !== null) {
            get().signIn(token, refreshToken);
          } else {
            get().credentials = [];
            get().signOut();
          }
        },
      }),
      {
        name: 'auth-storage',
      },
    ),
  ),
);

export const hydrateAuth = () => authStore.getState().hydrate();
