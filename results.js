/* ============================================================
   IISE MATCH — Results Page Logic
   Renders personalized profile, recommendations, and route
   ============================================================ */

class ResultsPage {
  constructor() {
    this.results = null;
    this.recs = null;
    this._bindButtons();
  }

  _bindButtons() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this._share());
    }
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        try { localStorage.removeItem('iise_match_answers'); } catch (e) { /* ignore */ }
        location.reload();
      });
    }
  }

  /* ── Main Render Entry ─── */
  render(results, recs) {
    this.results = results;
    this.recs = recs;

    // Show local mode notice if no Apps Script URL configured
    if (!CONFIG.APPS_SCRIPT_URL) {
      const notice = document.getElementById('local-notice');
      if (notice) notice.style.display = 'flex';
    }

    this._renderHeader(results);
    this._renderPrimaryProfile(results);
    this._renderSecondaryProfiles(results);
    this._renderInterests(results.topTags);
    this._renderRecommendations(recs.topRecommendations);
    this._renderRoute(recs.route);
  }

  /* ── Results Header ─── */
  _renderHeader(results) {
    const profile = results.topProfile;
    const pct = results.percentages[profile.code];
    const title = document.querySelector('.results-title');
    if (title) {
      title.innerHTML = `¡Eres un <span class="gradient-text">${profile.name}</span>!`;
    }
  }

  /* ── Primary Profile Card ─── */
  _renderPrimaryProfile(results) {
    const profile = results.topProfile;
    const pct = results.percentages[profile.code];
    const combined = results.combinedProfile;
    const container = document.getElementById('primary-profile');

    // Apply glow color based on profile
    container.style.setProperty('--profile-glow', `${profile.color}10`);
    container.style.setProperty('--profile-stroke', `${profile.color}40`);
    container.style.borderColor = `${profile.color}25`;

    let combinedHTML = '';
    if (combined) {
      combinedHTML = `
        <div class="combined-badge">
          ✨ Perfil combinado: ${combined.name}
        </div>
      `;
    }

    container.innerHTML = `
      <!-- SVG Ring -->
      <div class="profile-score">
        <svg viewBox="0 0 36 36" class="circular-chart" role="img" aria-label="${pct}% de afinidad">
          <path class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path class="circle"
            stroke="${profile.color}"
            stroke-dasharray="${pct}, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="19" class="percentage-text" fill="${profile.color}">
            <tspan id="main-pct">0</tspan>%
          </text>
        </svg>
      </div>

      <!-- Profile Info -->
      <div class="profile-info">
        <span class="profile-emoji-big">${profile.emoji}</span>
        <h1 class="profile-main-name">${profile.name}</h1>
        ${combinedHTML}
        <p class="profile-desc">
          ${combined ? combined.description : profile.description}
        </p>
      </div>
    `;

    // Animate percentage counter
    this._animateCounter('main-pct', 0, pct, 1800);
  }

  /* ── Secondary Profiles ─── */
  _renderSecondaryProfiles(results) {
    const container = document.getElementById('secondary-profiles');
    // Show all 8 profiles sorted by score, excluding the top one
    const sorted = Object.entries(results.percentages)
      .sort((a, b) => b[1] - a[1])
      .filter(([code]) => code !== results.topProfile.code)
      .slice(0, 4); // Top 4 secondary

    container.innerHTML = sorted.map(([code, pct]) => {
      const p = PROFILES[code];
      if (!p) return '';
      return `
        <div class="secondary-card" style="--card-color:${p.color}">
          <div class="secondary-card-left">
            <span class="secondary-emoji">${p.emoji}</span>
            <span class="secondary-name">${p.name}</span>
          </div>
          <span class="secondary-score" style="color:${p.color}">${pct}%</span>
        </div>
      `;
    }).join('');
  }

  /* ── Interests / Tags ─── */
  _renderInterests(tags) {
    const container = document.getElementById('tags-container');
    if (!tags || tags.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No se detectaron tags específicos.</p>';
      return;
    }
    container.innerHTML = tags.map(tag => `
      <span class="tag">${tag.replace(/_/g, ' ')}</span>
    `).join('');
  }

  /* ── Recommendations ─── */
  _renderRecommendations(recs) {
    const container = document.getElementById('recommendations-container');
    if (!recs || recs.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No hay actividades disponibles en el catálogo.</p>';
      return;
    }

    container.innerHTML = recs.map((act, i) => `
      <div class="rec-card" style="animation-delay:${i * 0.1}s">
        <div class="rec-header">
          <span class="rec-emoji">${act.emoji || '📌'}</span>
          <span class="rec-match">${act.compatibility}% match</span>
        </div>
        <h4>${act.nombre}</h4>
        <p class="rec-desc">${act.descripcion}</p>
        <div class="rec-meta">
          <span class="meta-tag">${act.tipo}</span>
          <span class="meta-tag">${act.modalidad}</span>
          <span class="meta-tag">${act.nivel}</span>
          <span class="meta-tag">${act.duracion}</span>
        </div>
      </div>
    `).join('');
  }

  /* ── Route Timeline ─── */
  _renderRoute(route) {
    const container = document.getElementById('route-container');
    if (!route || route.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">Ruta no disponible con las actividades actuales.</p>';
      return;
    }

    const stepIcons = ['🎓', '🔬', '🤝', '🚀'];

    container.innerHTML = route.map((step, i) => `
      <div class="route-step" style="animation: fadeInUp 0.5s ease forwards; animation-delay:${i * 0.15}s; opacity:0">
        <div class="step-number">${stepIcons[i] || (i + 1)}</div>
        <div class="step-content">
          <div class="step-label">${step.stepTitle}</div>
          <h5>${step.nombre}</h5>
          <p>${step.tipo} · ${step.duracion}</p>
        </div>
      </div>
    `).join('');
  }

  /* ── Share ─── */
  _share() {
    if (!this.results) return;
    const p = this.results.topProfile;
    const pct = this.results.percentages[p.code];
    const combined = this.results.combinedProfile;
    const combText = combined ? ` (${combined.name})` : '';

    const text =
      `🎯 Mi perfil IISE Match es: ${p.emoji} ${p.name}${combText} — ${pct}% de afinidad\n` +
      `\nDescubre tu perfil en el Capítulo IISE de la Javeriana. Responde 18 preguntas y obtén recomendaciones personalizadas de cursos, visitas y experiencias.\n` +
      `\n#IISE #Javeriana #IISEMatch`;

    if (navigator.share) {
      navigator.share({ title: 'Mi perfil IISE Match', text }).catch(() => this._copyToClipboard(text));
    } else {
      this._copyToClipboard(text);
    }
  }

  _copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-btn');
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ ¡Copiado al portapapeles!';
      btn.style.background = 'linear-gradient(135deg, var(--success), #00a87a)';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
      }, 2500);
    }).catch(() => {
      alert('Para compartir, copia este texto:\n\n' + text);
    });
  }

  /* ── Animated Counter ─── */
  _animateCounter(elementId, from, to, durationMs) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / durationMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

// Init
window.resultsPage = new ResultsPage();
