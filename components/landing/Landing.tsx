import Layout from "../Layout";
import useData, { ApiTeamPayload } from "../../hooks/useData";
import { groupBy, times, map } from "lodash";
import Skeleton from "react-loading-skeleton";
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
      <div className="bg-light p-3">
        {!payload
          ? times(2, (index) => (
              <div className="" key={index}>
                <h2>
                  <Skeleton />
                </h2>
                <div className="list-group list-group-flush mb-3">
                  {times(2, (index) => (
                    <div key={index}>
                      <h3>
                        <Skeleton />
                      </h3>
                      {times(8, (index) => (
                        <div key={index}>
                          <Skeleton />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          : map(teamsByConference, (teams, conferenceName) => (
              <div key={conferenceName}>
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
            ))}
      </div>
    </Layout>
  );
}
