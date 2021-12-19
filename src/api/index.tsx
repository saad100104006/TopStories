import client from '~/api/client';
import { map, Observable } from 'rxjs';
import { Story } from '~/typings/structure';

type TopStoriesResponse = {
  status: string;
  num_results: number;
  results: [
    {
      title: string;
      section: string;
      subsection: string;
      abstract: string;
      url: string;
      byline: string;
      item_type: string;
      published_date: string;
      des_facet: string[];
      geo_facet: string[];
      multimedia:
        | [
            {
              url: string;
              height: number;
              width: number;
              type: string;
              subtype: string;
              caption: string;
            },
          ]
        | null;
      short_url: string;
    },
  ];
};

const getTopStories$ = (section: string): Observable<Story[]> => {
  return client.get<TopStoriesResponse>(`${section}.json`).pipe(
    map((response) => {
      return getStoriesFromResponse(response.data);
    }),
  );
};

export const getStoriesFromResponse = (response: TopStoriesResponse): Story[] => {
  return response.results.map((result) => {
    const story: Story = {
      title: result.title,
      section: result.section,
      subsection: result.subsection,
      abstract: result.abstract,
      url: result.url,
      byline: result.byline,
      itemType: result.item_type,
      publishedDate: result.published_date,
      desFacet: result.des_facet,
      geoFacet: result.geo_facet,
      multimedia:
        result.multimedia?.map((multimediaData) => {
          return {
            url: multimediaData.url,
            caption: multimediaData.caption,
          };
        }) ?? [],
    };

    return story;
  });
};

export default { getTopStories$ };
