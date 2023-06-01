"use client";

import { useState } from "react";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(email, password);
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
      <button type="submit">Login</button>
    </form>
  );
}

export default SignInForm;
