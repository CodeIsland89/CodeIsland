import React from 'react';
import Link from 'next/link';
import {
  GoogleButton, InputRow, MemberButton, Card, Block,
} from '../../components/pages-component/auth/login';
import Box from '../../components/shared-component/box';
import Text from '../../components/shared-component/text';
import color from '../../global/theme/color';
import Img from '../../components/shared-component/img';
import loginService from '../../service/login.service';

export default function LoginPage() {
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      // get the field that you want
      const { email, password } = form.elements;

      const token = await loginService({
        email: email.value,
        password: password.value,
      });

      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('登入失敗，請重新登入');
    }
  };

  const handleLoginWithGoogle = () => {
    console.log('handle Login with Google.');
  };

  return (
    <div style={{
      backgroundColor: color.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
    }}
    >
      <Card onSubmit={handleLogin}>
        <Box alignItems="flex-end">
          <Link href="../auth/signup" style={{ textDecoration: 'none' }}>
            <Text color={color.blue_200} fontSize="0.8rem" style={{ fontWeight: 'bold' }}>SignUp Here</Text>
          </Link>
        </Box>
        <form>
          <Box alignItems="center">
            <Text color={color.blue_700} fontSize="2rem">Log In</Text>
            <Block>
              <InputRow name="email" text="Email" />
              <InputRow name="password" text="Password" type="password" />
              <Box direction="row" style={{ justifyContent: 'space-between' }}>
                <label htmlFor="rememberPwd">
                  <Box direction="row">
                    <input type="checkbox" name="rememberPwd" id="rememberPwd" />
                    <Text color={color.grey_800} fontSize="0.8rem">Remember password</Text>
                  </Box>
                </label>
                <Link href="#forgot">
                  <Text color={color.grey_800} fontSize="0.8rem">Forgot?</Text>
                </Link>
              </Box>
            </Block>
            <Block />
            <Block />
            <MemberButton type="submit">Log In</MemberButton>
            <Block>
              <Box direction="row" style={{ width: '100%' }}>
                <hr style={{ flexGrow: 6 }} />
                <Box alignItems="center" style={{ flexGrow: 1 }}>Or</Box>
                <hr style={{ flexGrow: 6 }} />
              </Box>
            </Block>
            <Block />
            <GoogleButton type="button" onClick={handleLoginWithGoogle}>
              <Img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Image" />
              Sign in with Google
            </GoogleButton>
          </Box>
        </form>
      </Card>
    </div>
  );
}
