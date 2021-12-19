import section, { State as SectionState } from '~/store/section/reducer';
import stories, { State as StoriesState } from '~/store/stories/reducer';
import { combineReducers } from 'redux';

export type RootState = {
  section: SectionState;
  stories: StoriesState;
};

const rootReducer = combineReducers({
  section,
  stories,
});

export default rootReducer;
