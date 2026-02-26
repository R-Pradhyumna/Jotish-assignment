import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

const mockNavigate = vi.fn();
let mockLocationState = {};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: mockLocationState,
    }),
  };
});

import PhotoResult from "../features/photo/PhotoResult";

beforeEach(() => {
  mockNavigate.mockReset();
  localStorage.clear();
  mockLocationState = {};
  vi.restoreAllMocks();
});

describe("PhotoResult", () => {
  test("renders image when passed via navigation state", () => {
    mockLocationState = {
      employeeId: "123",
      image: "data:image/png;base64,mockImage",
    };

    render(<PhotoResult />);

    const image = screen.getByAltText(/captured employee/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "data:image/png;base64,mockImage");
  });

  test("retrieves image from localStorage if valid and not expired", () => {
    const expiry = Date.now() + 60000;

    localStorage.setItem(
      "photo_123",
      JSON.stringify({
        image: "data:image/png;base64,storedImage",
        expiry,
      }),
    );

    mockLocationState = {
      employeeId: "123",
    };

    render(<PhotoResult />);

    expect(screen.getByAltText(/captured employee/i)).toHaveAttribute(
      "src",
      "data:image/png;base64,storedImage",
    );
  });

  test("cleans up expired image and shows expired UI", () => {
    const expiry = Date.now() - 1000;

    localStorage.setItem(
      "photo_123",
      JSON.stringify({
        image: "expiredImage",
        expiry,
      }),
    );

    mockLocationState = {
      employeeId: "123",
    };

    render(<PhotoResult />);

    expect(screen.getByText(/photo expired/i)).toBeInTheDocument();

    expect(localStorage.getItem("photo_123")).toBeNull();
  });

  test("shows expired UI when no image exists", () => {
    mockLocationState = {
      employeeId: "123",
    };

    render(<PhotoResult />);

    expect(screen.getByText(/photo expired/i)).toBeInTheDocument();
  });

  test("navigates back when Back button clicked", async () => {
    mockLocationState = {
      employeeId: "123",
      image: "data:image/png;base64,mockImage",
    };

    render(<PhotoResult />);

    const backButton = screen.getByText(/back/i);

    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/123");
  });

  test("retake button navigates correctly", async () => {
    mockLocationState = {
      employeeId: "123",
      image: "data:image/png;base64,mockImage",
    };

    render(<PhotoResult />);

    const retakeButton = screen.getByText(/retake/i);

    await userEvent.click(retakeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/123");
  });

  test("done button navigates correctly", async () => {
    mockLocationState = {
      employeeId: "123",
      image: "data:image/png;base64,mockImage",
    };

    render(<PhotoResult />);

    const doneButton = screen.getByText(/done/i);

    await userEvent.click(doneButton);

    expect(mockNavigate).toHaveBeenCalledWith("/employees/123");
  });
});
