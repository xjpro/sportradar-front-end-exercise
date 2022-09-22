import { Person } from "../../hooks/useData";
import Image from "next/image";

interface Props {
  person: Person;
}

export default function PlayerImage({ person }: Props) {
  return (
    <Image
      width={168}
      height={168}
      alt={person.fullName}
      src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${person.id}.jpg`}
    />
  );
}
