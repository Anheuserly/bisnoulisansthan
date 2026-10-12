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
      }
    }
  } catch (e) {}

  window.__applyThemeCss = function(cssText) {
    var el = document.getElementById('bsgss-theme-style');
    if (el) {
      el.innerHTML = ':root { ' + cssText + ' }';
    }
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
