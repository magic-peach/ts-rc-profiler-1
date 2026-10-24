import { cache, KeyValue } from "@runtimeconditions/common-integrations";
import { KeyValueConfiguration, KeyValueConfigurationEnvItem } from "@runtimeconditions/env-configuration";

export const sessions = cache(
  new KeyValue(),
  new KeyValueConfiguration({ env: [new KeyValueConfigurationEnvItem({ name: "REDIS_URL" } as never)] }),
);
