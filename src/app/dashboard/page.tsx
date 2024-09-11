//src/app/dashboard/page.tsx

"use client";  
import React from 'react';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';

const DashboardPage = () => {
  const {} = useSession();
  return (
    <div>
      <Header />
      <p>This is the dashboard content.</p>
    </div>
  );
};
export default DashboardPage;
