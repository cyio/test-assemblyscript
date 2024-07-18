#include <iostream>
#include <nlohmann/json.hpp>

int main() {
    nlohmann::json j;
    std::vector<int> data;
    // std::vector<int> data = {}; // blank array
    // std::vector<int> data = {1, 2, 3};
    data.push_back(10);
    j["message"] = "Hello, World!";
    j["arr"] = data;  // 直接将 vector 赋值给 JSON 对象的一个键
    std::cout << j.dump(4) << std::endl;
    return 0;
}