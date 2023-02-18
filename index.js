let submitBtn = document.querySelector("button.submit")
let loadingAnimation = document.querySelector("div.loading-animation")

let translate = async function (q, fromLang, toLang) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", q);
    encodedParams.append("target", toLang);
    encodedParams.append("source", fromLang);

    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

    const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '216a2abfa3msh5c20bb37e09f059p119544jsnbdad83e7ab0f',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: encodedParams
    };
    try {
        let response = await fetch(url, options)
        let data = await response.json()
        return data.data.translations[0].translatedText
        
    } catch (error) {
        console.log(error)
        return (error)
    }
}

submitBtn.addEventListener("click", async function (event) {  
    let qValue = document.querySelector("textarea.q").value
    let fromLangValue = document.querySelector("select.fromLang").value
    let toLangValue = document.querySelector("select.toLang").value
    loadingAnimation.classList.remove("none-display")
    let translatedText = await translate(qValue, fromLangValue, toLangValue)
    loadingAnimation.classList.add("none-display")
    document.querySelector("textarea.output").innerHTML = translatedText
})