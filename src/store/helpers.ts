import { Action } from "./types";

// Reducer helpers

export const createReducer = (
  components: any,
  initialState: Record<string, any>
) => (state: any = initialState, action: Action) =>
  components.hasOwnProperty(action.type)
    ? components[action.type](state, action)
    : state;

// Local storage helpers

export const loadPersistedState = () => {
  return localStorage.getItem("savedState");
};

export const savePersistedState = (store: any) => {
  localStorage.setItem("savedState", store.getState());
};
