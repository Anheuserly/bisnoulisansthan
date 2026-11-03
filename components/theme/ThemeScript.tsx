import { themeToCssString, DEFAULT_NEON_CARD_GLOW, type ThemeConfig } from "@/config/themes";

export function ThemeScript({ initialTheme }: { initialTheme: ThemeConfig }) {
  const cssString = themeToCssString(initialTheme);
  const neon = initialTheme.cardNeonGlow ?? DEFAULT_NEON_CARD_GLOW;
  const neonEnabled = Boolean(neon?.enabled);

  // Script that executes before HTML paints to avoid FOUC
  const scriptContent = `
(function() {
  function applyPresentation(theme) {
    var root = document.documentElement;
    root.dataset.headerStyle = theme.headerStyle || 'standard';
    root.dataset.heroStyle = theme.heroStyle || 'immersive';
    root.dataset.pageHeaderStyle = theme.pageHeaderStyle || 'standard';
    root.dataset.cardStyle = theme.cardStyle || 'standard';
    var neon = theme.cardNeonGlow;
    var neonEnabled = (neon && neon.enabled !== undefined) ? Boolean(neon.enabled) : false;
    root.dataset.cardNeonGlow = neonEnabled ? 'true' : 'false';
    root.dataset.neonStyle = (neon && neon.style) || 'full-aura';
    root.dataset.neonIntensity = (neon && neon.intensity) || 'subtle';
    root.dataset.neonCorners = (neon && neon.cornerPosition) || 'both';
  }

  try {
    var stored = localStorage.getItem('bsgss_theme_preview');
    if (stored) {
      var theme = JSON.parse(stored);
      if (theme && theme.brandPrimary) {
        var el = document.getElementById('bsgss-theme-style');
        if (el && theme.cssString) {
          el.innerHTML = ':root { ' + theme.cssString + ' }';
        }
        applyPresentation(theme);
      } else {
        applyPresentation({
          headerStyle: '${initialTheme.headerStyle || "standard"}',
          heroStyle: '${initialTheme.heroStyle || "immersive"}',
          pageHeaderStyle: '${initialTheme.pageHeaderStyle || "standard"}',
          cardStyle: '${initialTheme.cardStyle || "standard"}',
          cardNeonGlow: {
            enabled: ${neonEnabled},
            style: '${neon.style || "corner-radiant"}',
            intensity: '${neon.intensity || "vibrant"}',
            cornerPosition: '${neon.cornerPosition || "both"}'
          }
        });
      }
    } else {
      applyPresentation({
        headerStyle: '${initialTheme.headerStyle || "standard"}',
        heroStyle: '${initialTheme.heroStyle || "immersive"}',
        pageHeaderStyle: '${initialTheme.pageHeaderStyle || "standard"}',
        cardStyle: '${initialTheme.cardStyle || "standard"}',
        cardNeonGlow: {
          enabled: ${neonEnabled},
          style: '${neon.style || "corner-radiant"}',
          intensity: '${neon.intensity || "vibrant"}',
          cornerPosition: '${neon.cornerPosition || "both"}'
        }
      });
    }
  } catch (e) {}

  window.__applyThemeCss = function(cssText, theme) {
    var el = document.getElementById('bsgss-theme-style');
    if (el) {
      el.innerHTML = ':root { ' + cssText + ' }';
    }
    if (theme) applyPresentation(theme);
  };
})();
`;

  return (
    <>
      <style
        id="bsgss-theme-style"
        dangerouslySetInnerHTML={{
          __html: `:root { ${cssString} }`,
        }}
      />
      <script
        id="bsgss-theme-script"
        dangerouslySetInnerHTML={{
          __html: scriptContent,
        }}
      />
    </>
  );
}
