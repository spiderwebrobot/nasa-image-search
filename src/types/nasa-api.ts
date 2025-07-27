export interface NasaApiResponse {
  collection: Collection;
}

export interface Collection {
  version: string;
  href: string;
  items: Item[];
  metadata: Metadata;
  links: CollectionLink[];
}

export interface Item {
  href: string;
  data: ItemData[];
  links: ItemLink[];
}

export interface ItemData {
  album?: string[];
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
  title: string;
}

export interface ItemLink {
  href: string;
  rel: string;
  render: string;
  width: number;
  height: number;
  size: number;
}

export interface Metadata {
  total_hits: number;
}

export interface CollectionLink {
  rel: string;
  prompt: string;
  href: string;
}

// search params

export type MediaTypes = {
  image: boolean;
  video: boolean;
  audio: boolean;
};

export type SearchParams = {
  q: string;
  media_type: string;
  page_size: string; // Changed from number to string
};
