import Link from "next/link";
import slug from "../../services/slug";
import { Team } from "../../hooks/useData";

interface Props {
  team: Team;
}

export default function LandingTeam({ team }: Props) {
  return (
    <Link href={`/team/${team.id}/${slug(team.name)}`}>
      <a className="list-group-item d-flex py-3" key={team.id}>
        <div className="me-3">
          <img
            width={35}
            alt={team.name}
            src={`http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
          />
        </div>
        <h4 className="d-flex flex-column justify-content-center mb-0">
          {team.name}
        </h4>
      </a>
    </Link>
  );
}
