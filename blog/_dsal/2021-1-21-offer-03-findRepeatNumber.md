---
title: 剑指 Offer 03. 数组中重复的数字
data: 2021-1-21
tags: 
  - 数组
  - 算法
  - 哈希表
author: zz
location: Beijing
---


## 题目描述

> 找出数组中重复的数字。
>
>
> 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
>
> 示例 1：
>
> 输入：
> [2, 3, 1, 0, 2, 5, 3]
> 输出：2 或 3 
>
>
> 限制：
>
> 2 <= n <= 100000





####  方法1：哈希表

看到这种寻找重复元素的题目，首先想到的就是哈希表，通过 map 的 key 可以很容易的找到重复元素：

```go
func findRepeatNumber(nums []int) int {
    m := make(map[int]struct{})
    for i := 0; i < len(nums); i++ {
        // 如果该 key 已存在，说明重复
        if _, ok := m[nums[i]]; ok {
            return nums[i]
        }
        m[nums[i]] = struct{}{}
    }
    return -1
}

// 执行用时: 40 ms
// 内存消耗: 9.6 MB
```

复杂度分析：
时间复杂度 O(N) ： 遍历数组使用 O(N) ，map 添加与查找元素皆为 O(1) 。
空间复杂度 O(N) ： map 占用 O(N) 大小的额外空间。



#### 方法2：排序

对数组排序后，看相邻元素是否有相同的：

```go
func findRepeatNumber(nums []int) int {
  	// 先排序
    sort.Slice(nums, func(i, j int) bool {
        return nums[i] < nums[j]
    })
    for i := 0; i < len(nums); i++ {
        if nums[i] == nums[i+1] {
            return nums[i]
        }
    }
    return -1
}

// 执行用时: 48 ms
// 内存消耗: 8.7 MB
```

复杂度分析：
时间复杂度 O(NlogN) ： 排序的时间复杂度为 O(NlogN) 
空间复杂度 O(1) ： 无需额外空间



#### 方法3：原地置换、原地哈希

题干中有一句很重要的话：***在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内***，这说明了每个元素都可以存放在其值下标处（例如 2 可以存在 nums[2]，5 可以存在 nums[5]）,我们可以使用某种方法，将每个元素放到其对应位置，实现一个哈希表，哈希表的 key 是数组下标，value 是与下标相同的值，例如：

![](https://zkept-1302605083.cos.ap-nanjing.myqcloud.com/LeetCode/office_03_hash.jpg)

当 key 发生冲突时，说明该元素是我们要找的重复数，但是用什么方法使每个元素移动到其对应位置呢?

这里可以使用原地置换法，首先判断 i 是否等于 nums[i]，不是的话则继续判断 nums[i] 是否等于 nums[nums[i]]，如果相等，则说明发生了冲突，该数为重复数，直接返回，否则交换两个位置的值（swap(nums[i], nums[nums[i]]) ），如果 i 等于 nums[i]，则说明 nums[i] 已经放在了对应的位置，此时可以i++，重复上述步骤，直到 i > len(nums) 或者 return。



算法流程：

1. 遍历数组 numsnums ，设索引初始值为 i = 0 :
   1.  若 nums[i] = i ： 说明此数字已在对应索引位置，无需交换，因此跳过；
   2. 若 nums[nums[i]] = nums[i] ： 代表索引 nums[i] 处和索引 i 处的元素值都为 nums[i] ，即找      到一组重复值，返回此值 nums[i] ；
   3. 否则： 交换索引为 i 和 nums[i] 的元素值，将此数字交换至对应索引位置。
2. 若遍历完毕尚未返回，则返回 -1 。



文字可能不太好理解，结合下面的图帮助理解：



![](https://zkept-1302605083.cos.ap-nanjing.myqcloud.com/LeetCode/office_03.png)



```go
func findRepeatNumber(nums []int) int {
    i := 0
    for i < len(nums) {
        if i == nums[nums[i]] {
            i++
        } else if nums[i] == nums[nums[i]] {
            return nums[i]
        }
        nums[i], nums[nums[i]] = nums[nums[i]], nums[i]
    }
    return -1
}

// 执行用时: 36 ms
// 内存消耗: 8.7 MB

```

复杂度分析：
时间复杂度 O(N) ： 遍历数组使用 O(N)，每轮遍历的判断和交换操作使用 O(1)。
空间复杂度 O(1) ： 使用常数复杂度的额外空间。



<Vssue :title="$title" />