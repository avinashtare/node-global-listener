#include <windows.h>
#include <iostream>

HHOOK hHook; // Hook handle

// Function to check if Shift is held
bool IsShiftPressed()
{
    return (GetKeyState(VK_SHIFT) & 0x8000) != 0;
}
// Function to check IsCapsLockOn
bool IsCapsLockOn()
{
    return (GetKeyState(VK_CAPITAL) & 1) != 0; // Check if Caps Lock is ON
}
// Function to check IsCapsLockOn
bool IsControlPressed()
{
    return (GetKeyState(VK_CONTROL) & 1) != 0; // Check if Caps Lock is ON
}

bool ShiftPressed = IsShiftPressed();
bool CapsLockOn = IsCapsLockOn();
bool ControlPressed = IsControlPressed();

// Hook procedure callback
LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam)
{
    if (nCode >= 0)
    {

        KBDLLHOOKSTRUCT *kbStruct = (KBDLLHOOKSTRUCT *)lParam;

        if (wParam == WM_KEYDOWN || wParam == WM_SYSKEYDOWN)
        {
            // get current key
            int keyCode = kbStruct->vkCode;

            CapsLockOn = IsCapsLockOn();
            ShiftPressed = IsShiftPressed();

            // set for control key press
            if (keyCode == 162)
            {
                ControlPressed = 1;
            }

            std::cout << "KeyDown: " << 1
                      << ",KeyCode: " << keyCode
                      << ",Control: " << ControlPressed
                      << ",Shift: " << ShiftPressed
                      << ",CapsLock: " << CapsLockOn
                      << std::endl;
        }
        else if (wParam == WM_KEYUP || wParam == WM_SYSKEYUP)
        {
            int keyCode = kbStruct->vkCode;
            // set for control key release
            if (keyCode == 162 && ControlPressed == 1)
            {
                ControlPressed = 0;
            }
            std::cout << "KeyUp: " << 1
                      << ",KeyCode: " << keyCode
                      << ",Control: " << ControlPressed
                      << ",Shift: " << ShiftPressed
                      << ",CapsLock: " << CapsLockOn
                      << std::endl;
        }
    }

    // Pass the event to the next hook
    return CallNextHookEx(hHook, nCode, wParam, lParam);
}

// Hook installation
void SetHook()
{
    hHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, GetModuleHandle(NULL), 0);

    if (!hHook)
    {
        std::cerr << "Failed to install hook!" << std::endl;
    }
}

// Hook removal
void RemoveHook()
{
    UnhookWindowsHookEx(hHook);
}

// Message loop to keep hook active
void MessageLoop()
{
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
}

// Main function
int main()
{
    SetHook();
    // std::cout << "Keyboard Hook Installed. Press any key..." << std::endl;

    MessageLoop();

    RemoveHook();
    return 0;
}