import React, { useState } from "react";
import { SideNav } from "@/components/side-nav";
import { useGetVendors, useGetPickupWindows, usePlaceOrder } from "@workspace/api-client-react";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Concierge() {
  const [activeCategory, setActiveCategory] = useState("All Vendors");
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  
  const { data: vendors } = useGetVendors({ category: activeCategory === "All Vendors" ? undefined : activeCategory });
  const { data: pickupWindows } = useGetPickupWindows();
  const placeOrder = usePlaceOrder();
  const { toast } = useToast();

  const categories = ["All Vendors", "Gujarati Thali", "Street Food", "Artisan Coffee", "Gourmet Deli", "Patisserie", "Fine Spirits"];

  const handleOrder = () => {
    if (!selectedVendor) return;
    
    placeOrder.mutate(
      { data: { vendorId: selectedVendor, items: [{ menuItemId: "demo-item", quantity: 1 }] } },
      {
        onSuccess: () => {
          setSelectedVendor(null);
          toast({
            title: "Order Placed Successfully",
            description: "Your curated selection is being prepared.",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[100dvh] bg-background pl-16 flex flex-col">
      <SideNav />
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8 flex gap-8">
        <div className="flex-1 flex flex-col">
          <header className="mb-10">
            <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground">
              Curation of <span className="italic text-primary">Flavors.</span>
            </h1>
            <p className="text-secondary mt-3 text-lg">Frictionless dining. Skip the wait, savor the moment.</p>
          </header>

          {/* AI Intelligence / Pickup Windows */}
          <div className="mb-10 bg-card rounded-[1.5rem] border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded">AI Intelligence</span>
              <h3 className="font-serif text-lg font-medium">Optimal Pickup Windows</h3>
            </div>
            <div className="h-32 w-full">
              {pickupWindows && pickupWindows.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pickupWindows}>
                    <XAxis dataKey="timeLabel" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#78706a' }} dy={10} />
                    <Bar dataKey="busynessLevel" radius={[4, 4, 0, 0]}>
                      {pickupWindows.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isOptimal ? '#c2652a' : '#d8d0c8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary text-sm">Loading insights...</div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-transparent text-foreground border-border hover:border-primary/50 hover:bg-card"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {vendors?.map(vendor => (
              <div key={vendor.id} className="bg-card rounded-[1.5rem] border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-40 w-full bg-[#1a1208] relative overflow-hidden">
                   <img src="/food.png" alt="Gujarati Food" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity brightness-110" />
                   <div className="absolute inset-0 opacity-80 mix-blend-color bg-gradient-to-br from-[#e08850] to-[#c2652a]"></div>
                   <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent)]"></div>
                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold flex items-center gap-1 border border-white/10 shadow-sm z-10">
                     ⭐ {vendor.rating}
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-medium">{vendor.name}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-background rounded text-secondary">{vendor.waitMinutes}m Wait</span>
                  </div>
                  <div className="text-sm text-secondary mb-4">{vendor.category} • {vendor.zone}</div>
                  
                  {vendor.waitTrend && (
                    <div className="flex items-center gap-1.5 text-xs text-primary mb-6">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                        {vendor.waitTrend === 'decreasing' ? 'trending_down' : vendor.waitTrend === 'increasing' ? 'trending_up' : 'trending_flat'}
                      </span>
                      {vendor.waitTrend === 'decreasing' ? 'Wait Time Decreasing' : vendor.waitTrend === 'increasing' ? 'Peak Expected Soon' : 'Wait Time Stable'}
                    </div>
                  )}
                  
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button className="py-2.5 rounded-lg border border-border text-sm font-bold uppercase tracking-wider text-secondary hover:text-foreground hover:bg-background transition-colors">
                      Menu
                    </button>
                    <button 
                      onClick={() => setSelectedVendor(vendor.id)}
                      className="py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      Order Ahead
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State / Ask AI */}
            <div className="bg-transparent border-2 border-dashed border-border rounded-[1.5rem] p-6 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors cursor-pointer min-h-[300px]">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">restaurant</span>
              <h3 className="font-serif text-xl font-medium mb-2">Craving something else?</h3>
              <p className="text-sm text-secondary mb-6">Let our AI Concierge find exactly what you're looking for.</p>
              <button className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>auto_awesome</span> Ask AI Concierge
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Daily Special */}
        <div className="w-80 hidden lg:block flex-shrink-0">
           <div className="sticky top-8 bg-primary rounded-[1.5rem] text-primary-foreground p-6 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
             <div className="relative z-10">
               <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2 block">Featured Selection</span>
               <h3 className="font-serif text-3xl font-medium mb-4">The Reserve Tasting Flight</h3>
               <p className="text-sm opacity-90 mb-8 leading-relaxed">
                 A curated flight of our rarest spirits, accompanied by artisanal dark chocolate pairings. Available exclusively in the Grand Lounge.
               </p>
               <button className="w-full py-3 bg-white text-primary rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm hover:bg-white/90 transition-colors">
                 Reserve Now
               </button>
             </div>
           </div>
        </div>
      </main>

      <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Confirm Order</DialogTitle>
            <DialogDescription className="text-secondary">
              Select an optimal pickup window for your order.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 flex flex-col gap-3">
             <button className="w-full p-4 border border-primary bg-primary/5 rounded-xl flex justify-between items-center text-left">
               <div>
                 <div className="font-medium text-foreground text-lg">13:15 – 13:30</div>
                 <div className="text-xs text-primary font-bold uppercase tracking-wider mt-1">Optimal (Low Traffic)</div>
               </div>
               <span className="material-symbols-outlined text-primary">check_circle</span>
             </button>
             <button className="w-full p-4 border border-border rounded-xl flex justify-between items-center text-left hover:bg-background transition-colors">
               <div>
                 <div className="font-medium text-foreground text-lg">13:45 – 14:00</div>
                 <div className="text-xs text-secondary font-medium uppercase tracking-wider mt-1">Moderate Traffic</div>
               </div>
             </button>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <button onClick={() => setSelectedVendor(null)} className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg text-sm font-bold uppercase tracking-wider text-secondary hover:text-foreground hover:bg-background">
              Cancel
            </button>
            <button onClick={handleOrder} className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 shadow-sm">
              Confirm Order
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
