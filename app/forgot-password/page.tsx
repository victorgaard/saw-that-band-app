'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {}

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
          Forgot password?
        </span>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          isAuth
          autoFocus
          required
        />
        <Button type="submit" loading={loading}>
          Request reset password link
        </Button>
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="text-emerald-300 underline hover:text-emerald-200"
          >
            Go back
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
