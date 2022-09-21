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

export interface Person {
  id: number;
  active: boolean;
  alternateCaptain: boolean;
  birthCity: string;
  birthCountry: string;
  birthDate: string;
  birthStateProvince: string;
  captain: boolean;
  currentAge: number;
  currentTeam: {
    id: number;
    name: string;
  };
  firstName: string;
  fullName: string;
  height: string;

  lastName: string;
  nationality: string;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  rookie: boolean;
  rosterStatus: string;
  shootsCatches: string;
  weight: number;
}

export interface Player {
  jerseyNumber: string;
  person: Person;
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
  teams: [Team];
}

export interface ApiTeamRosterPayload {
  teams: [RosteredTeam];
}

export interface ApiPeoplePayload {
  people: Person[];
}

export default function useData<Type>(url: string | null) {
  const { data, error } = useSWR(url, () =>
    axios.get(url || "").then((response) => response.data)
  );
  return data as Type;
}
