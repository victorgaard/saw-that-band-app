'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Picture from '@/components/Picture';
import { ToastContext } from '@/components/Toast/ToastContext';
import useProfile from '@/hooks/useProfile';
import { ExternalLinkProvider, ProfileForm, ProfileLink } from '@/types/global';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

function generateLinks(arrayOfPlatforms: ExternalLinkProvider[]) {
  return arrayOfPlatforms.map(platform => ({ type: platform, url: '' }));
}

const INITIAL_PROFILE_FORM: ProfileForm = {
  name: '',
  picture: '',
  email: '',
  username: '',
  bio: '',
  links: generateLinks([
    'spotify',
    'youtube',
    'deezer',
    'apple',
    'lastfm',
    'setlist',
    'soundcloud',
    'instagram',
    'other'
  ])
};

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [error, setError] = useState(false);
  const [profile, setProfile] = useState<ProfileForm>(INITIAL_PROFILE_FORM);
  const [formLoading, setFormLoading] = useState(false);

  const { getProfileFromUserId, uploadProfilePicture, updateProfile } =
    useProfile();

  function concatLinks(userLinks: ProfileLink[] | null) {
    if (!userLinks) return null;
    const userLinksByType: { [key: string]: string } = {};
    userLinks.forEach(link => {
      userLinksByType[link.type] = link.url;
    });
    return INITIAL_PROFILE_FORM.links.map(link => ({
      type: link.type,
      url: userLinksByType[link.type] || link.url
    }));
  }

  useEffect(() => {
    if (user) {
      getProfileFromUserId(user.id)
        .then(res => {
          const [data] = res;
          setProfile({
            username: data.username,
            email: data.email,
            name: data.name || INITIAL_PROFILE_FORM.name,
            picture: data.picture || INITIAL_PROFILE_FORM.picture,
            bio: data.bio || INITIAL_PROFILE_FORM.bio,
            links: concatLinks(data.links) || INITIAL_PROFILE_FORM.links
          });
        })
        .catch(() => setError(true));
    }
  }, [user, getProfileFromUserId]);

  function updateForm(e: ChangeEvent<HTMLInputElement>, idx?: number) {
    if (typeof idx === 'number') {
      const newLinks = [...profile.links];
      newLinks[idx] = {
        type: e.target.name as ProfileLink['type'],
        url: e.target.value
      };
      setProfile(prev => ({ ...prev, links: newLinks }));
    } else {
      setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  function onUpdateProfile() {
    if (!profile || !user) return;

    updateProfile(user.id, profile)
      .then(() =>
        toast({
          type: 'success',
          title: 'Profile updated',
          message: 'Your profile was successfully updated.'
        })
      )
      .catch(() =>
        toast({
          type: 'error',
          title: 'Profile could not be updated',
          message:
            'There was an error updating your profile. Please try again later.'
        })
      )
      .finally(() => setFormLoading(false));
  }

  if (!profile.username) return <>Loading...</>;
  if (error)
    return (
      <>There was an error loading your profile. Please try again later.</>
    );

  return (
    <form
      className="-mx-12 -my-8 flex flex-col"
      onSubmit={e => {
        e.preventDefault();
        setFormLoading(true);
        onUpdateProfile();
      }}
    >
      <div className="flex h-[calc(100vh-76px)] flex-col gap-24 overflow-auto border-b border-zinc-850 p-12">
        <div className="flex gap-24">
          <p className="w-48 text-lg font-medium">Picture</p>
          <div className="flex items-center gap-2">
            <Picture user={profile} size={96} />
            <Button type="button" style="secondary" size="sm">
              Upload
            </Button>
          </div>
        </div>
        <div className="flex gap-24">
          <p className="w-48 text-lg font-medium">Profile information</p>
          <div className="grid flex-1 gap-6">
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
              value={profile.bio}
              placeholder="Bio"
              onChange={e => updateForm(e)}
            />
          </div>
        </div>
        <div className="flex gap-24">
          <p className="w-48 text-lg font-medium">Social links</p>
          <div className="grid flex-1 grid-cols-2 gap-6">
            {profile.links.map((link, idx) => (
              <Input
                key={link.type}
                label={link.type}
                name={link.type}
                value={link.url}
                placeholder={`${link.type} URL`}
                onChange={e => updateForm(e, idx)}
                maxLength={200}
                optional
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-16 pt-3">
        <Button loading={formLoading}>Save changes</Button>
      </div>
    </form>
  );
}

export default ProfilePage;
