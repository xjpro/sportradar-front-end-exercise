import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TeamDetail from "../TeamDetail";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter() {
    return {
      isReady: true,
      query: { teamId: 1 },
    };
  },
}));

describe("TeamDetail", () => {
  test("displays the basic team attributes and roster", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        teams: [
          {
            id: 1,
            name: "Tangletown Squirrels",
            conference: {
              name: "Midwest",
            },
            division: {
              name: "South",
            },
            roster: {
              roster: [
                {
                  position: {
                    abbreviation: "G",
                  },
                  person: {
                    id: 999,
                    fullName: "Joshua Prodahl",
                  },
                },
              ],
            },
          },
        ],
      },
    });

    render(<TeamDetail />);

    await waitFor(() => {
      const headings = screen.getAllByRole("heading");
      expect(headings[0]).toHaveTextContent("Tangletown Squirrels");
      expect(headings[1]).toHaveTextContent("Roster");
      expect(screen.getByRole("table")).toHaveTextContent("Joshua Prodahl");
    });
  });
});
