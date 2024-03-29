"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import {GoogleOAuthProvider} from "@react-oauth/google"
import  { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
        <QueryClientProvider client={client}>
            <GoogleOAuthProvider clientId="398020698451-a1s11tgcjduffell5mc0237v777o4788.apps.googleusercontent.com">
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
          </GoogleOAuthProvider>
        </QueryClientProvider>
  );
}