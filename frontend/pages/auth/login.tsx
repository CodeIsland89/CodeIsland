import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { InputRow } from '../../components/pages-component/auth/login';
import Box from '../../components/shared-component/box';
import Button from '../../components/shared-component/button';
import Text from '../../components/shared-component/text';
import color from '../../global/theme/color';
import Img from '../../components/shared-component/img';

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 12rem;
  height: 2rem;
  background-color: transparent;
  padding: 0.25rem 1rem;
  color: ${color.grey_600};
  border: ${color.grey_600} 0.05rem solid;
  border-radius: 99rem;
  cursor: pointer;
`;

const MemberButton = styled(Button)`
  background-color: ${color.blue_400};
  color: ${color.white};
  font-weight: bold;
  width: 10rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  border-width: 0rem;
  cursor: pointer;
`;

const Card = styled.div`
  background-color: ${color.white};
  width: fit-content;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const Block = styled(Box)`
  min-width: 280px;
  min-height: 20px;
  width: 25vw;
  margin: 0 2rem;
  & > * {
    width: 100%;
    margin: 1.5rem 0 0 0;
  }
`;

export default function LoginPage() {
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
      backgroundColor: color.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
    }}
    >
      <Card onSubmit={handleLogin}>
        <Box alignItems="flex-end">
          <Link href="../auth/signup">
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
