/* =====================================================
 Checkbox Load && Storage
 ===================================================== */

const storage = chrome.storage.local;
const get_state   = (id: string) => id.substring(5);
const get_checked = (id: string) => {
  return <HTMLInputElement> document.getElementById(id);
}

const set_checkbox = (id: string, value: boolean) => {
  const checkbox = get_checked(id);
  checkbox.checked = value;
}

const load_checkbox = (id: string) => {
  const state = get_state(id);
  storage.get(state, (option) => {
    set_checkbox(id, option[state]);
  });
}

const toggle_storage = (id: string) => {
  const state = get_state(id);
  if (get_checked(id))
    storage.set({[state]: true});
  else
    storage.set({[state]: false});
}

const click_check = (id: string) => {
  const checkbox = get_checked(id);
  checkbox.addEventListener("click", function() {
    toggle_storage(id);
  });
}

export type callbackT = (id: string) => void
type id_callbackT = (callback: callbackT) => void;
export const callback_checkbox = (id_callback: id_callbackT) => {
  window.addEventListener('load', () => {
    id_callback(load_checkbox);
    id_callback(click_check);
  });
}
