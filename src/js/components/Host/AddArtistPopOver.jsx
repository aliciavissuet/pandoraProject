import React from "react";
import {Button, ControlLabel, FormControl, FormGroup, Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";
import "../../../CSS/LandingPage.css"
import {backendURL} from "../../config";


export default class AddArtistPopOver extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            user:this.props.user,
            festival:this.props.festivalInfo,
            artist:{name:"",
                songs:[]},
            message:"",
            artistList:[]


        };
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({message:""})
        this.setState({ show: true });
    }
    handleAddArtistName =(event, label) =>{
        let name = this.state.artist;
        name[label] = event.target.value;
        this.setState({name})
    }
    //checks if user is valid and if artist has already been added to festival. returns an array like ["true", "false"]. if [1]==false, then can move on to adding to list
    handleClickAddArtistName = () =>{
        console.log("adding brand new artist")
            fetch(backendURL+"/host/addNewArtist?artistName="+this.state.artist.name)

                .then((response) => {return response.json()})
                .then((response) => {return response.content})
                .then((response) => {this.setState({message:response})})
                // .then((response) => {this.setState({message:response})})
                .then(() => {this.props.refresh()})






        //
        // const doAfterThisFetch = (response) =>{
        //
        //     const doAfterThisFetch2 = (response) => {
        //
        //         // this.setState({artistList:response});
        //         // console.log(this.state.artistList, "artist list on popover")
        //         this.props.updateArtistList(response);
        //         // this.setState({message:this.state.artist.name+" was successfully added"});
        //         console.log(response, "do after fetch 2")
        //         this.props.refresh();
        //
        //
        //     };
        //     //if artist hasn't already been added to festival, adds artist to specified festival. response is[id, array of artists]
        //     if (response) {
        //         fetch("http://localhost:8080/artists/viewAll")
        //             .then((response) => {return response.json()})
        //             .then((response) => {return response.content})
        //             // .then((response) => console.log(response, "do after fetch 1"))
        //             .then((response) => {doAfterThisFetch2(response)})
        //
        //
        //
        //     }
        //
        // }
    };
    componentWillReceiveProps(props){
        // console.log("receive props", props.message)
        // console.log(this.state.message)
        // this.setState({message:props.message})
    }


    render() {


        return (
            <div>
                <Button style={{cursor:"pointer", color:"black"}}onClick={this.handleShow}>
                    Add New Artist
                </Button>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <ModalHeader closeButton>
                        <ModalTitle>ADD ARTIST</ModalTitle>




                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <ControlLabel>Artist Name:    </ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.artist.name}

                                        onChange={(event) => this.handleAddArtistName(event,"name")}/>


                                    <Button onClick={() => this.handleClickAddArtistName()}> next </Button>
                                </FormGroup>


                            </form>

                            {/*<Button onClick={() => this.handleClickSignup()}> sign up </Button>*/}
                        </div>


                    </ModalBody>
                    <Modal.Footer>{this.state.message}</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

