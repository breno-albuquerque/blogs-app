import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBInput, MDBListGroup, MDBListGroupItem,
} from 'mdb-react-ui-kit';
import styled from 'styled-components';
import { deleteBlogPost, getBlogPosts } from '../services/requests';
import Header from '../components/Header';

const Form = styled.form`
  padding: 24px;
`;

const Button = styled.button`
  text-decoration: none;
  max-width: 200px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 16px;
  margin-right: 16px;
  
  color: white;
  background-color: #222466;
`;

const CardButton = styled.button`
  text-decoration: none;
  padding: 4px;
  border: none;
  border-radius: 5px;
  margin-top: 16px;
  margin-right: 16px;
  
  color: white;
  background-color: #222466;
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  margin: 50px auto;
  padding: 16px;
/*   border-bottom: 1px solid black; */
  min-height: 360px;
  
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  box-sizing: border-box;
`;

const CardTitle = styled.p`
font-weight: 900;
  align-self: flex-start;
  font-size: 22px;
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
`;

const CardText = styled.p`
  align-self: flex-start;
  word-break: break-all;
  margin: 0;
`;

const CardTag = styled.span`
  margin-right: 8px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-weight: 900;
`;

const UserImage = styled.img`
  border-radius: 100%;
  width: 60px;
  height: 60px;
  margin-right: 8px;
`;

const CardHeader = styled.header`
width: 100%;
  align-items: center;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CardDates = styled.div`
  
`;

const ButtonsContainer = styled.div`
  align-self: flex-end;
`;

function BlogPosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getBlogPosts(token);
      setPosts(data);
    };

    fetchPost();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSearchClick = async () => {
    const data = await getBlogPosts(token, search);
    setPosts(data);
    setSearch('');
  };

  const handleAllClick = async () => {
    const data = await getBlogPosts(token);
    setPosts(data);
    setSearch('');
  };

  const handleRemoveClick = async (id) => {
    await deleteBlogPost(token, id);
    await handleAllClick();
  };

  const handleEditClick = async (id) => {
    navigate('/publish', { state: { editing: true, id } });
  };

  if (!token) return navigate('/');

  return (
    <>
      <Header />

      <Form>
        <MDBInput
          onChange={handleChange}
          type="text"
          name="search"
          value={search}
          label="Search Post"
        />
        <Button
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={handleAllClick}
        >
          See All
        </Button>
      </Form>

      { posts && posts.reverse().map((post) => {
        const {
          id, title, content, userId, distance, user, categories,
        } = post;
        const { displayName, image } = user;

        return (
          <Card>
            <CardHeader>
              <User>
                <UserImage src={image} />
                <UserName>
                  {displayName}
                </UserName>
              </User>
              <CardDates>
                <div>
                  { distance }
                  {' '}
                  ago.
                </div>
              </CardDates>
            </CardHeader>
            <CardTitle>{ title }</CardTitle>
            <CardText>
              { content }
            </CardText>
            <TagsContainer>

              { categories.map((category) => (
                <CardTag>
                  #
                  {category.name}
                </CardTag>
              )) }

            </TagsContainer>
            { userId === decoded.id && (
            <ButtonsContainer>
              <CardButton
                type="button"
                onClick={() => handleEditClick(id)}
              >
                Edit

              </CardButton>
              <CardButton
                type="button"
                onClick={() => handleRemoveClick(id)}
              >
                X

              </CardButton>
            </ButtonsContainer>
            ) }
          </Card>
        );
      }) }

    </>

  /*  <article key={id} id={id}>
            <h3>{ title }</h3>
            { categories.map((category) => (
              <span key={category.id}>
                { category.name }
                {' '}
              </span>
            )) }
            <p>
              {' '}
              { content }
              {' '}
            </p>
            <p>{ displayName }</p>
            <img width={100} alt="profile user" src={image} />
            { userId === decoded.id && (
              <div>
                <button
                  type="button"
                  onClick={handleRemoveClick}
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => handleEditClick(id)}
                >
                  Edit
                </button>
              </div>
            ) }
          </article> */

  );
}

export default BlogPosts;
