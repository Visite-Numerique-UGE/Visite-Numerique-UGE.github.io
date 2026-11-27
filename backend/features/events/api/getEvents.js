// https://culture.univ-gustave-eiffel.fr/programmation

async function parseCulture(id = "article") {
    const targetUrl = "https://culture.univ-gustave-eiffel.fr/programmation";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
        throw new Error(`Impossible de charger les événements : HTTP ${response.status}.`);
    }

    const data = await response.json();
    if (typeof data.contents !== "string") {
        throw new Error("La réponse des événements ne contient pas de page HTML.");
    }

    const htmlObject = new DOMParser().parseFromString(data.contents, "text/html");
    const el_id = htmlObject.getElementsByClassName(id);

    const result = []
    for (let i = 0; i < el_id.length; i++) {
        const title = el_id[i].querySelector("a");
        const date = el_id[i].querySelector("time");
        const description = el_id[i].querySelector(".teaser-text");
        if (!title || !date || !description) continue;

        const tags = []
        const tagElements = el_id[i].getElementsByClassName("label");

        for (let y = 0; y < tagElements.length; y++) {
            tags.push(tagElements[y].textContent.trim())
        }

        result.push({
            title: title.title || title.textContent.trim(),
            date: date.textContent.trim(),
            tags,
            description: description.textContent.trim(),
        })
    }

    return result
}


export { parseCulture };