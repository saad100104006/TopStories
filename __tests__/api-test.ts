import axios from 'axios';
import { addMock, enableMocking } from './helper/mock-axios';
import { expect, test } from '@jest/globals';
import { getStoriesFromResponse } from '~/api';
import { Story } from '~/typings/structure';

const response = {
  status: 'OK',
  copyright: 'Copyright (c) 2021 The New York Times Company. All Rights Reserved.',
  section: 'Arts',
  last_updated: '2021-12-17T10:59:34-05:00',
  num_results: 38,
  results: [
    {
      section: 'arts',
      subsection: 'music',
      title: 'What Shouldn’t Change About Classical Music',
      abstract: 'Our chief classical music critic bids farewell with some thoughts about what should covered for decades.',
      url: 'https://www.nytimes.com/2021/12/17/arts/music/classical-music-tommasini.html',
      uri: 'nyt://article/873b8a5a-c712-5e34-b518-7a71538d9613',
      byline: 'By Anthony Tommasini',
      item_type: 'Article',
      updated_date: '2021-12-17T09:40:24-05:00',
      created_date: '2021-12-17T05:00:15-05:00',
      published_date: '2021-12-17T05:00:15-05:00',
      material_type_facet: '',
      kicker: 'Critic’s Notebook',
      des_facet: ['Classical Music', 'Music'],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      multimedia: [
        {
          url: 'https://static01.nyt.com/images/2021/12/19/arts/19tony-goodbye/19tony-goodbye-superJumbo.jpg',
          format: 'superJumbo',
          height: 2048,
          width: 2048,
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Fatinha Ramos',
        },
      ],
      short_url: 'https://nyti.ms/3q82sGD',
    },
    {
      section: 'arts',
      subsection: 'design',
      title: 'A Grim, Long-Hidden Truth Emerges in Art: Native American Enslavement',
      abstract: 'Two exhibitions highlight stories of Indigenous bondage in southern Coloradotrauma.',
      url: 'https://www.nytimes.com/2021/12/17/arts/design/native-american-enslavement-colorado-exhibition.html',
      uri: 'nyt://article/791da951-5350-5ed3-833c-640b733d5f53',
      byline: 'By Patricia Leigh Brown',
      item_type: 'Article',
      updated_date: '2021-12-17T09:39:00-05:00',
      created_date: '2021-12-17T09:39:00-05:00',
      published_date: '2021-12-17T09:39:00-05:00',
      material_type_facet: '',
      kicker: '',
      des_facet: [
        'Art',
        'Navajo Indians',
        'Politics and Government',
        'Slavery (Historical)',
        'Museums',
        'Native Americans',
        'Kidnapping and Hostages',
      ],
      org_facet: [],
      per_facet: ['Resendez, Andres (1966- )'],
      geo_facet: ['Colorado'],
      multimedia: [
        {
          url: 'https://static01.nyt.com/images/2021/12/19/arts/19native-bondage-1/merlin_196152477_f3fd0335-0204-4c5b-8514-96730d5a8ae3-superJumbo.jpg',
          format: 'superJumbo',
          height: 1365,
          width: 2048,
          type: 'image',
          subtype: 'photo',
          caption: 'Chip Thomas',
          copyright: 'Kalen Goodluck for The New York Times',
        },
      ],
      short_url: 'https://nyti.ms/3mdEybA',
    },
  ],
};

const expectation: Story[] = [
  {
    abstract: 'Our chief classical music critic bids farewell with some thoughts about what should covered for decades.',
    byline: 'By Anthony Tommasini',
    desFacet: ['Classical Music', 'Music'],
    geoFacet: [],
    itemType: 'Article',
    multimedia: [
      {
        caption: '',
        url: 'https://static01.nyt.com/images/2021/12/19/arts/19tony-goodbye/19tony-goodbye-superJumbo.jpg',
      },
    ],
    publishedDate: '2021-12-17T05:00:15-05:00',
    section: 'arts',
    subsection: 'music',
    title: 'What Shouldn’t Change About Classical Music',
    url: 'https://www.nytimes.com/2021/12/17/arts/music/classical-music-tommasini.html',
  },
  {
    abstract: 'Two exhibitions highlight stories of Indigenous bondage in southern Coloradotrauma.',
    byline: 'By Patricia Leigh Brown',
    desFacet: [
      'Art',
      'Navajo Indians',
      'Politics and Government',
      'Slavery (Historical)',
      'Museums',
      'Native Americans',
      'Kidnapping and Hostages',
    ],
    geoFacet: ['Colorado'],
    itemType: 'Article',
    multimedia: [
      {
        caption: 'Chip Thomas',
        url: 'https://static01.nyt.com/images/2021/12/19/arts/19native-bondage-1/merlin_196152477_f3fd0335-0204-4c5b-8514-96730d5a8ae3-superJumbo.jpg',
      },
    ],
    publishedDate: '2021-12-17T09:39:00-05:00',
    section: 'arts',
    subsection: 'design',
    title: 'A Grim, Long-Hidden Truth Emerges in Art: Native American Enslavement',
    url: 'https://www.nytimes.com/2021/12/17/arts/design/native-american-enslavement-colorado-exhibition.html',
  },
];

addMock('https://api.nytimes.com/svc/topstories/v2/test.json', { data: response });

enableMocking(true);

test('stories api response parse', async () => {
  expect.assertions(1);

  await expect(
    axios
      .get('https://api.nytimes.com/svc/topstories/v2/test.json')
      .then((responseData) => getStoriesFromResponse(responseData.data)),
  ).resolves.toEqual(expectation);
});
