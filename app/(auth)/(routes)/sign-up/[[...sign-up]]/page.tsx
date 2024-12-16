'use client'

import { SignUp } from '@clerk/nextjs'
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Check if the page needs to be refreshed based on a condition
    if (!sessionStorage.getItem('pageRefreshed')) {
      sessionStorage.setItem('pageRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  return <SignUp />;
}
