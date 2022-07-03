import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 800px;
  justify-content: space-between;
  background-color: white;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 18px;
  text-align: left;
  width: 100%;
  color: #6C757D;
  font-weight: bold;
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
  font-size: 28px;
  color: #ef3f46;

  &:hover{
    transform: scale(1.1);
  }
`;

const EditBtn = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  font-size: 18px;
  color: #222466;

  &:hover{
    transform: scale(1.1);
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-all;
`;

const PostTitle = styled.p`
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  font-weight: bold;
  color: #222466;
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
  color: #222466;
`;

const LikeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const LikeText = styled.p`
  font-size: 18px;
  margin-right: 8px;
`;

const LikeButton = styled.button`
  text-decoration: none;
  font-size: 28px;
  border: none;
  font-family: 'Material Icons';
  background: none;
  color: ${(props) => (props.liked ? '#ef3f46' : 'black')};
  transform: all ease 0.1s;

  &:hover{
    transform: scale(1.1);
  }
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
            liked={usersWhoLiked.some((item) => item.id === decodedId)}
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
