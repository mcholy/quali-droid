export interface propsErrorPage {
  message: string;
  statusText: string;
}

export interface loginDTO {
  userName: string;
  password: string;
}

export interface tokensDTO {
  accessToken: string;
  refreshToken: string;
}

export interface claim {
  type: string;
  value: string;
}

export interface claimsResponse {
  claims: claim[];
  expired: boolean;
}

export interface loginProps {
  text: string;
  disabled: boolean;
  type: 'submit' | 'button';
}

export interface authResponse {
  accessToken: string;
  refreshToken: string;
}

export interface authStoreProps {
  status: 'idle' | 'signOut' | 'signIn';
  accessToken: string | null;
  refreshToken: string | null;
  credentials: claim[];
  errors: string[];
  setCredentials: (credentials: claim[]) => void;
  signIn: (token: string, refreshToken: string) => void;
  signOut: () => void;
  hydrate: () => void;
}
