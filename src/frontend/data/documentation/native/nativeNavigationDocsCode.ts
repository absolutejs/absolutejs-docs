export const nativeNavBrowserInstall = `\
import {
  closeAbsoluteMobileSheet,
  installAbsoluteMobileUiPrimitives,
  openAbsoluteMobileSheet
} from '@absolutejs/absolute/mobile/ui';

const mobileUi = installAbsoluteMobileUiPrimitives();

openAbsoluteMobileSheet('filters');
closeAbsoluteMobileSheet('filters');
mobileUi.requestBack();`;

export const nativeNavEvents = `\
addEventListener('absolute:navigation-change', (event) => {
  const { direction, from, to } = event.detail;
  analytics.track('screen', { direction, from, to });
});

addEventListener('absolute:sheet-change', (event) => {
  if (!event.detail.open) refreshFilters(event.detail.id);
});

addEventListener('absolute:adaptive-shell-change', (event) => {
  const { keyboard, network, platform } = event.detail;
  setCompactMode(keyboard.visible || platform.formFactor === 'phone');
  setOffline(!network.connected);
});`;

export const nativeNavLayout = `\
<div data-absolute-app-shell>
  <header data-absolute-app-header>
    <h1>Account</h1>
    <button data-absolute-sheet-open="filters">Filters</button>
  </header>

  <main data-absolute-app-main>
    <section data-absolute-navigation-stack>
      <!-- your page content -->
    </section>
  </main>

  <nav data-absolute-tab-bar aria-label="Primary">
    <a href="/home">Home</a>
    <a href="/orders" data-absolute-tab-match="prefix">Orders</a>
    <a href="/account" data-absolute-tab-match="prefix">Account</a>
  </nav>

  <dialog id="filters" data-absolute-sheet aria-labelledby="filters-title">
    <h2 id="filters-title">Filters</h2>
    <button data-absolute-sheet-close>Done</button>
  </dialog>
</div>`;

export const nativeNavLinks = `\
<a href="/orders/42">Order 42</a>
<a href="/checkout/review" data-absolute-link="replace">Review</a>
<a href="/orders" data-absolute-link="back">Back to orders</a>
<a href="https://help.example.com" data-absolute-link="external">Help</a>`;

export const nativeNavRestoration = `\
<!-- Values in this form reset when the page is opened again -->
<form data-absolute-navigation-preserve="off">…</form>

<!-- Keep this list's scroll position on Back and Forward -->
<ul data-absolute-scroll-restoration>…</ul>

<!-- Focus this element when the page opens -->
<h2 data-absolute-navigation-focus tabindex="-1">Your orders</h2>`;

export const nativeNavSafeAreaCss = `\
.app-shell {
  min-height: var(--absolute-available-height, 100dvh);
  padding:
    var(--absolute-safe-area-inset-top, 0)
    var(--absolute-safe-area-inset-right, 0)
    var(--absolute-safe-area-inset-bottom, 0)
    var(--absolute-safe-area-inset-left, 0);
}

:root[data-absolute-keyboard='visible'] .checkout-bar {
  bottom: var(--absolute-keyboard-height);
}

:root[data-absolute-network='offline'] .sync-badge {
  display: inline-flex;
}`;
