import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../types/news";

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data() as User;
            setUserData(data);
            setIsAdmin(data.role === "admin" || data.role === "editor");
          } else {
            // User doesn't exist in Firestore, create basic entry
            const adminEmails = (() => {
              const envValue = import.meta.env.VITE_ADMIN_EMAILS ?? "";
              const list = envValue
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean);
              return list.length ? list : ["sylhetynews.com@gmail.com"];
            })();
            const role = adminEmails.includes(firebaseUser.email || "")
              ? "admin"
              : "viewer";

            setUserData({
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              displayName: firebaseUser.displayName || "",
              photoURL: firebaseUser.photoURL || "",
              role,
              createdAt: new Date(),
            });
            setIsAdmin(role === "admin");
          }
        } else {
          setUser(null);
          setUserData(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
