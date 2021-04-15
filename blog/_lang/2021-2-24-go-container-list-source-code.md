---
title: go container/list 源码分析【未完】
date: 2020-02-24
tags: 
  - go
  - 源码
author: zz
location: Beijing  
---


## List

```go
// List代表一个双向链表。List零值为一个空的、可用的链表。
type List struct {
  // 哨兵节点，连接链表的头节点和尾结点，root.next 连接的是第一个结点，root.prev 连接的是最后一	// 个结点
  root Element 
  // 当前列表长度，不包括哨兵节点
	len  int     
}
```





## 初始化

```go
// 初始化或清空 list l。
func (l *List) Init() *List {
	l.root.next = &l.root
	l.root.prev = &l.root
	l.len = 0
	return l
}
```



```go
func (l *List) lazyInit() {
	if l.root.next == nil {
		l.Init()
	}
}
```



## 插入



```go
// insert inserts e after at, increments l.len, and returns e.
func (l *List) insert(e, at *Element) *Element {
	e.prev = at
	e.next = at.next
	e.prev.next = e
	e.next.prev = e
	e.list = l
	l.len++
	return e
}
```



```go
// insertValue is a convenience wrapper for insert(&Element{Value: v}, at).
func (l *List) insertValue(v interface{}, at *Element) *Element {
	return l.insert(&Element{Value: v}, at)
}
```



```go
// PushBack inserts a new element e with value v at the back of list l and returns e.
func (l *List) PushBack(v interface{}) *Element {
	l.lazyInit()
	return l.insertValue(v, l.root.prev)
}
```



## 获取

### Front()

获取链表的第一个节点

```go
// 返回列表 l 的第一个元素；如果列表为空，则返回nil。
func (l *List) Front() *Element {
	if l.len == 0 {
		return nil
	}
  // 这里可以看到是用 root.next 连接第一个结点
	return l.root.next
}
```



### Back()

获取链表的最后一个节点

```go
// 返回列表l的最后一个元素；如果列表为空，则返回nil。
func (l *List) Back() *Element {
	if l.len == 0 {
		return nil
	}
  // 这里可以看到是用 root.prev 连接最后一个节点
	return l.root.prev
}
```





<Vssue :title="$title" />








