import { render, screen, waitFor } from "@testing-library/react";
import Landing from "../Landing";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Landing", () => {
  test("displays list of teams with their name and logo", async () => {
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
          },
          {
            id: 2,
            name: "Minneapolis Loons",
            conference: {
              name: "Midwest",
            },
            division: {
              name: "South",
            },
          },
        ],
      },
    });

    render(<Landing />);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });
});
