import { cache, KeyValue } from "@runtimeconditions/common-integrations";

export const sessions = cache(new KeyValue({ engnie: "redis" } as never));
