export type User = {
  user: {
    email: string;
    provider: string;
    confimed: boolean;
    blocked: boolean;
    role: object;
    created_at: string;
    updated_at: string;
    routine: number;
  } | null;
};

export type UserSlice = {
  user: User;
};

export type Jwt = {
  jwt: string;
};
