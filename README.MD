# node-global-listener

A lightweight and efficient Node.js package for global keyboard and mouse event listening. Supports reading and writing key inputs, tracking mouse pointers, and operating in the background.

## Installation

```sh
npm install node-global-listener
```

## Usage

### Importing the Module

```ts
import { KeyEventReader } from "node-global-listener";
```

### Start Listening to Keyboard Events

```ts
const keyEvent = new KeyEventReader();

// Listen for keyDown events
keyEvent.on("keyDown", (keyData) => {
  console.log(keyData);
});

// Listen for keyUp events
// keyEvent.on("keyUp", (keyData) => {
//     console.log(keyData);
// });
```

## Features

- ✅ Global keyboard event tracking (Only key reading implemented)
- ✅ Works in the background
- 🔜 Global mouse event tracking (Coming soon)
- 🔜 Key writing support (Coming soon)
- ✅ Lightweight and efficient

## API

### `KeyEventReader`

Class for listening to global keyboard events.

#### Methods:

- `on(event: "keyDown", callback: (keyData: KeyData) => void): void` - Listens for key press events.
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
