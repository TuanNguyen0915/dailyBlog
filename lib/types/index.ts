import { Blog, User } from "@prisma/client";

export interface SafeUser extends User {
  blogs ?: Blog[]
}