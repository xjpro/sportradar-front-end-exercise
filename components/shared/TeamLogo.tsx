import { Team } from "../../hooks/useData";

interface Props {
  team?: Team;
  width: number;
}

export default function TeamLogo({ team, width }: Props) {
  if (!team) return null;

  return (
    <img
      width={width}
      alt={team.name}
      src={`http://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`}
    />
  );
}
