import React from 'react';

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: solid 1px black;
  height: 300px;

  min-width: 300px;
  max-width: 600px;

  margin: 0 auto;

  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  margin: auto;
`;

function Create() {
  return (
    <Form>
      <input
        autoComplete="off"
        onChange={handleChange}
        value={title}
        type="text"
        placeholder="title"
        name="title"
      />
      <textarea
        autoComplete="off"
        onChange={handleChange}
        value={content}
        type="text"
        placeholder="title"
        name="title"
      />
    </Form>
  );
}

export default Create;
