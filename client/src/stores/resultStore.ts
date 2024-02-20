import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  PaginationInfo,
  calculationResponse,
  resultStoreProps,
} from '../models/model';

export const resultStore = create<resultStoreProps>()(
  devtools(
    persist(
      (set) => ({
        inputOne: 0,
        inputTwo: 0,
        sampleSize: 0,
        pagination: undefined,
        calculations: [],
        setParams: (inOne: number, inTwo: number, size: number) =>
          set({ inputOne: inOne, inputTwo: inTwo, sampleSize: size }),
        setPagination: (item: PaginationInfo) => set({ pagination: item }),
        setCalculations: (item: calculationResponse[]) =>
          set({ calculations: item }),
      }),
      {
        name: 'result-storage',
      },
    ),
  ),
);
