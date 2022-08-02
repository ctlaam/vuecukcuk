import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHashHistory} from 'vue-router'
// import các router
import Employee from './view/employee/EnployeeList.vue'
import Customer from './view/customer/CustomerList.vue'
import Report from './view/report/ReportList.vue'

import MISAEnum from './js/enum.js'
import MISAResource from './js/resource.js'
import CommonJs from './js/common.js'
// định nghĩa các router


const abc = [
    { path: '/employee', name: 'Employee',component: Employee },
    {path: '/customer', name: 'Customer',component: Customer},
    {path: '/report', name: 'Report',component: Report}
]
// khởi tạo các router và truyền các router đã được định nghĩa
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: abc,
})

// createApp(App).config.globalProperties.MISAEnum = MISAEnum;
// createApp(App).config.globalProperties.MISAResource = MISAResource;
// createApp(App).use(router,MISAResource,MISAEnum).mount('#app')

let app = createApp(App)
app.config.globalProperties.MISAEnum = MISAEnum
app.config.globalProperties.MISAResource = MISAResource
app.config.globalProperties.CommonJs = CommonJs
app.use(router, MISAEnum, MISAResource)
app.mount('#app')
