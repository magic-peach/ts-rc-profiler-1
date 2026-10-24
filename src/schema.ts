import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";
import { parse } from "yaml";

import { fail } from "./errors.js";

const addFormats = addFormatsModule as unknown as (ajv: Ajv2020) => Ajv2020;

export const CORE_SCHEMA_ID = "https://runtimeconditions.io/schemas/profile/0.4.0/runtimeconditions.profile.schema.yaml";
export const CORE_SCHEMA_VERSION = "0.4.0";
export const CORE_SCHEMA_SOURCE_SHA256 = "96d430c7936fcf7334aa9613f63bb306592e07cf56fe4154af57933d2c1480e6";
export const CORE_SCHEMA_SEMANTIC_SHA256 = "ed447dccefd7507d905b0b6177b1386d8ee96a1d053b731939a9a7ae973d5af1";

export function canonicalJson(value: Json): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key] as Json)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

export function loadSchema(name: string): JsonObject {
  const bytes = readFileSync(fileURLToPath(new URL(`../../schemas/${name}`, import.meta.url)));
  const schema = parse(bytes.toString("utf-8")) as JsonObject;
  if (name === "runtimeconditions.profile.schema.yaml") {
    const source = createHash("sha256").update(bytes).digest("hex");
    const semantic = createHash("sha256").update(canonicalJson(schema)).digest("hex");
    if (schema.$id !== CORE_SCHEMA_ID || source !== CORE_SCHEMA_SOURCE_SHA256 || semantic !== CORE_SCHEMA_SEMANTIC_SHA256) {
      fail("schema", "the bundled core profile schema does not match its pinned identity and digests");
    }
  }
  return schema;
}

export function compile(schema: JsonObject): ValidateFunction {
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  addFormats(ajv);
  return ajv.compile(schema);
}

export function describeErrors(validate: ValidateFunction): string {
  return (validate.errors ?? [])
    .map((error) => `${error.instancePath || "/"} ${error.message ?? "is invalid"}`)
    .join("; ");
}
