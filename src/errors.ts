export class ProfilerError extends Error {
  constructor(
    readonly stage: string,
    message: string,
    readonly location?: string,
  ) {
    super(message);
  }

  override toString(): string {
    return `error: ${this.stage}: ${this.location ? `${this.location}: ` : ""}${this.message}`;
  }
}

export function fail(stage: string, message: string, location?: string): never {
  throw new ProfilerError(stage, message, location);
}
