import { cache } from "@runtimeconditions/common-integrations";

export const sessions = cache(new Map() as never);
