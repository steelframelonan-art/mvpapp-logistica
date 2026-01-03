'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para login
    router.push('/login');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-lg text-muted-foreground">Carregando...</p>
    </div>
  );
}
