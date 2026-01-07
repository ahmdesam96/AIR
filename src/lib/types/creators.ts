export type CreatorCategory =
    | "education"
    | "reviews"
    | "business"
    | "programming"
    | "design"
    | "news";

export type PlatformType = "youtube" | "x" | "linkedin" | "blog" | "newsletter";

export type ContentLevel = "beginner" | "intermediate" | "advanced";

export interface CreatorPlatform {
    type: PlatformType;
    url: string;
    followers?: string;
}

export interface CreatorWork {
    title: string;
    url: string;
    type: "video" | "article" | "thread" | "newsletter";
}

export interface Creator {
    id: string;
    name: {
        ar: string;
        en?: string;
    };
    slug: string;
    badge: "featured" | "normal";
    category: CreatorCategory;
    bio: string;
    bestFor: string[];
    notSuitableFor?: string[];
    topWorks: CreatorWork[];
    language: "ar" | "en" | "mixed";
    level: ContentLevel;
    platforms: CreatorPlatform[];
    location?: {
        country: string;
        city?: string;
    };
    transparency?: {
        sponsors?: boolean;
        disclosures?: string[];
    };
    updatedAt: string;
    image?: string;
}
