import React from 'react';
import Link from 'next/link';
import { InputRow } from '../../components/pages-component/auth/login';
import Box from '../../components/shared-component/box';
import Text from '../../components/shared-component/text';
import color from '../../global/theme/color';
import Img from '../../components/shared-component/img';
import {
  GoogleButton, MemberButton, Card, Block,
} from '../../components/pages-component/auth/signup';

export default function SignUpPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    // get the field that you want
    const { email, password, rememberPwd } = form.elements;
    console.log(email.value, password.value, rememberPwd.checked);
    console.log('handle Login.');
  };

  const handleLoginWithGoogle = () => {
    console.log('handle Login with Google.');
  };

  return (
    <div style={{
      backgroundColor: color.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',
    }}
    >
      <Card onSubmit={handleLogin}>
        <Box alignItems="flex-end">
          <Link href="../auth/login" style={{ textDecoration: 'none' }}>
            <Text color={color.blue_200} fontSize="0.8rem" style={{ fontWeight: 'bold' }}>Login Here</Text>
          </Link>
        </Box>
        <form>
          <Box alignItems="center">
            <Text color={color.blue_700} fontSize="2rem">Create Your Account</Text>
            <Block>
              <InputRow name="nickname" text="Nickname" />
              <InputRow name="email" text="Email" />
              <InputRow name="password" text="Password" type="password" />
              <InputRow name="replyPassword" text="Confirm Password" type="password" />
            </Block>
            <Block />
            <Block />
            <MemberButton type="submit">Sign Up</MemberButton>
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
