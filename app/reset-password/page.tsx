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
  const [password, setPassword] = useState({ password1: '', password2: '' });
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | undefined>();
  const [passwordToggle, setPasswordToggle] = useState(false);
  const { toast } = useContext(ToastContext);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async event => {
      if (event == 'PASSWORD_RECOVERY') {
        return setIsValidSession(true);
      }
    });

    return setIsValidSession(false);
  }, []);

  async function handleSubmit() {
    if (password.password1 !== password.password2)
      return toast({
        type: 'error',
        title: 'Passwords do not match',
        message: 'Passwords must match',
        direction: 'center'
      });

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password.password1
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
      <div className="-mx-4 -my-8 flex h-[100dvh] flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 text-sm sm:-mx-12 sm:-my-8 sm:h-screen sm:px-0">
        <LoadingSpinner />
      </div>
    );

  if (isValidSession === false)
    return (
      <div className="-mx-4 -my-8 flex h-[100dvh] flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 text-sm sm:-mx-12 sm:-my-8 sm:h-screen sm:px-0">
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
    <div className="-mx-4 -my-8 flex h-[100dvh] flex-1 items-center justify-center bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 sm:-mx-12 sm:-my-8 sm:h-screen sm:px-0">
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
            value={password.password1}
            onChange={e =>
              setPassword({ ...password, [e.target.name]: e.target.value })
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
            value={password.password2}
            minLength={8}
            onChange={e =>
              setPassword({ ...password, [e.target.name]: e.target.value })
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
