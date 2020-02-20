import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const CreateSpeech = () => {
    let history = useHistory();
    const [data, setData] = useState({
        authorName : '',
        content: '',
        keyword: '',
        date: '',
        submitted : false
    });

    const handleSubmit = e => { 
        e.preventDefault();
        let [content, authorName, keyword, date] = [e.currentTarget[0].value, e.currentTarget[1].value, e.currentTarget[2].value, e.currentTarget[3].value];
        let isValidated = true;
        
        [content, authorName, keyword, date].forEach(e => 
           {
               if(e === "")
                {
                    isValidated = false;
                    return;
                }
            }
        )
        if(isValidated) {
            setData({
                content,
                authorName,
                keyword,
                date,
                submitted : true
            })
        }

  
    }
    useEffect(() => {
        if (data.submitted) {
            history.push("/view", {
                data
            })
        }
      }, [data]);

    return(
        <Form style = {{width: "500px"}} className = "mx-auto mt-2" onSubmit = {handleSubmit} >
            <Form.Control as="textarea" placeholder = "Speech Content Shown here" rows="5" />
            <Form.Control pattern="[A-Za-z\s]+" style = {{width : "150px", display : "inline"}} className = "mt-2" type="text" placeholder="author name" />
            <Form.Control pattern="[A-Za-z\s]+" style = {{width : "150px", display : "inline"}} className = "mt-2 ml-2" type="text" placeholder="keyword" />
            <Form.Control style = {{width : "180px", display : "inline"}} className = "mt-2 ml-2" type="date"/>
            <Button type = 'submit' style = {{width : "180px", display : "inline"}} className = "ml-auto mt-2"> Save </Button>
        </Form>
    )
}

export default CreateSpeech;