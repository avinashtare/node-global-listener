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

void runKeylistener()
{
    int keepRunning = true;
    int option = -1;

    // keyup 1
    // keydown 2
    try
    {
        /* code */

        while (keepRunning)
        {
            std::cout << "Enter a option (0.Exit,1.KeyUp,2.KeyDown): ";
            std::cin >> option;

            switch (option)
            {
            // KEYUP
            case 1:
                WORD KeyCode = getKeyCode();
                KeyUp(KeyCode);
                break;
            // KEYDOWN
            case 2:
                WORD KeyCode = getKeyCode();
                KeyDown(KeyCode);
                break;
            // STOP
            case 0:
                keepRunning = false;
            // INVALID OPTION
            default:
                keepRunning = true;
                break;
            }
        }
    }
    catch (const std::exception &e)
    {
        // std::cout << e.what();
    }
}

int main()
{

    return 0;
}