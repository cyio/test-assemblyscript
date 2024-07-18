cmake_minimum_required(VERSION 3.14)  # 设置 CMake 最低版本需求
project(MyProject VERSION 1.0)      # 定义项目名和版本

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# 包含 FetchContent 模块
include(FetchContent)

# 获取 nlohmann/json 从 GitHub
FetchContent_Declare(
    json
    URL https://github.com/nlohmann/json/releases/download/v3.10.5/json.tar.xz
)
FetchContent_MakeAvailable(json)

# 添加可执行文件
add_executable(MyProject src/main.cpp)

# 链接 nlohmann_json 依赖到我们的项目
target_link_libraries(MyProject PRIVATE nlohmann_json::nlohmann_json)