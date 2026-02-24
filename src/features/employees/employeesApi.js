const API_URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

export async function fetchEmployeeList() {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "test",
      password: "123456",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const json = await response.json();

  const rawEmployees = json?.TABLE_DATA?.data ?? [];

  const employees = rawEmployees.map((row, index) => ({
    id: row[3] || index,
    name: row[0],
    position: row[1],
    city: row[2],
    startDate: row[4],
    salary: row[5],
    salaryRaw: row[5],
  }));

  return employees;
}
