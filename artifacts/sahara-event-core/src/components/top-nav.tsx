import React from "react";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopNav() {
  const [location] = useLocation();

  return (
    <header className="w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center px-6 sticky top-0 z-50">
      <Link href="/" className="font-serif italic text-primary text-xl font-bold cursor-pointer">
        Sahara Event Core
      </Link>
      
      <nav className="hidden md:flex ml-12 gap-8 h-full">
        <Link href="/" className={`h-full flex items-center text-sm font-medium border-b-2 transition-colors ${location === "/" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          Dashboard
        </Link>
        <Link href="/live-feed" className={`h-full flex items-center text-sm font-medium border-b-2 transition-colors ${location.startsWith("/live-feed") ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          Live Feed
        </Link>
        <Link href="/concierge" className={`h-full flex items-center text-sm font-medium border-b-2 transition-colors ${location.startsWith("/concierge") ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          Concierge
        </Link>
      </nav>

      <div className="ml-auto flex items-center gap-5">
        <Link href="/notifications" className="relative text-muted-foreground hover:text-foreground cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
        </Link>
        <Link href="/live-feed" className="text-muted-foreground hover:text-foreground cursor-pointer">
          <span className="material-symbols-outlined">map</span>
        </Link>
        <Link href="/profile" className="cursor-pointer">
          <Avatar className="w-8 h-8 border border-border hover:border-primary transition-colors">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">AW</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
