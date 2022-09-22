import { render, screen } from "@testing-library/react";
import { Team } from "../../../hooks/useData";
import TeamLogo from "../TeamLogo";

describe("TeamLogo", () => {
  test("displays a teams's logo image", async () => {
    const team = {
      id: 1,
      name: "Tangletown Squirrels",
    } as Team;

    render(<TeamLogo team={team} width={99} />);
    expect(screen.getByAltText(team.name)).toBeInTheDocument();
  });
});
