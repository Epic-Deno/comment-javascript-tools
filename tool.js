function initRem() {
	let cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
	window.document.documentElement.style.fontSize = `${100 * cale}px`
}
//监听字体变化
window.addEventListener("resize", () => {
	initRem()
})
//路由懒加载
//1.Vue异步加载技术
{
	path: '/home',
		name: 'Home',
			component: () => import('../views/Home.vue')
}
//3.webpack提供的 require.ensure
{
	path: '/home',
		name: 'Home',
			component: r => require.ensure([], () => r(require('../views/Home.vue')), 'home')
}
//单个页面设置标题
router.beforeEarch((to, form, next) => {
	document.title = to.meta.title
})
//登录权限
const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/home.vue')
		meta: { title: '首页', keepAlive: false, auth: false }
	}

]
//在路由首页进行判断。当to.meta.auth为true时候（需要登录），且不存在登录缓存时候，需要重定向去登录页面
router.beforeEarch((to, form, next) => {
	doucment.title = to.meta.title
	const userInfo = sessionStorage.getItem('userInfo') || null
	if (!userInfo && to.meta.auth) {
		next('/login')
	} else {
		next()
	}
})
//页面需要缓存设置
//希望一次加载缓存下来，此时此刻用到keep-alive,keep-alive是vue提供的一个抽象组件,用来缓存，节约性能
//vue页面渲染完毕后不会被渲染成一个DOM元素
//1.在route里面设置meta
const routes = [
	{
		path: '/',
		name: 'home',
		component: () => important('../views/Home.vue'),
		meta: { title: '首页'，keepAlive: false, auth: false },
	}
]
	//2.在app.vue做缓存判断
	< div >
	<router-view v-if="!$route.meta.keepAlive"></router-view>
	<keep-alive>
		<route-view v-if="$route.meta.keepAlive"><router-view>
	</keep-alive>
</div>
//多环境变量配置
//首先环境变量一般you三个环境，本地（development）,测试环境（test）,生产环境（production）
//对应根目录下的.env.development,env.test,.env.production
//环境变量键 ==值
NDOE_ENV = 'production'
VUE_APP_ENV = 'production'

vue.config.js配置

vue-cli3开始，新建脚手架都需要我们在vue.config.js配置我们项目的东西。主要包括

1.打包后文件输出的位置
2.关闭生产环境sourcemap
3.配置rem转化px
4.alias别名
5.去除生产的console.log
6.跨域代理设置

优化配置如下
module.exports = {
			publicPatch:'./',//默认为‘/’
	//将构建好的文件输出到到哪里
	outPutDir:'dist/static',
	//放置静态的资源（js,css,img,fonts）目录
	assetsDir:'static',
	//制定生成index.html
	indexPath:'index.html',
	//配置css
	css:{
			//是否需要css分离插件ExtractTextPlugin
			extract:true,
		sourceMap:true,
		//css预设置
		loaderOptions:{
			postcss:{
			plugins:[
					require('postcss-px2rem')({
			remUnit:100
					})
				]
			}
		},
		modules:false,
	},
	//一个webpack配置进行更加细粒的修改
	chainWebpack:(config) => {
			//设置别名
			config.resolve.alias
				.set('@', resolve('src'))
				.set('assets', resolve('src/assets'))
				.set('components', resolve('src/components'))
				.set('views', resolve('src/views'))

		config.optimization.minimizer('teser').tap((args) => {
			//去除生产环境的console
			args[0].terserOptions.compress.drop_console = true
			return args
		})
	},
	devServe:{
			host:'0.0.0.0',
		port:8080,//端口
		https:false,
		open:false, //自动启动浏览器

		//配置多个代理
		proxy:{
			'/api':{
			target:"https://www.mock.com",
				ws:true,//代理websockets
				changeOrigin:true，//允许跨域
				pathRewrite:{
			'^/api':'',
				}
			}
		}
	}

}
{/* //好看的渐变色背景 */}
		{/* background: linear-gradient(rgba(55,55,55,.98),#545456); */}


//</keep-alive>















