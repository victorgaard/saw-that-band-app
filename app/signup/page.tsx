"use client";

import { AuthContext } from "@/auth/AuthContext";
import { ToastContext } from "@/components/Toast/ToastContext";
import { useContext, useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const { supabase } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  async function handleSubmit() {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, name, picture: "" } },
    });

    if (res.error) {
      return toast({
        type: "error",
        title: "Account not created",
        message:
          "There was an error creating your account. Please try again later.",
      });
    }

    return toast({
      type: "success",
      title: "Account created",
      message:
        "Your account was created. Check the link sent to your email to active it.",
    });
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
