export type SessionUser = {
  name: string;
  role: string;
  email: string;
  accountName: string;
};

export type AuthState = {
  user: SessionUser | null;
  isReady: boolean;
};
