// https://culture.univ-gustave-eiffel.fr/programmation

async function parseCulture(id = "article") {
    const reponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://culture.univ-gustave-eiffel.fr/programmation')}`)



    const test = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://culture.univ-gustave-eiffel.fr/programmation')}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response was not ok.')
        })
        .then(data => { return (data.contents) });

    console.log("test", test)
    let htmlObject = document.createElement('div');
    htmlObject.innerHTML = test
    console.log("htmlObject", htmlObject)
    const el_id = htmlObject.getElementsByClassName(id)
    console.log(el_id)

    const result = []
    for (let i = 0; i < el_id.length; i++) {
        //title
        const title = el_id[i].querySelectorAll('a')
        console.log(title)
        console.log(title[0].title)
        //event-date
        const date = el_id[i].querySelectorAll('time')
        console.log(date)
        console.log(date[0].lastChild.content)


        //label
        const tag = el_id[i].getElementsByClassName("label")
        console.log("tag", tag)
        console.log(tag[0].textContent)

        let _tag = []
        for (let y = 0; y < tag.length; y++) {
            _tag.push(tag[y].textContent)
        }

        //teaser-text
        const desc = el_id[i].getElementsByClassName("teaser-text")
        console.log("desc", desc)
        console.log(desc[0].textContent)

        result.push([title[0].title, date[0].lastChild.content, _tag, desc[0].textContent])
    }

    return result
}


export { parseCulture };