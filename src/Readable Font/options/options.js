/*jshint esversion: 6 */
var storage = chrome.storage.local;

var options = {
  legibility: true,
  better:     true,
  mathjax:    true
};
var optionList = Object.keys(options);

function init_options()
{
  optionList.forEach((option) => {
    storage.get(option, (state) => {
      if(typeof(state[option]) === "undefined" || state[option] === null)
        storage.set(options);
    });
  });
}

function id_callback(callback)
{
  if(callback && typeof(callback) === "function")
  {
    callback("font_subpixel");
    callback("font_legibility");

    callback("font_better");
    callback("font_alter");

    callback("font_mathjax");
  }
}

window.addEventListener('load', () => {
  init_options();
});
