import { createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { db,auth } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // สร้าง document สำหรับผู้ใช้ใน Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      provider: user.providerData[0].providerId,
      phone: "",
      role: "user",
      balance: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      topupHistory: [],
    });

    console.log("✅ Google user signed in:", user);
    window.location.href = '/';
    return user; // return user object ถ้าจะเอาไปใช้งานต่อ
  } catch (error) {
    console.error("❌ Google sign-in error:", error);
  }
};




export async function registerUser( email: string, phone: string, password: string) {
  try {
    // 1️⃣ สมัครสมาชิกด้วย Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ บันทึกข้อมูลเพิ่มเติมลง Firestore
    await setDoc(doc(db, "users", user.uid), {
     
      email,
      phone,
      provider: "",
      role: "user",
      balance: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      topupHistory: [],
    });

    console.log("✅ User registered successfully!");
    
  } catch (error) {
    console.error("❌ Error during registration:", error);
    throw error;
  }
}


export async function loginUser(email: string, password: string) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(), 
    });
    window.location.href = '/';
    
  } catch (error: any) {
    console.error("❌ Login failed:", error);
    // ✅ โยน error เดิมออกไปเพื่อให้ handleSubmit ดักจับได้
    throw error;
  }
}

// 🧾 อ่านข้อมูลผู้ใช้
export async function getUser(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}


