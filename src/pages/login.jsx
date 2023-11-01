import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Hệ thống ghi nhận tin báo </title>
      </Helmet>

      <LoginView />
    </>
  );
}
