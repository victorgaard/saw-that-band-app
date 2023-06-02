"use client";

import { AuthContext } from "@/auth/AuthContext";
import { useContext, useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const { supabase } = useContext(AuthContext);

  async function handleSubmit() {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, name, picture: "" } },
    });

    if (res.error) {
      throw new Error("Could not sign up");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-lg flex flex-col gap-4"
    >
      Sign up
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-black"
      />
      <input
        type="text"
        placeholder="First name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-black"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black"
      />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUp;
