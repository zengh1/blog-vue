---
title: 剑指 Offer 18. 删除链表的节点
data: 2021-1-27
tags: 
  - 链表
author: zz
location: Beijing
---

## 题目描述

> 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
>
> 返回删除后的链表的头节点。
>
> 注意：此题对比原题有改动
>
> 示例 1:
>
> 输入: head = [4,5,1,9], val = 5
> 输出: [4,1,9]
> 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
> 示例 2:
>
> 输入: head = [4,5,1,9], val = 1
> 输出: [4,5,9]
> 解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
>
>
> 说明：
>
> 题目保证链表中节点的值互不相同
> 若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点。





####  双指针

算法流程：

1. 定量两个变量 i 和 j，这两个变量初始都指向链表的头结点
2. 先让 j 向前移动 k 步
3. i 和 j 同时向前移动
4. 当 j 的值为 null 时，i 就是倒数第 k 个节点



![](https://zkept-1302605083.cos.ap-nanjing.myqcloud.com/LeetCode/%E5%89%91%E6%8C%87Offer22_%E9%93%BE%E8%A1%A8%E4%B8%AD%E5%80%92%E6%95%B0%E7%AC%ACk%E4%B8%AA%E8%8A%82%E7%82%B9.png)





代码如下：

```go
func getKthFromEnd(head *ListNode, k int) *ListNode {
    h := head
    i, j := h, h

    // j 先走 k 步
    for i := 0; i < k; i++ {
        if j != nil {
            j = j.Next
        }
    }
    // 之后 i 和 j 同时前进 1 步
    for j != nil {
        i = i.Next
        j = j.Next
    }
    return i
}
```



<Vssue :title="$title" />