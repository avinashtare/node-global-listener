# node-global-listener

A lightweight and efficient Node.js package for capturing global keyboard and mouse events, supporting key presses, mouse movements, input simulation, and background operation. 🚀

## Installation

```sh
npm install node-global-listener
```

**Compatibility Table:**

| Platform | Compatible? | Tested      |
| -------- | ----------- | ----------- |
| Windows  | True        | Win10,Win11 |
| Mac      | Coming Soon | Null        |
| Linux    | Coming Soon | Null        |

## Features

- ✅ Keyboard Events: Detect and record key presses, releases, and combinations.
- ✅ Mouse Events: Track mouse position, clicks, and button presses.
- ✅ Input Simulation: Read and write keyboard inputs programmatically.
- ✅ Background Operation: Works seamlessly without interfering with other applications.
  Ideal for automation, keylogging (ethical use), and input monitoring. 🚀

### Importing the Module

```ts
import { KeyboardHandler, KeyEventReader } from "node-global-listener";
```

### Start Listening to Keyboard Events

### `KeyEventReader`

```ts
const keyEvent = new KeyEventReader();

// Listen for keyDown events
keyEvent.on("keyDown", (keyData) => {
  console.log(keyData);
});

// Listen for keyUp events
keyEvent.on("keyUp", (keyData) => {
  console.log(keyData);
});
```

### Start Listening to Press (Writing) Keys

### `KeyboardHandler`

```ts
const Keys = new KeyboardHandler();
Keys.KeyPress("A"); // key press
Keys.KeyDown("b"); // key down
Keys.KeyUp("B"); // key up
```

## API

### `KeyEventReader`

Class for listening to global keyboard events.

#### Methods:

- `on(event: "keyDown" | "keyUp" | "keyPress" , callback: (keyData: KeyData) => void): void` - Listens for key press events.
- **Future methods will include mouse tracking and advanced key functionalities.**

#### KeyData Structure:

```ts
interface KeyData {
  KeyCode: number; // Key code
  KeyUp?: boolean; // Key pressed
  KeyDown?: boolean; // Key relsesed
  Shift: boolean;
  CapsLock: boolean;
  Control: boolean;
  key: string;
}
```

---

### `KeyEventReader`

Class for listening to global keyboard events.

#### Methods:

- `Keys.KeyPress(KeyName,TIME);` // Default TIME 80ms
- `Keys.KeyDown(KeyName);`
- `Keys.KeyUp(KeyName);`

`Parameters`

- [KeyName](https://github.com/avinashtare/node-global-listener/blob/main/src/lib/windows/constant/windowsKeyMaps.ts) check for all keys referance. for example "A","B","F1","Delete"...

## Development

To contribute to the development of this package:

1. Fork the repository.
2. Clone your fork:
   ```sh
   git clone https://github.com/avinashtare/node-global-listener.git
   ```
3. Navigate to the project directory:
   ```sh
   cd node-global-listener
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
6. Make your changes and commit:
   ```sh
   git commit -m 'Add new feature'
   ```
7. Push to your branch:
   ```sh
   git push origin feature/your-feature-name
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or contributions, contact: avinashtare.work@gmail.com

## Author

卐 🕉 Avinash Tare 🕉 卐
