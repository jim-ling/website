<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useSettingsStore } from '@/store/pinia/settings'
import { useUserStore } from '@/store/pinia/user'
import { Key, Loading, Lock, Picture, User } from '@element-plus/icons-vue'
import Owl from './components/Owl.vue'
import { getLoginCodeApi, loginApi } from '@/pages/login/api'

// 设置组件名称
defineOptions({
    name: 'Login'
})

const userStore = useUserStore()
const settingsStore = useSettingsStore()

const loading = ref(false)
const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null)
// 是否有焦点
const isFocus = ref<boolean>(false)
// 失去焦点
function handleBlur() {
    isFocus.value = false
}
// 获取焦点
function handleFocus() {
    isFocus.value = true
}

/** 登录表单数据 */
const loginFormData = reactive({
    username: 'admin',
    password: '123456'
})

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
    ]
}

/** 登录 */
function handleLogin() {
    loginFormRef.value?.validate((valid) => {
        if (!valid) {
            return
        }
        loading.value = false
        loginApi(loginFormData)
            .then(({ data }) => {
                console.log('登录成功')
                userStore.setToken(data.token)
                router.push('/')
            })
            .catch(() => {
                loginFormData.password = ''
            })
            .finally(() => {
                loading.value = false
            })
    })
}
</script>

<template>
    <div class="login-container">
        <ThemeSwitch
            v-if="settingsStore.showThemeSwitch"
            class="theme-switch"
        />
        <!-- <Owl :close-eyes="isFocus" /> -->
        <div class="login-card">
            <div class="title">
                <img src="@/assets/logo.png" />
            </div>
            <div class="content">
                <el-form
                    ref="loginFormRef"
                    :model="loginFormData"
                    :rules="loginFormRules"
                    @keyup.enter="handleLogin"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model.trim="loginFormData.username"
                            placeholder="用户名"
                            type="text"
                            tabindex="1"
                            :prefix-icon="User"
                            size="large"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model.trim="loginFormData.password"
                            placeholder="密码"
                            type="password"
                            tabindex="2"
                            :prefix-icon="Lock"
                            size="large"
                            show-password
                            @blur="handleBlur"
                            @focus="handleFocus"
                        />
                    </el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        size="large"
                        @click.prevent="handleLogin"
                    >
                        登 录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
    .theme-switch {
        position: fixed;
        top: 5%;
        right: 5%;
        cursor: pointer;
    }
    .login-card {
        width: 480px;
        max-width: 90%;
        border-radius: 20px;
        box-shadow: 0 0 10px #dcdfe6;
        background-color: var(--el-bg-color);
        overflow: hidden;
        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            img {
                height: 100%;
            }
        }
        .content {
            padding: 20px 50px 50px 50px;
            :deep(.el-input-group__append) {
                padding: 0;
                overflow: hidden;
                .el-image {
                    width: 100px;
                    height: 40px;
                    border-left: 0px;
                    user-select: none;
                    cursor: pointer;
                    text-align: center;
                }
            }
            .el-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>
