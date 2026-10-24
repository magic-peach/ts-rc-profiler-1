import { cache, KeyValue, KeyValueEngine } from "@runtimeconditions/common-integrations";

throw new Error("the workload must never be executed");

export const sessions = cache(new KeyValue({ engine: KeyValueEngine.Memcached }));
