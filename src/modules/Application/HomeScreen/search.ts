import { Story } from '~/typings/structure';

export const searchStory = (allStories: Story[], keyword: string, location: string): Story[] => {
  const keyWordSearchResult =
    keyword.length === 0
      ? allStories
      : allStories.filter((story) => {
          return story.desFacet.join('-').toLocaleLowerCase().includes(keyword.toLocaleLowerCase());
        });

  return location.length === 0
    ? keyWordSearchResult
    : keyWordSearchResult.filter((story) => {
        return story.geoFacet.join('-').toLocaleLowerCase().includes(location.toLocaleLowerCase());
      });
};
