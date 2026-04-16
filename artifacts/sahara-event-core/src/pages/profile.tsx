import React, { useState } from "react";
import { SideNav } from "@/components/side-nav";
import { useGetProfile, useUpdateProfile } from "@workspace/api-client-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const { data: profile, refetch } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = (key: keyof typeof updateProfile.variables) => {
    if (!profile) return;
    setIsUpdating(true);
    
    // We cast to any here just for the toggle logic simplification
    const currentVal = (profile as any)[key];
    
    updateProfile.mutate(
      { data: { [key]: !currentVal } },
      {
        onSuccess: () => {
          refetch();
          setIsUpdating(false);
        },
        onError: () => setIsUpdating(false)
      }
    );
  };

  const handleInterestToggle = (interest: string) => {
    if (!profile) return;
    const current = profile.topicInterests || [];
    const updated = current.includes(interest) 
      ? current.filter(i => i !== interest)
      : [...current, interest];
      
    updateProfile.mutate(
      { data: { topicInterests: updated } },
      { onSuccess: () => refetch() }
    );
  };

  if (!profile) return null;

  return (
    <div className="min-h-[100dvh] bg-background pl-16 flex flex-col">
      <SideNav />
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-8">
        <header className="mb-10">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground">
            Welcome back, {profile.name.split(' ')[0]}.
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-card rounded-[1.5rem] border border-border p-8 shadow-sm flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 border-4 border-primary mb-6 shadow-sm">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-serif">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-serif text-2xl font-medium mb-1">{profile.name}</h2>
              <p className="text-secondary text-sm mb-2">{profile.tier} Member</p>
              <p className="text-xs font-mono text-secondary/60 bg-background px-3 py-1 rounded mb-6 border border-border">ID: {profile.guestId}</p>
              
              <div className="w-full flex flex-col gap-3">
                <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm">
                  Edit Account
                </button>
                <button className="w-full py-3 border-2 border-border text-foreground rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-background transition-colors">
                  Export Event Pass
                </button>
              </div>
            </div>

            <div className="bg-card rounded-[1.5rem] border border-border p-6 shadow-sm">
              <h3 className="font-serif text-xl font-medium mb-6">Accessibility</h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Wheelchair Routes</div>
                    <div className="text-xs text-secondary mt-0.5">Prioritize ramp & elevator access</div>
                  </div>
                  <Switch 
                    checked={profile.wheelchairRoutes} 
                    onCheckedChange={() => handleToggle('wheelchairRoutes')}
                    disabled={isUpdating}
                  />
                </div>
                <div className="h-px bg-border/50 w-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Assistive Listening</div>
                    <div className="text-xs text-secondary mt-0.5">Enable venue audio casting</div>
                  </div>
                  <Switch 
                    checked={profile.assistiveListening} 
                    onCheckedChange={() => handleToggle('assistiveListening')}
                    disabled={isUpdating}
                  />
                </div>
                <div className="h-px bg-border/50 w-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Reduced Sensory Zones</div>
                    <div className="text-xs text-secondary mt-0.5">Alerts for quiet areas</div>
                  </div>
                  <Switch 
                    checked={profile.reducedSensoryZones} 
                    onCheckedChange={() => handleToggle('reducedSensoryZones')}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-card rounded-[1.5rem] border border-border overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Primary Location</span>
                </div>
                <h3 className="font-serif text-3xl font-medium mb-2">{profile.venue}</h3>
                <p className="text-secondary text-sm mb-8">
                  Section {profile.section} • Row {profile.row} • Seat {profile.seat}
                </p>
                <div className="flex gap-3 mt-auto">
                  <button className="px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors">
                    Get Directions
                  </button>
                  <button className="px-5 py-2.5 border border-border text-foreground rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-background transition-colors">
                    Change Seat
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-[#1a1208] min-h-[240px] relative">
                 <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_#c2652a_0%,_transparent_60%)] mix-blend-screen"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>

            <div className="bg-card rounded-[1.5rem] border border-border p-8 shadow-sm">
              <h3 className="font-serif text-xl font-medium mb-2">Catering Preferences</h3>
              <p className="text-sm text-secondary mb-6">Your curated flavor profile informs our recommendations.</p>
              
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {profile.cateringPreferences?.map((pref, i) => (
                  <div key={i} className="flex-shrink-0 w-48 bg-background border border-border rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="h-24 bg-gradient-to-br from-[#e08850]/40 to-[#c2652a]/40 relative"></div>
                    <div className="p-3 text-center">
                      <span className="text-sm font-medium text-foreground">{pref}</span>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-48 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-background transition-colors">
                  <span className="text-secondary font-medium text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span> Add Filter
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-[1.5rem] border border-border p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-xl font-medium mb-1">Topic Interests</h3>
                  <p className="text-sm text-secondary">Tailor your live feed alerts.</p>
                </div>
                <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Add Interest
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {["Match Statistics", "Behind the Scenes", "VIP Interviews", "Merchandise Drops", "Player Warmups", "Halftime Show"].map(topic => {
                  const isActive = profile.topicInterests?.includes(topic);
                  return (
                    <button 
                      key={topic}
                      onClick={() => handleInterestToggle(topic)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                        isActive 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background text-secondary border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
