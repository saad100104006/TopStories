export type Story = {
  title: string;
  section: string;
  subsection: string;
  abstract: string;
  url: string;
  byline: string;
  itemType: string;
  publishedDate: string;
  desFacet: string[];
  geoFacet: string[];
  multimedia: {
    url: string;
    caption: string;
  }[];
};
