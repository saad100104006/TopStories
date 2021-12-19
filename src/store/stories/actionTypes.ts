import { Story } from '~/typings/structure';

export const UPDATE_TOP_STORIES = 'stories/UPDATE_TOP_STORIES';

export interface UpdateTopStories {
  type: typeof UPDATE_TOP_STORIES;
  payload: { section: string; stories: Story[] };
}

export type StoriesActionTypes = UpdateTopStories;
