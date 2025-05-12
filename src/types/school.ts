
export interface School {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface SchoolInput {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
