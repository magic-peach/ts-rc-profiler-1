import { cache, KeyValue } from "@runtimeconditions/common-integrations";
import {
  KeyValueConfiguration,
  KeyValueConfigurationEnvItem,
  KeyValueConfigurationEnvItemProperty,
} from "@runtimeconditions/env-configuration";
import { engine } from "./config.js";

const sessionUrl = new KeyValueConfigurationEnvItem({
  name: "REDIS_URL",
  property: KeyValueConfigurationEnvItemProperty.Scheme,
  sensitive: true,
});

export const sessions = cache(
  new KeyValue({ engine }),
  new KeyValueConfiguration({ env: [sessionUrl, { name: "REDIS_PORT", property: KeyValueConfigurationEnvItemProperty.Port }] }),
);
