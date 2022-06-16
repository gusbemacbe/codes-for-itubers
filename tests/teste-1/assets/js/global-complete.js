function changeCSS(sheet) 
{
    document.getElementById('active_stylesheet').setAttribute('href', sheet)
}

function setFolder(element) 
{
    const folderName = element[element.selectedIndex].dataset.folder + "/" + element.value;

    changeCSS("assets/css/tokens/" + folderName + ".css")

    console.log(folderName)

    localStorage.setItem('theme', folderName)
    localStorage.setItem('theme_number', element.selectedIndex)

    return folderName;
}

if (localStorage.key("theme")) 
{
    var ele = document.querySelectorAll('#ThemeSelect option');
    ele[localStorage.getItem("theme_number")].selected = "true";

    changeCSS("assets/css/tokens/" + localStorage.getItem('theme') + ".css")
}

var translator = new Translator(
    {
        defaultLanguage: "en",
        detectLanguage: true,
        selector: "[data-i18n]",
        debug: false,
        registerGlobally: "__",
        persist: false,
        persistKey: "preferred_language",
        filesLocation: "i18n"
    }
);

translator.fetch(["de", "en", "es"]).then(() => 
{
    var languageStored = localStorage.getItem('languageChosen')

    if (languageStored)
    {
        translator.translatePageTo(languageStored)
    }

    else
    {
        translator.translatePageTo()
    }

    registerLanguageToggle();
});

function registerLanguageToggle() 
{
    LanguageSelect.addEventListener("change", evt => 
    {
        var language = evt.target.value
        translator.translatePageTo(language)

        localStorage.setItem('languageChosen', language)
    });

}