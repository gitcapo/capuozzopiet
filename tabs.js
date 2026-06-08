(function () {
  const tabs = document.querySelector(".tabs");
  if (!tabs) {
    return;
  }

  const links = Array.from(tabs.querySelectorAll("a"));

  function placeBlob(link) {
    tabs.style.setProperty("--blob-left", `${link.offsetLeft}px`);
    tabs.style.setProperty("--blob-width", `${link.offsetWidth}px`);
  }

  function setCurrent(link) {
    links.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    placeBlob(link);
  }

  const current = tabs.querySelector('[aria-current="page"]') || links[0];
  placeBlob(current);
  requestAnimationFrame(() => tabs.classList.add("is-ready"));

  window.addEventListener("resize", () => {
    const active = tabs.querySelector('[aria-current="page"]') || current;
    placeBlob(active);
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        link.getAttribute("aria-current") === "page" ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      setCurrent(link);
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 230);
    });
  });
})();
