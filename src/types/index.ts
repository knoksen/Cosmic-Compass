export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  settings?: {
    units: 'metric' | 'imperial';
    theme: 'dark' | 'light';
  };
  xp?: number;
  isAnonymous?: boolean;
}

export interface Route {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  waypoints: string[]; // array of waypoint IDs
  visibility: 'public' | 'private';
  createdAt: Date;
}

export interface Waypoint {
  id:string;
  routeId: string;
  type: 'planet' | 'star' | 'nebula' | 'exoplanet' | 'galaxy';
  targetId: string;
  snapshot: {
    name: string;
    facts: Record<string, string | number>;
    assets: Asset[];
  };
  createdAt: Date;
}

export interface Asset {
  id: string;
  source: 'NASA_APOD' | 'JWST' | 'Hubble' | 'ExoplanetArchive' | 'Generated';
  url: string;
  thumbnailUrl?: string;
  license: string;
  credit: string;
  description?: string;
}

export interface TargetFact {
  id: string;
  name: string;
  type: 'planet' | 'star' | 'nebula' | 'exoplanet' | 'galaxy' | string;
  description: string;
  facts: Record<string, string | number>;
  assets: Asset[];
  events: { date: string; title: string; source: string; }[];
  missions: { name: string; status: string; url: string; }[];
}

export interface Spaceship {
  id: string;
  name: string;
  class: string;
  origin: string;
  image: string;
  stats: { [key: string]: string };
}
