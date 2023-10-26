'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { supabase, setUser } = useContext(AuthContext);

  async function handleSubmit() {
    setError('');
    setLoading(true);
    const res = await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      setLoading(false);
      return setError('Invalid credentials');
    }

    setUser(res.data.user);
    return router.push('/bands');
  }

  return (
    <div className="-mx-4 -my-8 flex h-screen flex-1 items-center justify-center bg-gradient-to-tl from-zinc-850 to-zinc-900 px-4 sm:-mx-12 sm:-my-8 sm:px-0">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-lg animate-fade-in-up-shorter flex-col gap-4"
      >
        <span className="pb-2 text-center text-xl font-semibold">Login</span>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          isAuth
          autoFocus
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          isAuth
          required
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
        {error && <p className="text-center text-sm text-red-400">{error}</p>}
        <p className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-emerald-300 underline hover:text-emerald-200"
          >
            Sign up
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
