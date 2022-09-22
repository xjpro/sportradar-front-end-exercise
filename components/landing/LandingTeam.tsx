import Link from "next/link";
import slug from "../../services/slug";
import { Team } from "../../hooks/useData";
import TeamLogo from "../shared/TeamLogo";

interface Props {
  team: Team;
}

export default function LandingTeam({ team }: Props) {
  return (
    <Link href={`/team/${team.id}/${slug(team.name)}`}>
      <a className="list-group-item d-flex py-3" role="listitem">
        <div className="me-3">
          <TeamLogo width={30} team={team} />
        </div>
        <div className="d-flex flex-column justify-content-center ">
          <h2 className="fs-4 mb-0" role="heading">
            {team.name}
          </h2>
        </div>
      </a>
    </Link>
  );
}
