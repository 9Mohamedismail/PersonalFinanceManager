import type { SelectUser } from "../src/db/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}
