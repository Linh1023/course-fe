"use server"

import LoginForm from "@/components/client/login/login_form"
import LoginWrapper from "@/components/client/login/login_wrapper";
import { Suspense } from 'react';
const LoginPage = () => {
    return (
        <>
            <Suspense>
                <LoginWrapper/>
            </Suspense>
        </>
    )
}

export default LoginPage