type User = {
  user: {
    email: string;
    provider: string;
    confimed: boolean;
    blocked: boolean;
    role: object;
    created_at: string;
    updated_at: string;
  };
};

export default User;
