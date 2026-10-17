import { themeToCssString, type ThemeConfig } from "@/config/themes";

export function ThemeScript({ initialTheme }: { initialTheme: ThemeConfig }) {
  const cssString = themeToCssString(initialTheme);

  // Script that executes before HTML paints to avoid FOUC
  const scriptContent = `
(function() {
  try {
    var stored = localStorage.getItem('bsgss_theme_preview');
    if (stored) {
      var theme = JSON.parse(stored);
      if (theme && theme.brandPrimary) {
        var el = document.getElementById('bsgss-theme-style');
        if (el && theme.cssString) {
          el.innerHTML = ':root { ' + theme.cssString + ' }';
        }
        document.documentElement.dataset.headerStyle = theme.headerStyle || 'standard';
        document.documentElement.dataset.heroStyle = theme.heroStyle || 'immersive';
        document.documentElement.dataset.pageHeaderStyle = theme.pageHeaderStyle || 'standard';
        document.documentElement.dataset.cardStyle = theme.cardStyle || 'standard';
      }
    }
  } catch (e) {}

  function applyPresentation(theme) {
    var root = document.documentElement;
    root.dataset.headerStyle = theme.headerStyle || 'standard';
    root.dataset.heroStyle = theme.heroStyle || 'immersive';
    root.dataset.pageHeaderStyle = theme.pageHeaderStyle || 'standard';
    root.dataset.cardStyle = theme.cardStyle || 'standard';
  }

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
