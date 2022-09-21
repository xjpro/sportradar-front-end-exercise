import Layout from "../Layout";
import { useRouter } from "next/router";
import useData, {
  ApiPeoplePayload,
  ApiTeamPayload,
  ApiTeamRosterPayload,
} from "../../hooks/useData";
import { find, first } from "lodash";
import TeamLogo from "../shared/TeamLogo";

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

  return (
    <Layout>
      <div>
        {!person ? (
          <div></div>
        ) : (
          <div>
            <h1>
              {person.fullName} | #{teamMember?.jerseyNumber}
            </h1>
            <div>
              <TeamLogo team={team} /> {team?.name}
            </div>
            <div>
              {person.primaryPosition.code} | {person.height} | {person.weight}{" "}
              | Age: {person.currentAge}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
