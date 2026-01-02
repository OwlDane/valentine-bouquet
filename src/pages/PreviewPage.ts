import { store } from '../context/store';
import { FLOWERS, FONTS } from '../data/assets';

export function PreviewPage() {
  const container = document.createElement('div');
  container.className = 'container flex-col h-full';

  const { currentBouquet } = store.getState();
  const selectedFont = FONTS.find(f => f.id === currentBouquet.font);

  container.innerHTML = `
    <header class="py-4">
      <h2 class="text-2xl text-white">Your Bouquet</h2>
      <p class="text-white opacity-80 text-sm italic">It looks beautiful!</p>
    </header>

    <div class="flex-1 flex flex-col items-center justify-center p-4">
      <div id="bouquet-preview-card" class="bg-white rounded-3xl p-8 shadow-2xl w-full flex flex-col items-center gap-6 relative overflow-hidden">
        <!-- Floating Flowers area -->
        <div class="relative w-full h-64 flex items-center justify-center">
            <div class="absolute inset-0 flex flex-wrap justify-center items-end pb-12">
                ${currentBouquet.flowers.map((f, i) => {
                    const flower = FLOWERS.find(fl => fl.id === f.flowerId);
                    return Array(f.count).fill(0).map((_, j) => `
                        <img src="${flower?.image}" class="w-16 h-16 object-contain animate-float" style="margin: -10px; animation-delay: ${(i+j)*0.2}s; transform: rotate(${(i+j)*15 - 30}deg)" />
                    `).join('');
                }).join('')}
            </div>
        </div>

        <div class="w-full text-center mt-4">
            <p class="text-lg italic text-gray-700" style="font-family: ${selectedFont?.family}">
                "${currentBouquet.message || 'No message added.'}"
            </p>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-2 bg-pink-100 opacity-50"></div>
        <div class="absolute bottom-0 right-0 p-4">
            <span class="text-pink-200 text-xs font-bold">VALENTINE 2026</span>
        </div>
      </div>
    </div>

    <div class="p-4 mt-auto bg-white rounded-t-3xl shadow-lg flex flex-col gap-4">
      <button id="save-btn" class="w-full py-4">
        Save to My Gallery
      </button>
      <div class="grid grid-cols-2 gap-4">
        <button id="download-btn" class="bg-pink-100 text-pink-600 border-pink-200 py-3 text-sm">
          Download Image
        </button>
        <button id="back-btn" class="bg-gray-100 text-gray-500 border-gray-200 py-3 text-sm">
          Edit Bouquet
        </button>
      </div>
    </div>
  `;

  container.querySelector('#save-btn')?.addEventListener('click', () => {
    store.saveBouquet();
    alert('Bouquet saved to your gallery! ♥');
    store.navigateTo('gallery');
  });

  container.querySelector('#back-btn')?.addEventListener('click', () => {
    store.navigateTo('message');
  });

  container.querySelector('#download-btn')?.addEventListener('click', () => {
    // Basic implementation: print the card area
    // In a real scenario we'd use html2canvas
    alert('Download functionality would capture the preview card as an image!');
  });

  return container;
}
