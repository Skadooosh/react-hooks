import React, {useState, useEffect} from 'react'
import {ListGroup,Row,Col,Container,Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const ViewSpeech = props => {
    let history = useHistory();
    const [speech, setSpeech] = useState([])
    const [viewData, setViewData] = useState({
        content : "",
        authorName: "",
        date : "",
        keyword : ""
    })
    const [del, setDelete] = useState(false);
    const [isEdittable, setEdit] = useState(false);
    const [selectedSpeech, setSelectedSpeech] = useState(-1);


    let isDelete = false;

    useEffect(()=> {

        if(speech !== null && speech.length !== 0) {
            localStorage.setItem('user', JSON.stringify(speech));
        } else if(del && speech.length === 0) {
            localStorage.setItem('user', JSON.stringify([]));
            setDelete(false);
            setViewData({
                content : "",
                authorName: "",
                date : "",
                keyword : ""
            })
        }
    }, [speech]);

    useEffect(()=> {
        
        if(props.location.state !== null && props.location.state !== undefined) {
            if(localStorage.getItem("user") !== null) {
                const s = JSON.parse(localStorage.getItem('user'));
                s.push(props.location.state.data)
                setSpeech(s)    
            } else {
                setSpeech(prev => [...prev, props.location.state.data])
            }
        } else {
            const s = JSON.parse(localStorage.getItem('user'));
            setSpeech(s)
        }
        history.replace('/view', null);


    }, []);

    const listHandler = content => {
        
        let listObject = speech.filter(e => e.content === content)
        let index = speech.findIndex(e => e.content === content);
        setSelectedSpeech(index);
        setEdit(false)
        setViewData({
            content : listObject[0].content,
            authorName : listObject[0].authorName,
            date : listObject[0].date,
            keyword : listObject[0].keyword,
        })
    }

    const onDeleteHandler = () => {
        if(selectedSpeech >= 0) {
            setDelete(true);
            speech.splice(selectedSpeech, 1);
            setSpeech([...speech]);
            setSelectedSpeech(-1);
            setViewData({
                content : "",
                authorName: "",
                date : "",
                keyword : ""
            })
        }

    }

    const onSaveHandler = e => {
        e.preventDefault();
        if(selectedSpeech >= 0) {
            if(isEdittable) {
                speech[selectedSpeech] = {
                    content : e.currentTarget[0].value,
                    authorName : e.currentTarget[1].value,
                    keyword : e.currentTarget[2].value,
                    date : e.currentTarget[3].value,
                }
                setSpeech([...speech]);
            }
            setEdit(!isEdittable)
        }   

    }

    return(
        <React.Fragment>
        { speech.length === 0 && <div className = "text-center mt-5">No Data Found</div> }
        <Container>
            <Row>
                <Col>
                    <ListGroup style ={{marginLeft : "1rem",marginTop: "10px", width : "200px"}}>
                    {speech !== null && speech.map(e => 
                        <ListGroup.Item onClick = {() => listHandler(e.content)} active = {false} key = {e.authorName + e.keyword} active = {false}>{(e.content.substring(0,20)) + "..."}</ListGroup.Item>
                    )}
                    </ListGroup>
                </Col>
                <Col>
                {speech.length > 0 && 
                    <Form style = {{width: "500px"}} className = "mx-auto mt-2" onSubmit = {onSaveHandler}>
                        <Form.Control disabled = {!isEdittable} onChange = {e => setViewData({
                            ...viewData,
                            content : e.currentTarget.value
                        })}value = {viewData.content} as="textarea" placeholder = "Speech Content Shown here" rows="5" />
                        <Form.Control pattern="[A-Za-z\s]+" disabled = {!isEdittable} onChange = {e => setViewData({
                            ...viewData,
                            authorName : e.currentTarget.value
                        })}value = {viewData.authorName} style = {{width : "150px", display : "inline"}} className = "mt-2" type="text" placeholder="author name" />
                        <Form.Control pattern="[A-Za-z\s]+" disabled = {!isEdittable} onChange = {e => setViewData({
                            ...viewData,
                            keyword : e.currentTarget.value
                        })}value = {viewData.keyword} style = {{width : "150px", display : "inline"}} className = "mt-2 ml-2" type="text" placeholder="keyword" />
                        <Form.Control disabled = {!isEdittable} onChange = {e => setViewData({
                            ...viewData,
                            date : e.currentTarget.value
                        })}value = {viewData.date} style = {{width : "180px", display : "inline"}} className = "mt-2 ml-2" type="date"/>
                        <Button name = 'delete' onClick = {onDeleteHandler} style = {{width : "180px", display : "inline"}} className = "ml-auto mt-2"> Delete </Button>
                        <Button name = 'edit' type = "submit" style = {{width : "180px", display : "inline"}} className = "ml-3 mt-2"> {isEdittable ? "Save" : "Edit" } </Button>
                    </Form>
                }
                </Col>
            </Row>
        </Container>
        </React.Fragment>

    )
}

export default ViewSpeech;