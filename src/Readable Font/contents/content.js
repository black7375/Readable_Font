/*jshint esversion: 6 */
//====================basic
var storage = chrome.storage.local;

function load_css(file)
{
  var link   = document.createElement("link");
  link.href  = chrome.extension.getURL('contents/' + file + '.css');
  link.rel   = "stylesheet";
  link.type  = "text/css";
  link.media = "screen";
  link.id    = file;
  document.getElementsByTagName("html")[0].appendChild(link);
}

function unload(file)
{
  var node = document.getElementById(file);
  if (node)
    node.parentNode.removeChild(node);
}

function on_off(file, loadCallback, unloadCallback, loadOption, unloadOption)
{
  storage.get(file, (option) => {
    if (option[file])
    {
      if(loadCallback && typeof(loadCallback) === "function")
      {
        loadCallback(file);
        if(loadOption && typeof(loadOption) === "function")
          loadOption(file);
        if(file === "subpixel")
          unload("sharpen");
        if(file === "mathjax")
          load_mathjax();
      }
    } else
    {
      if(unloadCallback && typeof(unloadCallback) === "function")
      {
        unloadCallback(file);
        if(unloadOption && typeof(unloadOption) === "function")
          unloadOption(file);
      }
    }
  });
}

function check(file)
{
  on_off(file, load_css, unload, load_option, unload_option);
}

function update()
{
  check("sharpen");
  check("substitue");
  check("math");
}
window.addEventListener('load',update);
chrome.storage.onChanged.addListener(update);

//====================options
var feature = {
  sharpen:   ["subpixel", "legibility"],
  substitue: ["better", "alter"],
  math:      ["mathjax"]
};

function load_option(file)
{
  feature[file].forEach((option) => {
    on_off(option, load_css, unload);
  });
}

function unload_option(file)
{
  feature[file].forEach((option) => {
    unload(option);
  });
}

function load_mathjax()
{
  if((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null)
  {
    if((document.getElementsByTagName("math").length > 0) ||
       (document.getElementsByTagNameNS ==  null ? false :
        (document.getElementsByTagNameNS("http://www.w3.org/1998/Math/MathML","math").length > 0)))
    {
      var  head   = document.getElementsByTagName("head")[0];
      var script  = document.createElement("script");
      script.type = "text/x-mathjax-config";
      script[(window.opera ? "innerHTML" : "text")] =
        "  MathJax.Hub.Config({\n" +
        "  \"HTML-CSS\": {\n" +
        "    messageStyle: \"normal\",\n" +
        "    linebreaks: {\n" +
        "      automatic: false\n" +
        "    },\n" +
        "    undefinedFamily: \"'STIX Two Math', STIXGeneral, 'Arial Unicode MS', 'Noto Serif KR', serif\"\n" +
        "  },\n" +
        "  config: [\"MMLorHTML.js\"],\n" +
        "  jax: [\"input/TeX\",\"input/MathML\",\"output/HTML-CSS\",\"output/NativeMML\"],\n" +
        "  extensions: [\"tex2jax.js\",\"mml2jax.js\",\"MathMenu.js\",\"MathZoom.js\"],\n" +
        "  TeX: {\n" +
        "    extensions: [\"AMSmath.js\",\"AMSsymbols.js\",\"noErrors.js\",\"noUndefined.js\"]\n" +
        "  }\n" +
        "});";
      head.appendChild(script);

      script       = document.createElement("script");
      script.async = "";
      script.type  = "text/javascript";
      script.src   = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML-AM_HTMLorMML";
      script.id    = "mathjax";
      head.appendChild(script);
    }
  }
}
