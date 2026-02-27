export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'caterer' | 'user';
    [key: string]: any; // Catch-all for other mock fields for now
}

export interface Dish {
    id: string;
    title: string;
    category: string;
    description: string;
    itemCount: number;
    pricePerPlate: number;
    status: 'published' | 'draft';
    isPublic: boolean;
    images: (string | null)[];
    additionalImagesCount: number;
    cuisine?: string;
    minQuantity?: number;
    dietaryType?: 'veg' | 'non-veg' | 'vegan';
    spiceLevel?: 'mild' | 'medium' | 'hot';
    ingredients?: string[];
}

export interface FoodRequest {
    id: string;
    eventName: string;
    date: string;
    guestCount: number;
    location: string;
    urgency: 'Standard' | 'Urgent' | 'Critical';
    status: 'Open' | 'Pending' | 'Closed';
    dietaryNotes: string;
    [key: string]: any;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface MenuState {
    items: Dish[];
    isLoading: boolean;
    error: string | null;
}

export interface SupportTicket {
    id: string;
    subject: string;
    message: string;
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    userId: string;
    category: string;
    createdAt: string;
}
