---
title: c++：如何理解函数返回一个引用【未完】
date: 2020-04-15
tags: 
  - c++
author: zz
location: Beijing   
---

有如下函数，其返回了一个引用：

```cpp
    int &ret_val(int &a) {
        return a;
    }
```

另一个函数用来接收返回的引用：

```cpp
    // 接收一个引用返回
    void receive_refer() {
        int i = 10;
        int a = ret_val(i); // int 接收
        cout << a << endl;  // Output: 10
        a = 50;
        cout << i << endl;  // Output: 10

        int &a1 = ret_val(i);   // int& 接收
        a1 = 50;
        cout << i << endl;  // Output: 50

        ret_val(i) = 555;
        cout << i << endl;  // Output: 555
    }
```
接收引用有两种方式：使用 int 接收，或者使用 int& 接收，分别对应上面的 a 和 a1，其中 a 不能修改 i 的值，而 a1 可以。我的疑问是，既然返回值是一个引用，那么接收者不应该也得是一个引用吗，就好比一个函数返回的是 int 指针，那么接收者也必须是一个 int 指针，而不能是 int。

对应上面的指针版：

```cpp
    int *ret_val(int *a) {
        return a;
    }

    void receive_() {
        int i = 10;
        int a = ret_val(&i);    // 错误，不能用 int 接收指针
        int *a1 = ret_val(&a);
        *a1 = 50;
        int aa = *a1;
        
    }
```