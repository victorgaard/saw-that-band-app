'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ToastContext } from '@/components/Toast/ToastContext';
import useProfile from '@/hooks/useProfile';
import { ProfileLink } from '@/types/global';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

type ProfileForm = {
  name: string;
  picture: string;
  email: string;
  username: string;
  bio: string;
  links: ProfileLink[];
};

const INITIAL_PROFILE_LINKS: ProfileLink[] = [
  {
    type: 'spotify',
    url: ''
  }
];

const INITIAL_PROFILE_FORM = {
  name: '',
  picture: '',
  email: '',
  username: '',
  bio: '',
  links: INITIAL_PROFILE_LINKS
};

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const { getProfileFromUserId } = useProfile();

  const [error, setError] = useState(false);
  const [profile, setProfile] = useState<ProfileForm>(INITIAL_PROFILE_FORM);

  useEffect(() => {
    if (user) {
      getProfileFromUserId(user.id)
        .then(res => {
          setProfile({
            username: res[0].username,
            email: res[0].email,
            name: res[0].name || '',
            picture: res[0].picture || '',
            bio: res[0].bio || '',
            links: res[0].links || INITIAL_PROFILE_LINKS
          });
        })
        .catch(() => setError(true));
    }
  }, [user, getProfileFromUserId]);

  function updateForm(e: ChangeEvent<HTMLInputElement>) {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (!profile.username) return <>Loading...</>;
  if (error)
    return (
      <>There was an error loading your profile. Please try again later.</>
    );

  return (
    <form className="flex flex-col gap-12" onSubmit={e => e.preventDefault()}>
      <div className="flex gap-24">
        <p className="w-24 text-lg font-medium">Picture</p>
      </div>
      <div className="h-[1px] w-full bg-zinc-850" />
      <div className="flex gap-24">
        <p className="w-24 text-lg font-medium">Profile</p>
        <div className="grid flex-1 grid-cols-2 gap-6">
          <Input
            label="Username"
            name="username"
            value={profile.username}
            onChange={() => {}}
            disabled
          />
          <Input
            label="Email"
            name="email"
            value={profile.email}
            onChange={() => {}}
            disabled
          />
          <Input
            label="Name"
            name="name"
            value={profile.name}
            placeholder="Name"
            onChange={e => updateForm(e)}
          />
          <Input
            label="Bio"
            name="bio"
            value={profile.name}
            placeholder="Bio"
            onChange={e => updateForm(e)}
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-850" />
      <div className="flex gap-24">
        <p className="w-24 text-lg font-medium">Links</p>
        <div className="grid flex-1 grid-cols-2 gap-6">
          {profile.links.map(link => (
            <Input
              key={link.type}
              label={link.type}
              name={link.type}
              value={link.url}
              placeholder={`${link.type} URL`}
              onChange={() => {}}
              optional
            />
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-850" />
      <div className="pl-48">
        <Button>Save changes</Button>
      </div>
    </form>
  );
}

export default ProfilePage;
