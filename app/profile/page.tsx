"use client";

import { AuthContext } from "@/auth/AuthContext";
import { ToastContext } from "@/components/Toast/ToastContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function Profile() {
  const { user, supabase } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const router = useRouter();

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit() {
    if (!user) return;

    const res = await supabase.auth.updateUser({
      data: { name, username, picture },
    });

    if (res.error) {
      return toast({
        type: "error",
        title: "Profile could not be updated",
        message:
          "There was an error updating your profile. Please try again later.",
      });
    }

    toast({
      type: "success",
      title: "Profile updated",
      message: "Your profile was successfully updated.",
    });

    router.refresh();
  }

  useEffect(() => {
    if (user) {
      setName(user.user_metadata.name);
      setPicture(user.user_metadata.picture);
      setUsername(user.user_metadata.username);
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-lg flex flex-col gap-4"
    >
      Profile
      <input
        type="text"
        placeholder="First name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={user?.email}
        className="text-black"
        disabled
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black"
      />
      <button type="submit">Save changes</button>
    </form>
  );
}

export default Profile;
