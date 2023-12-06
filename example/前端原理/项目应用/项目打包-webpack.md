# webpack的作用
模块化打包。将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。

编译兼容。webpack默认只能处理.js后缀名的文件，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，高效开发。

能力扩展。在模块打包和编译兼容基础上，通过plugin可以进一步实现功能(按需加载、代码压缩等)，提高自动化程度，工程效率以及打包质量。
## 实现流程和实现原理
### 运行机制
## 核心概念
- entry：一个可执行模块或者库的入口。
- output：编译结果文件输出
- chunk：多个文件组成一个代码块。可以将可执行的模块和他所依赖的模块组合成一个chunk，这是打包。
- loader：文件转换器。例如把es6转为es5，scss转为css等
- plugin：扩展webpack功能的插件。在webpack构建的生命周期节点上加入扩展hook，添加功能。
### webpack的整个打包流程
	1、初始化参数：读取webpack的配置参数；
	2、开始编译：启动webpack，创建Compiler对象并开始解析项目；
	3、确定入口：从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
	4、编译模块：对不同文件类型的依赖模块文件使用对应的Loader进行编译，最终转为Javascript文件；
	5、输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
	NOTE: 整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目
## webpack Loader 负责文件转换为JS
Webpack内部默认也只能够处理JS模块代码、JSON 文件，遇到非js文件将其进行必要的转换才，能继续执行打包任务，这也是Loader机制存在的意义。

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

Loader处理文件 css。图片
### 常用loader - 配置时执行顺序默认是从右到左，从下到上
 	babel-loader: 用babel来转换ES6文件到ES5
	vue-loader 加载并编译 Vue 组件
	------------------css------------------
 	style-loader: 将css添加到DOM的内联样式标签style里
 	css-loader: 将 css 内容存为 js 字符串，并且会把 background, @font-face 等引用的图片，字体文件交给指定的 loader 打包
    less-loader: 加载并编译less
 	sass-loader: 加载并编译sass
 	postcss-loader: 用postcss来处理CSS
	------------------file、html、图片、------------------
 	file-loader: 分发文件到output目录并返回相对路径
 	html-minify-loader: 压缩HTML
	html-loader: 将 HTML 导出为字符串，需要传入静态资源的引用路径
 	url-loader, 它接受一个 limit 参数，单位为字节(byte)当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方.当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径
## webpack Plugin 负责功能扩展
Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。
## webpack打包性能优化 - gzip、externals 代码压缩
## webpack打包性能优化 - 按需引入和加载

## sourceMap
是一项将编译、打包、压缩后的代码映射回源代码的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中debug问题会带来非常糟糕的体验，sourceMap可以帮助我们快速定位到源代码的位置，提高我们的开发效率。
## hrm
你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。


