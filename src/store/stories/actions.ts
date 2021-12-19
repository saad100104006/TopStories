import * as Types from './actionTypes';

import { Story } from '~/typings/structure';

const updateTopStories = (data: { section: string; stories: Story[] }): Types.StoriesActionTypes => ({
  type: Types.UPDATE_TOP_STORIES,
  payload: data,
});

export default { updateTopStories };
