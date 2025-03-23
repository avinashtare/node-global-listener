#include <windows.h>
#include <iostream>

// void PressKey(WORD keyCode)
// {
//     keybd_event(keyCode, 0, 0, 0);               // Key down
//     Sleep(50);                                   // Small delay
//     keybd_event(keyCode, 0, KEYEVENTF_KEYUP, 0); // Key up
// }

void KeyUp(WORD keyCode)
{
    keybd_event(keyCode, 0, KEYEVENTF_KEYUP, 0); // Key up
}

void KeyDown(WORD keyCode)
{
    keybd_event(keyCode, 0, 0, 0); // Key down
}

WORD getKeyCode()
{
    WORD KeyCode;
    std::cout << "Enter Key Code: ";
    std::cin >> KeyCode;
    return KeyCode;
}

int main()
{
    int stop = 1;
    int option = 4;

    // keyup 1
    // keydown 2
    try
    {
        /* code */

        while (stop)
        {
            std::cout << "Enter a option (0.Exit,1.KeyUp,2.KeyDown): ";
            std::cin >> option;
            if (option == 1)
            {
                WORD KeyCode = getKeyCode();
                KeyUp(KeyCode);
            }
            else if (option == 2)
            {
                WORD KeyCode = getKeyCode();
                KeyDown(KeyCode);
            }
            else
            {
                stop = 0;
            }
        }
    }
    catch (const std::exception &e)
    {
        // std::cout << e.what();
    }
    return 0;
}