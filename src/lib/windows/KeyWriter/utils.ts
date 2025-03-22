import keyMap from "../constant/windowsKeyMaps";

// get key by value
const getKeyCode = (findKey: string) => {
  let FindCodes: { KeyCode: number | null; Shift: boolean } = {
    KeyCode: null,
    Shift: false,
  };

  for (const [key, value] of Object.entries(keyMap)) {
    if (typeof value == "object") {
      // check values for with shiftkey like (A,a,B,b,yY,},}....etc)
      for (const [k1, value_2] of Object.entries(Object(value))) {
        // check values insde shift
        if (value_2 == findKey) {
          // set keycode
          FindCodes.KeyCode = parseInt(key);

          // if user given shift key
          if (k1 == "shift") FindCodes.Shift = true;
          break;
        }
      }
    } else if (value == findKey) {
      // check values for without shiftkey like (delete key,Ctrl,Win,etc....)
      FindCodes.KeyCode = parseInt(key);
      break;
    }
  }

  return FindCodes;
};

export { getKeyCode };
