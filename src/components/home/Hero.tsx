
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin } from "lucide-react";

export function Hero() {
    return (
        <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />
                {/* Placeholder for actual image - using a rich dark color fallback for now */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1597211661960-e1423301dc50?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 container mx-auto px-4 text-center text-white">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight animate-fade-in-up">
                    Marrakech <span className="text-[var(--color-primary)] italic">Awaits</span>
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide text-white/90">
                    Uncover the secrets of the Red City with our curated collection of authentic experiences, from the Atlas Mountains to the Agafay Desert.
                </p>

                {/* Search Bar Widget */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full max-w-4xl mx-auto flex flex-col md:flex-row gap-2 shadow-2xl">
                    <div className="flex-1 flex items-center bg-white rounded-full px-6 py-3">
                        <MapPin className="text-[var(--color-primary)] w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="What do you want to do?"
                            className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full font-medium"
                        />
                    </div>
                    <div className="flex-1 flex items-center bg-white rounded-full px-6 py-3 mt-2 md:mt-0">
                        <Calendar className="text-[var(--color-primary)] w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="When are you going?"
                            className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 w-full font-medium"
                        />
                    </div>
                    <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white mt-2 md:mt-0 shadow-lg transition-transform hover:scale-105">
                        <Search className="w-5 h-5 mr-2" />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
