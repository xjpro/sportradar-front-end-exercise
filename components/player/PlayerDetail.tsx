import Layout from "../Layout";
import { useRouter } from "next/router";
import useData, {
  ApiPeoplePayload,
  ApiTeamRosterPayload,
} from "../../hooks/useData";
import { compact, find, first } from "lodash";
import TeamLogo from "../shared/TeamLogo";
import slug from "../../services/slug";
import Link from "next/link";
import PlayerImage from "./PlayerImage";
import shootsText from "../../services/shootsText";

export default function PlayerDetail() {
  const { query } = useRouter();
  const playerPayload = useData<ApiPeoplePayload>(
    `https://statsapi.web.nhl.com/api/v1/people/${query.playerId}`
  );
  const person = first(playerPayload?.people);
  const teamPayload = useData<ApiTeamRosterPayload>(
    person
      ? `https://statsapi.web.nhl.com/api/v1/teams/${person.currentTeam.id}?expand=team.roster`
      : null
  );
  const team = first(teamPayload?.teams);
  const teamMember = find(
    team?.roster.roster,
    (teamMember) => teamMember.person.id === person?.id
  );

  const bornString = person
    ? compact([
        person?.birthCity,
        person?.birthStateProvince,
        person?.birthCountry,
      ]).join(", ")
    : null;

  return (
    <Layout>
      <div>
        {!person ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="text-center mb-3">
              <div>
                <PlayerImage player={person} />
              </div>
              <h1>
                {person.fullName} | #{teamMember?.jerseyNumber}
              </h1>
              {team && (
                <div>
                  <TeamLogo team={team} />{" "}
                  <Link href={`/team/${team.id}/${slug(team.name)}`}>
                    <a className="me-3">{team?.name}</a>
                  </Link>
                  {person.captain && <span>Captain</span>}
                  {person.alternateCaptain && <span>Alt Captain</span>}
                  {!person.captain && !person.alternateCaptain && (
                    <span>{person.active ? "Active" : "Inactive"}</span>
                  )}
                  {!person.rookie && <span className="ms-1">Rookie</span>}
                </div>
              )}
              <div>
                {person.primaryPosition.code} | {person.height} |{" "}
                {person.weight} lb | Age {person.currentAge}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <dl className="dl-horizontal">
                <dt>Shoots</dt> <dd>{shootsText(person.shootsCatches)}</dd>
                <dt>Born</dt>
                <dd>{bornString}</dd>
                <dt>Nationality</dt>
                <dd>{person.nationality}</dd>
              </dl>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
