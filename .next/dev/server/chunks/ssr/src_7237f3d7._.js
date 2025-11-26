module.exports = [
"[project]/src/lib/data/activities-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activities",
    ()=>activities,
    "activitiesData",
    ()=>activitiesData
]);
const activitiesData = {
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
            features: [
                "Sunrise View",
                "Certified Instructor",
                "Meditation"
            ],
            location: "Medina Rooftop",
            tags: [
                "Wellness"
            ],
            host: {
                name: "Yoga Marrakech",
                image: "/localexpert.jpg"
            },
            description: "Awaken your senses with a sunrise yoga session overlooking the Medina. Suitable for all levels, this session combines Hatha flow with guided meditation.",
            included: [
                "Yoga mat",
                "Herbal tea",
                "Water"
            ],
            whatToBring: [
                "Comfortable clothes"
            ],
            itinerary: [
                {
                    time: "07:00",
                    title: "Welcome",
                    description: "Meet & Greet with herbal tea"
                },
                {
                    time: "07:15",
                    title: "Flow",
                    description: "60-minute Yoga Flow"
                },
                {
                    time: "08:15",
                    title: "Relaxation",
                    description: "Meditation & closing"
                }
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
            features: [
                "Luxury Spa",
                "Black Soap Scrub",
                "Argan Massage"
            ],
            location: "Marrakech Medina",
            tags: [
                "Wellness"
            ],
            host: {
                name: "Rooftop Bliss Riad",
                image: "/localexpert.jpg"
            },
            description: "Experience the ancestral ritual of the Moroccan Hammam. Let the steam purify your skin before a vigorous exfoliation and a relaxing Argan oil massage.",
            included: [
                "Bathrobe",
                "Slippers",
                "Underwear",
                "Tea & Pastries"
            ],
            whatToBring: [
                "Swimwear (optional)"
            ],
            itinerary: [
                {
                    time: "Flexible",
                    title: "Arrival",
                    description: "Welcome tea & consultation"
                },
                {
                    time: "Flexible",
                    title: "Treatment",
                    description: "Selected Hammam ritual"
                }
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
                            included: [
                                "Hammam Scrub",
                                "Relaxing or Deep Massage"
                            ],
                            notIncluded: []
                        },
                        {
                            name: "Package Oriental",
                            price: 79.5,
                            description: "105 min: Hammam Body Scrub & Ghassoul Body Mask (45 min) + Relaxing or Deep Massage (60 min)",
                            included: [
                                "Hammam Body Scrub & Mask",
                                "Relaxing or Deep Massage"
                            ],
                            notIncluded: []
                        },
                        {
                            name: "Package Slimming & Body Contouring",
                            price: 89.5,
                            description: "90 min: Hammam Body Mask & Scrub with Blended Coffee (45 min) + Maderotherapy (45 min)",
                            included: [
                                "Hammam Body Mask & Scrub",
                                "Maderotherapy"
                            ],
                            notIncluded: []
                        },
                        {
                            name: "Package Couple Romance",
                            price: 169.5,
                            description: "120 min (Duo): Hammam Black Soap Scrub & Ghassoul Body Mask (45 min) + Full Body Massage (75 min)",
                            included: [
                                "Hammam Scrub & Mask",
                                "Full Body Massage",
                                "For 2 People"
                            ],
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
            features: [
                "Licensed Guide",
                "Skip-the-line",
                "Architecture"
            ],
            location: "Marrakech Medina",
            tags: [
                "City Tours",
                "Culture"
            ],
            host: {
                name: "Heritage Guides",
                image: "/localexpert.jpg"
            },
            description: "Go beyond the main streets. Explore secret communal ovens, historic caravanserais, and the intricate architecture of the Ben Youssef Madrasa.",
            included: [
                "Certified Guide",
                "Entrance fees"
            ],
            whatToBring: [
                "Walking shoes",
                "Water"
            ],
            itinerary: [
                {
                    time: "09:30",
                    title: "Koutoubia",
                    description: "History of the minaret"
                },
                {
                    time: "11:00",
                    title: "Souks",
                    description: "Artisan quarters"
                },
                {
                    time: "12:30",
                    title: "Jemaa el-Fna",
                    description: "Tour conclusion"
                }
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
            features: [
                "Private Tour",
                "Unique Transport",
                "Photo Ops"
            ],
            location: "Gueliz & Medina",
            tags: [
                "City Tours",
                "Adventures"
            ],
            host: {
                name: "Marrakech Insiders",
                image: "/localexpert.jpg"
            },
            description: "Discover Marrakech aboard a vintage sidecar. Zip through the Art Deco district of Gueliz and the ancient ramparts of the Medina in style.",
            included: [
                "Helmet",
                "Driver/Guide",
                "Water"
            ],
            whatToBring: [
                "Sunglasses",
                "Sunscreen"
            ],
            itinerary: [
                {
                    time: "Flexible",
                    title: "Pick-up",
                    description: "Hotel or Riad"
                },
                {
                    time: "Flexible",
                    title: "Ride",
                    description: "Palm Grove & City Walls"
                }
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
            features: [
                "10+ Tastings",
                "Small Group",
                "Dinner Substitute"
            ],
            location: "Old Medina",
            tags: [
                "City Tours",
                "Food & Drink"
            ],
            host: {
                name: "Taste of Morocco",
                image: "/localexpert.jpg"
            },
            description: "Eat like a local. Taste slow-roasted mechanoui lamb, snail soup (optional), fresh olives, msmen pancakes, and sweet chebakia.",
            included: [
                "All food tastings",
                "Bottled water",
                "Tea"
            ],
            whatToBring: [
                "Empty stomach"
            ],
            itinerary: [
                {
                    time: "18:00",
                    title: "Starters",
                    description: "Olives & Nuts"
                },
                {
                    time: "19:00",
                    title: "Main",
                    description: "Mechoui Alley"
                },
                {
                    time: "20:30",
                    title: "Dessert",
                    description: "Spiced Tea on Rooftop"
                }
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
            features: [
                "Botanic Garden",
                "Fashion History",
                "Transfer"
            ],
            location: "Guéliz",
            tags: [
                "City Tours",
                "Culture"
            ],
            host: {
                name: "City Highlights",
                image: "/localexpert.jpg"
            },
            description: "Skip the long lines with pre-booked entry to the stunning Majorelle Garden and the YSL Museum. Includes convenient transport.",
            included: [
                "Transport",
                "Entrance Tickets"
            ],
            whatToBring: [
                "Camera",
                "Hat"
            ],
            itinerary: [
                {
                    time: "09:00",
                    title: "Pickup",
                    description: "From Hotel"
                },
                {
                    time: "09:30",
                    title: "Gardens",
                    description: "Majorelle visit"
                },
                {
                    time: "11:00",
                    title: "Museum",
                    description: "YSL Museum visit"
                }
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
            features: [
                "Stone Desert",
                "Live Music",
                "Fire Eater"
            ],
            location: "Agafay Desert",
            tags: [
                "Adventures",
                "Excursions"
            ],
            host: {
                name: "Desert Magic",
                image: "/localexpert.jpg"
            },
            description: "Escape to the 'Stone Desert' for a magical evening. Ride camels at sunset, then enjoy a traditional Berber feast under the stars with live Gnawa music.",
            included: [
                "Transport",
                "Dinner",
                "Camel Ride",
                "Show"
            ],
            whatToBring: [
                "Jacket (gets cold at night)"
            ],
            itinerary: [
                {
                    time: "16:00",
                    title: "Departure",
                    description: "Heading to desert"
                },
                {
                    time: "17:30",
                    title: "Sunset",
                    description: "Camel ride"
                },
                {
                    time: "19:30",
                    title: "Dinner",
                    description: "Feast & Show"
                }
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
            features: [
                "Waterfalls",
                "Berber House Visit",
                "Nature"
            ],
            location: "High Atlas",
            tags: [
                "Adventures",
                "Excursions"
            ],
            host: {
                name: "Atlas Treks",
                image: "/localexpert.jpg"
            },
            description: "Fresh mountain air, cascading waterfalls at Setti Fatma, and a visit to a traditional Berber home for tea.",
            included: [
                "Transport",
                "Local Guide",
                "Tea visit"
            ],
            whatToBring: [
                "Hiking shoes",
                "Sunscreen"
            ],
            itinerary: [
                {
                    time: "09:00",
                    title: "Start",
                    description: "Scenic drive"
                },
                {
                    time: "11:30",
                    title: "Hike",
                    description: "Walk to waterfalls"
                },
                {
                    time: "13:30",
                    title: "Lunch",
                    description: "Riverside lunch (extra)"
                }
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
            features: [
                "Beach",
                "Seafood",
                "Game of Thrones Site"
            ],
            location: "Atlantic Coast",
            tags: [
                "Excursions"
            ],
            host: {
                name: "Coastal Vibes",
                image: "/localexpert.jpg"
            },
            description: "Visit the windy city of Mogador. Walk the Portuguese ramparts, watch fishermen at the port, and explore art galleries.",
            included: [
                "Transport",
                "Argan Cooperative visit"
            ],
            whatToBring: [
                "Windbreaker",
                "Swimwear"
            ],
            itinerary: [
                {
                    time: "08:00",
                    title: "Depart",
                    description: "Drive to coast"
                },
                {
                    time: "11:00",
                    title: "Explore",
                    description: "Free time in Medina"
                },
                {
                    time: "16:00",
                    title: "Return",
                    description: "Drive back"
                }
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
            features: [
                "Highest Falls",
                "Wild Monkeys",
                "Boat Ride"
            ],
            location: "Middle Atlas",
            tags: [
                "Adventures",
                "Excursions"
            ],
            host: {
                name: "Nature Tours",
                image: "/localexpert.jpg"
            },
            description: "See the highest waterfalls in North Africa (110m). Hike down the olive groves, take a traditional boat ride, and meet wild Barbary macaques.",
            included: [
                "Transport",
                "Mountain Guide"
            ],
            whatToBring: [
                "Walking shoes",
                "Change of clothes"
            ],
            itinerary: [
                {
                    time: "08:00",
                    title: "Pickup",
                    description: "Early start"
                },
                {
                    time: "12:00",
                    title: "Arrival",
                    description: "Hike descent"
                },
                {
                    time: "16:30",
                    title: "Return",
                    description: "Head back"
                }
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
            features: [
                "Off-road",
                "Safety Gear",
                "Tea Break"
            ],
            location: "Palmeraie or Agafay",
            tags: [
                "Adventures"
            ],
            host: {
                name: "Quad Masters",
                image: "/localexpert.jpg"
            },
            description: "Race through the rocky plains of Agafay or the Palm Grove. A high-octane adventure with a pause for mint tea in a Berber village.",
            included: [
                "Quad Bike",
                "Helmet",
                "Goggles",
                "Guide"
            ],
            whatToBring: [
                "Closed shoes",
                "Sunglasses",
                "Long pants"
            ],
            itinerary: [
                {
                    time: "Morning/Afternoon",
                    title: "Briefing",
                    description: "Safety check"
                },
                {
                    time: "Ride",
                    title: "Adventure",
                    description: "2 hours riding"
                }
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
            features: [
                "Bucket List",
                "Berber Breakfast",
                "Flight Cert"
            ],
            location: "Marrakech Sky",
            tags: [
                "Adventures"
            ],
            host: {
                name: "Ciel de Marrakech",
                image: "/localexpert.jpg"
            },
            description: "Drift silently over the desert and olive groves as the sun rises over the Atlas Mountains. Includes a premium Berber breakfast in a royal tent.",
            included: [
                "Pickup (4x4)",
                "1hr Flight",
                "Breakfast"
            ],
            whatToBring: [
                "Warm clothes",
                "Camera"
            ],
            itinerary: [
                {
                    time: "05:00",
                    title: "Pickup",
                    description: "Pre-dawn"
                },
                {
                    time: "06:30",
                    title: "Liftoff",
                    description: "Sunrise flight"
                },
                {
                    time: "08:00",
                    title: "Breakfast",
                    description: "Traditional meal"
                }
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
            features: [
                "Deep Desert",
                "Dades Valley",
                "Starry Night"
            ],
            location: "Sahara Desert",
            tags: [
                "Adventures",
                "Excursions"
            ],
            host: {
                name: "Sahara Experts",
                image: "/localexpert.jpg"
            },
            description: "The ultimate road trip. Cross the High Atlas, visit Ait Ben Haddou, sleep in Dades Valley, and ride camels into the massive Erg Chebbi dunes.",
            included: [
                "Minibus Transport",
                "2 Nights Accommodation",
                "Half Board",
                "Camel Trek"
            ],
            whatToBring: [
                "Backpack",
                "Powerbank",
                "Scarf"
            ],
            itinerary: [
                {
                    time: "Day 1",
                    title: "The Route",
                    description: "Marrakech -> Dades Gorges"
                },
                {
                    time: "Day 2",
                    title: "The Dunes",
                    description: "Dades -> Merzouga Camp"
                },
                {
                    time: "Day 3",
                    title: "Return",
                    description: "Merzouga -> Marrakech"
                }
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
            features: [
                "Market Visit",
                "Hands-on",
                "Lunch Included"
            ],
            location: "Medina Riad",
            tags: [
                "Food & Drink",
                "Culture"
            ],
            host: {
                name: "Chef Fatema",
                image: "/localexpert.jpg"
            },
            description: "Shop for fresh ingredients in the souk, then learn the secrets of spices and slow cooking. Prepare a full meal (Tagine/Couscous) and eat your creation.",
            included: [
                "Ingredients",
                "Apron",
                "Lunch",
                "Recipe Card"
            ],
            whatToBring: [
                "Appetite"
            ],
            itinerary: [
                {
                    time: "10:00",
                    title: "Market",
                    description: "Buying ingredients"
                },
                {
                    time: "11:00",
                    title: "Cooking",
                    description: "Preparation"
                },
                {
                    time: "13:00",
                    title: "Feast",
                    description: "Lunch time"
                }
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
            features: [
                "Creative",
                "Take Home Product",
                "Sensory"
            ],
            location: "Medina Atelier",
            tags: [
                "Culture"
            ],
            host: {
                name: "Aroma Atelier",
                image: "/localexpert.jpg"
            },
            description: "Compose your own signature scent using essential oils like Jasmine, Oud, and Orange Blossom under the guidance of a master perfumer.",
            included: [
                "30ml Perfume Bottle",
                "Workshop"
            ],
            whatToBring: [
                "None"
            ],
            itinerary: [
                {
                    time: "Flexible",
                    title: "Discovery",
                    description: "Smelling notes"
                },
                {
                    time: "Flexible",
                    title: "Creation",
                    description: "Mixing formula"
                }
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
            features: [
                "Kid Friendly",
                "Traditional Art",
                "Clay"
            ],
            location: "Artisan District",
            tags: [
                "Culture"
            ],
            host: {
                name: "Crafts Collective",
                image: "/localexpert.jpg"
            },
            description: "Get your hands dirty at a traditional potter's wheel or learn the geometric art of Zellige (mosaic) assembly.",
            included: [
                "Clay",
                "Tools",
                "Instructor"
            ],
            whatToBring: [
                "Old clothes"
            ],
            itinerary: [
                {
                    time: "09:00",
                    title: "Demo",
                    description: "Technique intro"
                },
                {
                    time: "10:00",
                    title: "Practice",
                    description: "Creating your piece"
                }
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
            features: [
                "Horse Show",
                "Large Group Fun",
                "Folk Music"
            ],
            location: "Palmerarie",
            tags: [
                "Food & Drink",
                "Culture"
            ],
            host: {
                name: "Fantasia Nights",
                image: "/localexpert.jpg"
            },
            description: "A spectacular evening of Moroccan folklore. Watch Berber horsemen perform acrobatic stunts (Fantasia) while enjoying a massive tented dinner.",
            included: [
                "Dinner (Lamb/Couscous)",
                "Show",
                "Transport"
            ],
            whatToBring: [
                "Camera"
            ],
            itinerary: [
                {
                    time: "20:00",
                    title: "Dinner",
                    description: "Musicians visit tables"
                },
                {
                    time: "22:00",
                    title: "Show",
                    description: "Horse powder charge"
                }
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
            features: [
                "24/7 Service",
                "Meet & Greet",
                "AC Vehicle"
            ],
            location: "RAK Airport",
            tags: [
                "Transport"
            ],
            host: {
                name: "Marrakech Shuttle",
                image: "/localexpert.jpg"
            },
            description: "Stress-free transfer to or from Marrakech Menara Airport. Driver waits with a name sign.",
            included: [
                "Private Car/Van",
                "Driver",
                "Wait time"
            ],
            whatToBring: [
                "Flight Number"
            ],
            itinerary: [
                {
                    time: "Flexible",
                    title: "Pickup",
                    description: "Arrival hall"
                }
            ]
        }
    ]
};
const activities = [
    ...activitiesData.healthServices,
    ...activitiesData.cityRoaming,
    ...activitiesData.cityTrips,
    ...activitiesData.workshops,
    ...activitiesData.entertainment,
    ...activitiesData.transfers
];
}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/shared/ActivityCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityCard",
    ()=>ActivityCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contexts$2f$WishlistContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/contexts/WishlistContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function ActivityCard({ activity }) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contexts$2f$WishlistContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWishlist"])();
    const inWishlist = isInWishlist(activity.id);
    const toggleWishlist = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(activity.id);
        } else {
            addToWishlist(activity.id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/experiences/${activity.id}`,
        className: "block h-full group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "h-full flex flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[4/3] overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: activity.image,
                            alt: activity.title,
                            fill: true,
                            className: "object-cover transition-transform duration-700 group-hover:scale-110 dark-mode-image"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 35,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 41,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm", inWishlist ? "bg-primary text-white hover:bg-primary/90" : "bg-white/90 text-foreground hover:bg-white hover:text-primary hover:scale-110"),
                            onClick: toggleWishlist,
                            "aria-label": inWishlist ? "Remove from wishlist" : "Add to wishlist",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4", inWishlist && "fill-current")
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "flex flex-col flex-grow p-5 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 text-amber-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            className: "h-4 w-4 fill-current"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                            lineNumber: 64,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-foreground",
                                            children: activity.rating
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: [
                                                "(",
                                                activity.reviews,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                            lineNumber: 66,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                    lineNumber: 63,
                                    columnNumber: 25
                                }, this),
                                activity.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                            lineNumber: 70,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "line-clamp-1 text-xs",
                                            children: activity.location
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                            lineNumber: 71,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                    lineNumber: 69,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-serif font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2",
                            children: activity.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground text-sm line-clamp-2 leading-relaxed",
                            children: activity.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto pt-4 flex items-center gap-4 text-sm text-muted-foreground",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "h-3.5 w-3.5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        children: activity.duration
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                        lineNumber: 87,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardFooter"], {
                    className: "p-5 pt-0 flex items-center justify-between border-t border-border/50 mt-auto bg-secondary/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] uppercase tracking-wider text-muted-foreground font-bold",
                                    children: "Starting from"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xl font-bold text-primary",
                                    children: [
                                        activity.price,
                                        " €"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                                    lineNumber: 95,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            className: "rounded-full px-6 font-medium shadow-md group-hover:shadow-lg transition-all group-hover:bg-primary/90",
                            children: "Book Now"
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ActivityCard.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/shared/ActivityCard.tsx",
                    lineNumber: 92,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/shared/ActivityCard.tsx",
            lineNumber: 33,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/shared/ActivityCard.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/wishlist/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WishlistPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contexts$2f$WishlistContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/contexts/WishlistContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$activities$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/activities-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ActivityCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/ActivityCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function WishlistPage() {
    const { wishlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contexts$2f$WishlistContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWishlist"])();
    // Filter activities that are in wishlist
    const wishlistActivities = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$activities$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activities"].filter((activity)=>wishlist.includes(activity.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background pt-24 sm:pt-28 pb-12 sm:pb-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8 sm:mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4",
                            children: "My Wishlist"
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 24,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base sm:text-lg text-muted-foreground",
                            children: "Your favorite experiences saved for later"
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 27,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/wishlist/page.tsx",
                    lineNumber: 23,
                    columnNumber: 17
                }, this),
                wishlistActivities.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8",
                            children: [
                                wishlistActivities.length,
                                " ",
                                wishlistActivities.length === 1 ? 'experience' : 'experiences',
                                " saved"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 35,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
                            children: wishlistActivities.map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ActivityCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActivityCard"], {
                                    activity: activity
                                }, activity.id, false, {
                                    fileName: "[project]/src/app/wishlist/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 38,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/wishlist/page.tsx",
                    lineNumber: 34,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12 sm:py-16 px-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: "h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/src/app/wishlist/page.tsx",
                                lineNumber: 47,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 46,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl sm:text-2xl font-bold mb-3",
                            children: "Your wishlist is empty"
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 49,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto",
                            children: "Start adding experiences you love by clicking the heart icon on any activity card"
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 50,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/experiences",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                size: "lg",
                                className: "rounded-full",
                                children: "Browse Experiences"
                            }, void 0, false, {
                                fileName: "[project]/src/app/wishlist/page.tsx",
                                lineNumber: 54,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/wishlist/page.tsx",
                            lineNumber: 53,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/wishlist/page.tsx",
                    lineNumber: 45,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/wishlist/page.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/wishlist/page.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_7237f3d7._.js.map