'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { ToastContext } from '@/components/Toast/ToastContext';
import LoadingSpinner from '@/icons/LoadingSpinner';
import supabase from '@/utils/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

function ForgotPassword() {
  const [user, setUser] = useState({ email: '', password1: '', password2: '' });
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | undefined>();
  const { toast } = useContext(ToastContext);
  const router = useRouter();

  const localStorageToken =
    typeof window !== undefined &&
    localStorage.getItem('sb-guerfzlhzjrpooirzvlf-auth-token');
  const token = JSON.parse(localStorageToken || '{}');
  const email = token?.user?.email;

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.split('#')[1]);
    if (hash.size === 0) return setIsValidSession(false);
    const hasToken = hash.get('access_token');
    if (hasToken) return setIsValidSession(true);
    return setIsValidSession(false);
  }, []);

  useEffect(() => {
    setUser({ ...user, email });
  }, [email]);

  async function handleSubmit() {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      email: '',
      password: user.password1
    });

    if (error) {
      setLoading(false);
      return toast({
        type: 'error',
        title: 'Request password link not sent',
        message:
          'There was an issue requesting a new password reset link. Please try again.',
        direction: 'center'
      });
    }

    setLoading(false);
    toast({
      type: 'success',
      title: 'Request password link sent',
      message: 'Check your inbox for the link to reset your password.',
      direction: 'center'
    });
    router.push('/');
  }

  if (isValidSession === undefined)
    return (
      <div className="-mx-4 -my-8 flex h-screen flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 text-sm sm:-mx-12 sm:-my-8 sm:px-0">
        <LoadingSpinner />
      </div>
    );

  if (isValidSession === false)
    return (
      <div className="-mx-4 -my-8 flex h-screen flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 text-sm sm:-mx-12 sm:-my-8 sm:px-0">
        This reset password link is either invalid or has expired. Please
        request a new one.
        <Link
          href="/login"
          className="text-emerald-300 underline hover:text-emerald-200"
        >
          Go back
        </Link>
      </div>
    );

  return (
    <div className="-mx-4 -my-8 flex h-screen flex-1 items-center justify-center bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 sm:-mx-12 sm:-my-8 sm:px-0">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-lg animate-fade-in-up-shorter flex-col gap-6"
      >
        <span className="pb-2 text-center text-xl font-semibold">
          Reset password
        </span>
        <Input
          name="password1"
          label="Password"
          type="password"
          placeholder="password"
          value={user.password1}
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
          isAuth
          required
        />
        <Input
          name="password2"
          label="Confirm password"
          type="password"
          placeholder="password"
          value={user.password2}
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
          isAuth
          required
        />
        <Button type="submit" loading={loading}>
          Reset password
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
