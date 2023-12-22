import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { addData } from '../../firebase/firestore/addData';
import { Editor } from '@tinymce/tinymce-react';



const AddNews = ({ news, handleUpdate }) => {

  const editorRef = useRef(null);

  const initialNewsData = news
  ? {
    title: news.title || 'title',
    description: news.description || 'description',
   }
  : {
    title: '',
    description: '',
    };
  
  const [newsData, setNewsData] = React.useState(initialNewsData);

  const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewsData({ ...newsData, [name]: value });
    };

  const handleEditorChange = (content, editor) => {
        setNewsData({ ...newsData, description: content });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try {
      // Upload the image to Firebase Storage
       
        const { result, error } = await addData('news', newsData);
  
        if (error) {
          console.error('Error adding document:', error);
        } else {
          console.log('Document added with ID:', result);
          // window.location.reload();
          setNewsData({
            title: '',
            description: 'Add description here',
            });
        }} catch (error) {
            console.error('Error:', error);
        }
    };

  
  const handleInputUpdateChange = () => {
     handleUpdate(newsData);
    };

  return (
    <>
      <main>
            <Container>
                <h1 className="edit-title">Enter news item</h1>
                <Form onSubmit={handleSubmit}>
            
                    <Form.Group controlId="title">
                    <Form.Control type="text" name="title" placeholder="Title of item" value={newsData.title} onChange={handleInputChange} required />
                    </Form.Group>

                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        textareaName='Body'
                        name='description'
                        value={newsData.description}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | fontfamily fontsizeinput | ' +
                            'lineheight bold italic underline | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | ',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        onEditorChange={handleEditorChange}
                    />
                                        
                    <Button variant="primary" type="submit">
                    Save
                    </Button>
                    <Button variant="primary" onClick={handleInputUpdateChange}>
                    Update
                    </Button>
              </Form>       
            </Container>
      </main>
    </>);
};

export default AddNews;
