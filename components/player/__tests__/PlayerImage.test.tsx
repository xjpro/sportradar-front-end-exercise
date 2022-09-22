import { render, screen } from "@testing-library/react";
import { Person } from "../../../hooks/useData";
import PlayerImage from "../PlayerImage";

describe("PlayerImage", () => {
  test("displays a player's image", async () => {
    const person = {
      id: 1,
      fullName: "Joshua Prodahl",
    } as Person;

    render(<PlayerImage person={person} />);
    expect(screen.getByAltText(person.fullName)).toBeInTheDocument();
  });
});
