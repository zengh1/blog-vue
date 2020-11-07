---
title: docker 安装 etcd
date: 2020-11-6
author: zz
location: Beijing  
tags: 
  - etcd
  - docker
---

# docker 安装 etcd

1. 创建一个 sh 文件

2. 粘贴下面内容

   ```shell
   rm -rf /tmp/etcd-data.tmp && mkdir -p /tmp/etcd-data.tmp && \
   #  docker rmi quay.io/coreos/etcd:v3.3.13 || true && \
     docker run -d \
     -p 2379:2379 \
     -p 2380:2380 \
     --mount type=bind,source=/tmp/etcd-data.tmp,destination=/etcd-data \
     --name etcd-gcr-v3.3.13 \
     quay.io/coreos/etcd:v3.3.13 \
     /usr/local/bin/etcd \
     --name s1 \
     --data-dir /etcd-data \
     --listen-client-urls http://0.0.0.0:2379 \
     --advertise-client-urls http://0.0.0.0:2379 \
     --listen-peer-urls http://0.0.0.0:2380 \
     --initial-advertise-peer-urls http://0.0.0.0:2380 \
     --initial-cluster s1=http://0.0.0.0:2380 \
     --initial-cluster-token tkn \
     --initial-cluster-state new
    
   ```

3. 执行



附：进入容器的命令

```shell
docker exec -it 容器id /usr/local/bin/etcdctl 
```

<Vssue :title="$title" />