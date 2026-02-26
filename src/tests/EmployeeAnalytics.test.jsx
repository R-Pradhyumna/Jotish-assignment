import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

const mockEmployees = [
  {
    id: "1",
    name: "A",
    city: "Delhi",
    position: "Dev",
    startDate: "2020",
    salary: 100000,
  },
  {
    id: "2",
    name: "B",
    city: "Delhi",
    position: "Dev",
    startDate: "2021",
    salary: 200000,
  },
  {
    id: "3",
    name: "C",
    city: "Mumbai",
    position: "Dev",
    startDate: "2022",
    salary: 300000,
  },
];

vi.mock("../features/employees/list/useEmployeeList", () => ({
  useEmployeeList: () => ({
    data: mockEmployees,
    isLoading: false,
    isError: false,
  }),
}));

vi.mock("../features/employees/analytics/charts/TopSalaryChart", () => ({
  default: ({ data }) => <div data-testid="top-chart">{data.length}</div>,
}));

vi.mock("../features/employees/analytics/charts/CityDistributionChart", () => ({
  default: ({ data }) => <div data-testid="city-chart">{data.length}</div>,
}));

vi.mock(
  "../features/employees/analytics/charts/SalaryDistributionChart",
  () => ({
    default: ({ data }) => <div data-testid="salary-chart">{data.length}</div>,
  }),
);

import EmployeeAnalytics from "../features/employees/analytics/EmployeeAnalytics";

describe("EmployeeAnalytics", () => {
  test("renders KPI stats correctly", () => {
    render(<EmployeeAnalytics />);

    expect(screen.getByText("Total Employees")).toBeInTheDocument();

    const totalLabel = screen.getByText("Total Employees");
    const kpiItem = totalLabel.parentElement;

    expect(within(kpiItem).getByText("3")).toBeInTheDocument();

    expect(screen.getByText(/Highest Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/3,00,000/)).toBeInTheDocument();

    expect(screen.getByText(/Average Salary/i)).toBeInTheDocument();
  });

  test("renders TopSalaryChart by default", () => {
    render(<EmployeeAnalytics />);

    expect(screen.getByTestId("top-chart")).toBeInTheDocument();
  });

  test("switches to CityDistributionChart when selected", async () => {
    render(<EmployeeAnalytics />);
    const dropdown = screen.getByRole("combobox");

    await userEvent.selectOptions(dropdown, "city");

    expect(screen.getByTestId("city-chart")).toBeInTheDocument();
  });

  test("switches to SalaryDistributionChart when selected", async () => {
    render(<EmployeeAnalytics />);
    const dropdown = screen.getByRole("combobox");

    await userEvent.selectOptions(dropdown, "distribution");

    expect(screen.getByTestId("salary-chart")).toBeInTheDocument();
  });
});
