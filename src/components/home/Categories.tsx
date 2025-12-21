
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        id: "desert",
        name: "Agafay Desert",
        image: "https://images.unsplash.com/photo-1681289176311-44755aa615f5?q=80&w=2071&auto=format&fit=crop",
        count: "24 Experiences"
    },
    {
        id: "medina",
        name: "Medina & Souks",
        image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop",
        count: "18 Tours"
    },
    {
        id: "atlas",
        name: "Atlas Mountains",
        image: "https://images.unsplash.com/photo-1549141013-17b5f935047b?q=80&w=2070&auto=format&fit=crop",
        count: "12 Day Trips"
    },
    {
        id: "food",
        name: "Food & Cooking",
        image: "https://images.unsplash.com/photo-1512413348185-ed762c2941fa?q=80&w=2070&auto=format&fit=crop",
        count: "8 Classes"
    },
    {
        id: "hammam",
        name: "Hammam & Spa",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        count: "15 Spas"
    },
    {
        id: "adventure",
        name: "Quad & Buggy",
        image: "https://images.unsplash.com/photo-1531758532450-4baeca54cde2?q=80&w=2070&auto=format&fit=crop",
        count: "10 Adventures"
    }
];

export function Categories() {
    return (
        <section className="py-24 bg-[var(--color-background)]">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-[var(--color-secondary)] mb-4">Curated Collections</h2>
                        <p className="text-[var(--color-foreground)]/70 text-lg max-w-xl font-light">
                            Explore the diverse landscapes and cultural treasures of Marrakech uniquely designed for you.
                        </p>
                    </div>
                    <Link href="/search" className="hidden md:flex items-center text-[var(--color-primary)] font-medium hover:underline">
                        View all collections <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.id} href={`/search?category=${cat.id}`} className="group relative block aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${cat.image})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <span className="text-white/80 text-sm font-medium tracking-wider uppercase mb-1 block">{cat.count}</span>
                                <h3 className="text-white font-serif text-3xl group-hover:translate-x-2 transition-transform duration-300">{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/search" className="inline-flex items-center text-[var(--color-primary)] font-medium">
                        View all collections <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
