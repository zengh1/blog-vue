# 复制 dist 到 build，并打包
cp -rf  ./blog/.vuepress/dist ./build
# zip -r build.zip  /Users/zz/WebstormProjects/blog-vuepress/blog/.vuepress/dist/
cd build
zip -r -q  build.zip ../build

