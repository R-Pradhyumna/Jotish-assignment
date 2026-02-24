import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeList } from "../employeesApi";

export function useEmployeeList() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployeeList,
  });
}
