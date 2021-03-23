---
title: 剑指 Offer 52. 两个链表的第一个公共节点
data: 2021-3-23
tags: 
  - 链表
author: zz
location: Beijing
---


## 题目描述

> 输入两个链表，找出它们的第一个公共节点。	编写一个程序，找到两个单链表相交的起始节点。
>
> 	如下面的两个链表：
> 	
> 	  a1 -> a2 ↘
> 					    		c1 -> c2 -> c3
> 		b1 -> b2 -> b3 ↗
> 
>
> 	在节点 c1 开始相交。
>
>
> 	示例 1：
> 	
> 	         4 -> 1 ↘
> 					 8 -> 4 -> 5
> 	    5 -> 0 -> 1 ↗
> 	
> 	输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5],
> 		 skipA = 2, skipB = 3
> 	
> 	输出：Reference of the node with value = 8
> 	
> 	输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
> 			从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
> 			在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
>
>
> 	示例 2：
> 	
> 	2 -> 6 -> 4
> 	1 -> 5
> 	
> 	输入：intersectVal = 0, listA = [2,6,4], listB = [1,5],
> 		 skipA = 3, skipB = 2
> 	输出：null
> 	
> 	输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
> 	由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
> 	解释：这两个链表不相交，因此返回 null。
>
>
> 如果两个链表没有交点，返回 null.
> 在返回结果后，两个链表仍须保持原有的结构。
> 可假定整个链表结构中没有循环。
> 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
> 本题与主站 160 题相同：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/


## 方法1 双指针法

具体的方法如下图所示：

![](../.vuepress/public/offer52.jpg)

对应代码如下：

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    // 不需要边界检查
    // if headA == nil || headB == nil {
    //     return nil
    // }
    hha, hhb := headA, headB
    //pa, pb := headA, headB

    for headA != headB {
        if headA == nil {
            headA = hhb
        } else {
            headA = headA.Next
        }
        
        if headB == nil {
            headB = hha
        } else {
            headB = headB.Next
        }
    }

    return headA
}
```

## 错误记录

### 1.超出时间限制

``` go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    hha, hhb := headA, headB
    pa, pb := headA, headB

    for pa != pb {
        pa = pa.Next
        if pa == nil {
            pa = hhb
        }

        pb = pb.Next
        if pb == nil {
            pb = hha
        }
    }

    return pa
}
```

测试用例：
```go
0
[2,6,4]
[1,5]
3
2
```

分析：两个链表分别为 2 -> 6 -> 4 和 1 -> 5，且没有交点，而上面代码的问题在于，当某个指针为 null 时，会继续跳转到另一个链表的头部，而不会停留。对应代码为：
```go
pa = pa.Next
if pa == nil {
    pa = hhb
}
```

对于两个不相交的链表而言，退出 while 的条件是两个指针都为 null，而上面的代码会导致指针永远不为 null， while 条件 pa != pb 永远不会成立，所以会进入死循环。


### 2.其中一个链表为空

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    hha, hhb := headA, headB
    pa, pb := headA, headB

    for pa != pb {
        if pa == nil {
            pa = hhb
        }
        pa = pa.Next
        
        if pb == nil {
            pb = hha
        }
        pb = pb.Next
        
    }

    return pa
}
```    

测试用例：
```
0
[1,3]
[]
2
0
```

分析：解决之前的 `超出时间` 问题很简单，只要调换一下 pa == nil 和 pa = pa.Next 的位置即可，现在指针会停留在 null 上了。

但又有了新的问题：如果两个链表有一个为空，如这里的测试用例 1 -> 3 和 null，此时第一个指针移动到 3，第二个链表的指针会直接移动到第一个链表的 1 处，接着又会执行 pa = pa.Next 移动到 3，两个指针的节点相同，返回结果 3

这个结果明显是错误的，有一个空链表，怎么可能会有交点呢，错误的原因在于：pa = pa.Next 这句话是一定会执行的，解决这个问题只需要为 pa = pa.Next 加一个 else，让 pa = hhb 和 pa = pa.Next 只有一个能执行即可，更改后如下。

```go
if pa == nil {
    pa = hhb
} else {
    pa = pa.Next  
}
        
```

起初还以为是边界判断的问题，为此加上了判断语句
```
  if headA == nil || headB == nil {
      return nil
  }
```
后来分析了以后才发现，这道题并不需要边界检查。


## 一个特殊的测试用例
```
3
[3]
[2,3]
0
1
```
两个链表分别为 3 和 2 -> 3，在 3 处相交。

按照上面的步骤：
第 1 次 
p1 = 3.Next = null （链表1）
p2 = 2.Next = 3    （链表2）

第 2 次 
p1 = 2              （链表2）
p2 = 3.Next = null  （链表2）

第 3 次
p1 = 2.Next = 3     （链表2）
p2 = 3              （链表1）

此时虽然两个指针都为 3，但是并不是同一个节点，一个在链表1，一个在链表2，按照逻辑，如果继续往下执行，两个指针则都为 null，会返回错误结果 无交点。

但返回的却是正确结果 3，造成这一结果的原因，只可能是两个链表的 3 节点是相同的地址，为了验证这一猜想，打印一下两个结构体：

```go
fmt.Printf("h1:%p %v h2:%p %v\n", 
        headA, headA, headB, headB)

// Output:
// h1:0xc00008a320 &{3 <nil>}   h2:0xc00008a340 &{2 0xc00008a320}        
```

果真如此，两个链表的 3 节点地址都为 0xc00008a320
 






<Vssue :title="$title" />