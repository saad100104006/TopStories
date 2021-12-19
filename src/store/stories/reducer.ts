import produce from 'immer';
import * as Types from './actionTypes';

import { Story } from '~/typings/structure';

export type State = {
  topStories: Record<string, Story[]>;
  geoFacets: Record<string, string[]>;
};

export const initialState: State = {
  topStories: {},
  geoFacets: {},
};

export default (state: State = initialState, action: Types.StoriesActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.UPDATE_TOP_STORIES:
        draft.topStories = { ...draft.topStories, [action.payload.section]: action.payload.stories };

        // extract geo facets and update redux
        const geoFacets = new Set<string>();
        action.payload.stories.forEach((story) => {
          story.geoFacet.forEach((geoFacet) => geoFacets.add(geoFacet));
        });
        draft.geoFacets = { ...draft.geoFacets, [action.payload.section]: [...geoFacets] };

        break;
    }
  });
