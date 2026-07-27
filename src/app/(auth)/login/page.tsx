'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/services/authService';
import useAuthStore from '@/store/authStore';
import { LoginRequest } from '@/types/auth';
import { useState } from 'react';
import styles from './login.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setServerError('');
      const response = await login(data);
      loginStore(response.data);
      router.push('/');
    } catch {
      setServerError('Invalid email or password');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              type="email"
              placeholder="you@example.com"
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          {serverError && <p className={styles.serverError}>{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className={styles.link}>
          Don&apos;t have an account? <Link href="/register">Create one</Link>
        </p>
      </div>
    </section>
  );
}
