'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ToastContext } from '@/components/Toast/ToastContext';
import useProfile from '@/hooks/useProfile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';

type UserForm = {
  email: string;
  password: string;
  username: string;
};

const INITIAL_USER_FORM = {
  email: '',
  password: '',
  username: ''
};

function SignUp() {
  const [user, setUser] = useState<UserForm>(INITIAL_USER_FORM);
  const [loading, setLoading] = useState(false);
  const { supabase, setUser: setAuthUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { createProfileFromUserId } = useProfile();
  const router = useRouter();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!user.email || !user.password || !user.username)
      return toast({
        type: 'error',
        title: 'Please fill the form',
        message: 'There are incomplete fields.'
      });

    setLoading(true);
    const res = await supabase.auth.signUp(user);

    if (res.error) {
      return toast({
        type: 'error',
        title: 'Account not created',
        message:
          'There was an error creating your account. Please try again later.'
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
          message:
            'Your account was created. Check the link sent to your email to active it.'
        });
        setAuthUser(res.data.user);
        router.push('/dashboard');
      })
      .catch(() =>
        toast({
          type: 'error',
          title: 'Account not created',
          message:
            'There was an error creating your account. Please try again later.'
        })
      )
      .finally(() => setLoading(false));
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex max-w-lg flex-col gap-4"
    >
      Sign up
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={e => handleInputChange(e)}
        autoFocus
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={e => handleInputChange(e)}
      />
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
            onChange={e => handleInputChange(e)}
            placeholder="username"
            maxLength={40}
            className="w-full rounded-lg border border-zinc-600 bg-white/10 p-4 pl-[72px] pr-[132px] text-sm text-white focus:outline-zinc-100/60"
          />
        </div>
      </div>
      <Button type="submit" loading={loading}>
        Sign up
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
  );
}

export default SignUp;
