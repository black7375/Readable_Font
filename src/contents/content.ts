//== Basic =====================================================================
const storage = chrome.storage.local;

type fileCallbackT = (file: string) => void;
const load_css: fileCallbackT = (file) => {
  const link = document.createElement("link");
  link.href  = chrome.extension.getURL('contents/' + file + '.css');
  link.rel   = "stylesheet";
  link.type  = "text/css";
  link.media = "screen";
  link.id    = file;
  document.getElementsByTagName("html")[0].appendChild(link);
}

const unload: fileCallbackT = (file) => {
  const node = document.getElementById(file);
  node?.parentNode?.removeChild(node);
}

const on_off = (file: string, loadCallback: fileCallbackT, unloadCallback: fileCallbackT,
                loadOption: fileCallbackT, unloadOption: fileCallbackT) => {
  storage.get(file, (option) => {
    if(option[file]) {
      loadCallback(file);
      loadOption(file);

      if(file === "subpixel")
        unload("sharpen");
      if(file === "mathjax")
        load_mathjax();
    }
    else {
      unloadCallback(file);
      unloadOption(file);
    }
  });
}

const check = (file: string) => {
  on_off(file, load_css, unload, load_option, unload_option);
}

const update = () => {
  check("sharpen");
  check("substitue");
  check("math");
}

window.addEventListener('load', update);
chrome.storage.onChanged.addListener(update);

//== Options ===================================================================
const feature = {
  sharpen:   ["subpixel", "legibility"],
  substitue: ["better", "alter"],
  math:      ["mathjax"]
};
type featureK = "sharpen" | "substitue" | "math";

const load_option: fileCallbackT = (file: featureK) => {
  feature[file].forEach((option) => {
    on_off(option, load_css, unload);
  });
}

const unload_option:fileCallbackT = (file: featureK) => {
  feature[file].forEach((option) => {
    unload(option);
  });
}

const load_mathjax = () => {
  if((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
    if((document.getElementsByTagName("math").length > 0) ||
      (document.getElementsByTagNameNS ==  null ? false :
        (document.getElementsByTagNameNS("http://www.w3.org/1998/Math/MathML","math").length > 0))) {
      const  head  = document.getElementsByTagName("head")[0];
      const script = document.createElement("script");
      script.type  = "text/x-mathjax-config";
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
