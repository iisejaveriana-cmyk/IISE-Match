class Router {
  constructor() {
    this.routes = ['screen-landing', 'screen-quiz', 'screen-calculating', 'screen-results'];
  }

  navigate(screenId) {
    this.routes.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('active');
        if (id === screenId) {
          el.classList.add('active');
        }
      }
    });
    window.scrollTo(0, 0);
  }
}

const router = new Router();
window.router = router;
