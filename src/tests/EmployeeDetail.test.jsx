import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as useEmployeeModule from "../features/employees/detail/useEmployee";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ employeeId: "5421" }),
  };
});

import EmployeeDetail from "../features/employees/detail/EmployeeDetail";
import { renderWithProviders } from "./test-utils";

const mockEmployee = {
  id: "5421",
  name: "Tiger Nixon",
  position: "System Architect",
  city: "Edinburgh",
  startDate: "2011/04/25",
  salary: 320800,
};

describe("EmployeeDetail", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();

    vi.spyOn(useEmployeeModule, "useEmployee").mockReturnValue({
      data: mockEmployee,
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders employee details", () => {
    renderWithProviders(<EmployeeDetail />);

    expect(screen.getByText("Tiger Nixon")).toBeInTheDocument();
    expect(screen.getByText("System Architect")).toBeInTheDocument();
    expect(screen.getByText(/Edinburgh/)).toBeInTheDocument();
  });

  test("navigates back when Back button clicked", async () => {
    renderWithProviders(<EmployeeDetail />);
    const backButton = screen.getByText(/back/i);

    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  test("shows error for non-image file", () => {
    renderWithProviders(<EmployeeDetail />);
    const fileInput = screen.getByTestId("file-input");

    const file = new File(["dummy"], "test.txt", {
      type: "text/plain",
    });

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    expect(
      screen.getByText(/only image files are allowed/i),
    ).toBeInTheDocument();
  });

  test("shows error when file size exceeds limit", () => {
    renderWithProviders(<EmployeeDetail />);
    const fileInput = screen.getByTestId("file-input");

    const largeFile = new File(["a".repeat(3_000_000)], "big.png", {
      type: "image/png",
    });

    fireEvent.change(fileInput, {
      target: { files: [largeFile] },
    });

    expect(screen.getByText(/smaller than/i)).toBeInTheDocument();
  });

  test("stores image and navigates on valid upload", async () => {
    globalThis.FileReader = class {
      readAsDataURL() {
        this.result = "data:image/png;base64,mockImage";
        this.onloadend();
      }
    };

    renderWithProviders(<EmployeeDetail />);
    const fileInput = screen.getByTestId("file-input");

    const imageFile = new File(["dummy"], "photo.png", {
      type: "image/png",
    });

    await userEvent.upload(fileInput, imageFile);

    expect(mockNavigate).toHaveBeenCalledWith("/photo-result", {
      state: {
        employeeId: "5421",
        image: "data:image/png;base64,mockImage",
      },
    });

    expect(localStorage.getItem("photo_5421")).toBeTruthy();
  });

  test("shows skeleton while loading", () => {
    useEmployeeModule.useEmployee.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<EmployeeDetail />);

    expect(screen.queryByText("Tiger Nixon")).not.toBeInTheDocument();
  });

  test("shows error message when API fails", () => {
    useEmployeeModule.useEmployee.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<EmployeeDetail />);

    expect(screen.getByText(/failed to load employee/i)).toBeInTheDocument();
  });

  test("shows not found message when employee is null", () => {
    useEmployeeModule.useEmployee.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<EmployeeDetail />);

    expect(screen.getByText(/employee not found/i)).toBeInTheDocument();
  });

  test("renders stored image if not expired", () => {
    const expiry = Date.now() + 60000;

    localStorage.setItem(
      "photo_5421",
      JSON.stringify({
        image: "data:image/png;base64,storedImage",
        expiry,
      }),
    );

    renderWithProviders(<EmployeeDetail />);

    expect(screen.getByAltText(/captured employee/i)).toHaveAttribute(
      "src",
      "data:image/png;base64,storedImage",
    );
  });
});
