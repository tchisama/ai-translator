import {create} from 'zustand';

interface StoreState {
  userCountry: string;
  toCountry: string;
  setUserCountry: (newUserCountry: string) => void;
  setToCountry: (newToCountry: string) => void;

  userCountryText: string;
  toCountryText: string;
  setUserCountryText: (newUserCountry: string) => void;
  setToCountryText: (newToCountry: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  userCountry: 'morocco',
  toCountry: 'russia',
  setUserCountry: (newUserCountry: string) => {
    set({ userCountry: newUserCountry });
  },
  setToCountry: (newToCountry: string) => {
    set({ toCountry: newToCountry });
  },

  userCountryText: '',
  toCountryText: '',
  setUserCountryText: (newUserCountry: string) => {
    set({ userCountryText: newUserCountry });
  },
  setToCountryText: (newToCountry: string) => {
    set({ toCountryText: newToCountry });
  },
}));