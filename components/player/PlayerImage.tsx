import { Person } from "../../hooks/useData";

interface Props {
  player: Person;
}

export default function PlayerImage({ player }: Props) {
  return (
    <img
      alt={player.fullName}
      src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
    />
  );
}
