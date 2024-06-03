import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getProfile } from "@/actions/profile";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default async function App({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 60000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="px-6 py-12 h-[calc(100vh-65px-56px)] max-w-screen-xl m-auto w-full box-border">{children}</main>
      <Footer />
    </HydrationBoundary>
  );
}
