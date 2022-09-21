import React from "react"
import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import LandingTeam from "../LandingTeam";
import { Team } from "../../../hooks/useData";

test("loads and displays greeting", async () => {
  // @ts-ignore
  const team: Team = {
    id: 1,
    name: "Tangletown Squirrels",
  };

  render(<LandingTeam team={team} />);

  // fireEvent.click(screen.getByText('Load Greeting'))
  //
  // await waitFor(() => screen.getByRole('heading'))
  //
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // @ts-ignore
  expect(screen.getByRole("heading")).toHaveTextContent("Tangletown Squirrels");
});
