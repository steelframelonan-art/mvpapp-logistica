import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Se é rota pública, permite acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Para rotas protegidas, redireciona para login se não autenticado
  // (verificação real será feita no cliente com Supabase)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|lasy-bridge.js).*)'],
};
