'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Picture from '@/components/Picture';
import Textarea from '@/components/Textarea';
import { ToastContext } from '@/components/Toast/ToastContext';
import useProfile from '@/hooks/useProfile';
import LoadingSpinner from '@/icons/LoadingSpinner';
import { ExternalLinkProvider, ProfileForm, ProfileLink } from '@/types/global';
import { LinkIcon } from '@heroicons/react/24/outline';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

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
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

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
      setProfile({
        username: user.username,
        email: user.email,
        name: user.name || INITIAL_PROFILE_FORM.name,
        picture: user.picture || INITIAL_PROFILE_FORM.picture,
        bio: user.bio || INITIAL_PROFILE_FORM.bio,
        links: concatLinks(user.links) || INITIAL_PROFILE_FORM.links
      });
    }
  }, [user]);

  function updateForm(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx?: number
  ) {
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

  const onUpdateProfile = useCallback(() => {
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
      .finally(() => {
        setFormLoading(false);
        setProfilePictureLoading(false);
        setHasUpdate(false);
      });
  }, [profile, toast, updateProfile, user]);

  useEffect(() => {
    if (hasUpdate) {
      onUpdateProfile();
    }
  }, [hasUpdate, onUpdateProfile]);

  async function onUpdateProfilePicture(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || !user) return;

    const file = files[0];
    if (!file) return;

    const size = file.size / 1024 / 1024;

    if (size > 2.5)
      return toast({
        type: 'error',
        title: 'Profile picture too big',
        message: 'Please provide a picture that is under 2.5 MB'
      });

    setProfilePictureLoading(true);
    uploadProfilePicture(user.id, file)
      .then(res => {
        setProfile(prev => ({ ...prev, picture: res }));
        setHasUpdate(true);
      })
      .catch(() => {
        toast({
          type: 'error',
          title: 'Profile picture not uploaded',
          message:
            'There was an error uploading your profile picture. Please try again later.'
        });
        setProfilePictureLoading(false);
      });
  }

  function preventLineBreak(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  if (!profile.username) return <LoadingSpinner />;
  if (error)
    return (
      <>There was an error loading your profile. Please try again later.</>
    );

  return (
    <form
      className="-mx-10 -my-8 flex flex-col sm:-mx-12"
      onSubmit={e => {
        e.preventDefault();
        setFormLoading(true);
        onUpdateProfile();
      }}
    >
      <div className="flex h-[calc(100dvh-160px)] flex-col gap-12 overflow-auto border-b border-zinc-850 p-12 sm:h-[calc(100vh-76px)] sm:gap-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-24">
          <p className="w-48 text-lg font-medium">Public profile link</p>
          <a
            className="flex flex-1 items-center gap-2 text-emerald-300 underline-offset-4 transition-all hover:text-emerald-400 hover:underline"
            href={`https://${profile.username}.sawthat.band/?utm_source=profilePage`}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon className="h-5 w-5" />
            https://{profile.username}.sawthat.band/
          </a>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-24">
          <p className="w-48 text-lg font-medium">Picture</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Picture user={profile} size={96} />
            <div className="relative gap-2">
              <label
                aria-disabled={profilePictureLoading}
                htmlFor="file"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-zinc-850 p-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-900 active:bg-zinc-850 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-850"
              >
                <input
                  name="file"
                  id="file"
                  type="file"
                  onChange={onUpdateProfilePicture}
                  disabled={profilePictureLoading}
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                />
                {profilePictureLoading ? (
                  <>
                    <span className="mr-2">
                      <LoadingSpinner />
                    </span>{' '}
                    Uploading...
                  </>
                ) : (
                  'Upload image'
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-24">
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
            <div className="space-y-2">
              <Textarea
                label="Bio"
                name="bio"
                value={profile.bio}
                placeholder="Bio"
                onChange={e => updateForm(e)}
                onKeyDown={e => preventLineBreak(e)}
                maxLength={140}
              />
              <p className="text-sm text-zinc-400">
                {profile.bio.length} / 140 characters
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-24">
          <p className="w-48 text-lg font-medium">Social links</p>
          <div className="grid flex-1 gap-6 sm:grid-cols-2">
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
      <div className="flex flex-col px-10 pt-3 sm:flex-row sm:justify-end sm:pr-16">
        <Button loading={formLoading}>Save changes</Button>
      </div>
    </form>
  );
}

export default ProfilePage;
