import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCapIcon } from "@/components/SVGs";
import { IoChatboxEllipses } from "react-icons/io5";
import { GoBellFill } from "react-icons/go";
import NavItem, {NavItemProps} from "@/components/NavItem";
import { getServerSession } from "next-auth/next";
import AutoHome from "@/components/AutoHome";
import Logout from "@/components/Logout";

// const session = { user: { name: "Kau Doe", email: "john@example.com" } };
const NavLinks: NavItemProps[] = [
  { link: "https://theconnect.vercel.app/lobby", icon: <IoChatboxEllipses /> },
  { link: "/feed", icon: <GoBellFill /> },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user && !session) {
    return <AutoHome />;
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <Link href="/feed" className="flex items-center gap-2" prefetch={false}>
          <GraduationCapIcon className="h-6 w-6 text-primary" />
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          {NavLinks.map((item, index) => (
            <NavItem key={index} icon={item.icon} link={item.link} />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-primary/50">
                    {session.user &&
                      session.user.name &&
                      session.user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-popover text-popover-foreground"
            >
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    {session.user &&
                      session.user.name &&
                      session.user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5 leading-none">
                  <div className="font-semibold text-popover-foreground">
                    {session?.user?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-muted" />
              <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                <Link
                  href="/profile"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <Logout>
                <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <div className="h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </Logout>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1 overflow-hidden px-2 py-2 md:px-6 md:py-4">
        {children}
      </main>
    </>
  );
}
