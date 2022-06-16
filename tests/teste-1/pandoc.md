---
title: Teste de Pandoc
---

<link rel="stylesheet" media="screen" type="text/css" href="assets/css/global.css">
<link rel="stylesheet" media="screen" type="text/css" href="assets/css/tokens/voxel/ion.css" id="active_stylesheet">
<style>
    p
    {
        color: red;
    }
</style>

# Pandoc

<div class="demo">
<label for="ThemeSelect"> Themes </label>
<select id="ThemeSelect" onchange="setFolder(this)">
    <option data-folder="gusbemacbe" value="cyberpunk">cyberpunk</option>
    <option data-folder="voxel"      value="ion">íon</option>
    <option data-folder="voxel"      value="itau">itaú</option>
    <option data-folder="voxel"      value="iti">iti</option>
</select>
</div>

<div class="demo">
<label for="LanguageSelect"> Languages </label>
<select id="LanguageSelect">
    <option value="en">EN</option>
    <option value="de">DE</option>
    <option value="es">ES</option>
</select>
</div>

<div class="demo">

# How To Cook A Juicy Chicken Breast {data-i18n="title"}

[There’s a big difference between juicy chicken breasts and rubbery chicken breasts. Obviously, you want to avoid the latter at all costs. Follow these 4 steps and you’re gold. You want to add protein to favorites like Caesar salad or fix up a quick chicken salad or club sandwich? Try this method and savor the results.]{data-i18n="content"}

## Ingredients {data-i18n="ingredients.title"}

* [1 pound boneless chicken breasts]{data-i18n="ingredients.$0"}
* [2 teaspoons olive oil]{data-i18n="ingredients.$1"}
* [salt and pepper]{data-i18n="ingredients.$2"}

</div>

<a class="button" href="#">Visite</a>

<script src="assets/js/plugins/simple-translator.js"></script>
<script src="assets/js/global-complete.js"></script>