function changeCSS(sheet) {
    document.getElementById('active_stylesheet').setAttribute('href', sheet);
}

// function setFolder() {
//     const e = document.getElementById("ThemeSelect");
//     const test = e.options[e.selectedIndex].getAttribute("data-id");

//     return test;
// }

function setFolder(element) {
    const folderName = element[element.selectedIndex].dataset.folder + "/" + element.value;

    changeCSS("assets/css/tokens/" + folderName + ".css")

    console.log(folderName);

    localStorage.setItem('theme', changeCSS("assets/css/tokens/" + folderName + ".css"));
    localStorage.getItem('theme');

    return folderName;
}

// function setTheme(theme) {

//     changeCSS("assets/css/tokens/" + setFolder() + ".css")

//     localStorage.setItem('folder', setFolder());
//     localStorage.setItem('theme', theme);
// }

// ThemeSelect.addEventListener('change', function () {
//     setTheme(this.value)
// });

// const getTheme = () => {
//     const theme = localStorage.getItem('theme');
//     theme && setFolder(theme);
// }

var translator = new Translator({
    defaultLanguage: "en",
    detectLanguage: true,
    selector: "[data-i18n]",
    debug: false,
    registerGlobally: "__",
    persist: false,
    persistKey: "preferred_language",
    filesLocation: "/i18n"
});

translator.fetch(["de", "en", "es"]).then(() => {
    translator.translatePageTo();
    registerLanguageToggle();
});

function registerLanguageToggle() {
    LanguageSelect.addEventListener("change", evt => {
        var language = evt.target.value;
        translator.translatePageTo(language);

        console.log(language)
    });
}

// getTheme();
