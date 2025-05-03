#include <windows.h>
#include <iostream>

int main()
{
    while (true)
    {

        POINT p;
        if (GetCursorPos(&p))
        {
            // std::cout << "\rMouse Position: X=" << p.x << " Y=" << p.y;
            std::cout << "Mouse Position: X=" << p.x << " Y=" << p.y << std::endl;
        }
        else
        {
            std::cerr << "Failed to get mouse position" << std::endl;
        }
    }
    return 0;
}
