import { cache } from "@runtimeconditions/common-integrations";
import { KeyValueConfiguration } from "@runtimeconditions/env-configuration";

export const sessions = cache(new KeyValueConfiguration({}));
