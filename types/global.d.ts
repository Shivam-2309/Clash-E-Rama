declare global {
    type SignInFormData = {
        email: string;
        password: string;
    };
    type SignUpFormData = {
        fullName: string;
        email: string;
        password: string;
    };
}
export interface CFSubmission {
  id: number;
  contestId: number;
  problem: { contestId: number; index: string };
  verdict: string;
  creationTimeSeconds: number;
}

export interface CFVerifyPayload {
  handle: string;
  contestId: number;
  problemIndex: string;
}
export {}