import { api, Http, Method, OperationsItem } from "@runtimeconditions/common-integrations";

const base = "/orders";

export const orders = api(
  new Http({
    operations: [
      new OperationsItem({ method: Method.Get, path: base }),
      { method: Method.Post, path: `${base}/new`, requestBodySchema: { name: "string", tags: ["string"] } },
    ],
  }),
);
