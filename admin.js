class AdminDashboard {
  constructor() {
    this.data = [];
    this.init();
  }

  init() {
    document.getElementById('login-btn').addEventListener('click', () => {
      const pwd = document.getElementById('admin-password').value;
      if (pwd === 'IISE2026') {
        document.getElementById('login-gate').style.display = 'none';
        document.getElementById('dashboard-content').style.display = 'block';
        this.loadData();
      } else {
        alert('Contraseña incorrecta');
      }
    });
  }

  loadData() {
    // In a real app, this would fetch from Apps Script if online
    this.data = JSON.parse(localStorage.getItem('iise_match_results') || '[]');
    this.renderStats();
    this.renderCharts();
  }

  renderStats() {
    document.getElementById('total-users').textContent = this.data.length;
    
    // Most common profile
    let profilesCount = {};
    this.data.forEach(d => {
      profilesCount[d.topProfile] = (profilesCount[d.topProfile] || 0) + 1;
    });
    let topProfile = Object.entries(profilesCount).sort((a,b) => b[1]-a[1])[0];
    document.getElementById('top-profile').textContent = topProfile ? `${PROFILES[topProfile[0]].name} (${topProfile[1]})` : 'N/A';
  }

  renderCharts() {
    if(this.data.length === 0) return;

    let profileCounts = { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 };
    let levelCounts = {};

    this.data.forEach(d => {
      if(profileCounts[d.topProfile] !== undefined) profileCounts[d.topProfile]++;
      levelCounts[d.level] = (levelCounts[d.level] || 0) + 1;
    });

    const ctxProfiles = document.getElementById('chart-profiles').getContext('2d');
    new Chart(ctxProfiles, {
      type: 'bar',
      data: {
        labels: Object.keys(profileCounts).map(k => PROFILES[k].name),
        datasets: [{
          label: 'Usuarios por Perfil',
          data: Object.values(profileCounts),
          backgroundColor: Object.keys(profileCounts).map(k => PROFILES[k].color)
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });

    const ctxLevels = document.getElementById('chart-levels').getContext('2d');
    new Chart(ctxLevels, {
      type: 'doughnut',
      data: {
        labels: Object.keys(levelCounts),
        datasets: [{
          data: Object.values(levelCounts),
          backgroundColor: ['#4cc9f0', '#f5a623', '#e94560', '#00d9a3']
        }]
      },
      options: { responsive: true }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new AdminDashboard();
});
