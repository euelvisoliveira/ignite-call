//arquivo especifico para definições de tipos, ele server para eu sobrescrever tipagens de bibliotecas.

import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar_url: string;
  }

  interface Session {
    user: User
  }
}