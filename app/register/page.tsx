
import React from 'react'

import { register } from '../../lib/pocketbase';

import AuthForm from '@/components/AuthForm';

export default function Page() {
  return <AuthForm action={register} type={'register'} />;
}
