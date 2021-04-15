---
title: c++：iterator.begin() 和 *iterator.begin() 的区别 【未完】
data: 2021-4-14
tags: 
  - c++
author: zz
location: Beijing
---

## 情景描述

有如下 `c++` 代码：

```cpp
    auto b = vec.begin();
    *b = 99999;
    for (int &i : vec) {
        cout << i << " ";   // Output: 99999 2 3 4 5
    }
    cout << endl;

    auto bb = *vec.begin(); 
    cout << "bb: " << bb << endl;
    bb = 5;
    for (int & i : vec) {
        cout << i << " ";   // Output: 99999 2 3 4 5
    }
    cout << endl;
```

通过 *b 的方式可以更改元素的值，而 bb 则不行。这里我比较疑惑的是，*b 和 *vec.begin() 难道不一样吗？

通过编译器查看得知，b 的类型是 `__wrap_iter<vector<int, allocator<_Tp>>::pointer>`，bb 的类型是 `int`，这让我有了一些思路。

举一个指针的例子：

```cpp
    int i = 5;
    int *p = &i;

    // 类似上面的 b
    int *b = p;
    *b = 555;
    cout << i << endl;  // Output: 555
                        // 修改成功

    // 类似上面的 bb
    int bb = *p;
    bb = 555;
    cout << i << endl; // Output: 5
                      //  未修改
```

b 保存的是 p 指向的地址，也就是 i，所以通过解引用 *b 的方式可以更改掉 i 的值，而 bb 保存的是 p 解引用的值，仅仅是一个 int 变量，而不是地址，自然也不会对 i 产生任何影响。

### 说明

鉴于还处于初学 c++ 的阶段，对迭代器以及语言本身都不熟悉，所以以上仅仅是猜想，本文仅做保存记录，方便以后的回看。



<Vssue :title="$title" />