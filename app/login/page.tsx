"use client";

import { AuthContext } from "@/auth/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { supabase, setUser } = useContext(AuthContext);

  async function handleSubmit() {
    const res = await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      return setError("Invalid credentials");
    }

    setUser(res.data.user);
    return router.push("/dashboard");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-lg flex flex-col gap-4"
    >
      Login
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
