const eventsViewport = document.querySelector("#events-viewport");
const eventsTrack = document.querySelector("#events-track");
const eventsPrev = document.querySelector("#events-prev");
const eventsNext = document.querySelector("#events-next");

if (eventsViewport && eventsTrack && eventsPrev && eventsNext) {
    function updateEventsArrows() {
    const maxScroll =
        eventsViewport.scrollWidth - eventsViewport.clientWidth;

    const hasOverflow = maxScroll > 1;

    eventsPrev.disabled = !hasOverflow || eventsViewport.scrollLeft <= 1;
    eventsNext.disabled =
        !hasOverflow || eventsViewport.scrollLeft >= maxScroll - 1;
    }

  function scrollEvents(direction) {
    const firstCard = eventsTrack.querySelector(".event-card");

    if (!firstCard) {
      return;
    }

    const trackStyles = getComputedStyle(eventsTrack);
    const gap = parseFloat(trackStyles.columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;

    eventsViewport.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  }

  eventsPrev.addEventListener("click", () => scrollEvents(-1));
  eventsNext.addEventListener("click", () => scrollEvents(1));

  eventsViewport.addEventListener("scroll", updateEventsArrows, {
    passive: true,
  });

  window.addEventListener("resize", updateEventsArrows);

  updateEventsArrows();
}
