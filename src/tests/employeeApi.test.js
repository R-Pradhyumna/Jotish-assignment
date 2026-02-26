import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { API_URL, fetchEmployeeList } from "../features/employees/employeesApi";
import { server } from "../mocks/server";

describe("fetchEmployeeList", () => {
  test("returns mapped employee data on success", async () => {
    const result = await fetchEmployeeList();

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("id");
  });

  test("throws error when response is not ok", async () => {
    server.use(
      http.post(API_URL, () => new HttpResponse(null, { status: 500 })),
    );

    await expect(fetchEmployeeList()).rejects.toThrow(
      "Failed to fetch employees",
    );
  });

  test("handles empty TABLE_DATA safely", async () => {
    server.use(http.post(API_URL, () => HttpResponse.json({})));

    const result = await fetchEmployeeList();

    expect(result).toEqual([]);
  });
});
