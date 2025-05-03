import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { HeartFilledIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href={siteConfig.links.root}
          title="heroui.com homepage"
        >
          <span>
            <HeartFilledIcon className="text-danger" />
          </span>
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Node-Global-Listener</p>
        </Link>
      </footer>
    </div>
  );
}
