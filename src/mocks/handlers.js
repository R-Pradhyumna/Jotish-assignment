import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://backend.jotish.in/backend_dev/gettabledata.php", () =>
    HttpResponse.json({
      TABLE_DATA: {
        data: [
          [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            "5421",
            "2011/04/25",
            "$320,800",
          ],
          [
            "Garrett Winters",
            "Accountant",
            "Tokyo",
            "8422",
            "2011/07/25",
            "$170,750",
          ],
        ],
      },
    }),
  ),
];
