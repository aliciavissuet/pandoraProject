import React from "react";
import {Button, ButtonGroup, ButtonToolbar, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import "../../CSS/LandingPage.css"
import {backendURL, DEBUG} from "../config";

export default class SignUpPopOver extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            signUp:{firstName:"",
                lastName:"",
                email:""},
            key:"host",
            message:""

        };
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({message:""})
        this.setState({ show: true });
    }
    handleChangeSignup = (event,label) =>{
        let signUp = this.state.signUp;
        signUp[label] = event.target.value;
        this.setState({signUp})
    };

    handleClickSignup = ()=> {
        DEBUG && console.log("CLICK");
        fetch(backendURL+"/" +this.state.key+ "/check?name="+this.state.signUp.email)
            .then(response => {return response.json()})
            .then(response => doAfterFetch1(response.content))

        const doAfterFetch1 = (response) =>{
            if (response==="false"){
                fetch(backendURL+"/"+this.state.key+"/add", {
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state.signUp)
                })
                    .then((response) =>{return response.json()})
                    .then((response) => {doAfterFetch2(response.content)})
            }
        };

        const doAfterFetch2 = (response)=>{
            this.setState({message:response})
            this.props.updateUser(this.state.signUp.email);
            this.props.updateUserType(this.state.key);
            this.props.updateLandingPage(false);
        }
    };

    render() {

        const userOrHost =  (
            <ButtonToolbar style={{margin:"center"}}>
                <ButtonGroup >
                    <Button active={this.state.key==="host"} onClick={() => this.setState({key:"host"})}> Host </Button>
                    <Button active={this.state.key==="user"} onClick={() => this.setState({key:"user"})}> User </Button>
                </ButtonGroup>
            </ButtonToolbar>
        );



        return (
            <div>
                <a style={{cursor:"pointer", color:"white"}}onClick={this.handleShow}>
                    Sign Up
                </a>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>SIGN UP as {userOrHost} </Modal.Title>



                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <ControlLabel>First Name:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.signUp.firstName}

                                        onChange={(event) => this.handleChangeSignup(event,"firstName")}/>
                                </FormGroup>
                                <FormGroup>
                                <ControlLabel>Last Name:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.signUp.lastName}

                                        onChange={event => this.handleChangeSignup(event,"lastName")}/>
                                </FormGroup>
                                <FormGroup>
                                <ControlLabel>Email: </ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.signUp.email}

                                        onChange={event => this.handleChangeSignup(event,"email")}/>

                            </FormGroup>
                            </form>

                            <Button onClick={() => this.handleClickSignup()}> sign up </Button>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>{this.state.message}</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

