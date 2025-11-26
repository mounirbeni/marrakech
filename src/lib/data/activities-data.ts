import { Activity } from "@/lib/types";

export const activitiesData: Record<string, Activity[]> = {
    healthServices: [
        {
            id: "h-01",
            title: "Rooftop Sunrise Yoga & Wellness",
            price: 20,
            rating: 4.9,
            reviews: 55,
            category: "Health Services",
            image: "/Rooftop Sunrise Yoga & Wellness in Marrakech.jpg",
            duration: "1.5 hours",
            features: ["Sunrise View", "Certified Instructor", "Meditation"],
            location: "Medina Rooftop",
            tags: ["Wellness"],
            host: { name: "Yoga Marrakech", image: "/localexpert.jpg" },
            description: "Awaken your senses with a sunrise yoga session overlooking the Medina. Suitable for all levels, this session combines Hatha flow with guided meditation.",
            included: ["Yoga mat", "Herbal tea", "Water"],
            whatToBring: ["Comfortable clothes"],
            itinerary: [
                { time: "07:00", title: "Welcome", description: "Meet & Greet with herbal tea" },
                { time: "07:15", title: "Flow", description: "60-minute Yoga Flow" },
                { time: "08:15", title: "Relaxation", description: "Meditation & closing" }
            ]
        },
        {
            id: "h-02",
            title: "Royal Moroccan Hammam & Spa Ritual",
            price: 45,
            rating: 4.9,
            reviews: 120,
            category: "Health Services",
            image: "/Royal Moroccan Hammam & Spa Ritual.jpg",
            duration: "Variable",
            features: ["Luxury Spa", "Black Soap Scrub", "Argan Massage"],
            location: "Marrakech Medina",
            tags: ["Wellness"],
            host: { name: "Rooftop Bliss Riad", image: "/localexpert.jpg" },
            description: "Experience the ancestral ritual of the Moroccan Hammam. Let the steam purify your skin before a vigorous exfoliation and a relaxing Argan oil massage.",
            included: ["Bathrobe", "Slippers", "Underwear", "Tea & Pastries"],
            whatToBring: ["Swimwear (optional)"],
            itinerary: [
                { time: "Flexible", title: "Arrival", description: "Welcome & consultation" },
                { time: "Flexible", title: "Treatment", description: "Selected Hammam ritual" },
                { time: "Flexible", title: "Relaxation", description: "Mint tea & pastries" }
            ],
            packageCategories: [
                {
                    name: "PACKAGES COMBINATION",
                    description: "Special combo packages for the ultimate spa experience",
                    packages: [
                        {
                            name: "Package Oriental Express",
                            price: 65,
                            description: "75 min: Hammam Scrub (30 min) & Relaxing or Deep Massage (45 min)",
                            included: ["Hammam Scrub", "Relaxing or Deep Massage"],
                            notIncluded: []
                        },
                        {
                            name: "Package Oriental",
                            price: 79.5,
                            description: "105 min: Hammam Body Scrub & Ghassoul Body Mask (45 min) + Relaxing or Deep Massage (60 min)",
                            included: ["Hammam Body Scrub & Mask", "Relaxing or Deep Massage"],
                            notIncluded: []
                        },
                        {
                            name: "Package Slimming & Body Contouring",
                            price: 89.5,
                            description: "90 min: Hammam Body Mask & Scrub with Blended Coffee (45 min) + Maderotherapy (45 min)",
                            included: ["Hammam Body Mask & Scrub", "Maderotherapy"],
                            notIncluded: []
                        },
                        {
                            name: "Package Couple Romance",
                            price: 169.5,
                            description: "120 min (Duo): Hammam Black Soap Scrub & Ghassoul Body Mask (45 min) + Full Body Massage (75 min)",
                            included: ["Hammam Scrub & Mask", "Full Body Massage", "For 2 People"],
                            notIncluded: []
                        }
                    ]
                }
            ]
        }
    ],
    cityRoaming: [
        {
            id: "cr-01",
            title: "Hidden Gems of the Medina: Walking Tour",
            price: 25,
            rating: 4.9,
            reviews: 320,
            category: "City Roaming",
            image: "/Hidden Gems of the Medina Walking Tour.jpg",
            duration: "3.5 hours",
            features: ["Licensed Guide", "Skip-the-line", "Architecture"],
            location: "Marrakech Medina",
            tags: ["City Tours", "Culture"],
            host: { name: "Heritage Guides", image: "/localexpert.jpg" },
            description: "Go beyond the main streets. Explore secret communal ovens, historic caravanserais, and the intricate architecture of the Ben Youssef Madrasa.",
            included: ["Certified Guide", "Entrance fees"],
            whatToBring: ["Walking shoes", "Water"],
            itinerary: [
                { time: "09:30", title: "Koutoubia", description: "History of the minaret" },
                { time: "11:00", title: "Souks", description: "Artisan quarters" },
                { time: "12:30", title: "Jemaa el-Fna", description: "Tour conclusion" }
            ]
        },
        {
            id: "cr-02",
            title: "Vintage Sidecar Adventure",
            price: 110,
            rating: 5.0,
            reviews: 85,
            category: "City Roaming",
            image: "/Vintage Sidecar Adventure.jpg",
            duration: "1.5 hours",
            features: ["Private Tour", "Unique Transport", "Photo Ops"],
            location: "Gueliz & Medina",
            tags: ["City Tours", "Adventures"],
            host: { name: "Marrakech Insiders", image: "/localexpert.jpg" },
            description: "Discover Marrakech aboard a vintage sidecar. Zip through the Art Deco district of Gueliz and the ancient ramparts of the Medina in style.",
            included: ["Helmet", "Driver/Guide", "Water"],
            whatToBring: ["Sunglasses", "Sunscreen"],
            itinerary: [
                { time: "Flexible", title: "Pick-up", description: "Hotel or Riad" },
                { time: "Flexible", title: "Ride", description: "Palm Grove & City Walls" }
            ]
        },
        {
            id: "cr-03",
            title: "Ultimate Street Food Tasting Trail",
            price: 35,
            rating: 4.9,
            reviews: 210,
            category: "City Roaming",
            image: "/Ultimate Street Food Tasting Trail.jpg",
            duration: "3 hours",
            features: ["10+ Tastings", "Small Group", "Dinner Substitute"],
            location: "Old Medina",
            tags: ["City Tours", "Food & Drink"],
            host: { name: "Taste of Morocco", image: "/localexpert.jpg" },
            description: "Eat like a local. Taste slow-roasted mechanoui lamb, snail soup (optional), fresh olives, msmen pancakes, and sweet chebakia.",
            included: ["All food tastings", "Bottled water", "Tea"],
            whatToBring: ["Empty stomach"],
            itinerary: [
                { time: "18:00", title: "Starters", description: "Olives & Nuts" },
                { time: "19:00", title: "Main", description: "Mechoui Alley" },
                { time: "20:30", title: "Dessert", description: "Spiced Tea on Rooftop" }
            ]
        },
        {
            id: "cr-04",
            title: "Yves Saint Laurent & Majorelle Garden VIP",
            price: 40,
            rating: 4.8,
            reviews: 400,
            category: "City Roaming",
            image: "/Yves Saint Laurent & Majorelle Garden VIP.jpg",
            duration: "3 hours",
            features: ["Botanic Garden", "Fashion History", "Transfer"],
            location: "Guéliz",
            tags: ["City Tours", "Culture"],
            host: { name: "City Highlights", image: "/localexpert.jpg" },
            description: "Skip the long lines with pre-booked entry to the stunning Majorelle Garden and the YSL Museum. Includes convenient transport.",
            included: ["Transport", "Entrance Tickets"],
            whatToBring: ["Camera", "Hat"],
            itinerary: [
                { time: "09:00", title: "Pickup", description: "From Hotel" },
                { time: "09:30", title: "Gardens", description: "Majorelle visit" },
                { time: "11:00", title: "Museum", description: "YSL Museum visit" }
            ]
        }
    ],
    cityTrips: [
        {
            id: "ct-01",
            title: "Agafay Desert: Sunset, Camel & Dinner Show",
            price: 55,
            rating: 4.8,
            reviews: 600,
            category: "City Trips & Excursions",
            image: "/Agafay Desert Sunset, Camel & Dinner Show show something luxury.jpg",
            duration: "6 hours",
            features: ["Stone Desert", "Live Music", "Fire Eater"],
            location: "Agafay Desert",
            tags: ["Adventures", "Excursions"],
            host: { name: "Desert Magic", image: "/localexpert.jpg" },
            description: "Escape to the 'Stone Desert' for a magical evening. Ride camels at sunset, then enjoy a traditional Berber feast under the stars with live Gnawa music.",
            included: ["Transport", "Dinner", "Camel Ride", "Show"],
            whatToBring: ["Jacket (gets cold at night)"],
            itinerary: [
                { time: "16:00", title: "Departure", description: "Heading to desert" },
                { time: "17:30", title: "Sunset", description: "Camel ride" },
                { time: "19:30", title: "Dinner", description: "Feast & Show" }
            ]
        },
        {
            id: "ct-02",
            title: "Atlas Mountains & Ourika Valley Day Trip",
            price: 30,
            rating: 4.7,
            reviews: 450,
            category: "City Trips & Excursions",
            image: "/Atlas Mountains & Ourika Valley Day Trip.jpg",
            duration: "Full Day",
            features: ["Waterfalls", "Berber House Visit", "Nature"],
            location: "High Atlas",
            tags: ["Adventures", "Excursions"],
            host: { name: "Atlas Treks", image: "/localexpert.jpg" },
            description: "Fresh mountain air, cascading waterfalls at Setti Fatma, and a visit to a traditional Berber home for tea.",
            included: ["Transport", "Local Guide", "Tea visit"],
            whatToBring: ["Hiking shoes", "Sunscreen"],
            itinerary: [
                { time: "09:00", title: "Start", description: "Scenic drive" },
                { time: "11:30", title: "Hike", description: "Walk to waterfalls" },
                { time: "13:30", title: "Lunch", description: "Riverside lunch (extra)" }
            ]
        },
        {
            id: "ct-03",
            title: "Essaouira Coastal Escape",
            price: 35,
            rating: 4.9,
            reviews: 300,
            category: "City Trips & Excursions",
            image: "/Essaouira Coastal Escape.jpg",
            duration: "Full Day",
            features: ["Beach", "Seafood", "Game of Thrones Site"],
            location: "Atlantic Coast",
            tags: ["Excursions"],
            host: { name: "Coastal Vibes", image: "/localexpert.jpg" },
            description: "Visit the windy city of Mogador. Walk the Portuguese ramparts, watch fishermen at the port, and explore art galleries.",
            included: ["Transport", "Argan Cooperative visit"],
            whatToBring: ["Windbreaker", "Swimwear"],
            itinerary: [
                { time: "08:00", title: "Depart", description: "Drive to coast" },
                { time: "11:00", title: "Explore", description: "Free time in Medina" },
                { time: "16:00", title: "Return", description: "Drive back" }
            ]
        },
        {
            id: "ct-04",
            title: "Ouzoud Waterfalls: Nature Hike & Boat Ride",
            price: 30,
            rating: 4.8,
            reviews: 280,
            category: "City Trips & Excursions",
            image: "/Ouzoud Waterfalls Nature Hike & Boat Ride.jpg",
            duration: "Full Day",
            features: ["Highest Falls", "Wild Monkeys", "Boat Ride"],
            location: "Middle Atlas",
            tags: ["Adventures", "Excursions"],
            host: { name: "Nature Tours", image: "/localexpert.jpg" },
            description: "See the highest waterfalls in North Africa (110m). Hike down the olive groves, take a traditional boat ride, and meet wild Barbary macaques.",
            included: ["Transport", "Mountain Guide"],
            whatToBring: ["Walking shoes", "Change of clothes"],
            itinerary: [
                { time: "08:00", title: "Pickup", description: "Early start" },
                { time: "12:00", title: "Arrival", description: "Hike descent" },
                { time: "16:30", title: "Return", description: "Head back" }
            ]
        },
        {
            id: "ct-05",
            title: "Quad Biking Adrenaline Rush",
            price: 45,
            rating: 4.8,
            reviews: 250,
            category: "City Trips & Excursions",
            image: "/Quad Biking Adrenaline Rush.jpg",
            duration: "3 hours",
            features: ["Off-road", "Safety Gear", "Tea Break"],
            location: "Palmeraie or Agafay",
            tags: ["Adventures"],
            host: { name: "Quad Masters", image: "/localexpert.jpg" },
            description: "Race through the rocky plains of Agafay or the Palm Grove. A high-octane adventure with a pause for mint tea in a Berber village.",
            included: ["Quad Bike", "Helmet", "Goggles", "Guide"],
            whatToBring: ["Closed shoes", "Sunglasses", "Long pants"],
            itinerary: [
                { time: "Morning/Afternoon", title: "Briefing", description: "Safety check" },
                { time: "Ride", title: "Adventure", description: "2 hours riding" }
            ]
        },
        {
            id: "ct-06",
            title: "Hot Air Balloon: Sunrise Over Atlas",
            price: 160,
            rating: 5.0,
            reviews: 150,
            category: "City Trips & Excursions",
            image: "/Hot Air Balloon Sunrise Over Atlas.jpg",
            duration: "4 hours",
            features: ["Bucket List", "Berber Breakfast", "Flight Cert"],
            location: "Marrakech Sky",
            tags: ["Adventures"],
            host: { name: "Ciel de Marrakech", image: "/localexpert.jpg" },
            description: "Drift silently over the desert and olive groves as the sun rises over the Atlas Mountains. Includes a premium Berber breakfast in a royal tent.",
            included: ["Pickup (4x4)", "1hr Flight", "Breakfast"],
            whatToBring: ["Warm clothes", "Camera"],
            itinerary: [
                { time: "05:00", title: "Pickup", description: "Pre-dawn" },
                { time: "06:30", title: "Liftoff", description: "Sunrise flight" },
                { time: "08:00", title: "Breakfast", description: "Traditional meal" }
            ]
        },
        {
            id: "ct-07",
            title: "3-Day Desert Expedition: Merzouga Dunes",
            price: 180,
            rating: 4.9,
            reviews: 110,
            category: "City Trips & Excursions",
            image: "/3-Day Desert Expedition Merzouga.jpg",
            duration: "3 Days",
            features: ["Deep Desert", "Dades Valley", "Starry Night"],
            location: "Sahara Desert",
            tags: ["Adventures", "Excursions"],
            host: { name: "Sahara Experts", image: "/localexpert.jpg" },
            description: "The ultimate road trip. Cross the High Atlas, visit Ait Ben Haddou, sleep in Dades Valley, and ride camels into the massive Erg Chebbi dunes.",
            included: ["Minibus Transport", "2 Nights Accommodation", "Half Board", "Camel Trek"],
            whatToBring: ["Backpack", "Powerbank", "Scarf"],
            itinerary: [
                { time: "Day 1", title: "The Route", description: "Marrakech -> Dades Gorges" },
                { time: "Day 2", title: "The Dunes", description: "Dades -> Merzouga Camp" },
                { time: "Day 3", title: "Return", description: "Merzouga -> Marrakech" }
            ]
        }
    ],
    workshops: [
        {
            id: "ot-01",
            title: "Master the Tagine: Cooking Class",
            price: 45,
            rating: 5.0,
            reviews: 180,
            category: "Workshops",
            image: "/Master the Tagine Cooking Class.jpg",
            duration: "4 hours",
            features: ["Market Visit", "Hands-on", "Lunch Included"],
            location: "Medina Riad",
            tags: ["Food & Drink", "Culture"],
            host: { name: "Chef Fatema", image: "/localexpert.jpg" },
            description: "Shop for fresh ingredients in the souk, then learn the secrets of spices and slow cooking. Prepare a full meal (Tagine/Couscous) and eat your creation.",
            included: ["Ingredients", "Apron", "Lunch", "Recipe Card"],
            whatToBring: ["Appetite"],
            itinerary: [
                { time: "10:00", title: "Market", description: "Buying ingredients" },
                { time: "11:00", title: "Cooking", description: "Preparation" },
                { time: "13:00", title: "Feast", description: "Lunch time" }
            ]
        },
        {
            id: "ot-02",
            title: "Perfume Making Workshop",
            price: 50,
            rating: 4.8,
            reviews: 40,
            category: "Workshops",
            image: "/Perfume Making Workshop.jpg",
            duration: "2 hours",
            features: ["Creative", "Take Home Product", "Sensory"],
            location: "Medina Atelier",
            tags: ["Culture"],
            host: { name: "Aroma Atelier", image: "/localexpert.jpg" },
            description: "Compose your own signature scent using essential oils like Jasmine, Oud, and Orange Blossom under the guidance of a master perfumer.",
            included: ["30ml Perfume Bottle", "Workshop"],
            whatToBring: ["None"],
            itinerary: [
                { time: "Flexible", title: "Discovery", description: "Smelling notes" },
                { time: "Flexible", title: "Creation", description: "Mixing formula" }
            ]
        },
        {
            id: "ot-03",
            title: "Pottery & Zellige Workshop",
            price: 35,
            rating: 4.7,
            reviews: 65,
            category: "Workshops",
            image: "/Pottery & Zellige Workshop.jpg",
            duration: "3 hours",
            features: ["Kid Friendly", "Traditional Art", "Clay"],
            location: "Artisan District",
            tags: ["Culture"],
            host: { name: "Crafts Collective", image: "/localexpert.jpg" },
            description: "Get your hands dirty at a traditional potter's wheel or learn the geometric art of Zellige (mosaic) assembly.",
            included: ["Clay", "Tools", "Instructor"],
            whatToBring: ["Old clothes"],
            itinerary: [
                { time: "09:00", title: "Demo", description: "Technique intro" },
                { time: "10:00", title: "Practice", description: "Creating your piece" }
            ]
        }
    ],
    entertainment: [
        {
            id: "ot-04",
            title: "Chez Ali Fantasia Dinner Show",
            price: 45,
            rating: 4.6,
            reviews: 200,
            category: "Entertainment",
            image: "/Chez Ali Fantasia Dinner Show.jpg",
            duration: "4 hours",
            features: ["Horse Show", "Large Group Fun", "Folk Music"],
            location: "Palmerarie",
            tags: ["Food & Drink", "Culture"],
            host: { name: "Fantasia Nights", image: "/localexpert.jpg" },
            description: "A spectacular evening of Moroccan folklore. Watch Berber horsemen perform acrobatic stunts (Fantasia) while enjoying a massive tented dinner.",
            included: ["Dinner (Lamb/Couscous)", "Show", "Transport"],
            whatToBring: ["Camera"],
            itinerary: [
                { time: "20:00", title: "Dinner", description: "Musicians visit tables" },
                { time: "22:00", title: "Show", description: "Horse powder charge" }
            ]
        }
    ],
    transfers: [
        {
            id: "ot-05",
            title: "Private Airport Transfer",
            price: 25,
            rating: 5.0,
            reviews: 500,
            category: "Transfers",
            image: "/Private Airport Transfer.jpg",
            duration: "30 min",
            features: ["24/7 Service", "Meet & Greet", "AC Vehicle"],
            location: "RAK Airport",
            tags: ["Transport"],
            host: { name: "Marrakech Shuttle", image: "/localexpert.jpg" },
            description: "Stress-free transfer to or from Marrakech Menara Airport. Driver waits with a name sign.",
            included: ["Private Car/Van", "Driver", "Wait time"],
            whatToBring: ["Flight Number"],
            itinerary: [
                { time: "Flexible", title: "Pickup", description: "Arrival hall" }
            ]
        }
    ]
};

export const activities: Activity[] = [
    ...activitiesData.healthServices,
    ...activitiesData.cityRoaming,
    ...activitiesData.cityTrips,
    ...activitiesData.workshops,
    ...activitiesData.entertainment,
    ...activitiesData.transfers
];