import { store } from '../context/store';
import { FLOWERS, FONTS } from '../data/assets';
import html2canvas from 'html2canvas';

export function PreviewPage() {
  const container = document.createElement('div');
  container.className = 'container flex-col h-full';

  const { currentBouquet } = store.getState();
  const selectedFont = FONTS.find(f => f.id === currentBouquet.font);

  container.innerHTML = `
    <header class="py-4 text-center">
      <h2 class="text-3xl text-white">Your Bouquet</h2>
      <p class="text-white opacity-90 text-lg mt-1" style="font-family: var(--font-heading)">It looks beautiful!</p>
    </header>

    <div class="flex-1 flex flex-col items-center justify-center p-4">
      <div id="polaroid-card" class="bg-white p-4 pb-12 shadow-polaroid rounded-sm rotate-1 transform transition-transform hover:rotate-0">
        <!-- Flower image area (Square) -->
        <div class="flower-area aspect-square flex items-center justify-center p-4">
            <div class="absolute inset-0 flex flex-wrap justify-center items-end pb-8">
                ${currentBouquet.flowers.length === 0 ? '<p class="text-gray-300 italic">No flowers selected</p>' : ''}
                ${currentBouquet.flowers.map((f, i) => {
                    const flower = FLOWERS.find(fl => fl.id === f.flowerId) || FLOWERS[0];
                    return Array(f.count).fill(0).map((_, j) => `
                        <img src="${flower.image}" class="w-24 h-24 object-contain animate-float" style="margin: -20px; animation-delay: ${(i+j)*0.2}s; transform: rotate(${(i+j)*15 - 30}deg)" />
                    `).join('');
                }).join('')}
            </div>
        </div>

        <!-- Polaroid bottom area -->
        <div class="w-full text-center mt-8 px-2">
            <p class="text-2xl text-gray-700 font-bold leading-tight" style="font-family: ${selectedFont?.family}">
                ${currentBouquet.message || '"Happy Valentine!"'}
            </p>
        </div>
      </div>
    </div>

    <div class="p-4 mt-auto bg-white rounded-t-3xl shadow-lg flex flex-col gap-4">
      <button id="save-btn" class="w-full py-4">
        Save to My Gallery
      </button>
      <div class="grid grid-cols-2 gap-4">
        <button id="download-btn" class="bg-pink-100 text-pink-600 border-pink-200 py-3 text-sm flex items-center justify-center gap-2">
          <span>Download Polaroid</span>
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

  container.querySelector('#download-btn')?.addEventListener('click', async () => {
    const card = container.querySelector('#polaroid-card') as HTMLElement;
    if (!card) return;

    try {
      const originalTransform = card.style.transform;
      card.style.transform = 'none'; // Temporarily remove rotation for clean capture
      
      const canvas = await html2canvas(card, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
        logging: false
      });

      card.style.transform = originalTransform;

      const link = document.createElement('a');
      link.download = `bouquet-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Sorry, could not generate the image. Please try again.');
    }
  });

  return container;
}
