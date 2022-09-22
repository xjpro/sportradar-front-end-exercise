import { render, screen } from "@testing-library/react";
import LandingTeam from "../LandingTeam";
import { Team } from "../../../hooks/useData";

describe("LandingTeam", () => {
  test("displays team name and logo", async () => {
    const team = {
      id: 1,
      name: "Tangletown Squirrels",
    } as Team;

    render(<LandingTeam team={team} />);
    expect(screen.getByAltText("Tangletown Squirrels")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Tangletown Squirrels"
    );
  });
});
