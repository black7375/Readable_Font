/*jshint esversion: 6 */
/* =====================================================
 Checkbox Load && Storage
 ===================================================== */
var storage = chrome.storage.local;

function get_checkbox(id)
{
  var check = document.getElementById(id);
  return check.checked;
}

function set_checkbox(id, value)
{
  var check     = document.getElementById(id);
  check.checked = value;
}

function load_checkbox(id)
{
  var state = id.substring(5);
  storage.get(state, (option) => {
    set_checkbox(id, option[state]);
  });
}

function toggle_storage(id)
{
  var state = id.substring(5);
  if (get_checkbox(id))
    storage.set({[state]: true});
  else
    storage.set({[state]: false});
}

function click_check(id)
{
  var font = document.getElementById(id);
  font.addEventListener("click", function() {
    toggle_storage(id);
  });
}

window.addEventListener('load', () => {
  id_callback(load_checkbox);
  id_callback(click_check);
});
