import React from "react";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { path: "/", icon: "dashboard", label: "Dashboard" },
  { path: "/live-feed", icon: "explore", label: "Explore" },
  { path: "/concierge", icon: "room_service", label: "Room Service" },
  { path: "/notifications", icon: "notifications", label: "Notifications" },
  { path: "/profile", icon: "account_circle", label: "Profile" },
];

export function SideNav() {
  const [location] = useLocation();

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 z-50">
      <div className="mb-8">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: "28px" }}>
          sensors
        </span>
      </div>
      <nav className="flex-1 w-full flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
          return (
            <Link key={item.path} href={item.path} className={`w-full flex justify-center py-3 relative group ${isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4">
        <Link href="/profile" className="block">
          <Avatar className="w-8 h-8 border-2 border-border cursor-pointer hover:border-primary transition-colors">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">JP</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
