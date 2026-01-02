import { store } from '../context/store';
import { FLOWERS } from '../data/assets';

export function FlowerSelectionPage() {
    const container = document.createElement('div');
    container.className = 'container flex-col h-full';

    const { currentBouquet } = store.getState();

    container.innerHTML = `
    <header class="py-4">
      <h2 class="text-2xl text-white">Choose Your Flowers</h2>
      <p class="text-white opacity-80 text-sm italic">Select the blooms for your bouquet</p>
    </header>

    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid grid-cols-2 gap-4">
        ${FLOWERS.map(flower => {
        const count = currentBouquet.flowers.find(f => f.flowerId === flower.id)?.count || 0;
        return `
            <div class="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center gap-2">
              <img src="${flower.image}" alt="${flower.name}" class="w-32 h-32 object-contain" />
              <p class="font-bold text-sm">${flower.name}</p>
              <div class="flex items-center gap-4 mt-2">
                <button class="remove-btn bg-gray-200 text-gray-800 p-1 rounded-full w-8 h-8 flex items-center justify-center shadow-none text-sm" data-id="${flower.id}">-</button>
                <span class="font-bold">${count}</span>
                <button class="add-btn bg-pink-500 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center shadow-none text-sm" data-id="${flower.id}">+</button>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    </div>

    <div class="p-4 mt-auto bg-white rounded-t-3xl shadow-lg flex flex-col gap-4">
      <div class="flex justify-between items-center text-sm">
        <span>Total Flowers: </span>
        <span class="font-bold">${currentBouquet.flowers.reduce((acc, f) => acc + f.count, 0)}</span>
      </div>
      <button id="next-btn" class="w-full py-4" ${currentBouquet.flowers.length === 0 ? 'disabled' : ''}>
        Write a Message
      </button>
      <button id="back-btn" class="bg-transparent border-none shadow-none text-gray-400 py-1 text-sm underline">
        Back to Home
      </button>
    </div>
  `;

    container.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id!;
            store.addFlower(id);
        });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id!;
            store.removeFlower(id);
        });
    });

    container.querySelector('#next-btn')?.addEventListener('click', () => {
        store.navigateTo('message');
    });

    container.querySelector('#back-btn')?.addEventListener('click', () => {
        store.navigateTo('landing');
    });

    return container;
}
