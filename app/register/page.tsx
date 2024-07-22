
import React from 'react'

import { register } from '../../actions/auth_actions';

import AuthForm from '@/components/AuthForm';

export default function Page() {
  return <AuthForm action={register} type={'register'} />;
}
