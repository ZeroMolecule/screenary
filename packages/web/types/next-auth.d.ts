import 'next-auth';

declare module 'next-auth' {
  export interface Session {
    token?: string;
  }
}
