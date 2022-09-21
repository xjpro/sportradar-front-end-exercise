import Layout from "../Layout";
import useData, { ApiTeamPayload } from "../../hooks/useData";
import { groupBy, times, map } from "lodash";
import LandingTeam from "./LandingTeam";
import Head from "next/head";

export default function Landing() {
  const payload = useData<ApiTeamPayload>(
    "https://statsapi.web.nhl.com/api/v1/teams"
  );

  const teamsByConference = groupBy(
    payload?.teams,
    (team) => team.conference.name
  );
  return (
    <Layout>
      <Head>
        <title>Team Directory - Sportradar</title>
      </Head>

      <h1>Team Directory</h1>
      <div>
        {!payload ? (
          <div>Loading...</div>
        ) : (
          map(teamsByConference, (teams, conferenceName) => (
            <div className="bg-light p-3" key={conferenceName}>
              <h2>{conferenceName} Conference</h2>
              <div className="list-group list-group-flush mb-3">
                {map(
                  groupBy(teams, (team) => team.division.name),
                  (teams, divisionName) => (
                    <div className="mb-3" key={divisionName}>
                      <h3>{divisionName} Division</h3>
                      {teams.map((team) => (
                        <LandingTeam team={team} key={team.id} />
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
