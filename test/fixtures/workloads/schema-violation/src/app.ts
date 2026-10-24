import { cache, KeyValue, KeyValueEngine } from "@runtimeconditions/common-integrations";

export const sessions = cache(new KeyValue({ engine: "etcd" as KeyValueEngine }));
