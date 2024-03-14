import { StateCreator } from "zustand";
import { PersistOptions, devtools, persist } from "zustand/middleware";

const middlewares = <T>(storeFn: StateCreator<T, [["zustand/devtools", never]]>, options: PersistOptions<T, T>) =>
  devtools(persist(storeFn, options), { enabled: true });

export default middlewares;
