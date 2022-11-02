import { Auth, UserCredential } from "firebase/auth";

export type Post = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export type PostProps = {
  id: string;
  title: string;
  body: string;
};

export type AuthInitialState = {
  refreshToken: string | null;
  isLogged: boolean;
};

export type PostInitialState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  posts: Post[];
  error?: string;
};

export type HandleDelete = (id: string) => void;

export type Function = () => void;

export type SignInWithEmailAndPassword = (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential>;

export type CreateUserWithEmailAndPassword = (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential>;
