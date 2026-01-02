export interface Flower {
    id: string;
    name: string;
    image: string;
    color: string;
}

export interface Vase {
    id: string;
    name: string;
    image: string;
}

export interface Bouquet {
    id: string;
    flowers: { flowerId: string; count: number }[];
    vaseId: string;
    message: string;
    font: string;
    createdAt: number;
}

class Store {
    private state: {
        currentBouquet: Bouquet;
        savedBouquets: Bouquet[];
        currentPage: string;
    };

    private listeners: (() => void)[] = [];

    constructor() {
        this.state = {
            currentBouquet: this.getEmptyBouquet(),
            savedBouquets: JSON.parse(localStorage.getItem('savedBouquets') || '[]'),
            currentPage: 'landing'
        };
    }

    getEmptyBouquet(): Bouquet {
        return {
            id: crypto.randomUUID(),
            flowers: [],
            vaseId: 'default',
            message: '',
            font: 'Inter',
            createdAt: Date.now()
        };
    }

    getState() {
        return this.state;
    }

    setState(newState: Partial<typeof this.state>) {
        this.state = { ...this.state, ...newState };
        this.notify();
        this.persist();
    }

    updateCurrentBouquet(update: Partial<Bouquet>) {
        this.state.currentBouquet = { ...this.state.currentBouquet, ...update };
        this.notify();
    }

    addFlower(flowerId: string) {
        const existing = this.state.currentBouquet.flowers.find(f => f.flowerId === flowerId);
        if (existing) {
            existing.count++;
        } else {
            this.state.currentBouquet.flowers.push({ flowerId, count: 1 });
        }
        this.notify();
    }

    removeFlower(flowerId: string) {
        const existing = this.state.currentBouquet.flowers.find(f => f.flowerId === flowerId);
        if (existing && existing.count > 0) {
            existing.count--;
            if (existing.count === 0) {
                this.state.currentBouquet.flowers = this.state.currentBouquet.flowers.filter(f => f.flowerId !== flowerId);
            }
        }
        this.notify();
    }

    saveBouquet() {
        this.state.savedBouquets.push({ ...this.state.currentBouquet, createdAt: Date.now() });
        this.state.currentBouquet = this.getEmptyBouquet();
        this.persist();
        this.notify();
    }

    deleteBouquet(id: string) {
        this.state.savedBouquets = this.state.savedBouquets.filter(b => b.id !== id);
        this.persist();
        this.notify();
    }

    private persist() {
        localStorage.setItem('savedBouquets', JSON.stringify(this.state.savedBouquets));
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach(l => l());
    }

    navigateTo(page: string) {
        this.setState({ currentPage: page });
        window.location.hash = page;
    }
}

export const store = new Store();
