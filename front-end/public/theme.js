(() => {
	const prefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	let setting = "auto";

	try {
		setting = window.localStorage.getItem("vueuse-color-scheme") || "auto";
	} catch {
		// Keep the system preference when browser storage is unavailable.
	}

	if (setting === "dark" || (prefersDark && setting !== "light")) {
		document.documentElement.classList.add("dark");
	}
})();
