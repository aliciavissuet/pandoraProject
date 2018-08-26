import React from "react";
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import "../../CSS/LandingPage.css"
import {backendURL} from "../config";

export default class AddSongPopOver extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            user: this.props.user,
            message: "",
            song: {songName: "", songAlbum: "", songLength: null, timesPlayed: 0, popularity: 0},
            artistName: this.props.artistName,
            artistSongList: [],


        };
    }


    handleClose() {

        this.setState({show: false});
    }

    handleShow() {
        this.setState({message:""})
        this.setState({show: true});
    }

    handleAddSongInfo = (event, label) => {
        let name = this.state.song;
        name[label] = event.target.value;
        this.setState({name})
    }
    //checks if user is valid and if artist has already been added to festival. returns an array like ["true", "false"]. if [1]==false, then can move on to adding to list
    handleClickAddSongInfo = () => {

        // const doAfterFetch = (response) => {
        //     DEBUG && console.log("do after fetch")
        //     if(response === "success"){
        //         this.props.refresh()
        //     }
        // }

        fetch(backendURL + "/addSong?artistName=" + this.props.artistName, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.song)
        })
            .then((response) => {
                return response.json()
            })
            .then((response) => {messageDisplay(response.content)})
            .then(() => {this.props.refresh()})

        const messageDisplay =(response) =>{
            if(response==="success"){
                this.setState({message:"song was successfully added"})
            }else{
                this.setState({message:"song could not be added at this time"})
            }
        }

    }






    render() {

        return (
            <div>
                <a style={{cursor: "pointer", color: "black"}} onClick={this.handleShow}>
                    Add Song
                </a>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD SONG for {this.state.artistName}</Modal.Title>


                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <ControlLabel>Song Name:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.song.name}

                                        onChange={(event) => this.handleAddSongInfo(event, "songName")}/>

                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <ControlLabel>Song Album:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.song.album}

                                        onChange={(event) => this.handleAddSongInfo(event, "songAlbum")}/>

                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <ControlLabel>Song Duration:</ControlLabel>
                                    <FormControl
                                        type="input"
                                        value={this.state.song.duration}
                                        placeholder={'must be int'}

                                        onChange={(event) => this.handleAddSongInfo(event, "songLength")}/>

                                </FormGroup>
                                <Button onClick={() => this.handleClickAddSongInfo()}> next </Button>

                            </form>

                            {/*<Button onClick={() => this.handleClickSignup()}> sign up </Button>*/}
                        </div>


                    </Modal.Body>

                    <Modal.Footer>{this.state.message}</Modal.Footer>

                </Modal>
            </div>
        );
    }

}

