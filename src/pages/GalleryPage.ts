import { store } from '../context/store';
import mainBouquetImg from '../assets/rose_sketch.png';

export function GalleryPage() {
  const container = document.createElement('div');
  container.className = 'container flex-col h-full';

  const { savedBouquets } = store.getState();

  container.innerHTML = `
    <header class="py-4 flex justify-between items-center px-4">
      <h2 class="text-2xl text-white text-left">My Gallery</h2>
      <button id="home-btn" class="bg-white text-pink-500 p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl border-none">
        🏠
      </button>
    </header>

    <div class="flex-1 overflow-y-auto p-4">
      ${savedBouquets.length === 0 ? `
        <div class="flex-1 flex flex-col items-center justify-center text-white opacity-80 gap-4">
            <span class="text-6xl" style="font-family: var(--font-heading)">empty</span>
            <p class="text-lg">You haven't saved any bouquets yet.</p>
            <button id="create-new-btn" class="mt-4 px-8">Start Creating</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 gap-6">
            ${savedBouquets.map(bouquet => {
                return `
                    <div class="bg-white rounded-3xl p-6 shadow-xl flex gap-6 relative">
                        <div class="w-32 h-32 bg-pink-50 rounded-2xl flex items-center justify-center overflow-hidden">
                            <img src="${mainBouquetImg}" class="w-24 h-24 object-contain" />
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <h3 class="text-left text-pink-600 mb-1">${new Date(bouquet.createdAt).toLocaleDateString()}</h3>
                                <p class="text-xs text-gray-500 line-clamp-2 italic">"${bouquet.message || 'No message'}"</p>
                            </div>
                            <div class="flex gap-2 items-center text-xs text-pink-400 font-bold">
                                <span>${bouquet.flowers.reduce((a, b) => a + b.count, 0)} Flowers</span>
                            </div>
                        </div>
                        <button class="delete-btn absolute top-4 right-4 text-red-300 hover:text-red-500 bg-transparent border-none shadow-none text-2xl p-0 w-auto h-auto min-w-0" style="box-shadow: none; transform: none;" data-id="${bouquet.id}">
                            &times;
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
      `}
    </div>

    <div class="p-4 mt-auto">
      <button id="new-btn" class="w-full py-4 bg-white text-pink-500">
        Create New Bouquet
      </button>
    </div>
  `;

  container.querySelector('#home-btn')?.addEventListener('click', () => {
    store.navigateTo('landing');
  });

  container.querySelector('#new-btn')?.addEventListener('click', () => {
    store.navigateTo('flower-selection');
  });
  
  container.querySelector('#create-new-btn')?.addEventListener('click', () => {
    store.navigateTo('flower-selection');
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      if (confirm('Are you sure you want to delete this bouquet?')) {
        store.deleteBouquet(id);
      }
    });
  });

  return container;
}
