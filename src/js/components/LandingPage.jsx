import React from "react";
import {Button, Tabs, Tab, ButtonToolbar, ButtonGroup, Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem} from "react-bootstrap";
import {DEBUG} from "../config";
import "../../CSS/LandingPage.css"
import SignUpPopOver from "./SignUpPopOver";

export default class LandingPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:1,
            key:"host",
            userName: "",
            response:"",
            tab:"user",
            signUp:{firstName:"",
            lastName:"",
            email:""},
            message:"",
            hostSignUp:{name:""},
            signedIn:false,
            signedUpArtResponse:""
        }
    }

    handleChange = (event) => {
        this.setState({userName:event.target.value})
    };

    handleClick = () => {

        fetch("http://localhost:8080/"+this.state.key+"/check?name="+this.state.userName)
            .then(response => {return response.json()} )
            .then(response => doAfterFetch(response.content));


        DEBUG && console.log("logging-in user: "+this.state.userName)

        const doAfterFetch = (nameFound) => {
            if (nameFound==="true" ){
                this.props.updateUser(this.state.userName);
                this.props.updateUserType(this.state.key);
                this.props.updateLandingPage(false);
            } else {
                this.setState({response:"sign in failed. "+this.state.userName+" not found."})
            }



        }
    };


    render(){
        const userOrHost =  (
            <ButtonToolbar style={{margin:"center"}}>
                <ButtonGroup >
                    <DropdownButton

                        title={this.state.key}
                        key={1}
                        id={1}
                        onSelect={(key) => this.setState({key})}
                    >
                        <MenuItem eventKey="host">Host</MenuItem>
                        <MenuItem eventKey="user">User</MenuItem>

                    </DropdownButton>


                </ButtonGroup>
            </ButtonToolbar>
        );



        return (
            <div className="Log-in-box">

                <form>
                    <FormGroup
                        controlId="formBasicText"
                    >

                        <div style={{display:"flex"}}>

                        <FormControl
                            type="text"
                            value={this.state.userName}
                            placeholder={"Username"}
                            onChange={this.handleChange}/>
                        {userOrHost}
                        <Button onClick={this.handleClick}> login </Button>
                        </div>
                        <SignUpPopOver
                            updateUserType={this.props.updateUserType}
                            updateLandingPage={this.props.updateLandingPage}
                            updateUser={this.props.updateUser}
                        />
                    </FormGroup>
                </form>
                        <h4> {this.state.response}</h4>


            </div>
        )
    }


}
