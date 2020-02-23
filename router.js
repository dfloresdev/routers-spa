class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/');
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    console.log('pathSegs', pathSegs);
    this.loadRoute(...pathSegs);
  }

  loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    const url = `/${urlSegs.join('/')}`;
    history.pushState({}, 'this works', url);
    const routerOutElement = document.querySelectorAll('[data-router]')[0];
    console.log('matched', matchedRoute);
    routerOutElement.innerHTML = matchedRoute.template;
  }

  _matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find(route => {
      const routePathSegs = route.path.split('/').slice(1);
      if (routePathSegs.length !== urlSegs.length) {
        return false;
      }
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSegs[i]
      );
    });
    return matchedRoute;
  }
}
