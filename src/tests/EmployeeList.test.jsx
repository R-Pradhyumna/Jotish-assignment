import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import userEvent from "@testing-library/user-event";
import EmployeeList from "../features/employees/list/EmployeeList";
import { server } from "../mocks/server";
import { renderWithProviders } from "./test-utils";

beforeAll(() => server.listen());
beforeEach(() => {
  mockNavigate.mockClear();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("EmployeeList", () => {
  test("renders employees from API", async () => {
    renderWithProviders(<EmployeeList />);

    expect(await screen.findByText("Tiger Nixon")).toBeInTheDocument();

    expect(screen.getByText("Garrett Winters")).toBeInTheDocument();
  });

  test("formats salary correctly", async () => {
    renderWithProviders(<EmployeeList />);

    await screen.findByText("Tiger Nixon");
    expect(
      screen.getByText((text) => text.replace(/\D/g, "") === "320800"),
    ).toBeInTheDocument();
  });

  test("shows error message if API fails", async () => {
    server.use(
      http.post("https://backend.jotish.in/backend_dev/gettabledata.php", () =>
        HttpResponse.error(),
      ),
    );

    renderWithProviders(<EmployeeList />);

    expect(
      await screen.findByText(/failed to load employees/i),
    ).toBeInTheDocument();
  });

  test("navigates to employee details when card is clicked", async () => {
    renderWithProviders(<EmployeeList />);

    const employeeName = await screen.findByText("Tiger Nixon");

    await userEvent.click(employeeName);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/5421");
  });

  test("navigates when View Details button is clicked", async () => {
    renderWithProviders(<EmployeeList />);

    const buttons = await screen.findAllByRole("button", {
      name: /view details/i,
    });

    await userEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/5421");
  });
});
