import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { getUsers } from '../services/requests';

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: #222466;
  margin-top: 32px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: space-between;
  min-height: 500px;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 32px;

  @media (min-width: 640px) {
    max-width: 800px;
    flex-direction: row;
    min-height: initial;
    align-items: stretch;
    justify-content: space-evenly;
  }
`;

const Box = styled.div`
display: flex;
flex-direction: column;
  justify-content: space-evenly;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const Before = styled.p`
  font-weight: 900;
  font-size: 26px;
`;

const Name = styled.p`
  font-size: 22px;
`;

const Email = styled.p`
  font-size: 22px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 16px;
  border-radius: 5px;

  @media (min-width: 640px) {
    margin: 0;
  }
`;

const Button = styled.button`
    text-decoration: none;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  margin-top: 24px;
  background-color: #222466;
`;

function Profile() {
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUsers(token, decoded.id);
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  const { displayName, email, image } = user;

  return (
    <>
      <Header />
      <Title>
        Your Account Profile
      </Title>
      <Container>
        <Image src={image} />
        <Box>
          <SubBox>
            <Before>
              UserName:
            </Before>
            <Name>
              { displayName }
            </Name>
          </SubBox>
          <SubBox>
            <Before>
              UserName:
            </Before>
            <Email>
              { email }
            </Email>
          </SubBox>

          <Button>
            Delete Account
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
