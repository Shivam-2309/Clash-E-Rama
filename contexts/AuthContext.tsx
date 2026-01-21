'use client';
import { createContext, useContext } from 'react';

type Session = any; 
type Props = { children: React.ReactNode; session?: Session };

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({ children, session }: Props) {
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthSession = () => {
  const session = useContext(AuthContext);
  return { data: session, isPending: false };
};
