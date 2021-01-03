import { callbackT, callback_checkbox } from "../lib/checkbox";

const storage = chrome.storage.local;
const options = {
  legibility: true,
  better:     true,
  mathjax:    true
};

const init_options = () => {
  const optionList = Object.keys(options);
  optionList.forEach((option) => {
    storage.get(option, (state) => {
      if(typeof(state[option]) === "undefined" || state[option] === null)
        storage.set(options);
    });
  });
}

const id_callback = (callback: callbackT) => {
  callback("font_subpixel");
  callback("font_legibility");

  callback("font_better");
  callback("font_alter");

  callback("font_mathjax");
}

window.addEventListener('load', () => {
  init_options();
});
callback_checkbox(id_callback);
