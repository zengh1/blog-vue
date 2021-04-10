---
title: 求二叉树根节点到指定节点的路径
data: 2021-3-27
tags: 
  - 二叉树
  - 算法
author: zz
location: Beijing
---


## 算法描述

这不是一道力扣或者剑指上的题，但却是二叉树问题的一个基础核心算法，适用于许多二叉树类型的题目，比如 `剑指 Offer 68 - II. 二叉树的最近公共祖先`，因为这里有必要记录一下，大致的说明如下：

例如如下一颗二叉树：

![](../.vuepress/public/binaryTree.png)

当指定节点为 4 时，输出 [3,5,2,4]


## 方法1 回溯，有返回值

代码如下：（参考自 https://blog.csdn.net/shizheng_li/article/details/104675990）

```go
// 找到根节点到某一节点的路径
func findPath(node, need *TreeNode, // node: 当前节点，need: 指定节点
              path, res *[]*TreeNode, // path: 记录当前路径 res: 保存结果路径
              flag *bool) []*TreeNode {	// flag: 用来标识是否已经找到结果，作为递归终止的条件

    if node == nil || *flag {
        return *res
    }
    *path = append(*path, node)
	// 找到指定的节点了，将 flag 更改为 true，同时将当前路径添加到 res 作为结果
    if node == need {
        *flag = true
        *res = *path
    }
	// 先找左子树，再找右子树
    findPath(node.Left, need, path, res, flag)
    findPath(node.Right, need, path, res, flag)
	// 回溯，在 path 中移除当前节点
    *path = (*path)[:len(*path)-1]

    rr := make([]*TreeNode, len(*res))
    // 因为 slice 共用一个底层数组，第二次会更改第一次的结果，
    // 所以需要 copy 一个新 slice
    copy(rr, *res)  
    
    return rr
}
```
path 和 res 都需要为指针切片，因为 append 会导致地址变更，flag 为了保证递归参数传递的状态一致，也需要为指针类型，其他的都写在注释中了，特别需要说明的是最后的 `copy`，这也是我踩的一个坑，特此记录一下：

引用 `算法` 中的二叉树，求 1 和 4 两个节点的路径，正确结果应该为 [3,1] 和 [3,5,2,4]但是最后运行的结果却是 [3,5] 和 [3,5,2,4]，测试代码如下：

```go
	// p = 1
	pr := findPath(root, p, &path, &res, &flag)
    flag = false
	// p = 4
    qr := findPath(root, q, &path, &res, &flag)

	for i := 0; i < len(pr); i++ {
         fmt.Printf("%v ", pr[i])	// Output: [3, 5]
    }
    fmt.Println()
    
    for i := 0; i < len(qr); i++ {
        fmt.Printf("%v ", qr[i])	// Output: [3,5,2,4]
    }
```

我又尝试将 pr 的输出语句移动至 qr 前，结果是正确的：

```go
	// p = 1
	pr := findPath(root, p, &path, &res, &flag)
	for i := 0; i < len(pr); i++ {
         fmt.Printf("%v ", pr[i])	// Output: [3, 1]
    }
    fmt.Println()

    flag = false
	// p = 4
    qr := findPath(root, q, &path, &res, &flag)

    for i := 0; i < len(qr); i++ {
        fmt.Printf("%v ", qr[i])	// Output: [3,5,2,4]
    }
```

原因是因为我刚开始在函数中返回的是 *res，而 *res = *path ，即让 res 的底层数组指针指向了 path 的底层数组， 传入的 path 都是同一个，这样第二次寻找路径时，path 会改变，这会使得指向 path 的 res 也跟着改变，所以第二次运行时会将 res 的 [1] 改为 [5]，解决方法就是新定义一个 slice，并 copy，再返回这个新 slice即可。


## 方法2 回溯，无返回值

方法 1 中的返回值其实完全是多余的，参数 res 已经保存了结果，完全可以不需要返回值，如下：

```go
    func findPath(root, need *TreeNode, path, res *[]*TreeNode,
              flag *bool) {
    if root == nil || *flag {
        return 
    } 
    *path = append(*path, root)
    if root == need {
        *flag = true
        // copy 一个新切片，防止多个 res 指向同一个 path
        news := make([]*TreeNode, len(*path))
        copy(news, *path)
        *res = news
        return 
    }
    
    findPath(root.Left, need, path, res, flag)
    findPath(root.Right, need, path, res, flag)

    *path = (*path)[:len(*path)-1]
    return 
}

    func main() {
        var path, pp, qq []*TreeNode
        var flag bool
        findPath(root, p, &path, &pp, &flag)
        // 重置参数
        flag = false
        path = path[0:0]
        findPath(root, q, &path, &qq, &flag)
        // 此时 pp 和 qq 已经保存了结果
    }
```

## 有无返回值的性能差异

在 `剑指 Offer 68 - II. 二叉树的最近公共祖先` 这道题中，有一个非常长的测试用例（可能有上万个节点），这里使用有返回值的方法会超时，即使返回指针也一样超时，而无返回值则正常，还没有搞明白原因所在


<Vssue :title="$title" />