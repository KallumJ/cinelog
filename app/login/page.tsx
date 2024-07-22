import React from 'react'

import { login } from '../../lib/pocketbase';

import AuthForm from '@/components/AuthForm';

export default function Page() {
    return <AuthForm action={login} type={'login'} />;
}
