import { optionI } from './options';

const storage = chrome.storage.sync;
export default storage;

interface storageI {
  [key: string]: optionI["dstate"] | undefined;
}

export const getOption = async (id: string) => {
  const options = await new Promise<storageI>((resolve) => storage.get(id, resolve));
  return options[id];
};

export const setOption = (id: string, option: boolean) => {
  storage.set({[id]: option});
};
