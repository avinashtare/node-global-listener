#include <windows.h>
#include <iostream>

LRESULT CALLBACK MouseProc(int nCode, WPARAM wParam, LPARAM lParam)
{
    if (nCode >= 0)
    {
        MSLLHOOKSTRUCT *mouseInfo = (MSLLHOOKSTRUCT *)lParam;

        switch (wParam)
        {
        case WM_LBUTTONDOWN:
            std::cout << "Left Click Down: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        case WM_LBUTTONUP:
            std::cout << "Left Click Up: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        case WM_RBUTTONDOWN:
            std::cout << "Right Click Down: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        case WM_RBUTTONUP:
            std::cout << "Right Click Up: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        case WM_MBUTTONDOWN:
            std::cout << "Wheel Click Down: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        case WM_MBUTTONUP:
            std::cout << "Wheel Click Up: (" << mouseInfo->pt.x << ", " << mouseInfo->pt.y << ")" << std::endl;
            break;
        }

        std::cout.flush(); // Force flush output
    }
    return CallNextHookEx(NULL, nCode, wParam, lParam);
}

int main()
{
    HHOOK mouseHook = SetWindowsHookEx(WH_MOUSE_LL, MouseProc, NULL, 0);

    if (!mouseHook)
    {
        std::cerr << "Error: Could not set mouse hook!" << std::endl;
        return 1;
    }
    else
    {
        std::cout << "Mouse hook set successfully!" << std::endl;
    }

    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    UnhookWindowsHookEx(mouseHook);
    return 0;
}
