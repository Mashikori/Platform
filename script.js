const games = [
  { title: 'Hollow Signal', genre: 'Horror', rating: '4.8', downloads: '12.4k', badge: 'Baru', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=85', description: 'Selidiki sinyal misterius yang muncul dari desa terlupakan sebelum isyarat itu menemukanmu.' },
  { title: 'Neon Drift', genre: 'Arcade', rating: '4.7', downloads: '8.4k', badge: 'Trending', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85', description: 'Ngejar garis neon melintasi kota malam dalam balapan ritmis yang cepat dan penuh warna.' },
  { title: 'Moon Lumen', genre: 'Puzzle', rating: '4.9', downloads: '7.1k', badge: 'Pilih editor', image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=900&q=85', description: 'Pindahkan cahaya bulan, pecahkan mekanisme kuno, dan bangkitkan kembali observatorium tua.' },
  { title: 'Mossbound', genre: 'Adventure', rating: '4.6', downloads: '5.9k', badge: 'Baru', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85', description: 'Berjalan bersama roh hutan dalam petualangan hangat tentang tumbuh, pulang, dan perubahan.' },
  { title: 'Deep Static', genre: 'Horror', rating: '4.5', downloads: '6.8k', badge: 'Populer', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85', description: 'Turun ke fasilitas bawah laut yang sunyi dan temukan suara yang seharusnya tidak ada.' },
  { title: 'Tiny Odyssey', genre: 'Adventure', rating: '4.8', downloads: '9.2k', badge: 'Editor choice', image: 'https://images.unsplash.com/photo-1537420327992-d6e192287183?auto=format&fit=crop&w=900&q=85', description: 'Kapal kecilmu melintasi bintang-bintang asing dalam perjalanan eksplorasi yang menenangkan.' },
  { title: 'Block Shift', genre: 'Puzzle', rating: '4.4', downloads: '4.3k', badge: 'Gratis', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=900&q=85', description: 'Geser ruang, susun pola, dan pecahkan teka-teki geometris yang makin rumit.' },
  { title: 'Dash Garden', genre: 'Arcade', rating: '4.7', downloads: '6.1k', badge: 'Baru', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85', description: 'Lari melompati taman yang tumbuh saat kau bergerak dalam arcade hijau yang berdenyut.' }
];

const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const dialog = document.getElementById('gameDialog');
let activeFilter = 'All';

function renderGames(list) {
  grid.innerHTML = list.map((game, index) => `
    <article class="game-card" data-index="${games.indexOf(game)}" style="animation-delay:${index * 45}ms">
      <div class="card-image">
        <img src="${game.image}" alt="Cuplikan game ${game.title}" loading="lazy">
        <span class="card-badge">${game.badge}</span>
      </div>
      <div class="card-body">
        <div class="card-line">
          <h3>${game.title}</h3>
          <span class="card-rating"><i data-lucide="star"></i>${game.rating}</span>
        </div>
        <div class="card-meta"><span>${game.genre}</span><span>•</span><span>${game.downloads} unduhan</span></div>
      </div>
    </article>
  `).join('');
  emptyState.style.display = list.length ? 'none' : 'block';
  if (window.lucide) lucide.createIcons();
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = games.filter(game => {
    const matchesFilter = activeFilter === 'All' || game.genre === activeFilter;
    const matchesSearch = !query || `${game.title} ${game.genre}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  renderGames(filtered);
}

renderGames(games);

searchInput.addEventListener('input', applyFilters);
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

grid.addEventListener('click', event => {
  const card = event.target.closest('.game-card');
  if (!card) return;
  const game = games[Number(card.dataset.index)];
  document.getElementById('dialogImage').src = game.image;
  document.getElementById('dialogImage').alt = `Cuplikan game ${game.title}`;
  document.getElementById('dialogGenre').textContent = game.genre;
  document.getElementById('dialogTitle').textContent = game.title;
  document.getElementById('dialogDescription').textContent = game.description;
  document.getElementById('dialogRating').textContent = game.rating;
  document.getElementById('dialogDownloads').textContent = game.downloads;
  dialog.showModal();
  if (window.lucide) lucide.createIcons();
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('fitch-theme');
if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
updateThemeIcon();

function updateThemeIcon() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.innerHTML = `<i class="theme-icon" data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;
  if (window.lucide) lucide.createIcons();
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  if (nextTheme === 'dark') document.documentElement.dataset.theme = 'dark';
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('fitch-theme', nextTheme);
  updateThemeIcon();
});

document.querySelector('[data-scroll="gameGrid"]').addEventListener('click', () => {
  document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.search-toggle').addEventListener('click', () => {
  document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => searchInput.focus(), 450);
});

if (window.lucide) lucide.createIcons();
