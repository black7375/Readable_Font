/*jshint esversion: 6 */

function id_callback(callback)
{
  if(callback && typeof(callback) === "function")
  {
    callback("font_sharpen");
    callback("font_substitue");
    callback("font_math");
  }
}
