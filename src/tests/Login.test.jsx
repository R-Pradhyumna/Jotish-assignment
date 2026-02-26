import { beforeEach, describe, expect, test, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../features/auth/Login";

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockClear();
});

describe("Login Page", () => {
  test("renders username, password and login button", () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error message for invalid credentials", async () => {
    render(<Login />);

    await userEvent.clear(screen.getByLabelText(/username/i));
    await userEvent.type(screen.getByLabelText(/username/i), "wrong");

    await userEvent.clear(screen.getByLabelText(/password/i));
    await userEvent.type(screen.getByLabelText(/password/i), "wrong");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText(/invalid username or password/i),
    ).toBeInTheDocument();
  });

  test("navigates to '/analytics' on valid login", async () => {
    render(<Login />);

    await userEvent.clear(screen.getByLabelText(/username/i));
    await userEvent.type(screen.getByLabelText(/username/i), "testuser");

    await userEvent.clear(screen.getByLabelText(/password/i));
    await userEvent.type(screen.getByLabelText(/password/i), "Test123");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/analytics");
  });

  test("redirects immediately if already authenticated", () => {
    localStorage.setItem("isAuthenticated", "true");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("button", { name: /login/i }),
    ).not.toBeInTheDocument();
  });
});
