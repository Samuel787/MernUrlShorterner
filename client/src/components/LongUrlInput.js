import { useState } from 'react';
import {InputGroup, FormControl, Button, Modal} from 'react-bootstrap'
const LongUrlInput = () => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [input, setInput] = useState("");
    const [numTimes, setNumTimes] = useState(-1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleShortenUrl = () => {
        if (isNaN(+numTimes) || +numTimes < 1) {
            setModalMessage("Please enter a number for number of times URL is valid")
            setIsSuccess(false)
            handleShow()
            return
        }
        fetch("http://localhost:5000/api/url/shorten", {
            method: "POST",
            headers:  {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "longUrl": input,
                "numValid": numTimes
            })
        })
        .then(res => {
            res.json()
            .then(data => {
                if (data === "Invalid long url") {
                    setModalMessage(data)
                    setIsSuccess(false)
                    handleShow()
                } else {
                    setModalMessage(data.shortUrl)
                    setIsSuccess(true)
                    handleShow()
                }
            })
            .catch(err => {
                setModalMessage(err)
                setIsSuccess(false)
                handleShow()
            })
        })
        .catch(err => {
            setModalMessage(err)
            setIsSuccess(false)
            handleShow()
        })
    }

    return(
        <div>
        <InputGroup className="mb-3" style={{width: "80vw"}}>
            <FormControl
            placeholder="Enter URL to shorten"
            aria-placeholder="Enter URL to shorten"
            value = {input}
            onInput = {e => setInput(e.target.value)}
            />
            <FormControl
            placeholder="Enter number of times usable"
            aria-placeholder="Enter number of times usable"
            value = {numTimes}
            onInput = {e => setNumTimes(e.target.value)}
            />
            <Button variant="success" id="button-addon2" onClick={() => handleShortenUrl()}>
                Let's go
            </Button>
        </InputGroup>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{(isSuccess) ? "Here is your short url" : "An error occurred"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    ) 
}

export default LongUrlInput