import { preloadPreferences } from './preferences-preloader.js';

/**
 * Execute preference hydration as early as possible to keep theme and language in sync.
 */
export function runPreferencePreload() {
    preloadPreferences();
}

runPreferencePreload();
