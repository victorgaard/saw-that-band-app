"use client";

import { AuthContext } from "@/auth/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ToastContext } from "@/components/Toast/ToastContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

function Profile() {
  /** Helpers */
  const router = useRouter();
  const { user, supabase } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  /** User states */
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  /** Page states */
  const [loading, setLoading] = useState(true);

  /** Form states */
  const [formLoading, setFormLoading] = useState(false);
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
      setName(user.user_metadata.name);
      setEmail(user.email!);
      setPicture(user.user_metadata.picture);
      setUsername(user.user_metadata.username);
    }
  }, [user]);

  async function updateProfile() {
    if (!user) return;

    setFormLoading(true);
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

    setFormLoading(false);
    router.refresh();
  }

  async function uploadProfilePicture(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || !user) return;

    const file = files[0];
    if (!file) return;

    const size = file.size / 1024 / 1024;

    if (size > 2.5)
      return toast({
        type: "error",
        title: "Profile picture too big",
        message: "Please provide a picture that is under 2.5 MB",
      });

    const fileName = `/${user.id}/${new Date().toISOString()}`;

    const { data, error } = await supabase.storage
      .from("Avatar")
      .upload(fileName, file);

    if (error) {
      return toast({
        type: "error",
        title: "Profile picture not uploaded",
        message:
          "There was an error uploading your profile picture. Please try again later.",
      });
    }

    const newPicture = `${process.env.NEXT_PUBLIC_SUPABASE_STORATE_URL}${data.path}`;

    const res = await supabase.auth.updateUser({
      data: { name, username, picture: newPicture },
    });

    if (res.error) {
      return toast({
        type: "error",
        title: "Profile picture not uploaded",
        message:
          "There was an error uploading your profile picture. Please try again later.",
      });
    }

    toast({
      type: "success",
      title: "Profile picture uploaded",
      message: "Your profile picture was successfully uploaded.",
    });

    setPicture(newPicture);
    router.refresh();
  }

  async function deleteProfilePicture() {
    if (!user) return;

    const res = await supabase.auth.updateUser({
      data: { name, username, picture: "" },
    });

    if (res.error) {
      return toast({
        type: "error",
        title: "Profile picture could not be deleted",
        message:
          "There was an error deleting your profile picture. Please try again later.",
      });
    }

    toast({
      type: "success",
      title: "Profile picture deleted",
      message: "Your profile picture was successfully updated.",
    });

    setPicture("");
    router.refresh();
  }

  if (loading) return <>Loading...</>;

  return (
    <>
      <input
        type="file"
        onChange={uploadProfilePicture}
        accept="image/png, image/gif, image/jpeg"
      />
      {picture && (
        <button type="button" onClick={deleteProfilePicture}>
          Delete picture
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile();
        }}
        className="max-w-lg flex flex-col gap-5"
      >
        Profile
        {picture ? (
          <Image
            src={picture}
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded"
            alt="Profile picture"
          />
        ) : (
          <div className="w-12 h-12 bg-purple-700 text-white flex items-center justify-center rounded">
            <span className="text-2xl">{name[0]}</span>
          </div>
        )}
        <Input
          type="text"
          placeholder="Name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <Input
          type="text"
          placeholder="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled
        />
        <Button type="submit" loading={formLoading} disabled={!name}>
          Save changes
        </Button>
      </form>
    </>
  );
}

export default Profile;
