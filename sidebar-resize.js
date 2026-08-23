(() => {
  const storageKey = "rajat-blog-sidebar-width";
  const defaultWidth = 304;
  const minWidth = 248;
  const maxWidth = () => Math.max(minWidth, Math.min(480, Math.floor(window.innerWidth * 0.45)));
  const root = document.documentElement;

  const clamp = (width) => Math.min(maxWidth(), Math.max(minWidth, width));

  const getStoredWidth = () => {
    try {
      const width = Number.parseInt(localStorage.getItem(storageKey), 10);
      return Number.isFinite(width) ? clamp(width) : defaultWidth;
    } catch {
      return defaultWidth;
    }
  };

  const applyWidth = (width, persist = true) => {
    const nextWidth = clamp(Math.round(width));
    root.style.setProperty("--sidebar-width", `${nextWidth}px`);

    const handle = document.getElementById("sidebar-resize-handle");
    if (handle) handle.setAttribute("aria-valuenow", String(nextWidth));

    if (persist) {
      try {
        localStorage.setItem(storageKey, String(nextWidth));
      } catch {
        // Resizing still works for the current page when storage is blocked.
      }
    }
  };

  const mountHandle = () => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar || document.getElementById("sidebar-resize-handle")) return;

    const handle = document.createElement("div");
    handle.id = "sidebar-resize-handle";
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-label", "Resize navigation sidebar");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("aria-valuemin", String(minWidth));
    handle.setAttribute("aria-valuemax", String(maxWidth()));
    handle.tabIndex = 0;
    sidebar.appendChild(handle);

    handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      root.classList.add("sidebar-is-resizing");
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", (event) => {
      if (!handle.hasPointerCapture(event.pointerId)) return;
      applyWidth(event.clientX);
    });

    const stopResize = (event) => {
      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
      root.classList.remove("sidebar-is-resizing");
    };

    handle.addEventListener("pointerup", stopResize);
    handle.addEventListener("pointercancel", stopResize);
    handle.addEventListener("dblclick", () => applyWidth(defaultWidth));

    handle.addEventListener("keydown", (event) => {
      const currentWidth = Number.parseInt(
        getComputedStyle(root).getPropertyValue("--sidebar-width"),
        10,
      );
      let nextWidth = currentWidth;

      if (event.key === "ArrowLeft") nextWidth -= 16;
      else if (event.key === "ArrowRight") nextWidth += 16;
      else if (event.key === "Home") nextWidth = minWidth;
      else if (event.key === "End") nextWidth = maxWidth();
      else return;

      event.preventDefault();
      applyWidth(nextWidth);
    });

    applyWidth(getStoredWidth(), false);
  };

  applyWidth(getStoredWidth(), false);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountHandle, { once: true });
  } else {
    mountHandle();
  }

  new MutationObserver(mountHandle).observe(root, { childList: true, subtree: true });
  window.addEventListener("resize", () => applyWidth(getStoredWidth(), false));
})();
