(function () {
  var VERSION_KEY = 'deql-doc-version';

  function getVersionPrefix() {
    var path = window.location.pathname;
    var match = path.match(/^\/(v[\d-]+)\//);
    if (match) {
      sessionStorage.setItem(VERSION_KEY, match[1]);
      return match[1];
    }
    var stored = sessionStorage.getItem(VERSION_KEY);
    return stored || '';
  }

  function rewriteSidebarLinks(versionPrefix) {
    if (!versionPrefix) return;

    var allLinks = document.querySelectorAll('aside a[href], [class*="sidebar"] a[href], nav a[href]');

    allLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('/' + versionPrefix) && href !== '/') {
        link.setAttribute('href', '/' + versionPrefix + href);
      }
    });
  }

  function buildDropdown(versions, currentVersion) {
    var versionSelect = document.createElement('select');
    versionSelect.style.cssText = 'background: transparent; color: var(--sl-color-white); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; font-size: 0.75rem; padding: 0.2rem 0.4rem; margin-right: 0.5rem; cursor: pointer; opacity: 0.85;';

    // Always add "latest" as first option
    var latestOpt = document.createElement('option');
    latestOpt.value = 'latest';
    latestOpt.textContent = 'latest';
    versionSelect.appendChild(latestOpt);

    // Add version options from versions.json
    versions.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v.value;
      opt.textContent = v.label;
      versionSelect.appendChild(opt);
    });

    versionSelect.value = currentVersion;

    versionSelect.addEventListener('change', function () {
      var v = versionSelect.value;
      var path = window.location.pathname;
      var stripped = path.replace(/^\/v[\d-]+\//, '/');

      if (v === 'latest') {
        sessionStorage.removeItem(VERSION_KEY);
        window.location.href = stripped;
      } else {
        sessionStorage.setItem(VERSION_KEY, v);
        window.location.href = '/' + v + stripped;
      }
    });

    return versionSelect;
  }

  function addNavItems() {
    var socialIcons = document.querySelector('.social-icons');
    if (!socialIcons) return;
    var container = socialIcons.parentElement;

    // Docs link
    var docsLink = document.createElement('a');
    docsLink.href = './overview/';
    docsLink.textContent = 'Docs';
    docsLink.style.cssText = 'color: var(--sl-color-white); text-decoration: none; font-size: 0.875rem; font-weight: 500; padding: 0.25rem 0.75rem; opacity: 0.85;';
    docsLink.addEventListener('mouseenter', function () { docsLink.style.opacity = '1'; });
    docsLink.addEventListener('mouseleave', function () { docsLink.style.opacity = '0.85'; });
    container.insertBefore(docsLink, socialIcons);

    // Version selector — fetch versions.json
    var versionPrefix = getVersionPrefix();
    var currentVersion = versionPrefix || 'latest';

    fetch('/versions.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var versionSelect = buildDropdown(data.versions || [], currentVersion);
        container.insertBefore(versionSelect, socialIcons);
      })
      .catch(function () {
        // Fallback: show just "latest" if versions.json is missing
        var versionSelect = buildDropdown([], currentVersion);
        container.insertBefore(versionSelect, socialIcons);
      });

    // Rewrite sidebar links if viewing a versioned page
    if (versionPrefix) {
      rewriteSidebarLinks(versionPrefix);

      // Clear session when "Switch to latest" banner link is clicked
      document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (link && link.closest('.sl-banner') && link.getAttribute('href') === '/') {
          sessionStorage.removeItem(VERSION_KEY);
        }
      });

      var observer = new MutationObserver(function () {
        rewriteSidebarLinks(versionPrefix);
      });
      var sidebar = document.querySelector('aside') || document.querySelector('[class*="sidebar"]');
      if (sidebar) {
        observer.observe(sidebar, { childList: true, subtree: true });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addNavItems);
  } else {
    addNavItems();
  }
})();
