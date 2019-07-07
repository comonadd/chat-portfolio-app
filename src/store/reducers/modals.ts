import { createReducer } from "+/store/helpers";
import {
  SHOW_MODAL,
  HIDE_MODAL,
  ShowModalAction,
  HideModalAction,
  HideAllModalsAction,
  HIDE_ALL_MODALS
} from "+/store/action";

export interface ModalState {
  shown: boolean;
}
export interface ModalsState {
  modals: Record<string, ModalState>;
}

export const modalsInitialState = {
  modals: {
    login: { shown: false },
    register: { shown: false },
    profile: { shown: false }
  }
};

export default createReducer(
  {
    [SHOW_MODAL]: (state: ModalsState, action: ShowModalAction) => ({
      ...state,
      modals: {
        ...state.modals,
        [action.payload.id]: {
          ...state.modals[action.payload.id],
          shown: true
        }
      }
    }),
    [HIDE_MODAL]: (state: ModalsState, action: HideModalAction) => ({
      ...state,
      modals: {
        ...state.modals,
        [action.payload.id]: {
          ...state.modals[action.payload.id],
          shown: false
        }
      }
    }),
    [HIDE_ALL_MODALS]: (state: ModalsState, action: HideAllModalsAction) => ({
      ...state,
      modals: {
        ...state.modals,
        ...Object.keys(state.modals).reduce(
          (obj: Record<string, ModalState>, modalID: string) => {
            return {
              ...obj,
              [modalID]: { ...state.modals[modalID], shown: false }
            };
          },
          {}
        )
      }
    })
  },
  modalsInitialState
);
