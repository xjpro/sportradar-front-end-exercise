import { useRouter } from "next/router";
import useData, { ApiTeamRosterPayload } from "../../hooks/useData";
import Layout from "../Layout";
import { first } from "lodash";
import slug from "../../services/slug";
import Link from "next/link";
import TeamLogo from "../shared/TeamLogo";

export default function TeamDetail() {
  const { query } = useRouter();
  const payload = useData<ApiTeamRosterPayload>(
    `https://statsapi.web.nhl.com/api/v1/teams/${query.teamId}?expand=team.roster`
  );

  const team = first(payload?.teams);
  return (
    <Layout>
      {!team ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="d-flex">
            <div>
              <TeamLogo team={team}/>
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
                {team.roster.roster.map((player) => (
                  <tr className="position-relative" key={player.person.id}>
                    <td>{player.position.abbreviation}</td>
                    <td>{player.jerseyNumber}</td>
                    <td>
                      <Link
                        href={`/player/${player.person.id}/${slug(
                          player.person.fullName
                        )}`}
                      >
                        <a className="btn btn-link stretched-link">
                          {player.person.fullName}
                        </a>
                      </Link>
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
