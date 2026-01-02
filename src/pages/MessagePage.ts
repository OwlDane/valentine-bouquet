import { store } from '../context/store';
import { FONTS } from '../data/assets';

export function MessagePage() {
  const container = document.createElement('div');
  container.className = 'container flex-col h-full';

  const { currentBouquet } = store.getState();

  container.innerHTML = `
    <header class="py-4">
      <h2 class="text-2xl text-white">Add a Message</h2>
      <p class="text-white opacity-80 text-sm italic">Pour your heart into words</p>
    </header>

    <div class="flex-1 p-4 flex flex-col gap-6">
      <div class="bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4">
        <label class="font-bold text-sm text-gray-500">YOUR MESSAGE</label>
        <textarea id="message-input" class="w-full h-40 p-4 border-2 border-pink-100 rounded-xl focus:outline-none focus:border-pink-500 text-lg" placeholder="Write something sweet..." style="font-family: ${FONTS.find(f => f.id === currentBouquet.font)?.family || 'inherit'}">${currentBouquet.message}</textarea>
      </div>

      <div class="flex flex-col gap-4">
        <label class="font-bold text-sm text-white">CHOOSE A STYLE</label>
        <div class="grid grid-cols-3 gap-2">
          ${FONTS.map(font => {
            const isSelected = currentBouquet.font === font.id;
            return `
              <div class="font-option bg-white rounded-xl p-2 text-center cursor-pointer border-2 ${isSelected ? 'border-pink-500 bg-pink-100' : 'border-transparent shadow-sm'}" data-id="${font.id}" style="font-family: ${font.family}">
                ${font.name}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="p-4 mt-auto bg-white rounded-t-3xl shadow-lg flex flex-col gap-4">
      <button id="next-btn" class="w-full py-4">
        Preview Bouquet
      </button>
      <button id="back-btn" class="bg-transparent border-none shadow-none text-gray-400 py-1 text-sm underline">
        Back to Flowers
      </button>
    </div>
  `;

  const textarea = container.querySelector('#message-input') as HTMLTextAreaElement;
  textarea.addEventListener('input', (e) => {
    const value = (e.target as HTMLTextAreaElement).value;
    store.updateCurrentBouquet({ message: value });
  });

  container.querySelectorAll('.font-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).dataset.id!;
      store.updateCurrentBouquet({ font: id });
    });
  });

  container.querySelector('#next-btn')?.addEventListener('click', () => {
    store.navigateTo('preview');
  });

  container.querySelector('#back-btn')?.addEventListener('click', () => {
    store.navigateTo('flower-selection');
  });

  return container;
}
