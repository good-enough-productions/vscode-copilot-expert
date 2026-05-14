document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar a");
    const searchInput = document.getElementById("dashboardSearch");
    const filterButtons = document.querySelectorAll(".filter-chip");
    const panels = document.querySelectorAll(".content > .panel[data-topics]");

    let selectedFilter = "all";

    links.forEach((link) => {
        link.addEventListener("click", () => {
            links.forEach((item) => item.classList.remove("is-active"));
            link.classList.add("is-active");
        });
    });

    function matchesFilter(topics) {
        return selectedFilter === "all" || topics.includes(selectedFilter);
    }

    function matchesQuery(text) {
        const query = searchInput.value.trim().toLowerCase();
        return !query || text.includes(query);
    }

    function applyFilters() {
        panels.forEach((panel) => {
            const topics = (panel.dataset.topics || "").toLowerCase().split(/\s+/).filter(Boolean);
            const text = panel.textContent.toLowerCase();
            const isVisible = matchesFilter(topics) && matchesQuery(text);

            panel.classList.toggle("is-hidden", !isVisible);
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedFilter = button.dataset.filter;
            filterButtons.forEach((item) => item.classList.remove("is-selected"));
            button.classList.add("is-selected");
            applyFilters();
        });
    });

    searchInput.addEventListener("input", applyFilters);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const panelId = entry.target.id;
                links.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${panelId}`);
                });
            });
        },
        {
            rootMargin: "-25% 0px -55% 0px",
            threshold: 0.05
        }
    );

    panels.forEach((panel) => observer.observe(panel));
    applyFilters();
});