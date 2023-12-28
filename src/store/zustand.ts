import { StateCreator } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const middlewares = <T>(
  storeFn: StateCreator<T, [["zustand/devtools", never], ["zustand/immer", T]]>,
  options: DevtoolsOptions
) => devtools(immer(storeFn), { ...options, enabled: true });

export default middlewares;
