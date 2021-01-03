import { callbackT, callback_checkbox } from "../lib/checkbox";

const id_callback = (callback: callbackT) => {
  callback("font_sharpen");
  callback("font_substitue");
  callback("font_math");
}

callback_checkbox(id_callback);
