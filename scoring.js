const Weights = {
  q4: 3,
  q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
  q10: 3, q11: 3, q13: 3,
  q12: 2, q14: 2,
  q15: 1, q18: 1
};

class ScoringEngine {
  constructor() {
    this.rawScores = { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0, F:0, H:0, G:0, C:0 };
    this.percentages = {};
    this.topProfiles = [];
    this.tags = {}; // keep track of tags for recommender
    this.modifiers = {};
    this.level = 'básico';
  }

  calculateScores(answers) {
    // Reset
    this.rawScores = { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 };
    this.tags = {};
    
    // Calculate raw scores based on responses
    for (const [qId, response] of Object.entries(answers)) {
      const q = QUESTIONS.find(question => question.id === qId);
      if (!q) continue;

      const weight = Weights[qId] || 0;
      let selectedOptions = Array.isArray(response) ? response : [response];

      selectedOptions.forEach(optId => {
        const option = q.options.find(o => o.id === optId);
        if (option) {
          if (option.scores) {
            for (let [profile, score] of Object.entries(option.scores)) {
              if (this.rawScores[profile] !== undefined) {
                this.rawScores[profile] += score * weight;
              }
            }
          }
          if (option.tags) {
            option.tags.forEach(tag => {
              this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
          }
          if (option.modifier) {
            this.modifiers[option.modifier] = (this.modifiers[option.modifier] || 0) + 1;
          }
          if (option.level) {
            this.level = option.level;
          }
        }
      });
    }

    this.normalizeScores();
    return this.getResults();
  }

  normalizeScores() {
    // Calculate maximum possible score per profile across answered questions
    const maxPossiblePerProfile = { D: 0, T: 0, E: 0, L: 0, O: 0, S: 0, X: 0, P: 0, F: 0, H: 0, G: 0, C: 0 };

    QUESTIONS.forEach(q => {
      const weight = Weights[q.id] || 1;
      const profileMaxInQuestion = { D: 0, T: 0, E: 0, L: 0, O: 0, S: 0, X: 0, P: 0, F: 0, H: 0, G: 0, C: 0 };

      if (q.options) {
        if (q.type === 'multiselect') {
          const limit = q.maxSelections || 3;
          ['D', 'T', 'E', 'L', 'O', 'S', 'X', 'P', 'F', 'H', 'G', 'C'].forEach(p => {
            const vals = q.options.map(o => (o.scores ? o.scores[p] || 0 : 0)).sort((a, b) => b - a);
            const topSum = vals.slice(0, limit).reduce((acc, curr) => acc + curr, 0);
            profileMaxInQuestion[p] = topSum;
          });
        } else {
          q.options.forEach(o => {
            if (o.scores) {
              for (let p in o.scores) {
                if (o.scores[p] > (profileMaxInQuestion[p] || 0)) {
                  profileMaxInQuestion[p] = o.scores[p];
                }
              }
            }
          });
        }
      }

      for (let p in maxPossiblePerProfile) {
        maxPossiblePerProfile[p] += (profileMaxInQuestion[p] || 0) * weight;
      }
    });

    for (let p in this.rawScores) {
      const maxP = maxPossiblePerProfile[p] || 1;
      // Calculate absolute affinity percentage (realistic scale, e.g. 85%, 72%, 48%)
      const calcPct = Math.round((this.rawScores[p] / maxP) * 100);
      this.percentages[p] = Math.min(Math.max(calcPct, 12), 96);
    }

    // Determine Top Profiles
    let sorted = Object.entries(this.percentages).sort((a, b) => b[1] - a[1]);
    this.topProfiles = sorted.slice(0, 3);
  }
  
  getCombinedProfile() {
    if (this.topProfiles.length < 2) return null;
    let p1 = this.topProfiles[0];
    let p2 = this.topProfiles[1];
    
    // Check if they are within 15% of each other
    if (p1[1] - p2[1] <= 15) {
      // Find combined profile
      const combination = [p1[0], p2[0]].sort().join('-');
      return COMBINED_PROFILES.find(cp => cp.profiles.slice().sort().join('-') === combination) || null;
    }
    return null;
  }

  getResults() {
    let combined = this.getCombinedProfile();
    return {
      percentages: this.percentages,
      topProfile: PROFILES[this.topProfiles[0][0]],
      secondaryProfiles: this.topProfiles.slice(1).map(p => PROFILES[p[0]]),
      combinedProfile: combined,
      topTags: Object.entries(this.tags).sort((a,b) => b[1] - a[1]).slice(0,5).map(t => t[0]),
      level: this.level
    };
  }
}

window.ScoringEngine = ScoringEngine;
