---
title: go 发送 post 请求
date: 2020-01-24
tags: 
  - go
author: zz
location: Beijing  
---



## 方式 1

```go
// 生成请求参数键值对
data := url.Values{"propId": {giftId}, "propCount": {count}, "roomId": {c.RoomId}}
// Encode() 编码成字符串，并包装成一个 io.Reader
body := strings.NewReader(data.Encode())

// 传到第三个参数
req, err := http.NewRequest("POST",
		"https://www.douyu.com/japi/prop/donate/mainsite/v1",
		body)

client := http.Client{}
response, err := client.Do(req)
```



## 方式 2

```go
var r http.Request
r.ParseForm()
r.Form.Add("propId", giftId)
r.Form.Add("propCount", count)
r.Form.Add("roomId", roomId)
body := strings.NewReader(r.Form.Encode())

req, err := http.NewRequest("POST",
		"https://www.douyu.com/japi/prop/donate/mainsite/v1",
		body)

client := http.Client{}
response, err := client.Do(req)
```



## 方式 3

```go
// 直接拼接字符串
body := strings.NewReader("propId=268&propCount=1&roomId=9999&bizExt=%7B%22yzxq%22%3A%7B%7D%7D")
req, err := http.NewRequest("POST",
		"https://www.douyu.com/japi/prop/donate/mainsite/v1",
		body)

client := http.Client{}
response, err := client.Do(req)
```



## 其他

上面的三种方法，只是创建请求参数键值对的方式不同，最后都是调用了 http.Client.Do() 方法，除此之外，go 还封装了一些 post 方法，如下：

```go
// 方法 1
data := url.Values{"start":{"0"}, "offset":{"xxxx"}}
body := strings.NewReader(data.Encode())
resp, err := http.Post("url", "application/x-www-form-urlencoded", body)

// 方法 2
var r http.Request
r.ParseForm()
r.Form.Add("xxx", "xxx")
body := strings.NewReader(r.Form.Encode())
http.Post("xxxx", "application/x-www-form-urlencoded", body)

// 方法 3
data := url.Values{"start":{"0"}, "offset":{"xxxx"}}
http.PostForm("xxxx", data)


```



<Vssue :title="$title" />








