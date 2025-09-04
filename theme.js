(function(){
  const key = "pref-theme";
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  const set = (mode) => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(key, mode);
  };
  const saved = localStorage.getItem(key);
  if(saved) set(saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    set(current === 'dark' ? 'light' : 'dark');
  });
})();
