"use client";

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard page for demo
    router.push('/dashboard');
  }, [router]);

  return null;
}
