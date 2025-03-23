#include <windows.h>
#include <iostream>

LRESULT CALLBACK LowLevelMouseProc(int nCode, WPARAM wParam, LPARAM lParam)
{
    if (nCode == HC_ACTION)
    {
        MSLLHOOKSTRUCT *pMouse = (MSLLHOOKSTRUCT *)lParam;
        if (wParam == WM_MOUSEWHEEL)
        {
            int delta = GET_WHEEL_DELTA_WPARAM(pMouse->mouseData);
            if (delta > 0)
            {
                std::cout << "Wheel Up" << std::endl;
            }
            else
            {
                std::cout << "Wheel Down" << std::endl;
            }
        }
    }
    return CallNextHookEx(NULL, nCode, wParam, lParam);
}

int main()
{
    // Set low-level mouse hook
    HHOOK hMouseHook = SetWindowsHookEx(WH_MOUSE_LL, LowLevelMouseProc, NULL, 0);
    if (!hMouseHook)
    {
        std::cerr << "Failed to set mouse hook!" << std::endl;
        return 1;
    }
    else
    {
        // std::cout << "Mouse hook set successfully!" << std::endl;
    }

    // Message loop to keep the hook active
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0))
    {
        if (msg.message == WM_QUIT)
            break;

        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // Cleanup: Unhook before exiting
    UnhookWindowsHookEx(hMouseHook);
    return 0;
}
