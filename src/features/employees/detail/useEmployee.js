import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeList } from "../employeesApi";

export function useEmployee(employeeId) {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployeeList,
    select: (employees) =>
      employees.find((emp) => String(emp.id) === String(employeeId)),
  });
}
