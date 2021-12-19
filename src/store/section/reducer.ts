import produce from 'immer';
import * as Types from './actionTypes';

export type State = {
  selectedSection: string;
};

export const initialState: State = {
  selectedSection: '',
};

export default (state: State = initialState, action: Types.SectionActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.UPDATE_SECTION:
        draft.selectedSection = action.payload;
        break;
    }
  });
