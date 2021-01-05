import storage from '../lib/storage.ts';
import { getOption } from '../lib/storage';
import OPTIONS, { optionI } from '../lib/options';

//== Basic =====================================================================
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

// https://docs.mathjax.org/en/v2.5-latest/dynamic.html
const load_mathjax = () => {
  if( !("MathJax" in window) ) {
    if((document.getElementsByTagName("math").length > 0) ||
      (document.getElementsByTagNameNS ==  null ? false :
        (document.getElementsByTagNameNS("http://www.w3.org/1998/Math/MathML","math").length > 0))) {
      const  head  = document.getElementsByTagName("head")[0];
      const script = document.createElement("script");
      script.type  = "text/x-mathjax-config";
      script.text  =
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

      script.async = true;
      script.type  = "text/javascript";
      script.src   = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML-AM_HTMLorMML";
      script.id    = "mathjax";
      head.appendChild(script);
    }
  }
}

const unload: fileCallbackT = (file) => {
  const node = document.getElementById(file);
  node?.parentNode?.removeChild(node);
}

//==  =====================================================================
const on_off = (option: optionI) => {
  const id   = option.id;
  const subs = option.subs;

  getOption(id).then(optionValue => {
    if(optionValue === true) {
      load_css(id);
      subs?.map(subOption => on_off(subOption));

      if(id === "subpixel")
        unload("sharpen");
      if(id === "mathjax")
        load_mathjax();
    }
    else {
      unload(id);
      subs?.map(subOption => unload(subOption.id));
    }
  });
};

const update = () => {
  OPTIONS.map(option => {
    on_off(option);
  });
}

window.addEventListener('load', update);
chrome.storage.onChanged.addListener(update);
