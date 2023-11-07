'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { ToastContext } from '@/components/Toast/ToastContext';
import LoadingSpinner from '@/icons/LoadingSpinner';
import supabase from '@/utils/supabase';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

function ForgotPassword() {
  const [user, setUser] = useState({ email: '', password1: '', password2: '' });
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | undefined>();
  const [passwordToggle, setPasswordToggle] = useState(false);
  const { toast } = useContext(ToastContext);
  const router = useRouter();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.split('#')[1]);
    if (hash.size === 0) return setIsValidSession(false);
    const hasToken = hash.get('access_token');
    if (hasToken) return setIsValidSession(true);
    return setIsValidSession(false);
  }, []);

  async function handleSubmit() {
    if (user.password1 !== user.password2)
      return toast({
        type: 'error',
        title: 'Passwords do not match',
        message: 'Passwords must match',
        direction: 'center'
      });

    const localStorageToken =
      typeof window !== undefined &&
      localStorage?.getItem('sb-guerfzlhzjrpooirzvlf-auth-token');
    const token = JSON.parse(localStorageToken || '{}');
    const email = token?.user?.email || '';

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      email,
      password: user.password1
    });

    if (error) {
      setLoading(false);
      return toast({
        type: 'error',
        title: 'Password not reset',
        message:
          error.message ||
          'There was an issue resetting your password. Please try again.',
        direction: 'center'
      });
    }

    setLoading(false);
    toast({
      type: 'success',
      title: 'Password reset',
      message: 'Your password has been reset.',
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
        <div className="relative">
          <Input
            name="password1"
            label="Password"
            type={passwordToggle ? 'text' : 'password'}
            placeholder="password"
            value={user.password1}
            onChange={e =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            minLength={8}
            isAuth
            required
            autoFocus
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
        <div className="relative">
          <Input
            name="password2"
            label="Confirm password"
            type={passwordToggle ? 'text' : 'password'}
            placeholder="password"
            value={user.password2}
            minLength={8}
            onChange={e =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            isAuth
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
        <Button type="submit" loading={loading}>
          Reset password
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
