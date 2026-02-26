import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- MOCKING LOGIC INTERCEPTOR ---
// This intercepts requests and returns mock data if the backend is unavailable
const MOCK_MENUS = [
    {
        id: 'm1',
        title: 'Grand Wedding Feast',
        category: 'Buffet',
        description: 'A luxurious spread featuring 12 premium items including live counters.',
        itemCount: 12,
        pricePerPlate: 25,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200',
        ],
        additionalImagesCount: 9,
    },
    {
        id: 'm2',
        title: 'Corporate Premium',
        category: 'Lunch Box',
        description: 'Efficient, tasty, and easy to eat meals designed for office meetings.',
        itemCount: 5,
        pricePerPlate: 12,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200&h=200',
        ],
        additionalImagesCount: 3,
    },
    {
        id: 'm3',
        title: 'Birthday Bash',
        category: 'Kids Special',
        description: 'Kid-friendly menu with pizzas, cakes, and fun finger foods.',
        itemCount: 8,
        pricePerPlate: 18,
        status: 'published',
        isPublic: true,
        images: [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200&h=200',
            'https://images.unsplash.com/photo-1578985545062-69928b1ea6e6?auto=format&fit=crop&q=80&w=200&h=200',
        ],
        additionalImagesCount: 6,
    },
    {
        id: 'm4',
        title: 'Evening Snacks',
        category: 'High Tea',
        description: 'Selection of teas, coffees, and light savory snacks.',
        itemCount: 4,
        pricePerPlate: 8,
        status: 'draft',
        isPublic: false,
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200',
            null,
        ],
        additionalImagesCount: 0,
    },
];

let mockMenuStore = [...MOCK_MENUS];

api.interceptors.request.use(async (config) => {
    // If the path relates to /menu, we will interrupt the normal flow by throwing a custom recognizable mock response.
    // Axios will then send it to the response error handler.
    const isMenuEndpoint = config.url.includes('/menu');

    if (isMenuEndpoint) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        if (config.method === 'get') {
            throw { __isMockResponse: true, data: mockMenuStore, status: 200 };
        }
        if (config.method === 'post') {
            const newMenu = {
                ...JSON.parse(config.data),
                id: `m${Date.now()}`,
                status: 'published',
                isPublic: true,
                itemCount: 1, // default mock values
                images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200'],
                additionalImagesCount: 0
            };
            mockMenuStore.push(newMenu);
            throw { __isMockResponse: true, data: newMenu, status: 201 };
        }
        if (config.method === 'put') {
            // url example: /menu/m2
            const id = config.url.split('/').pop();
            const updates = JSON.parse(config.data);
            const index = mockMenuStore.findIndex(m => m.id === id);
            if (index !== -1) {
                mockMenuStore[index] = { ...mockMenuStore[index], ...updates };
                throw { __isMockResponse: true, data: mockMenuStore[index], status: 200 };
            }
        }
        if (config.method === 'delete') {
            const id = config.url.split('/').pop();
            mockMenuStore = mockMenuStore.filter(m => m.id !== id);
            throw { __isMockResponse: true, data: { success: true }, status: 200 };
        }
    }
    return config;
});

// Response interceptor to handle global errors OR our custom mock responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Intercept our custom mock responses and resolve them successfully
        if (error.__isMockResponse) {
            return Promise.resolve({
                data: error.data,
                status: error.status,
                headers: {},
                config: error.config || {},
                request: {}
            });
        }

        // Handle standard unauthorized errors globally
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login...');
        } else if (error.response && error.response.status === 403) {
            console.error('Forbidden access.');
        } else if (error.response && error.response.status === 500) {
            console.error('Server error.');
        }

        return Promise.reject(error);
    }
);

export default api;
