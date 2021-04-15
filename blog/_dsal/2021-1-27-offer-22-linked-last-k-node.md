---
title: 剑指 Offer 22. 链表中倒数第k个节点
data: 2021-1-27
tags: 
  - 链表
  - 双指针
author: zz
location: Beijing
---

## 题目描述

> 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。
>
>
> 
>**示例：**
> 
>给定一个链表: 1->2->3->4->5, 和 k = 2.
> 
> 返回链表 4->5.





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