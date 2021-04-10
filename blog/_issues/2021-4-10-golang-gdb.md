---
title: Golang GDB 调试提示 No symbol table is loaded. Use the "file" command
data: 2021-4-10
tags: 
  - gdb
author: zz
location: Beijing
---

背景：

> 本地 MacOS 上通过 GDB 调试 golang 程序，结果提示 No symbol table is loaded. Use the "file" 
> command.

解决方法：

> 打包时加上 -ldflags=-compressdwarf=false 参数即可 比如在作者本地就是 go build -gcflags "-N -l" 
> -ldflags=-compressdwarf=false gdb/main.go 然后通过命令 gdb main 即可调试

参考：https://kaijuan.co/topics/25/no-symbol-table-is-loaded-use-the-file-command

<Vssue :title="$title" />