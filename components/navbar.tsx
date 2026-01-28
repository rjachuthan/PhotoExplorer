"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Image, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "CivitAI",
    children: [
      { name: "Images", url: "/", icon: Image },
      { name: "Models", url: "/models", icon: Box },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetTitle className="text-lg font-bold mb-4">photoExplorer</SheetTitle>
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <span className="text-sm font-medium text-muted-foreground mb-2 block">
                    {item.name}
                  </span>
                  {item.children && (
                    <div className="flex flex-col gap-1 ml-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                            pathname === child.url && "bg-accent"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">photoExplorer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigationItems.map((item) => (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {item.children && (
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.url} asChild>
                      <Link href={child.url} className="flex items-center gap-2">
                        <child.icon className="h-4 w-4" />
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
        </nav>

        {/* Avatar placeholder */}
        <div className="ml-auto flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            P
          </div>
        </div>
      </div>
    </header>
  );
}
