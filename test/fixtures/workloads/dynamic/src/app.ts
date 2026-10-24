import { cache, KeyValue, KeyValueEngine } from "@runtimeconditions/common-integrations";

const engine = process.env.ENGINE as KeyValueEngine;

export const sessions = cache(new KeyValue({ engine }));
