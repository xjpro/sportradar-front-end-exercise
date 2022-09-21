import { useRouter } from "next/router";
import useData, {
  ApiTeamRosterPayload,
} from "../../hooks/useData";
import Layout from "../Layout";
import { first } from "lodash";

export default function TeamDetail() {
  const { query } = useRouter();
  const payload = useData<ApiTeamRosterPayload>(
    `https://statsapi.web.nhl.com/api/v1/teams/${query.teamId}?expand=team.roster`
  );
  console.log(payload);

  const team = first(payload?.teams);
  return (
    <Layout>
      {!team ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="d-flex">
            <div>
              <img
                width={35}
                alt={team.name}
                src={`http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
              />
            </div>
            <h1>{team.name}</h1>
          </div>
          <div>
            {team.conference.name} Conference - {team.division.name} Division
          </div>
          <div>
            <a href={team.officialSiteUrl} target="_blank">
              {team.officialSiteUrl}
            </a>
          </div>
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Position</th>
                <th>Number</th>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              {team.roster.roster.map(player => (
                <tr>
                  <td>
                    {player.position.abbreviation}
                  </td>
                  <td>
                    {player.jerseyNumber}
                  </td>
                  <td>
                    {player.person.fullName}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
