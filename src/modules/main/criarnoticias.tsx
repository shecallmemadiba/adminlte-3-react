import React, { useState, ChangeEvent } from 'react';

const CriarNoticias = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [titleCount, setTitleCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);

  const MAX_CHARACTERS = 1000;
  const TituloMAX_CHARACTERS = 100;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
      console.log(`Selected Image: ${selectedImage.name}`);
    }
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prevIsCheckboxChecked) => !prevIsCheckboxChecked);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value;

    if (newTitle.length <= MAX_CHARACTERS) {
      setTitle(newTitle);
      setTitleCount(newTitle.length);

      // Count words in the title
      const words = newTitle.split(/\s+/).filter((word) => word.length > 0);
      setTitleWordCount(words.length);
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;

    if (newContent.length <= MAX_CHARACTERS) {
      setContent(newContent);
      setContentCount(newContent.length);

      // Count words in the content
      const words = newContent.split(/\s+/).filter((word) => word.length > 0);
      setContentWordCount(words.length);
    }
  };

  const handleSubmit = () => {
    const isFormValid = title.length > 0 && image !== null && content.length > 0;

    if (isFormValid) {
      setIsValid(isCheckboxChecked);
      console.log('Title:', title);
      console.log('Image:', image);
      console.log('Content:', content);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <h2 className='h2noticias'>Título</h2>
      <p style={{ color: 'white' }}>Contagem de caracteres: {titleCount}/{TituloMAX_CHARACTERS}</p>
      <textarea
        className='titulonoticias'
        value={title}
        onChange={handleTitleChange}
        
      />

      <h2 className='h2imgnoticias'>Imagem</h2>
      <input
        type="file"
        accept="image/*"
        className='imgnoticias'
        onChange={(event) => handleImageChange(event)}
      />

      <h2 className='h2corponoticias'>Corpo da notícia</h2>
      <textarea
        className='Corponoticias'
        value={content}
        onChange={handleContentChange}
      />
      <p style={{ color: 'white' }}>Contagem de caracteres: {contentCount}/{MAX_CHARACTERS}</p>

      {!isValid ? (
        <p style={{ color: 'red' }}>Por favor, preencha todos os campos antes de enviar.</p>
      ) : null}

      <label className='divcheckbox'>
        <span className='textovisiveltexto'>Visível</span>
        <input
          className='visivelcheckbox'
          type="checkbox"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
        />
      </label>

      <button className='botaoAprovar' onClick={handleSubmit}>
        Aprovar
      </button>
    </>
  );
};

export default CriarNoticias;
