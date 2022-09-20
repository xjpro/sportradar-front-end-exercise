import { useRouter } from "next/router";
import useData, { ApiPayload, Team } from "../../hooks/useData";
import Layout from "../Layout";
import { first } from "lodash";

export default function TeamDetail() {
  const { query } = useRouter();
  const payload = useData<ApiPayload>(
    `https://statsapi.web.nhl.com/api/v1/teams/${query.teamId}`
  );
  const team = first(payload?.teams);
  return (
    <Layout>
      {!team ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{team.name}</h1>
          <div>
            <a href={team.officialSiteUrl} target="_blank">
              {team.officialSiteUrl}
            </a>
          </div>
        </div>
      )}
    </Layout>
  );
}
