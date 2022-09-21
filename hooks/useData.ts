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
  conference: {
    id: number;
    name: string;
    link: string;
  };
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
  };
}

export interface Player {
  jerseyNumber: string;
  person: {
    id: number;
    fullName: string;
    link: string;
  };
  position: {
    code: string;
    name: string;
    abbreviation: string;
  };
}

export interface RosteredTeam extends Team {
  roster: {
    roster: Player[];
  };
}

export interface ApiTeamPayload {
  copyright: string;
  teams: [Team];
}

export interface ApiTeamRosterPayload {
  copyright: string;
  teams: [RosteredTeam];
}

export default function useData<Type>(url: string) {
  const { data, error } = useSWR(url, () =>
    axios.get(url).then((response) => response.data)
  );
  return data as Type;
}
