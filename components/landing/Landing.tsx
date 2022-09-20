import Layout from "../Layout";
import useData, { ApiPayload } from "../../hooks/useData";
import Link from "next/link";
import slug from "../../services/slug";
import { times } from "lodash";
import Skeleton from "react-loading-skeleton";

export default function Landing() {
  const payload = useData<ApiPayload>(
    "https://statsapi.web.nhl.com/api/v1/teams"
  );
  return (
    <Layout>
      <h1>Team Directory</h1>

      <div className="list-group">
        {!payload?.teams
          ? times(25, (index) => (
              <Skeleton className="list-group-item" count={1} key={index} />
            ))
          : payload.teams.map((team) => (
              <Link href={`/team/${team.id}/${slug(team.name)}`}>
                <a className="list-group-item" key={team.id}>
                  {team.name}
                </a>
              </Link>
            ))}
      </div>
    </Layout>
  );
}
