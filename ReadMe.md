lerna init --independent

lerna create hou-lerna-test
lerna create hou-lerna-package1
lerna create hou-lerna-package2

lerna add jquery --scope=hou-lerna-test
lerna add lodash
lerna add hou-lerna-test —scope=hou-lerna-package1
node packages/hou-lerna-package1/index.js

lerna run --scope=hou-lerna-package1 start
Exec   —在所有包里面执行
lerna exec -- rm -rf ./node_modules
lerna exec --concurrency 1 -- ls -la  使用给定的数量进行并发执行(除非指定了 --parallel)。输出时经过管道过滤，存在不确定性。

lerna clean
lerna diff
lerna diff hou-lerna-test
lerna link  将本地相互依赖的 package 相互连接
lerna changed 支持list所有参数
lerna updated 支持list所有参数
lerna list —long显示包的版本、位置、名称
lerna import ../Starbucks
lerna import ../Starbucks —dest=packages/hou-lerna-package2("packages/hou-lerna-package2/*")
lerna version生成新的唯一版本号(先commit,只要经历版本选择，即使最后失败，下一次版本号就会让你重新选择)
1.识别从上次打标记发布以来发生变更的 package 2.版本提示 3.修改 package 的元数据反映新的版本，在根目录和每个 package 中适当运行lifecycle scripts 4.在 git 上提交改变并对该次提交打标记(git commit & git tag) 5.提交到远程仓库(git push)

--force-publish 强制更新版本
这个操作将跳过lerna changed检查，即便 package 没有做任何变更也会更新版本
--no-private
排除private:true的 package
--ignore-changes
变更检测时忽略的文件
lerna version --ignore-changes '**/*.md' ‘**/__tests__/**'

--amend
lerna version --amend
默认情况下如果暂存区有未提交的内容，lerna version会失败，需要提前保存本地内容。使用该标记可以较少 commit 的次数，将当前变更内容随着本次版本变化一次 commit。并且不会git push





lerna publish做哪些事情
- 运行lerna updated来决定哪一个包需要被publish
- 如果有必要，将会更新lerna.json中的version
- 将所有更新过的的包中的package.json的version字段更新
- 将所有更新过的包中的依赖更新
- 为新版本创建一个git commit或tag
- 将包publish到npm上

(私有包不会被发布，需要在该包package.json文件里写明private:true)

当然首先你要登陆自己的npm账号
然后就会提醒我们进行当前的版本选择，是升级一个小版本还是一个大版本
虽然就会进行统一的处理，发布到npm上去，并且统一所有包的版本，并且会将代码进行提交

lerna publish和lerna version,publish版本选择后报错，再次执行不会版本更新，lerna version会