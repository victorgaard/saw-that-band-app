'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ToastContext } from '@/components/Toast/ToastContext';
import useProfile from '@/hooks/useProfile';
import restrictedUsernames from '@/utils/restrictedUsernames';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';

const INITIAL_USER_FORM = {
  email: '',
  password: '',
  username: ''
};

type UserForm = {
  email: string;
  password: string;
  username: string;
};

function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState<UserForm>(INITIAL_USER_FORM);
  const [loading, setLoading] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const { supabase } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { checkIfUsernameExists, createProfileFromUserId } = useProfile();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const onlyLowerCaseLettersRegex = /^[a-z0-9]+$/;
    const currentUsername = e.target.value.toLowerCase().trim();
    if (onlyLowerCaseLettersRegex.test(currentUsername)) {
      setUser({ ...user, username: currentUsername });
    } else {
      setUser({ ...user, username: '' });
    }
  }

  async function handleSubmit() {
    if (!user.email || !user.password || !user.username) return;

    if (user.password.length < 8)
      return toast({
        type: 'error',
        title: 'Password too short',
        message: 'Password must have at least 8 characters.',
        direction: 'center'
      });

    const isRestrictedUsername = restrictedUsernames.some(
      restrictedUsername => restrictedUsername === user.username
    );

    if (isRestrictedUsername)
      return toast({
        type: 'error',
        title: 'Restricted username',
        message: 'Please choose another username.',
        direction: 'center'
      });

    setLoading(true);
    const usernameExists = await checkIfUsernameExists(user.username);

    if (usernameExists) {
      setLoading(false);
      return toast({
        type: 'error',
        title: 'Username is taken',
        message: 'Please choose another username.',
        direction: 'center'
      });
    }

    const res = await supabase.auth.signUp(user);

    if (res.error) {
      setLoading(false);
      if (res.error.message.includes('already registered')) {
        return toast({
          type: 'error',
          title: 'There is an account with this email',
          message: 'Try logging in instead.',
          direction: 'center'
        });
      }
      return toast({
        type: 'error',
        title: 'Account not created',
        message:
          'There was an error creating your account. Please try again later.',
        direction: 'center'
      });
    }

    createProfileFromUserId({
      id: res.data.user!.id,
      email: user.email,
      username: user.username
    })
      .then(() => {
        toast({
          type: 'success',
          title: 'Account created',
          message: 'Your account was created. Start adding your bands 🤘',
          direction: 'center'
        });
        router.push('/bands');
      })
      .catch(() => {
        toast({
          type: 'error',
          title: 'Account not created',
          message:
            'There was an error creating your account. Please try again later.',
          direction: 'center'
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="-mx-4 -my-8 flex h-[100dvh] flex-1 items-center justify-center bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 sm:-mx-12 sm:-my-8 sm:h-screen sm:px-0">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-lg animate-fade-in-down-shorter flex-col gap-6"
      >
        <span className="pb-2 text-center text-xl font-semibold">
          Create your account 🤘
        </span>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={user.email}
          onChange={e => handleInputChange(e)}
          autoFocus
          required
        />
        <div className="relative">
          <Input
            name="password"
            label="Password (min. 8 characters)"
            type={passwordToggle ? 'text' : 'password'}
            placeholder="password"
            value={user.password}
            onChange={e => handleInputChange(e)}
            minLength={8}
            required
          />
          <button
            type="button"
            className="absolute bottom-4 right-4"
            onClick={() => setPasswordToggle(!passwordToggle)}
          >
            {passwordToggle ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-zinc-400">Username</p>
          <div className="relative">
            <p className="pointer-events-none absolute left-4 flex h-full items-center text-sm text-zinc-500">
              https://
            </p>
            <p className="pointer-events-none absolute right-4 flex h-full items-center text-sm text-zinc-500">
              .sawthat.band
            </p>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={e => handleUsernameChange(e)}
              placeholder="username"
              maxLength={40}
              className="w-full rounded-lg border border-zinc-600 bg-white/10 p-4 pl-[72px] pr-[132px] text-sm text-white focus:outline-zinc-100/60 disabled:cursor-not-allowed disabled:opacity-50"
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              required
            />
          </div>
        </div>
        <Button type="submit" loading={loading}>
          Create account
        </Button>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-emerald-300 underline hover:text-emerald-200"
          >
            Login
          </Link>
        </p>
      </form>
      <div className="absolute bottom-6 flex w-full items-center justify-center gap-8 text-sm text-zinc-400">
        <a
          href="https://www.sawthat.band/privacy/index.html"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 hover:text-white hover:underline"
        >
          Privacy policy
        </a>
        <a
          href="https://www.sawthat.band/terms-and-conditions/index.html"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 hover:text-white hover:underline"
        >
          Terms and conditions
        </a>
      </div>
    </div>
  );
}

export default SignUp;
