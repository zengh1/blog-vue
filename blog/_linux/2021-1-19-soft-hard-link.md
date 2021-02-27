---
title: 硬链接和软链接
date: 2020-01-11
tags: 
  - linux
author: Billyyyyy3320
location: Taipei  
---



# 索引节点

在Linux的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)，可以通过 ls -li 查看每个文件的索引节点：

```sh
ls -li
total 56
 8758859 -rw-r--r--  1 zz  staff   364 12 27 11:57 bufio_read.go
 7957721 -rw-r--r--  1 zz  staff   383 12 13 22:30 bufio_scann.go
10097171 -rw-r--r--  1 zz  staff   225  1  8 12:04 deferTest.go
10164017 -rw-r--r--  1 zz  staff   464  1  8 20:43 inToOut.go
 8751290 -rw-r--r--  1 zz  staff   276 12 26 22:13 scanfTest.go
 7173127 -rw-r--r--  1 zz  staff   338 12  2 14:45 t1.go
 7173519 -rw-r--r--@ 1 zz  staff  1520 12  2 14:59 test.go
```



# 硬链接

基本命令：

```sh
ln f1 f2  #创建f1的一个硬连接文件f2
```



**硬链接**可以简单把它想成 C 语言中的指针，它指向了物理硬盘的一个区块，多个硬链接会指向同一个区块，（可以理解为 C 中的多个指针指向了同一块内存空间）。

```shell
touch f && echo "hello" > f   # 创建一个文件并向其写入内容
ln f hard_f                   # 创建 f 的第一条硬链接 hard_f
ln f hard_f1                  # 创建 f 的第二条硬链接 hard_f1

ll -i
10966044 -rw-r--r--  3 zz  staff     6B  1 19 11:52 f
10966044 -rw-r--r--  3 zz  staff     6B  1 19 11:52 hard_f
10966044 -rw-r--r--  3 zz  staff     6B  1 19 11:52 hard_f1

# 两个硬链接的 inode index 与源文件相同
```



因为指向的是同一个硬盘区块，所以通过硬链接更改文件内容时，会导致其他的硬链接及源文件也被更改：

```sh
cat f hard_f hard_f1     # 输出三个文件的初始值
hello
hello
hello

echo "123" > hard_f      # 修改 hard_f 的内容
cat f hard_f hard_f1     # 三个文件的值已经全部更改了
123
123
123
```



事实上文件系统会维护一个引用计数，只要有文件指向这个区块，它就不会从硬盘上消失。

```sh
rm f                   # 删除源文件
cat hard_f hard_f1     # 尝试输出两个链接文件的内容
123
123                    # 硬链接文件可以正常输出

```



硬连接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能。其原因如上所述，因为对应该目录的索引节点有一个以上的连接。只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个连接被删除后，文件的数据块及目录的连接才会被释放。也就是说，文件真正删除的条件是与之相关的所有硬连接文件均被删除。



# 软链接

基本命令：

```sh
ln -s f1 soft
```

**软链接**也称之为符号连接（Symbolic Link），软链接文件有类似于Windows的快捷方式。它实际上是一个特殊的文件。在符号连接中，文件实际上是一个**文本文件**，其中包含有另一文件的**位置信息**，在硬盘上有独立的区块，访问时替换自身路径。

与硬链接不同，软链接的 inode_index 与源文件是不同的，每个软链接的  inode_index 也不同，如下： 

```sh
ln -s f soft_f1				# 创建两个软链接
ln -s f soft_f2
ll -i
10973146 -rw-r--r--  1 zz  staff     4B  1 19 17:19 f
10973197 lrwxr-xr-x  1 zz  staff     1B  1 19 17:19 soft_f1 -> f
10973203 lrwxr-xr-x  1 zz  staff     1B  1 19 17:20 soft_f2 -> f
```

软链接的显示形式也比较特殊，为 软链接文件 -> 源文件。



删除源文件后，所有关联的的软链接文件仍然存在（因为两个是不同的文件），但指向的是一个无效的链接：

```sh
rm f										# 删除源文件
cat soft_f1 soft_f2			# 尝试输出两个软链接文件
cat: soft_f1: No such file or directory			# 无法输出内容：找不到文件
cat: soft_f2: No such file or directory
```



# 总结

硬链接是指针，所有的硬链接都是指向同一个磁盘块。 删除一个指针不会真正删除文件，只有把所有的指针都删除才会真正删除文件。 软连接是另外一种类型的文件，保存的是它指向文件的全路径， 访问时会替换成绝对路径



<Vssue :title="$title" />