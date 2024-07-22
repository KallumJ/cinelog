import React from 'react'

import { login } from '../../actions/auth_actions';

import AuthForm from '@/components/AuthForm';

export default function Page() {
    return <AuthForm action={login} type={'login'} />;
}
