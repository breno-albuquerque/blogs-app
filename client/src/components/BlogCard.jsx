import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 800px;
  justify-content: space-between;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  box-sizing: border-box;
  margin: 50px auto;
  border-radius: 5px;
  max-width: 300px;
  
  @media (min-width: 640px) {
    max-width: 1000px;
    flex-direction: row;
    min-height: initial;
    align-items: stretch;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    margin-bottom: 0;
    max-width: 300px;
    border-radius: 5px 0 0 5px;
  }
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 8px;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Name = styled.p`
  font-size: 20px;
  text-align: left;

`;

const Date = styled.p`
  font-size: 18px;
  text-align: left;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const RemoveBtn = styled.button`
  text-decoration: none;
  background: none;
  border: none;
  font-family: 'Material Icons';
  font-size: 20px;
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  font-size: 18px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostTitle = styled.p`
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
`;

const PostContent = styled.p`
  font-size: 18px;
  width: 100%;
  text-align: justify;
  padding: 8px;
`;

const CategoryBox = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const Category = styled.span`
  margin-left: 4px;
`;

const LikeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const LikeText = styled.p`
  font-size: 18px;
`;

const LikeButton = styled.button`
  text-decoration: none;
  font-size: 28px;
  border: none;
  font-family: 'Material Icons';
  background: none;
  color: black;
`;

function BlogCard(props) {
  const {
    post, decodedId, handleEditClick, handleRemoveClick, handleLikeClick,
  } = props;

  const {
    id, title, content, userId, distance, user, categories, likes, usersWhoLiked,
  } = post;
  const { displayName, image } = user;

  return (
    <Card>
      <Image src={image} />
      <Container>
        <Box>
          <UserBox>
            <Name>
              { displayName }
            </Name>
            <Date>
              { distance }
              {' '}
              ago
            </Date>
          </UserBox>
          { userId === decodedId && (
          <ButtonsContainer>
            <EditBtn
              type="button"
              onClick={() => handleEditClick(id)}
            >
              Edit
            </EditBtn>
            <RemoveBtn
              type="button"
              onClick={() => handleRemoveClick(id)}
            >
              delete
            </RemoveBtn>
          </ButtonsContainer>
          ) }
        </Box>

        <ContentBox>
          <PostTitle>
            { title }
          </PostTitle>
          <PostContent>
            { content }
          </PostContent>
        </ContentBox>

        <CategoryBox>
          { categories.map((category) => (
            <Category>
              #
              {category.name}
            </Category>
          )) }
        </CategoryBox>

        <LikeBox>
          <LikeText>
            Likes:
            {' '}
            { likes }
          </LikeText>
          <LikeButton
            type="button"
            onClick={() => handleLikeClick(id)}
          >
            favorite
          </LikeButton>
        </LikeBox>
      </Container>
    </Card>
  );
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    user: PropTypes.shape({
      id: PropTypes.number,
      displayName: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    }),
    content: PropTypes.string,
    distance: PropTypes.string,
    id: PropTypes.number,
    published: PropTypes.string,
    title: PropTypes.string,
    updated: PropTypes.string,
    userId: PropTypes.number,
    likes: PropTypes.number,
  }).isRequired,
  decodedId: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
};

export default BlogCard;
