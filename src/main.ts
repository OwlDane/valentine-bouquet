import './style.css';
import { store } from './context/store';
import { LandingPage } from './pages/LandingPage';
import { FlowerSelectionPage } from './pages/FlowerSelectionPage';
import { MessagePage } from './pages/MessagePage';
import { PreviewPage } from './pages/PreviewPage';
import { GalleryPage } from './pages/GalleryPage';

const app = document.querySelector<HTMLDivElement>('#app')!;

function render() {
  const { currentPage } = store.getState();
  app.innerHTML = '';

  switch (currentPage) {
    case 'landing':
      app.appendChild(LandingPage());
      break;
    case 'flower-selection':
      app.appendChild(FlowerSelectionPage());
      break;
    case 'message':
      app.appendChild(MessagePage());
      break;
    case 'preview':
      app.appendChild(PreviewPage());
      break;
    case 'gallery':
      app.appendChild(GalleryPage());
      break;
    default:
      app.appendChild(LandingPage());
  }
}

// Initial render
render();

// Subscribe to store changes
store.subscribe(render);

// Handle browser navigation
window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'landing';
  if (store.getState().currentPage !== page) {
    store.setState({ currentPage: page });
  }
});

// Set initial hash if empty
if (!window.location.hash) {
  window.location.hash = 'landing';
} else {
  const page = window.location.hash.replace('#', '');
  store.setState({ currentPage: page });
}
