#include <windows.h>
#include <iostream>

void PressKey(WORD keyCode)
{
    keybd_event(keyCode, 0, 0, 0);               // Key down
    Sleep(50);                                   // Small delay
    keybd_event(keyCode, 0, KEYEVENTF_KEYUP, 0); // Key up
}

int main()
{
    Sleep(2000);    // Give some time to switch to a text editor
    PressKey(0xAD); // Simulate pressing 'A' (0x41 is the virtual keycode for 'A')
    return 0;
}