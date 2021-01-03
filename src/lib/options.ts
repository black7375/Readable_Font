//== Make Option ===============================================================
export interface optionI {
  id:     string;
  label:  string;
  dstate: boolean;
  subs:   optionI[] | null;
}

const make_option = (
  id: string, label: string, dstate = false, subs: optionI[] | null = null
): optionI => {
  return {
    id:     id,
    label:  label,
    dstate: dstate,
    subs:   subs
  }
}

//== Sharpen Option ============================================================
const SUBPIXEL_OPT   = make_option("font_subpixel", "저해상도 기기 최적화");
const LEGIBILITY_OPT = make_option("font_legibility", "가독성 향상", true);

const SHARPEN_OPT = make_option("font_sharpen", "선명하게", true, [
  SUBPIXEL_OPT,
  LEGIBILITY_OPT
]);

//== Substitue Option ==========================================================
const BETTER_OPT = make_option("font_better", "향상된 글꼴", true);
const ALTER_OPT  = make_option("font_alter", "비슷한 글꼴");

const SUBSTITUE_OPT = make_option("font_substitue", "글꼴치환", true, [
  BETTER_OPT,
  ALTER_OPT
]);

//== Math Option ===============================================================
const MATHJAX_OPT = make_option("font_mathjax", "MathJax", true);

const MATH_OPT = make_option("font_math", "수식표현", true, [
  MATHJAX_OPT
]);

//== Main Option ===============================================================
const READABLE_OPTIONS = [
  SHARPEN_OPT,
  SUBSTITUE_OPT,
  MATH_OPT
];
export default READABLE_OPTIONS;
