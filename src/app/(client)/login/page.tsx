"use server"

import LoginForm from "@/components/login/login_form"
import { Suspense } from 'react';
const LoginPage = () => {
    return (
        <>
            LoginPage
            <Suspense>
                <LoginForm />
            </Suspense>
        </>
    )
}

export default LoginPage