import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TeamDetail from "../TeamDetail";
import router from "next/router";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TeamDetail", () => {
  beforeEach(() => {
    jest.spyOn(router, "useRouter").mockImplementationOnce(() => ({
      isReady: true,
      query: { teamId: 1 },
    }));
  });

  test("displays the basic team attributes and roster", async () => {
    mockedAxios.get.mockResolvedValue({
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
                  fullName: "Joshua Prodahl",
                },
              ],
            },
          },
        ],
      },
    });

    render(<TeamDetail />);

    await waitFor(() => {
      expect(screen.getAllByRole("heading")).toHaveTextContent(
        "Tangletown Squirrels"
      );
    });
  });
});
