function changeCSS(sheet) {
    document.getElementById('active_stylesheet').setAttribute('href', sheet);
}

function setTheme(theme) {

    changeCSS("assets/css/tokens/voxel/" + theme + ".css")
    localStorage.setItem('theme', theme);
}

ThemeSelect.addEventListener('change', function () {
    setTheme(this.value)
});

const getTheme = () => {
    const theme = localStorage.getItem('theme');
    theme && setTheme(theme);
}

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

getTheme();

