(() => {
  const storageKey = "rajat-blog-font";
  const root = document.documentElement;

  const getPreference = () => {
    try {
      return localStorage.getItem(storageKey) === "serif" ? "serif" : "sans";
    } catch {
      return "sans";
    }
  };

  const applyPreference = (preference) => {
    root.dataset.readingFont = preference;

    try {
      localStorage.setItem(storageKey, preference);
    } catch {
      // The preference still works for the current page when storage is blocked.
    }

    document.querySelectorAll("#font-preference-menu [role='option']").forEach((option) => {
      option.setAttribute("aria-selected", String(option.dataset.font === preference));
    });

    const trigger = document.getElementById("font-preference-menu-trigger");
    if (trigger) {
      trigger.dataset.font = preference;
      trigger.title = `Reading font: ${preference === "serif" ? "Serif" : "Sans"}`;
    }
  };

  const closeMenu = () => {
    const control = document.getElementById("font-preference-control");
    const trigger = document.getElementById("font-preference-menu-trigger");
    const menu = document.getElementById("font-preference-menu");

    if (!control || !trigger || !menu) return;
    control.dataset.open = "false";
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const mountControl = () => {
    if (document.getElementById("font-preference-control")) return;

    const search = document.getElementById("search-bar-entry");
    if (!search?.parentElement) return;

    const control = document.createElement("div");
    control.id = "font-preference-control";
    control.dataset.open = "false";
    control.innerHTML = `
      <button
        id="font-preference-menu-trigger"
        type="button"
        aria-label="Select reading font"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <span aria-hidden="true">Aa</span>
      </button>
      <div id="font-preference-menu" role="listbox" aria-label="Reading font" hidden>
        <button type="button" role="option" data-font="sans">
          <span>Sans</span><small>Inter</small>
        </button>
        <button type="button" role="option" data-font="serif">
          <span>Serif</span><small>Georgia</small>
        </button>
      </div>
    `;

    search.parentElement.classList.add("font-preference-row");
    search.insertAdjacentElement("afterend", control);

    const trigger = control.querySelector("#font-preference-menu-trigger");
    const menu = control.querySelector("#font-preference-menu");

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = control.dataset.open === "true";
      control.dataset.open = String(!isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      menu.hidden = isOpen;
    });

    menu.addEventListener("click", (event) => {
      const option = event.target.closest("[data-font]");
      if (!option) return;
      applyPreference(option.dataset.font);
      closeMenu();
      trigger.focus();
    });

    applyPreference(getPreference());
  };

  applyPreference(getPreference());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountControl, { once: true });
  } else {
    mountControl();
  }

  new MutationObserver(mountControl).observe(root, { childList: true, subtree: true });
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
})();
