import { useRouter } from "next/router";
import useData, { ApiTeamRosterPayload } from "../../hooks/useData";
import Layout from "../Layout";
import { first } from "lodash";
import slug from "../../services/slug";
import Link from "next/link";
import TeamLogo from "../shared/TeamLogo";
import Head from "next/head";

export default function TeamDetail() {
  const router = useRouter();
  const { query } = router;
  const payload = useData<ApiTeamRosterPayload>(
    router.isReady
      ? `https://statsapi.web.nhl.com/api/v1/teams/${query.teamId}?expand=team.roster`
      : null
  );

  const team = first(payload?.teams);
  return (
    <Layout>
      <Head>
        <title>{team?.name} - Sportradar</title>
      </Head>

      <div className="mb-3">
        <Link href="/">
          Back to directory
        </Link>
      </div>

      {!team ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="d-flex">
            <div className="me-1">
              <TeamLogo team={team} width={48} />
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
          <div className="mt-3">
            <h2>Roster</h2>
            <table className="table table-striped">
              <tbody>
                {team.roster.roster.map((player) => (
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
