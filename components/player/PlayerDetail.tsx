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
import Head from "next/head";

export default function PlayerDetail() {
  const router = useRouter();
  const { query } = router;
  const playerPayload = useData<ApiPeoplePayload>(
    router.isReady
      ? `https://statsapi.web.nhl.com/api/v1/people/${query.playerId}`
      : null
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
      <Head>
        <title>{person?.fullName} - Sportradar</title>
      </Head>
      <div>
        <div className="mb-3">
          {team && (
            <Link href={`/team/${team.id}/${slug(team.name)}`}>
              Back to team
            </Link>
          )}
        </div>

        {!person ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="text-center mb-3">
              <div>
                <PlayerImage person={person} />
              </div>
              <h1 role="heading">
                {person.fullName} | #{teamMember?.jerseyNumber}
              </h1>
              {team && (
                <div className="d-flex justify-content-center mb-1">
                  <div className="d-flex">
                    <div className="me-1">
                      <TeamLogo team={team} width={30} />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <Link href={`/team/${team.id}/${slug(team.name)}`}>
                        <a className="me-3">{team?.name}</a>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    {person.captain && <span>Captain</span>}
                    {person.alternateCaptain && <span>Alt Captain</span>}
                    {!person.captain && !person.alternateCaptain && (
                      <span>{person.active ? "Active" : "Inactive"}</span>
                    )}
                    {person.rookie && <span className="ms-1">Rookie</span>}
                  </div>
                </div>
              )}
              <div data-testid="player-attributes">
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
