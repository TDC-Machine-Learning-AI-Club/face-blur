import { type Message } from "ai";

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;
