"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { getUser } from "../lib/firestore";

interface TopupHistoryItem {
  id: string;
  amount: number;
  date: string;
  method: string; // เช่น "TrueMoney", "PromptPay"
}

interface User {
  uid: string;
  email: string;
  balance: number;
  lastLogin?: string;
  phone?: string;
  provider?: string;
  role?: string;
  topupHistory?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ อ่าน localStorage เฉพาะ client side
  useEffect(() => {
    const cached = localStorage.getItem("user");
    if (cached) {
      setUser(JSON.parse(cached));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setIsLoading(true);

        try {
          const userData = await getUser(firebaseUser.uid);
          if (userData) {
            const newUser: User = {
              uid: firebaseUser.uid,
              email: userData.email,
              balance: userData.balance,
               lastLogin: userData.lastLogin,
                    phone: userData.phone,
  provider:  userData.provider,
  role:  userData.role,
  topupHistory:  userData.topupHistory
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
          }
        } catch (err) {
          console.error(err);
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("user");
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
