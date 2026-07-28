'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register as registerUser } from '@/services/authService';
import useAuthStore from '@/store/authStore';
import { RegisterRequest } from '@/types/auth';
import { useState } from 'react';
import styles from './register.module.scss';

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    console.log('Submitting:', data);
    try {
      setServerError('');
      const response = await registerUser(data);
      login(response.data);
      router.push('/');
    } catch (error: any) {
      console.error('Register error:', error);
      setServerError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>Get started for free</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label>Full name</label>
            <input
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              type="text"
              placeholder="John Doe"
            />
            {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
          </div>

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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className={styles.link}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
