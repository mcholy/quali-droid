export interface propsErrorPage {
  message: string;
  statusText: string;
}

export interface loginDTO {
  userName: string;
  password: string;
}

export interface CalculationFormCreationDto {
  inputOne: number;
  inputTwo: number;
  sampleSize: number;
}

export interface CalculationParams {
  pageNumber: number;
  pageSize: number;
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

export interface calculationResponse {
  number: number;
  label: string;
}

export interface computeResult {
  calculations: calculationResponse[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  HasPrevious: boolean;
  HasNext: boolean;
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

export interface resultStoreProps {
  inputOne: number;
  inputTwo: number;
  sampleSize: number;
  pagination?: PaginationInfo;
  calculations: calculationResponse[];
  setPagination: (pagination: PaginationInfo) => void;
  setParams: (inOne: number, inTwo: number, size: number) => void;
  setCalculations: (calculations: calculationResponse[]) => void;
}
