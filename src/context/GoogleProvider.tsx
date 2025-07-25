import React, { createContext, useContext, useState } from 'react';

type GoogleEmailContextType = {
  email: string;
  setEmail: (email: string) => void;
};

const GoogleEmailContext = createContext<GoogleEmailContextType | null>(null);

// Custom hook to use context
export function useEmail() {
  const context = useContext(GoogleEmailContext);
  if (!context) throw new Error('useEmail must be used within a GoogleProvider');
  return context;
}

// Provider component
export function GoogleProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string>('');
  return (
    <GoogleEmailContext.Provider value={{ email, setEmail }}>
      {children}
    </GoogleEmailContext.Provider>
  );
}