import Layout from "../Layout";
import useData, { ApiTeamPayload } from "../../hooks/useData";
import { groupBy, times, map, filter, isEmpty } from "lodash";
import LandingTeam from "./LandingTeam";
import Head from "next/head";
import { useMemo, useState } from "react";

export default function Landing() {
  const [teamNameFilter, setTeamNameFilter] = useState("");

  const payload = useData<ApiTeamPayload>(
    "https://statsapi.web.nhl.com/api/v1/teams"
  );

  const filteredTeams = useMemo(
    () =>
      filter(payload?.teams, (team) =>
        new RegExp(teamNameFilter, "i").test(team.name)
      ),
    [payload, teamNameFilter]
  );

  const teamsByConference = groupBy(
    filteredTeams,
    (team) => team.conference.name
  );
  return (
    <Layout>
      <Head>
        <title>Team Directory - Sportradar</title>
      </Head>

      <div className="d-flex">
        <h1 className="flex-fill">Team Directory</h1>
        <div className="form-group">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              Search
            </span>
            <input
              type="text"
              className="form-control"
              value={teamNameFilter}
              onChange={(event) => setTeamNameFilter(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        {!payload ? (
          <div>Loading...</div>
        ) : (
          <div>
            {isEmpty(teamsByConference) && (
              <div className="alert alert-info">No teams match your search</div>
            )}

            {map(teamsByConference, (teams, conferenceName) => (
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
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
