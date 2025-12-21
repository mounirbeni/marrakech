
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prismaClient = new PrismaClient()

const services = [
    // 1. Cultural & Historical Tours
    {
        title: "Historic Medina Guided Walking Tour",
        description: "A guided walk through Marrakech’s old city. Tourists visit Koutoubia Mosque, Bahia Palace, Ben Youssef Madrasa, souks, Rahba Kedima square, and Jemaa el-Fna. It is the easiest way for tourists to understand the medina, navigate safely, and learn history.",
        price: 35,
        images: [],
        category: "Cultural & Historical Tours",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Medina",
        features: ["Local Guide", "Historic Sites", "Walking"],
        included: ["Professional guide", "Entrance fees (optional)"],
        whatToBring: ["Walking shoes", "Water", "Camera"],
        tags: ["History", "Walking", "Culture"]
    },
    {
        title: "Private Marrakech City Tour (Half-Day)",
        description: "A private tour with a licensed guide covering major landmarks such as Majorelle Garden, Saadian Tombs, Mellah, and Bahia Palace. Flexible, customizable, and ideal for families or people with limited time.",
        price: 85,
        images: [],
        category: "Cultural & Historical Tours",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "City Wide",
        features: ["Private Guide", "Flexible", "Transport"],
        included: ["Private guide", "Transport"],
        whatToBring: [],
        tags: ["Private", "City Tour", "Luxury"]
    },

    // 2. Cooking Classes & Food Experiences
    {
        title: "Street Food Night Tour",
        description: "A walk through local food stalls tasting kebabs, fried sweets, olives, fresh juice, and traditional dishes. Tourists love authentic and safe food tours.",
        price: 45,
        images: [],
        category: "Cooking Classes & Food Experiences",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Medina",
        features: ["Tastings", "Night Tour", "Local Guide"],
        included: ["All food tastings", "Drinks"],
        whatToBring: ["Appetite"],
        tags: ["Food", "Night", "Walking"]
    },
    {
        title: "Chef-Led Night Food Tour (Airbnb)",
        description: "A chef guides visitors through hidden alleys and local spots that tourists cannot find alone. High ratings, intimate groups, unique access.",
        price: 60,
        images: [],
        category: "Cooking Classes & Food Experiences",
        rating: 0,
        reviews: 0,
        duration: "3.5 hours",
        location: "Hidden Medina",
        features: ["Chef Guide", "Hidden Spots", "Exclusive"],
        included: ["Food", "Chef commentary"],
        whatToBring: [],
        tags: ["Food", "Exclusive", "Chef"]
    },
    {
        title: "Moroccan Cooking Class + Market Visit",
        description: "Guests visit a souk to buy ingredients, then learn to cook tagine, bread, salads, and mint tea. Hands-on, cultural, and includes a meal.",
        price: 55,
        images: [],
        category: "Cooking Classes & Food Experiences",
        rating: 0,
        reviews: 0,
        duration: "5 hours",
        location: "Riad",
        features: ["Market Visit", "Hands-on", "Lunch"],
        included: ["Ingredients", "Class", "Lunch"],
        whatToBring: [],
        tags: ["Cooking", "Market", "Learning"]
    },
    {
        title: "Chef Khmisa's Home Cooking Class",
        description: "A home-based experience with a Moroccan female chef. Guests cook and dine together. Very personal, authentic, warm hospitality.",
        price: 50,
        images: [],
        category: "Cooking Classes & Food Experiences",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Local Home",
        features: ["Home Cooking", "Female Chef", "Authentic"],
        included: ["Class", "Meal"],
        whatToBring: [],
        tags: ["Cooking", "Home", "Personal"]
    },
    {
        title: "Full Culinary Workshop (Professional Kitchen)",
        description: "A more technical workshop for tourists who want a serious cooking experience. High-quality and professional.",
        price: 80,
        images: [],
        category: "Cooking Classes & Food Experiences",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Culinary School",
        features: ["Professional", "Technical", "Certificate"],
        included: ["Professional instruction", "Materials"],
        whatToBring: [],
        tags: ["Cooking", "Professional", "Workshop"]
    },

    // 3. Spa & Hammam Treatments
    {
        title: "Traditional Hammam & Steam Scrub",
        description: "Black soap scrub, kessa glove exfoliation, steam room, followed by mint tea. Iconic Moroccan ritual.",
        price: 40,
        images: [],
        category: "Spa & Hammam Treatments",
        rating: 0,
        reviews: 0,
        duration: "1.5 hours",
        location: "Medina Spa",
        features: ["Scrub", "Steam", "Tea"],
        included: ["Hammam entry", "Scrub", "Tea"],
        whatToBring: ["Swimwear"],
        tags: ["Spa", "Wellness", "Traditional"]
    },
    {
        title: "Hammam + Argan Oil Full Massage",
        description: "A full spa experience with body wrap, massage, aromatherapy. Relaxation after desert tours and walking.",
        price: 70,
        images: [],
        category: "Spa & Hammam Treatments",
        rating: 0,
        reviews: 0,
        duration: "2.5 hours",
        location: "Medina Spa",
        features: ["Massage", "Aromatherapy", "Relaxation"],
        included: ["Hammam", "Massage", "Products"],
        whatToBring: ["Swimwear"],
        tags: ["Spa", "Massage", "Luxury"]
    },
    {
        title: "Luxury Hammam in a Riad",
        description: "Premium-level hammam in a boutique riad. Instagram-worthy, high service level.",
        price: 110,
        images: [],
        category: "Spa & Hammam Treatments",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Luxury Riad",
        features: ["Private", "Luxury", "Exclusive"],
        included: ["Private hammam", "Treatment", "Drink"],
        whatToBring: ["Swimwear"],
        tags: ["Luxury", "Spa", "Private"]
    },

    // 4. Day Trips from Marrakech
    {
        title: "Atlas Mountains & Ourika Valley",
        description: "Berber villages, waterfalls, scenic views, and lunch in a mountain home. Close to Marrakech, safe, great nature.",
        price: 45,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "8 hours",
        location: "Atlas Mountains",
        features: ["Nature", "Berber Culture", "Lunch"],
        included: ["Transport", "Guide", "Lunch"],
        whatToBring: ["Hiking shoes", "Jacket"],
        tags: ["Nature", "Hiking", "Day Trip"]
    },
    {
        title: "Essaouira Day Trip",
        description: "Coastal city, UNESCO port, seafood lunch, artisan market. Cooler weather, chill vibes.",
        price: 40,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "10 hours",
        location: "Essaouira",
        features: ["Beach", "Seafood", "History"],
        included: ["Transport", "Free time"],
        whatToBring: ["Jacket"],
        tags: ["Beach", "Relaxing", "Day Trip"]
    },
    {
        title: "Ouzoud Waterfalls",
        description: "Huge waterfalls, monkeys, boat ride. Adventure + nature.",
        price: 50,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "10 hours",
        location: "Ouzoud",
        features: ["Waterfalls", "Nature", "Monkeys"],
        included: ["Transport", "Guide"],
        whatToBring: ["Walking shoes"],
        tags: ["Nature", "Adventure", "Water"]
    },
    {
        title: "Aït Benhaddou & Ouarzazate",
        description: "Visit the famous movie-set kasbah + Moroccan Hollywood studio. Famous Game of Thrones location.",
        price: 55,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "12 hours",
        location: "Ouarzazate",
        features: ["History", "Movies", "Desert"],
        included: ["Transport", "Guide"],
        whatToBring: ["Sun protection"],
        tags: ["History", "Cinema", "Desert"]
    },
    {
        title: "Ourika Valley Half-Day Trip",
        description: "Short trip for people who don’t want full-day excursions. Easy, affordable.",
        price: 30,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "5 hours",
        location: "Ourika Valley",
        features: ["Quick Trip", "Nature", "Value"],
        included: ["Transport", "Guide"],
        whatToBring: [],
        tags: ["Nature", "Short", "Budget"]
    },
    {
        title: "3-Day Merzouga Sahara Tour",
        description: "Atlas mountains → Dades → Erg Chebbi dunes → camel trekking → desert camp. Bucket-list experience.",
        price: 250,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "3 days",
        location: "Sahara Desert",
        features: ["Dunes", "Camping", "Stars"],
        included: ["Accommodation", "Meals", "Transport"],
        whatToBring: ["Warm clothes", "Toiletries"],
        tags: ["Desert", "Adventure", "Multi-day"]
    },
    {
        title: "Marrakech to Fes Desert Tour",
        description: "Sahara experience ending in Fes. Ideal for people doing a Morocco round trip.",
        price: 280,
        images: [],
        category: "Day Trips from Marrakech",
        rating: 0,
        reviews: 0,
        duration: "3 days",
        location: "Morocco",
        features: ["One-way", "Desert", "Travel"],
        included: ["Transport", "Hotels", "Desret Camp"],
        whatToBring: ["Luggage"],
        tags: ["Travel", "Desert", "Round Trip"]
    },

    // 5. Desert & Adventure Activities
    {
        title: "Quad-Biking in Palm Grove",
        description: "Ride through desert landscapes and Berber villages. Fun, exciting, great photos.",
        price: 40,
        images: [],
        category: "Desert & Adventure Activities",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Palmeraie",
        features: ["Fun", "Adrenaline", "Photos"],
        included: ["Quad bike", "Helmet", "Tea"],
        whatToBring: ["Closed shoes"],
        tags: ["Adventure", "Quad", "Desert"]
    },
    {
        title: "Agafay Desert Quad + Camel + Dinner",
        description: "Sunset quad, camel ride, fire show, Berber music, and dinner. One of the most booked experiences in Marrakech.",
        price: 95,
        images: [],
        category: "Desert & Adventure Activities",
        rating: 0,
        reviews: 0,
        duration: "6 hours",
        location: "Agafay Desert",
        features: ["Sunset", "Dinner", "Show"],
        included: ["Transport", "Activities", "Dinner"],
        whatToBring: ["Jacket"],
        tags: ["Desert", "Evening", "Popular"]
    },
    {
        title: "Sunset Camel Ride in Palmeraie",
        description: "20–30 minute camel trek with tea. Short, inexpensive, family-friendly.",
        price: 25,
        images: [],
        category: "Desert & Adventure Activities",
        rating: 0,
        reviews: 0,
        duration: "2 hours",
        location: "Palmeraie",
        features: ["Family", "Easy", "Budget"],
        included: ["Transfer", "Ride", "Tea"],
        whatToBring: [],
        tags: ["Family", "Animals", "Short"]
    },
    {
        title: "Hot Air Balloon Flight",
        description: "Sunrise flight over Marrakech + Berber breakfast. Premium luxury experience.",
        price: 180,
        images: [],
        category: "Desert & Adventure Activities",
        rating: 0,
        reviews: 0,
        duration: "5 hours",
        location: "Marrakech Sky",
        features: ["Luxury", "Views", "Sunrise"],
        included: ["Flight", "Breakfast", "Certificate"],
        whatToBring: ["Warm clothes", "Camera"],
        tags: ["Luxury", "Flying", "Romance"]
    },
    {
        title: "Paragliding Experience",
        description: "Tandem flight over the Atlas foothills + camel ride. Adventure tourists love it.",
        price: 100,
        images: [],
        category: "Desert & Adventure Activities",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Aguergour",
        features: ["Flying", "Adrenaline", "Views"],
        included: ["Flight", "Transport"],
        whatToBring: ["Sportswear"],
        tags: ["Adventure", "Flying", "Sports"]
    },

    // 6. Handicrafts & Local Workshops
    {
        title: "Pottery Workshop",
        description: "Make clay pottery on a wheel, guided by artisans. Fun and creative for tourists.",
        price: 35,
        images: [],
        category: "Handicrafts & Local Workshops",
        rating: 0,
        reviews: 0,
        duration: "2.5 hours",
        location: "Workshop",
        features: ["Creative", "Hands-on", "Artisan"],
        included: ["Materials", "Lesson"],
        whatToBring: ["Old clothes"],
        tags: ["Art", "Craft", "Family"]
    },
    {
        title: "Arabic Calligraphy Class",
        description: "Learn traditional script with local artist. Unique cultural experience.",
        price: 30,
        images: [],
        category: "Handicrafts & Local Workshops",
        rating: 0,
        reviews: 0,
        duration: "2 hours",
        location: "Medina Studio",
        features: ["Culture", "Art", "Learning"],
        included: ["Materials", "Lesson"],
        whatToBring: [],
        tags: ["Art", "Culture", "Learning"]
    },
    {
        title: "Mosaic Zellige Workshop",
        description: "Create your own Moroccan mosaic tile. Unique souvenir-making activity.",
        price: 45,
        images: [],
        category: "Handicrafts & Local Workshops",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Workshop",
        features: ["Souvenir", "Traditional", "Art"],
        included: ["Materials", "Tile to keep"],
        whatToBring: [],
        tags: ["Art", "Craft", "Souvenir"]
    },

    // 7. Transfers & Driver Services
    {
        title: "Airport Private Transfer",
        description: "Pick-up or drop-off with private driver. Hassle-free transport, high demand.",
        price: 20,
        images: [],
        category: "Transfers & Driver Services",
        rating: 0,
        reviews: 0,
        duration: "30 min",
        location: "Marrakech",
        features: ["Private", "Fast", "Easy"],
        included: ["Car", "Driver", "Luggage help"],
        whatToBring: [],
        tags: ["Transport", "Service", "Convenience"]
    },
    {
        title: "Private Driver for the Day",
        description: "Full-day private car and driver for sightseeing. Flexibility and comfort.",
        price: 100,
        images: [],
        category: "Transfers & Driver Services",
        rating: 0,
        reviews: 0,
        duration: "8 hours",
        location: "City Wide",
        features: ["Flexible", "Comfort", "Private"],
        included: ["Car", "Driver", "Fuel"],
        whatToBring: [],
        tags: ["Transport", "Luxury", "Flexible"]
    },

    // 8. Night Tours & Entertainment
    {
        title: "Marrakech Pub Crawl",
        description: "Nightlife tour with bars and clubs in Gueliz. Safe way to explore nightlife.",
        price: 35,
        images: [],
        category: "Night Tours & Entertainment",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Gueliz",
        features: ["Nightlife", "Social", "Drinks"],
        included: ["Guide", "1 Drink"],
        whatToBring: ["ID"],
        tags: ["Nightlife", "Social", "Party"]
    },
    {
        title: "Private Medina Night Tour",
        description: "Guide shows medina at night, storytellers, food stalls, local cafes. Magical atmosphere, safer with a guide.",
        price: 50,
        images: [],
        category: "Night Tours & Entertainment",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Medina",
        features: ["Night", "Safe", "Atmosphere"],
        included: ["Guide", "Tea"],
        whatToBring: [],
        tags: ["Night", "Culture", "Walking"]
    },
    {
        title: "Gnawa Music & Dinner Experience",
        description: "Dinner + live Gnawa spiritual music. Authentic cultural show.",
        price: 45,
        images: [],
        category: "Night Tours & Entertainment",
        rating: 0,
        reviews: 0,
        duration: "3 hours",
        location: "Medina Restaurant",
        features: ["Music", "Culture", "Dinner"],
        included: ["Dinner", "Show"],
        whatToBring: [],
        tags: ["Culture", "Music", "Dining"]
    },
    {
        title: "Chez Ali Fantasia Dinner Show",
        description: "Famous dinner + horse show + acrobats + traditional dancing. Family-friendly entertainment.",
        price: 70,
        images: [],
        category: "Night Tours & Entertainment",
        rating: 0,
        reviews: 0,
        duration: "4 hours",
        location: "Palmeraie",
        features: ["Show", "Spectacle", "Family"],
        included: ["Dinner", "Show", "Transfer"],
        whatToBring: ["Camera"],
        tags: ["Show", "Family", "Entertainment"]
    },

    // 9. Iconic Attractions & Tickets
    {
        title: "Majorelle Garden Entry Ticket",
        description: "Access to Yves Saint Laurent’s blue garden. Marrakech’s #1 photographed attraction.",
        price: 20,
        images: [],
        category: "Iconic Attractions & Tickets",
        rating: 0,
        reviews: 0,
        duration: "2 hours",
        location: "Gueliz",
        features: ["Gardens", "Photography", "Must-see"],
        included: ["Entry ticket"],
        whatToBring: ["Camera"],
        tags: ["Garden", "Famous", "Sightseeing"]
    },
    {
        title: "YSL Museum Ticket",
        description: "Fashion and design museum near Majorelle. Luxury tourism + design lovers.",
        price: 15,
        images: [],
        category: "Iconic Attractions & Tickets",
        rating: 0,
        reviews: 0,
        duration: "1.5 hours",
        location: "Gueliz",
        features: ["Fashion", "Museum", "Design"],
        included: ["Entry ticket"],
        whatToBring: [],
        tags: ["Museum", "Fashion", "Culture"]
    },
    {
        title: "Bahia Palace Ticket or Guided Tour",
        description: "Historic palace with stunning architecture. A must-see monument.",
        price: 15,
        images: [],
        category: "Iconic Attractions & Tickets",
        rating: 0,
        reviews: 0,
        duration: "1.5 hours",
        location: "Medina",
        features: ["Architecture", "History", "Palace"],
        included: ["Entry ticket"],
        whatToBring: ["Camera"],
        tags: ["History", "Architecture", "Monument"]
    },
    {
        title: "Saadian Tombs Guided Tour",
        description: "Royal tombs with unique Moroccan architecture. One of the oldest historical sites.",
        price: 15,
        images: [],
        category: "Iconic Attractions & Tickets",
        rating: 0,
        reviews: 0,
        duration: "1 hour",
        location: "Kasbah",
        features: ["History", "Architecture", "Tombs"],
        included: ["Guide", "Entry"],
        whatToBring: [],
        tags: ["History", "Monument", "Culture"]
    }
];

async function main() {
    const email = 'admin@marrakech.com'
    const password = 'admin123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN',
            password: hashedPassword
        },
        create: {
            email,
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    })

    console.log({ user })

    // Clean up existing services to avoid duplicates during dev
    await prismaClient.service.deleteMany({});
    console.log("Deleted old services");

    for (const service of services) {
        await prismaClient.service.create({
            data: {
                title: service.title,
                description: service.description,
                price: service.price,
                category: service.category,
                rating: service.rating,
                // reviewCount: service.reviews,
                duration: service.duration,
                location: service.location,

                // Convert arrays/objects to JSON strings for SQLite/Schema compatibility
                images: JSON.stringify(service.images),
                features: JSON.stringify(service.features),
                included: JSON.stringify(service.included),

                // Handle optional keys if they exist in source data, else default
                itinerary: 'itinerary' in service ? JSON.stringify(service.itinerary) : "[]",
                whatToBring: "[]",
                host: "Marrakech Host",
                tags: "[]",
            }
        });
    }

    console.log(`Seeded ${services.length} services`);
}

main()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })
