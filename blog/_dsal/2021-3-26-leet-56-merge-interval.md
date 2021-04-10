---
title: LeetCode 56. 合并区间
data: 2020-10-25
tags: 
  - 数组
author: zz
location: Beijing
---

## 题目描述


> 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
> 请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
> 
> 示例 1：
>
> 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
> 输出：[[1,6],[8,10],[15,18]]
> 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
> 
> 示例 2：
>
> 输入：intervals = [[1,4],[4,5]]
> 输出：[[1,5]]
> 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
>

## 分析

如何判断区间是否重叠，需要比较第二个数组的首元素是否小于前一个数组的尾元素，例如 [1,5],[2,6]，2 是小于 6 的，所以存在重叠，
而 [2,6],[8,10] 中，8 大于 6，所以区间不重叠。判断是否重叠并不难，难的在于合并。

考虑如下几种情况：

1. 重叠，两个数组的尾元素`相同`，例如：[[1,4],[0,4]] => [0, 4]
2. 重叠，第二个数组的尾元素`大于`第一个数组的尾元素：[[1,5],[2,6]] => [1, 6]
3. 重叠，第二个数组的尾元素`小于`第一个数组的尾元素：[[1,5],[2,4]] => [1, 5]
4. 重叠，第一个数组的首元素`大于`第二个数组的首元素：[[1,4],[0,1]] => [1, 4]
5. 重叠，第一个数组的首元素`小于`第二个数组的首元素：[[0,4],[1,2]] => [1, 4]
6. 比较特殊的，[[1,4],[0,0]] => [[0,0],[1,4]]
7. 等等其他情况

可以看到情况有很多种，而我的第一想法也是粗暴的 if else，于是写出了下面的丑陋代码：

```go
	func merge(intervals [][]int) [][]int {
    res := make([][]int, 0)
    res = append(res, intervals[0])
    // 上一个数组的下标
    prev := 0
    //start, end := intervals[0][0], intervals[0][1]

    for i := 1; i < len(intervals); i++ {
        // 上一个数组的 [0] 和 [1]
        prevs, preve := intervals[prev][0], intervals[prev][1]
        // 当前数组的 [0] 和 [1]
        curs, cure := intervals[i][0], intervals[i][1]
        if curs <= preve && cure > preve {  // [[1,5],[2,6]]
            if curs < prevs {   // [[1,4],[0,5]]
                r := []int{curs, cure}
                res[i-1] = r
                prev = i - 1
            } else {
                r := []int{prevs, cure}
                res[i-1] = r
                prev = i - 1
            }
        } else if curs <= preve && cure <= preve { // [[1,5],[2,4]]
            if curs < prevs   {   // [[1,4],[0,4]]  [[1,4],[0,1]]
                r := []int{curs, preve}
                res[i-1] = r
                prev = i - 1
            } else if cure < prevs {    // [[1,4],[0,0]]
                res = append(res, intervals[i])
                swap(res, i, prev)
            } else {
                continue
            }
        }  else {
            res = append(res, intervals[i])
        }
    }

    return res
}

func swap(nums [][]int, i, j int) {
    nums[i], nums[j] = nums[j], nums[i]
}
```

这是在提交失败了 n 次的基础上不断修改的，每个 if 分支都标明了对应的情况，但是，还是遇到了一种特殊的测试用例：[[1,4],[0,0]]，我的代码运行的结果是 [0,4]，但是正确答案是 [[0,0],[1,4]]，为了对付这种情况，我又写了一个 swap 函数来应对。考虑的情况越来越多，代码也越来越丑，最关键的是，提交还始终无法通过。无奈只能看题解了，


## 方法 排序 + 双指针

这个排序我是万万没想到的，根据数组的左元素进行排序，这样一来，就可以完美处理 [[1,4],[0,0]] 这种情况了。

这里直接贴上来自题解中的代码，非常直观易懂且简洁，巧妙的使用了 max 函数来合并区间，比我傻傻的写的一堆 if else 优雅多了。
（来自 https://leetcode-cn.com/problems/merge-intervals/solution/shou-hua-tu-jie-56he-bing-qu-jian-by-xiao_ben_zhu/）


```go
func merge(intervals [][]int) [][]int {
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})
	res := [][]int{}
	prev := intervals[0]

	for i := 1; i < len(intervals); i++ {
		cur := intervals[i]
		if prev[1] < cur[0] { // 没有一点重合
			res = append(res, prev)
			prev = cur
		} else { // 有重合
			prev[1] = max(prev[1], cur[1])
		}
	}
	res = append(res, prev)
	return res
}

func max(a, b int) int {
	if a > b { return a }
	return b
}
```
这里用 prev 来保存上一个数组，初始保存的是第 0 个，然后 for 从 1 开始，即用第 1 个和第 0 个进行比较，如果没有重合，则 append 并更新 prev 为当前数组，有重合，则对 prev 进行合并，因为已经排好序了，所以前一个的 [0] 是一定小于后一个的 [0]，只需要比较 前一个的[1] 和后一个的 [1] 即可，这里用了 max 函数来比较。

特别注意一下最后的 `res = append(res, prev)` ，没有这句话会导致错误。

原因：for 是从第二个数组开始判断的，并不断与前一个数组比较，如果不在 for 外面再定义一次 `res = append(res, prev)`，则会导致结果缺失的情况。

例如：[[1,3]]，此时都不会进入 for ，如果没有末尾的这句话，会直接导致结果为空。

<Vssue :title="$title" />