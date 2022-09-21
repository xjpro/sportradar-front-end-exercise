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
      <a className="list-group-item d-flex py-3" key={team.id}>
        <div className="me-3">
          <TeamLogo width={35} team={team} />
        </div>
        <h4 className="d-flex flex-column justify-content-center mb-0">
          {team.name}
        </h4>
      </a>
    </Link>
  );
}
