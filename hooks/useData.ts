import useSWR from "swr";
import axios from "axios";

export interface Team {
  id: number;
  name: string;
  shortName: string;
  teamName: string;
  abbreviation: string;
  officialSiteUrl: string;
  firstYearOfPlay: string;
  locationName: string;
  venue: {
    name: string;
    city: string;
  };
}

export interface ApiPayload {
  copyright: string;
  teams: [Team];
}

export default function useData<Type>(url: string) {
  const { data, error } = useSWR(url, () =>
    axios.get(url).then((response) => response.data)
  );
  return data as Type;
}
