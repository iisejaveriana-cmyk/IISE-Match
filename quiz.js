/* ============================================================
   IISE MATCH — Quiz Logic
   Manages question rendering, answer capture, and flow
   ============================================================ */

class Quiz {
  constructor() {
    this.currentIndex = 0;
    this.answers = {};
    this._loadFromStorage();
    this._bindEvents();
  }

  /* ── Persistence ─── */
  _loadFromStorage() {
    try {
      const saved = localStorage.getItem('iise_match_answers');
      if (saved) this.answers = JSON.parse(saved);
    } catch (e) { /* ignore */ }
  }

  _saveToStorage() {
    try {
      localStorage.setItem('iise_match_answers', JSON.stringify(this.answers));
    } catch (e) { /* ignore */ }
  }

  /* ── Event Binding ─── */
  _bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => {
      window.router.navigate('screen-quiz');
      this.render();
    });

    document.getElementById('next-btn').addEventListener('click', () => this._onNext());
    document.getElementById('prev-btn').addEventListener('click', () => this._onPrev());
  }

  /* ── Navigation ─── */
  _onNext() {
    if (this.currentIndex < QUESTIONS.length - 1) {
      this.currentIndex++;
      this.render();
    } else {
      this._finish();
    }
  }

  _onPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  /* ── Render Current Question ─── */
  render() {
    const q = QUESTIONS[this.currentIndex];
    const total = QUESTIONS.length;

    // Progress
    const pct = Math.round(((this.currentIndex + 1) / total) * 100);
    document.getElementById('progress-bar-fill').style.width = `${pct}%`;
    document.getElementById('progress-label').textContent = `Pregunta ${this.currentIndex + 1} de ${total}`;
    const progressBar = document.querySelector('.progress-track');
    if (progressBar) progressBar.setAttribute('aria-valuenow', pct);

    // Module label
    const moduleLabels = {
      A: '📋 Módulo A — Información básica',
      B: '🎯 Módulo B — Intereses',
      C: '🧩 Módulo C — Escenarios',
      D: '⚙️ Módulo D — Preferencias',
    };
    document.getElementById('module-title').textContent = moduleLabels[q.module] || '';

    // Render question content
    const container = document.getElementById('question-container');
    container.style.animation = 'none';
    container.offsetHeight; // reflow to restart animation
    container.style.animation = '';

    let html = `<h2 class="question-text">${q.question}</h2>`;

    if (q.subtitle) {
      html += `<p class="question-subtitle">${q.subtitle}</p>`;
    }

    html += `<div class="options-container ${q.type}" id="opts-${q.id}">`;

    switch (q.type) {
      case 'dropdown':
        html += this._renderDropdown(q);
        break;
      case 'scale':
        html += this._renderScale(q);
        break;
      case 'select':
      case 'multiselect':
        html += this._renderCards(q);
        break;
    }

    html += `</div>`;
    container.innerHTML = html;

    // Attach interaction handlers
    this._attachHandlers(q);
    this._updateNavButtons(q);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Render Helpers ─── */
  _renderDropdown(q) {
    const cur = this.answers[q.id] || '';
    return `
      <select id="dropdown-answer" class="custom-select" aria-label="${q.question}">
        <option value="" disabled ${!cur ? 'selected' : ''}>Selecciona tu carrera…</option>
        ${q.options.map(o => `
          <option value="${o.id}" ${cur === o.id ? 'selected' : ''}>${o.text}</option>
        `).join('')}
      </select>
    `;
  }

  _renderScale(q) {
    const cur = this.answers[q.id];
    const curOpt = cur ? q.options.find(o => o.id === cur) : null;
    const curVal = curOpt ? curOpt.value : 3;
    const curEmoji = ['😐', '🙁', '😐', '🙂', '😁', '🔥'][curVal] || '😐';

    return `
      <div class="scale-container">
        <div class="scale-value-display" id="scale-emoji">${curEmoji}</div>
        <input type="range" id="scale-answer" min="1" max="5" step="1"
          value="${curVal}" aria-label="${q.question}" aria-valuemin="1" aria-valuemax="5">
        <div class="scale-labels">
          ${q.options.map(o => `
            <div class="scale-label-item" data-val="${o.value}">
              <span class="scale-label-num">${o.value}</span>
              <span class="scale-label-text">${o.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  _renderCards(q) {
    const isMulti = q.type === 'multiselect';
    const cur = this.answers[q.id];

    return q.options.map(opt => {
      let selected = false;
      if (isMulti) {
        selected = Array.isArray(cur) && cur.includes(opt.id);
      } else {
        selected = cur === opt.id;
      }

      const checkMark = selected ? '✓' : '';
      return `
        <div class="option-card ${selected ? 'selected' : ''}"
             data-id="${opt.id}"
             data-isnone="${opt.isNone || false}"
             role="${isMulti ? 'checkbox' : 'radio'}"
             aria-checked="${selected}"
             tabindex="0">
          <div class="option-check" aria-hidden="true">${checkMark}</div>
          <span class="option-text">${opt.text}</span>
        </div>
      `;
    }).join('');
  }

  /* ── Event Handlers ─── */
  _attachHandlers(q) {
    if (q.type === 'dropdown') {
      const sel = document.getElementById('dropdown-answer');
      if (sel) {
        sel.addEventListener('change', e => {
          this.answers[q.id] = e.target.value;
          this._saveToStorage();
          this._updateNavButtons(q);
        });
      }
    } else if (q.type === 'scale') {
      const slider = document.getElementById('scale-answer');
      const emojis = ['😐', '🙁', '😐', '🙂', '😁', '🔥'];

      // Set default
      if (!this.answers[q.id]) {
        const defOpt = q.options.find(o => o.value === 3);
        if (defOpt) this.answers[q.id] = defOpt.id;
      }

      if (slider) {
        slider.addEventListener('input', e => {
          const val = parseInt(e.target.value);
          const opt = q.options.find(o => o.value === val);
          if (opt) {
            this.answers[q.id] = opt.id;
            this._saveToStorage();
          }
          const emojiEl = document.getElementById('scale-emoji');
          if (emojiEl) {
            emojiEl.textContent = emojis[val] || '😐';
            emojiEl.style.transform = 'scale(1.3)';
            setTimeout(() => { emojiEl.style.transform = 'scale(1)'; }, 150);
          }
          this._updateNavButtons(q);
        });
      }
    } else {
      // Cards
      document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => this._handleCardClick(card, q));
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._handleCardClick(card, q);
          }
        });
      });
    }
  }

  _handleCardClick(card, q) {
    const optId = card.getAttribute('data-id');
    const isNone = card.getAttribute('data-isnone') === 'true';

    if (q.type === 'select') {
      this.answers[q.id] = optId;
      document.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
        c.querySelector('.option-check').textContent = '';
      });
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
      card.querySelector('.option-check').textContent = '✓';

    } else if (q.type === 'multiselect') {
      if (!this.answers[q.id]) this.answers[q.id] = [];

      if (isNone) {
        // Select only this "none" option
        this.answers[q.id] = [optId];
        document.querySelectorAll('.option-card').forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
          c.querySelector('.option-check').textContent = '';
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
        card.querySelector('.option-check').textContent = '✓';

      } else {
        // Deselect any "none" option
        const noneOpt = q.options.find(o => o.isNone);
        if (noneOpt && this.answers[q.id].includes(noneOpt.id)) {
          this.answers[q.id] = this.answers[q.id].filter(id => id !== noneOpt.id);
          const noneCard = document.querySelector(`.option-card[data-id="${noneOpt.id}"]`);
          if (noneCard) {
            noneCard.classList.remove('selected');
            noneCard.setAttribute('aria-checked', 'false');
            noneCard.querySelector('.option-check').textContent = '';
          }
        }

        if (this.answers[q.id].includes(optId)) {
          // Deselect
          this.answers[q.id] = this.answers[q.id].filter(id => id !== optId);
          card.classList.remove('selected');
          card.setAttribute('aria-checked', 'false');
          card.querySelector('.option-check').textContent = '';
        } else {
          // Check max selections
          if (q.maxSelections && this.answers[q.id].length >= q.maxSelections) {
            // Visual feedback: flash the card border
            card.style.borderColor = 'var(--danger)';
            setTimeout(() => { card.style.borderColor = ''; }, 800);
            return;
          }
          this.answers[q.id].push(optId);
          card.classList.add('selected');
          card.setAttribute('aria-checked', 'true');
          card.querySelector('.option-check').textContent = '✓';
        }
      }
    }

    this._saveToStorage();
    this._updateNavButtons(q);
  }

  /* ── Navigation Button State ─── */
  _updateNavButtons(q) {
    const ans = this.answers[q.id];
    let hasAnswer = false;

    if (ans !== undefined && ans !== null) {
      hasAnswer = Array.isArray(ans) ? ans.length > 0 : ans !== '';
    }

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    // Q16 and Q17 are not required (modifiers only)
    const notRequired = ['q16', 'q17'].includes(q.id);
    nextBtn.disabled = q.required && !hasAnswer && !notRequired;

    // If scale: always has a default value
    if (q.type === 'scale') nextBtn.disabled = false;

    nextBtn.textContent = this.currentIndex === QUESTIONS.length - 1 ? 'Finalizar ✓' : 'Siguiente →';
    prevBtn.style.visibility = this.currentIndex === 0 ? 'hidden' : 'visible';
  }

  /* ── Finish Quiz ─── */
  _finish() {
    window.router.navigate('screen-calculating');

    // Animate calculating steps
    if (window._animateCalcSteps) window._animateCalcSteps();

    // Clear saved answers
    try { localStorage.removeItem('iise_match_answers'); } catch (e) { /* ignore */ }

    // Process after a realistic delay
    setTimeout(() => {
      const engine = new ScoringEngine();
      const results = engine.calculateScores(this.answers);

      const rec = new Recommender(results, this.answers);
      const recommendations = rec.getRecommendations();

      // Format payload to match IISE Match V2.0 Apps Script backend exactly
      const payload = {
        career: this._getAnswer('q1'),
        semester: this._getAnswer('q2'),
        experience: this._getAnswer('q3'),
        primaryProfile: results.topProfile.name,
        primaryProfileKey: results.topProfile.code,
        primaryAffinity: results.percentages[results.topProfile.code],
        secondaryProfile: results.secondaryProfiles[0] ? results.secondaryProfiles[0].name : "",
        secondaryAffinity: results.secondaryProfiles[0] ? results.percentages[results.secondaryProfiles[0].code] : "",
        tertiaryProfile: results.secondaryProfiles[1] ? results.secondaryProfiles[1].name : "",
        tertiaryAffinity: results.secondaryProfiles[1] ? results.percentages[results.secondaryProfiles[1].code] : "",
        recommendations: recommendations.topRecommendations.map(r => r.nombre),
        level: results.level, // Keep for backward compatibility of local admin dashboard
        topProfile: results.topProfile.code, // Keep for backward compatibility of local admin dashboard
        answers: {
          objectives: this._getMultiAnswerTexts('q4'),
          interests: this._getMultiAnswerTexts('q5'),
          tools: this._getMultiAnswerTexts('q6'),
          technology: this._getScaleValue('q7'),
          data: results.percentages['D'] || 0,
          business: results.percentages['E'] || 0,
          leadership: results.percentages['L'] || 0,
          operations: results.percentages['O'] || 0,
          logistics: results.percentages['S'] || 0,
          innovation: results.percentages['T'] || 0,
          scenario: this._getAnswer('q10'),
          teamRole: this._getAnswer('q12'),
          learning: this._getMultiAnswerTexts('q15'),
          modality: this._getAnswer('q16'),
          activity: this._getAnswer('q9')
        }
      };

      // Send to Apps Script (async, non-blocking)
      Api.submit(payload);

      // Render results
      window.resultsPage.render(results, recommendations);
      window.router.navigate('screen-results');
    }, 3200);
  }

  /* ── Answer Helpers ─── */
  _getAnswer(qId) {
    const ans = this.answers[qId];
    if (!ans) return '';
    // Return the text label, not just the ID
    const q = QUESTIONS.find(q => q.id === qId);
    if (!q) return ans;
    const opt = q.options.find(o => o.id === ans);
    return opt ? opt.text : ans;
  }

  _getMultiAnswerTexts(qId) {
    const ans = this.answers[qId] || [];
    const q = QUESTIONS.find(q => q.id === qId);
    if (!q) return ans;
    return ans.map(id => {
      const opt = q.options.find(o => o.id === id);
      return opt ? opt.text : id;
    });
  }

  _getScaleValue(qId) {
    const ans = this.answers[qId];
    if (!ans) return 3;
    const q = QUESTIONS.find(q => q.id === qId);
    if (!q) return 3;
    const opt = q.options.find(o => o.id === ans);
    return opt ? (opt.value || 3) : 3;
  }
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  window.quiz = new Quiz();
});
