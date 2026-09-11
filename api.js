class Api {
  static saveResult(data) {
    // 1. Save to local storage
    try {
      let results = JSON.parse(localStorage.getItem('iise_match_results') || '[]');
      results.push(data);
      localStorage.setItem('iise_match_results', JSON.stringify(results));
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // 2. Send to Apps Script if configured
    if (CONFIG.APPS_SCRIPT_URL) {
      fetch(CONFIG.APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).catch(err => console.error("Error saving to Apps Script", err));
    }
  }

  static submit(data) {
    this.saveResult(data);
  }

  static getResults() {
    try {
      return JSON.parse(localStorage.getItem('iise_match_results') || '[]');
    } catch (e) {
      return [];
    }
  }
}

window.Api = Api;

