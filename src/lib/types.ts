export interface ActivityPackage {
    name: string;
    price: number;
    description: string;
    included: string[];
    notIncluded?: string[];
}

export interface PackageCategory {
    name: string;
    description?: string;
    packages: ActivityPackage[];
}

export interface Activity {
    id: string;
    title: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    image: string;
    duration: string;
    features: string[];
    location: string;
    tags?: string[];
    images?: string[];
    host: {
        name: string;
        image: string;
    };
    description: string;
    included: string[];
    whatToBring: string[];
    itinerary: {
        time: string;
        title: string;
        description: string;
    }[];
    packages?: ActivityPackage[];
    packageCategories?: PackageCategory[];
}
