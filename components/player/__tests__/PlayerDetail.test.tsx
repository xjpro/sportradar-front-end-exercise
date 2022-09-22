import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PlayerDetail from "../PlayerDetail";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter() {
    return {
      isReady: true,
      query: { playerId: 999 },
    };
  },
}));

describe("PlayerDetail", () => {
  test("displays the basic player attributes", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        people: [
          {
            id: 999,
            fullName: "Joshua Prodahl",
            weight: 1234,
            height: "9' 3''",
            currentTeam: {
              id: 1,
              name: "Tangletown Squirrels",
            },
            primaryPosition: {
              code: "G",
            },
          },
        ],
      },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        teams: [
          {
            id: 1,
            name: "Tangletown Squirrels",
            roster: {
              roster: [
                {
                  person: {
                    id: 999,
                  },
                },
              ],
            },
          },
        ],
      },
    });

    render(<PlayerDetail />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent("Joshua Prodahl");
      const playerAttributes = screen.getByTestId("player-attributes");
      expect(playerAttributes).toContainHTML("G");
      expect(playerAttributes).toContainHTML("9' 3''");
      expect(playerAttributes).toContainHTML("1234 lb");
    });
  });
});
