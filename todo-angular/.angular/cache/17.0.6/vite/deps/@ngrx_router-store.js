import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RoutesRecognized
} from "./chunk-TEI4SGZM.js";
import "./chunk-DAN23WZY.js";
import "./chunk-V2AKTRCJ.js";
import "./chunk-OYY5QCWV.js";
import {
  ACTIVE_RUNTIME_CHECKS,
  Store,
  createAction,
  createFeatureSelector,
  createSelector,
  isNgrxMockEnvironment,
  props,
  select
} from "./chunk-CAWS5YDC.js";
import {
  ENVIRONMENT_INITIALIZER,
  ErrorHandler,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-EELOS7FL.js";
import {
  withLatestFrom
} from "./chunk-DG2N3VG3.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-STUZPFMT.js";

// node_modules/@ngrx/router-store/fesm2022/ngrx-router-store.mjs
var ROUTER_REQUEST = "@ngrx/router-store/request";
var routerRequestAction = createAction(ROUTER_REQUEST, props());
var ROUTER_NAVIGATION = "@ngrx/router-store/navigation";
var routerNavigationAction = createAction(ROUTER_NAVIGATION, props());
var ROUTER_CANCEL = "@ngrx/router-store/cancel";
var routerCancelAction = createAction(ROUTER_CANCEL, props());
var ROUTER_ERROR = "@ngrx/router-store/error";
var routerErrorAction = createAction(ROUTER_ERROR, props());
var ROUTER_NAVIGATED = "@ngrx/router-store/navigated";
var routerNavigatedAction = createAction(ROUTER_NAVIGATED, props());
function routerReducer(state, action) {
  const routerAction = action;
  switch (routerAction.type) {
    case ROUTER_NAVIGATION:
    case ROUTER_ERROR:
    case ROUTER_CANCEL:
      return {
        state: routerAction.payload.routerState,
        navigationId: routerAction.payload.event.id
      };
    default:
      return state;
  }
}
var MinimalRouterStateSerializer = class {
  serialize(routerState) {
    return {
      root: this.serializeRoute(routerState.root),
      url: routerState.url
    };
  }
  serializeRoute(route) {
    const children = route.children.map((c) => this.serializeRoute(c));
    return {
      params: route.params,
      data: route.data,
      url: route.url,
      outlet: route.outlet,
      title: route.title,
      routeConfig: route.routeConfig ? {
        path: route.routeConfig.path,
        pathMatch: route.routeConfig.pathMatch,
        redirectTo: route.routeConfig.redirectTo,
        outlet: route.routeConfig.outlet,
        title: typeof route.routeConfig.title === "string" ? route.routeConfig.title : void 0
      } : null,
      queryParams: route.queryParams,
      fragment: route.fragment,
      firstChild: children[0],
      children
    };
  }
};
var NavigationActionTiming;
(function(NavigationActionTiming2) {
  NavigationActionTiming2[NavigationActionTiming2["PreActivation"] = 1] = "PreActivation";
  NavigationActionTiming2[NavigationActionTiming2["PostActivation"] = 2] = "PostActivation";
})(NavigationActionTiming || (NavigationActionTiming = {}));
var DEFAULT_ROUTER_FEATURENAME = "router";
var _ROUTER_CONFIG = new InjectionToken("@ngrx/router-store Internal Configuration");
var ROUTER_CONFIG = new InjectionToken("@ngrx/router-store Configuration");
function _createRouterConfig(config) {
  return __spreadValues({
    stateKey: DEFAULT_ROUTER_FEATURENAME,
    serializer: MinimalRouterStateSerializer,
    navigationActionTiming: NavigationActionTiming.PreActivation
  }, config);
}
var FullRouterStateSerializer = class {
  serialize(routerState) {
    return {
      root: this.serializeRoute(routerState.root),
      url: routerState.url
    };
  }
  serializeRoute(route) {
    const children = route.children.map((c) => this.serializeRoute(c));
    return {
      params: route.params,
      paramMap: route.paramMap,
      data: route.data,
      url: route.url,
      outlet: route.outlet,
      title: route.title,
      routeConfig: route.routeConfig ? {
        component: route.routeConfig.component,
        path: route.routeConfig.path,
        pathMatch: route.routeConfig.pathMatch,
        redirectTo: route.routeConfig.redirectTo,
        outlet: route.routeConfig.outlet,
        title: route.routeConfig.title
      } : null,
      queryParams: route.queryParams,
      queryParamMap: route.queryParamMap,
      fragment: route.fragment,
      component: route.routeConfig ? route.routeConfig.component : void 0,
      root: void 0,
      parent: void 0,
      firstChild: children[0],
      pathFromRoot: void 0,
      children
    };
  }
};
var RouterStateSerializer = class {
};
var RouterTrigger;
(function(RouterTrigger2) {
  RouterTrigger2[RouterTrigger2["NONE"] = 1] = "NONE";
  RouterTrigger2[RouterTrigger2["ROUTER"] = 2] = "ROUTER";
  RouterTrigger2[RouterTrigger2["STORE"] = 3] = "STORE";
})(RouterTrigger || (RouterTrigger = {}));
var _StoreRouterConnectingService = class _StoreRouterConnectingService {
  constructor(store, router, serializer, errorHandler, config, activeRuntimeChecks) {
    this.store = store;
    this.router = router;
    this.serializer = serializer;
    this.errorHandler = errorHandler;
    this.config = config;
    this.activeRuntimeChecks = activeRuntimeChecks;
    this.lastEvent = null;
    this.routerState = null;
    this.trigger = RouterTrigger.NONE;
    this.stateKey = this.config.stateKey;
    if (!isNgrxMockEnvironment() && isDevMode() && (activeRuntimeChecks?.strictActionSerializability || activeRuntimeChecks?.strictStateSerializability) && this.serializer instanceof FullRouterStateSerializer) {
      console.warn("@ngrx/router-store: The serializability runtime checks cannot be enabled with the FullRouterStateSerializer. The FullRouterStateSerializer has an unserializable router state and actions that are not serializable. To use the serializability runtime checks either use the MinimalRouterStateSerializer or implement a custom router state serializer.");
    }
    this.setUpStoreStateListener();
    this.setUpRouterEventsListener();
  }
  setUpStoreStateListener() {
    this.store.pipe(select(this.stateKey), withLatestFrom(this.store)).subscribe(([routerStoreState, storeState]) => {
      this.navigateIfNeeded(routerStoreState, storeState);
    });
  }
  navigateIfNeeded(routerStoreState, storeState) {
    if (!routerStoreState || !routerStoreState.state) {
      return;
    }
    if (this.trigger === RouterTrigger.ROUTER) {
      return;
    }
    if (this.lastEvent instanceof NavigationStart) {
      return;
    }
    const url = routerStoreState.state.url;
    if (!isSameUrl(this.router.url, url)) {
      this.storeState = storeState;
      this.trigger = RouterTrigger.STORE;
      this.router.navigateByUrl(url).catch((error) => {
        this.errorHandler.handleError(error);
      });
    }
  }
  setUpRouterEventsListener() {
    const dispatchNavLate = this.config.navigationActionTiming === NavigationActionTiming.PostActivation;
    let routesRecognized;
    this.router.events.pipe(withLatestFrom(this.store)).subscribe(([event, storeState]) => {
      this.lastEvent = event;
      if (event instanceof NavigationStart) {
        this.routerState = this.serializer.serialize(this.router.routerState.snapshot);
        if (this.trigger !== RouterTrigger.STORE) {
          this.storeState = storeState;
          this.dispatchRouterRequest(event);
        }
      } else if (event instanceof RoutesRecognized) {
        routesRecognized = event;
        if (!dispatchNavLate && this.trigger !== RouterTrigger.STORE) {
          this.dispatchRouterNavigation(event);
        }
      } else if (event instanceof NavigationCancel) {
        this.dispatchRouterCancel(event);
        this.reset();
      } else if (event instanceof NavigationError) {
        this.dispatchRouterError(event);
        this.reset();
      } else if (event instanceof NavigationEnd) {
        if (this.trigger !== RouterTrigger.STORE) {
          if (dispatchNavLate) {
            this.dispatchRouterNavigation(routesRecognized);
          }
          this.dispatchRouterNavigated(event);
        }
        this.reset();
      }
    });
  }
  dispatchRouterRequest(event) {
    this.dispatchRouterAction(ROUTER_REQUEST, {
      event
    });
  }
  dispatchRouterNavigation(lastRoutesRecognized) {
    const nextRouterState = this.serializer.serialize(lastRoutesRecognized.state);
    this.dispatchRouterAction(ROUTER_NAVIGATION, {
      routerState: nextRouterState,
      event: new RoutesRecognized(lastRoutesRecognized.id, lastRoutesRecognized.url, lastRoutesRecognized.urlAfterRedirects, nextRouterState)
    });
  }
  dispatchRouterCancel(event) {
    this.dispatchRouterAction(ROUTER_CANCEL, {
      storeState: this.storeState,
      event
    });
  }
  dispatchRouterError(event) {
    this.dispatchRouterAction(ROUTER_ERROR, {
      storeState: this.storeState,
      event: new NavigationError(event.id, event.url, `${event}`)
    });
  }
  dispatchRouterNavigated(event) {
    const routerState = this.serializer.serialize(this.router.routerState.snapshot);
    this.dispatchRouterAction(ROUTER_NAVIGATED, {
      event,
      routerState
    });
  }
  dispatchRouterAction(type, payload) {
    this.trigger = RouterTrigger.ROUTER;
    try {
      this.store.dispatch({
        type,
        payload: __spreadProps(__spreadValues({
          routerState: this.routerState
        }, payload), {
          event: this.config.routerState === 0 ? payload.event : {
            id: payload.event.id,
            url: payload.event.url,
            // safe, as it will just be `undefined` for non-NavigationEnd router events
            urlAfterRedirects: payload.event.urlAfterRedirects
          }
        })
      });
    } finally {
      this.trigger = RouterTrigger.NONE;
    }
  }
  reset() {
    this.trigger = RouterTrigger.NONE;
    this.storeState = null;
    this.routerState = null;
  }
};
_StoreRouterConnectingService.ɵfac = function StoreRouterConnectingService_Factory(t) {
  return new (t || _StoreRouterConnectingService)(ɵɵinject(Store), ɵɵinject(Router), ɵɵinject(RouterStateSerializer), ɵɵinject(ErrorHandler), ɵɵinject(ROUTER_CONFIG), ɵɵinject(ACTIVE_RUNTIME_CHECKS));
};
_StoreRouterConnectingService.ɵprov = ɵɵdefineInjectable({
  token: _StoreRouterConnectingService,
  factory: _StoreRouterConnectingService.ɵfac
});
var StoreRouterConnectingService = _StoreRouterConnectingService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoreRouterConnectingService, [{
    type: Injectable
  }], () => [{
    type: Store
  }, {
    type: Router
  }, {
    type: RouterStateSerializer
  }, {
    type: ErrorHandler
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [ROUTER_CONFIG]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [ACTIVE_RUNTIME_CHECKS]
    }]
  }], null);
})();
function isSameUrl(first, second) {
  return stripTrailingSlash(first) === stripTrailingSlash(second);
}
function stripTrailingSlash(text) {
  if (text?.length > 0 && text[text.length - 1] === "/") {
    return text.substring(0, text.length - 1);
  }
  return text;
}
function provideRouterStore(config = {}) {
  return makeEnvironmentProviders([{
    provide: _ROUTER_CONFIG,
    useValue: config
  }, {
    provide: ROUTER_CONFIG,
    useFactory: _createRouterConfig,
    deps: [_ROUTER_CONFIG]
  }, {
    provide: RouterStateSerializer,
    useClass: config.serializer ? config.serializer : config.routerState === 0 ? FullRouterStateSerializer : MinimalRouterStateSerializer
  }, {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory() {
      return () => inject(StoreRouterConnectingService);
    }
  }, StoreRouterConnectingService]);
}
var _StoreRouterConnectingModule = class _StoreRouterConnectingModule {
  static forRoot(config = {}) {
    return {
      ngModule: _StoreRouterConnectingModule,
      providers: [provideRouterStore(config)]
    };
  }
};
_StoreRouterConnectingModule.ɵfac = function StoreRouterConnectingModule_Factory(t) {
  return new (t || _StoreRouterConnectingModule)();
};
_StoreRouterConnectingModule.ɵmod = ɵɵdefineNgModule({
  type: _StoreRouterConnectingModule
});
_StoreRouterConnectingModule.ɵinj = ɵɵdefineInjector({});
var StoreRouterConnectingModule = _StoreRouterConnectingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoreRouterConnectingModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
function createRouterSelector() {
  return createFeatureSelector(DEFAULT_ROUTER_FEATURENAME);
}
function getRouterSelectors(selectState = createRouterSelector()) {
  const selectRouterState = createSelector(selectState, (router) => router && router.state);
  const selectRootRoute = createSelector(selectRouterState, (routerState) => routerState && routerState.root);
  const selectCurrentRoute = createSelector(selectRootRoute, (rootRoute) => {
    if (!rootRoute) {
      return void 0;
    }
    let route = rootRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  });
  const selectFragment = createSelector(selectRootRoute, (route) => route && route.fragment);
  const selectQueryParams = createSelector(selectRootRoute, (route) => route && route.queryParams);
  const selectQueryParam = (param) => createSelector(selectQueryParams, (params) => params && params[param]);
  const selectRouteParams = createSelector(selectCurrentRoute, (route) => route && route.params);
  const selectRouteParam = (param) => createSelector(selectRouteParams, (params) => params && params[param]);
  const selectRouteData = createSelector(selectCurrentRoute, (route) => route && route.data);
  const selectRouteDataParam = (param) => createSelector(selectRouteData, (data) => data && data[param]);
  const selectUrl = createSelector(selectRouterState, (routerState) => routerState && routerState.url);
  const selectTitle = createSelector(selectCurrentRoute, (route) => {
    if (!route?.routeConfig) {
      return void 0;
    }
    return typeof route.routeConfig.title === "string" ? route.routeConfig.title : route.title;
  });
  return {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectRouteDataParam,
    selectUrl,
    selectTitle
  };
}
export {
  DEFAULT_ROUTER_FEATURENAME,
  FullRouterStateSerializer,
  MinimalRouterStateSerializer,
  NavigationActionTiming,
  ROUTER_CANCEL,
  ROUTER_CONFIG,
  ROUTER_ERROR,
  ROUTER_NAVIGATED,
  ROUTER_NAVIGATION,
  ROUTER_REQUEST,
  RouterStateSerializer,
  StoreRouterConnectingModule,
  createRouterSelector,
  getRouterSelectors,
  provideRouterStore,
  routerCancelAction,
  routerErrorAction,
  routerNavigatedAction,
  routerNavigationAction,
  routerReducer,
  routerRequestAction
};
//# sourceMappingURL=@ngrx_router-store.js.map
