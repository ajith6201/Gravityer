import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { routes } from './app.routes';
import * as fromApp from './store';
import { TodosEffects } from './todos/store/effects';

// Create the localStorage sync meta-reducer
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({ keys: ['todos'], rehydrate: true })(reducer);
}

// Add localStorageSyncReducer to the list of meta-reducers
const metaReducers: MetaReducer<any>[] = [
  ...fromApp.metaReducers,
  localStorageSyncReducer,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideStore(fromApp.reducers, { metaReducers }), // Apply store with updated metaReducers
    provideEffects([TodosEffects]),
    provideRouterStore({
      serializer: fromApp.CustomRouterStateSerializer,
    }),
    provideStoreDevtools({
      name: 'TodoMVC app using Angular & NgRx',
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    importProvidersFrom(HttpClientModule),
  ],
};
