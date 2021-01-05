import { getOption, setOption } from '../lib/storage';
import OPTIONS, { optionI } from '../lib/options';

const initOptions = (option: optionI) => {
  const id         = option.id;
  const subOptions = option.subs;

  if(id === undefined) {
    setOption(id, option.dstate);
  }

  if(subOptions !== null) {
    subOptions.map(option => initOptions(option));
  }
};

// First Only
const initOption = "init";
getOption(initOption).then(option => {
  if(option === undefined || option === false) {
    OPTIONS.map(option => initOptions(option));
    setOption(initOption, true);
  }
});
