import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  CircleMarker: ({ children, eventHandlers, center }) => (
    <div
      data-testid="marker"
      data-center={JSON.stringify(center)}
      onClick={() => eventHandlers?.click?.({ originalEvent: {} })}
    >
      {children}
    </div>
  ),
  Tooltip: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
  useMap: () => ({
    fitBounds: vi.fn(),
    setView: vi.fn(),
    flyTo: vi.fn(),
  }),
}));

const mockUseEmployeeList = vi.fn();

vi.mock("../features/employees/list/useEmployeeList", () => ({
  useEmployeeList: () => mockUseEmployeeList(),
}));

const mockEmployees = [
  { id: "1", name: "A", city: "Tokyo", salary: 100000 },
  { id: "2", name: "B", city: "Tokyo", salary: 200000 },
  { id: "3", name: "C", city: "London", salary: 300000 },
];

import EmployeeMap from "../features/employees/map/EmployeeMap";

beforeEach(() => {
  mockUseEmployeeList.mockReset();
});

describe("EmployeeMap", () => {
  test("renders loading skeleton when loading", () => {
    mockUseEmployeeList.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<EmployeeMap />);

    expect(screen.queryByTestId("map-container")).not.toBeInTheDocument();
  });

  test("renders error message when error occurs", () => {
    mockUseEmployeeList.mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<EmployeeMap />);

    expect(screen.getByText(/failed to load map/i)).toBeInTheDocument();
  });

  test("renders empty message when no location data", () => {
    mockUseEmployeeList.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<EmployeeMap />);

    expect(screen.getByText(/no location data available/i)).toBeInTheDocument();
  });

  test("renders one marker per unique city", () => {
    mockUseEmployeeList.mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });

    render(<EmployeeMap />);

    const markers = screen.getAllByTestId("marker");

    expect(markers).toHaveLength(2);
  });

  test("clicking a marker triggers click handler", async () => {
    mockUseEmployeeList.mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
    });

    render(<EmployeeMap />);

    const markers = screen.getAllByTestId("marker");

    await userEvent.click(markers[0]);

    expect(markers[0]).toBeInTheDocument();
  });
});
