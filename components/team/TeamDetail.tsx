import { useRouter } from "next/router";
import useData, { ApiTeamRosterPayload } from "../../hooks/useData";
import Layout from "../Layout";
import { filter, first, isEmpty } from "lodash";
import slug from "../../services/slug";
import Link from "next/link";
import TeamLogo from "../shared/TeamLogo";
import Head from "next/head";
import { useMemo, useState } from "react";

export default function TeamDetail() {
  const [playerNameFilter, setPlayerNameFilter] = useState("");
  const router = useRouter();
  const { query } = router;
  const payload = useData<ApiTeamRosterPayload>(
    router.isReady
      ? `https://statsapi.web.nhl.com/api/v1/teams/${query.teamId}?expand=team.roster`
      : null
  );

  const filteredRoster = useMemo(() => {
    const team = first(payload?.teams);
    return team
      ? filter(team.roster.roster, (player) =>
          new RegExp(playerNameFilter, "i").test(player.person.fullName)
        )
      : [];
  }, [payload, playerNameFilter]);

  const team = first(payload?.teams);
  return (
    <Layout>
      <Head>
        <title>{team?.name} - Sportradar</title>
      </Head>

      <div className="mb-3">
        <Link href="/">Back to directory</Link>
      </div>

      {!team ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="d-flex">
            <div className="me-1">
              <TeamLogo team={team} width={48} />
            </div>
            <h1 role="heading">{team.name}</h1>
          </div>
          <div>
            {team.conference.name} Conference - {team.division.name} Division
          </div>
          <div>
            <a href={team.officialSiteUrl} target="_blank" rel="noreferrer">
              {team.officialSiteUrl}
            </a>
          </div>
          <div className="mt-3">
            <div className="d-flex">
              <h2 className="flex-fill">Roster</h2>
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon3">
                    Search
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={playerNameFilter}
                    onChange={(event) =>
                      setPlayerNameFilter(event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            {isEmpty(filteredRoster) && (
              <div className="alert alert-info">
                No players match your search
              </div>
            )}

            <table className="table table-striped">
              <tbody>
                {filteredRoster.map((player) => (
                  <tr className="position-relative" key={player.person.id}>
                    <td>{player.position.abbreviation}</td>
                    <td>
                      <Link
                        href={`/player/${player.person.id}/${slug(
                          player.person.fullName
                        )}`}
                      >
                        <a className="btn btn-link stretched-link">
                          {player.person.fullName} #{player.jerseyNumber}
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
