import { store } from '../context/store';
import mainBouquetImg from '../assets/rose_sketch.png';

export function LandingPage() {
    const container = document.createElement('div');
    container.className = 'container items-center justify-center text-center';

    container.innerHTML = `
    <div class="flex flex-col items-center gap-8 animate-float">
      <div class="relative w-64 h-64 flex items-center justify-center">
        <img src="${mainBouquetImg}" alt="Valentine Bouquet" class="w-full h-full object-contain" />
      </div>
      
      <div>
        <h1 class="text-4xl text-white mb-4 drop-shadow-md">My Valentine's Bouquet</h1>
        <p class="text-white opacity-90 max-w-xs mx-auto mb-8 font-medium">
          Compose your unique bouquet, choose a cute flower and send it to your loved one ♥
        </p>
      </div>

      <div class="flex flex-col gap-4 w-full px-4">
        <button id="start-btn" class="w-full py-4 text-xl">
          Create my first bouquet!
        </button>
        <button id="gallery-btn" class="bg-transparent border-none shadow-none text-white underline font-bold py-2">
          View My Gallery
        </button>
      </div>
    </div>
  `;

    container.querySelector('#start-btn')?.addEventListener('click', () => {
        store.navigateTo('flower-selection');
    });

    container.querySelector('#gallery-btn')?.addEventListener('click', () => {
        store.navigateTo('gallery');
    });

    return container;
}
