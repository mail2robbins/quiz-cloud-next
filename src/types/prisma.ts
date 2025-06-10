import type { User } from "@prisma/client";


export interface UserWithProfile extends User {
  //profile: Profile | null;
} 