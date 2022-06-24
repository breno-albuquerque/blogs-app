import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RemoveBtn = styled.button`
  text-decoration: none;
  width: 40px;
  padding: 6px;
  border: none;
  border-radius: 5px;
  margin-right: 16px;
  font-family: 'Material Icons';
  font-size: 20px;
  color: white;
  background-color: #222466;
`;

const EditBtn = styled.button`
  background: none;
  color: #222466;
  border: none;
  text-decoration: nonde;
  font-size: 18px;
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  margin: 50px auto;
  padding: 16px;
  min-height: 360px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  box-sizing: border-box;

  @media (max-width: 374px) {
    min-height: 400px;
  }
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
  color: #222466;
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
  @media (max-width: 374px) {
   margin-top: 8px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

function BlogCard(props) {
  const {
    post, decoded, handleEditClick, handleRemoveClick,
  } = props;

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
        <EditBtn
          type="button"
          onClick={() => handleEditClick(id)}
        >
          Edit
        </EditBtn>
        <RemoveBtn
          className="bg-danger"
          type="button"
          onClick={() => handleRemoveClick(id)}
        >
          delete
        </RemoveBtn>
      </ButtonsContainer>
      ) }
    </Card>
  );
}

export default BlogCard;
