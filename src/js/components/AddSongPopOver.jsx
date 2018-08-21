// import React from "react";
// import {Button, ButtonGroup, ButtonToolbar, Modal, Popover, Tooltip, FormGroup, Label, FormControl, ControlLabel} from "react-bootstrap";
// import "../../CSS/LandingPage.css"
// import {DEBUG} from "../config";
//
// export default class AddSongPopOver extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//
//         this.handleShow = this.handleShow.bind(this);
//         this.handleClose = this.handleClose.bind(this);
//
//         this.state = {
//             show: false,
//             user:this.props.user,
//             message:"",
//             song:{name:"", artist:this.props.artist, album:"", duration:""},
//             artist:this.props.artist,
//             artistSongList:[],
//
//
//         };
//     }
//
//
//     handleClose() {
//         this.setState({ show: false });
//     }
//
//     handleShow() {
//         this.setState({ show: true });
//     }
//     handleAddSongInfo =(event, label) =>{
//         let name = this.state.artist;
//         name[label] = event.target.value;
//         this.setState({name})
//     }
//     //checks if user is valid and if artist has already been added to festival. returns an array like ["true", "false"]. if [1]==false, then can move on to adding to list
//     handleClickAddSongInfo = () =>{
//             fetch("http://localhost:8080/addSong?artistName="+this.state.artist, {
//                 method: "POST",
//                 headers: {
//                 'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             body: JSON.stringify(this.state.song)
//             })
//                 .then((response) => {})
//     }
//
//
//
//
//         //
//         const doAfterThisFetch =(response) =>{
//
//             const doAfterThisFetch2 = (response) => {
//
//                 this.setState({artistList:response.content});
//                 this.setState({message:this.state.artist.name+" was successfully added"});
//                 console.log(response.content)
//                 this.props.updateArtistList(response.content);
//                 this.handleClose()
//
//             };
//             //if artist hasn't already been added to festival, adds artist to specified festival. response is[id, array of artists]
//             if (response.content[1]==="false") {
//                 fetch("http://localhost:8080/host/festival/addArtist?hostName="+this.state.user+
//                     "&festivalName="+this.props.festival+"&artistName="+this.state.artist.name)
//                     .then((response) => {return response.json()})
//                     .then((response) => {doAfterThisFetch2(response)})
//
//
//             } else if (response[0]==="false"){
//                 this.setState({message:this.artist.name+" could not be added."})
//             }
//         }
//     };
//
//
//     render() {
//
//         return (
//             <div>
//                 <a style={{cursor:"pointer", color:"black"}}onClick={this.handleShow}>
//                     Add Song
//                 </a>
//
//
//                 <Modal show={this.state.show} onHide={this.handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>ADD SONG for {this.state.artist}</Modal.Title>
//
//
//
//                     </Modal.Header>
//                     <Modal.Body>
//                         <div>
//                             <form>
//                                 <FormGroup
//                                     controlId="formBasicText"
//                                 >
//                                     <ControlLabel>Song Name:</ControlLabel>
//                                     <FormControl
//                                         type="text"
//                                         value={this.state.song.name}
//
//                                         onChange={(event) => this.handleAddSongInfo(event,"name")}/>
//
//                                 </FormGroup>
//                                 <FormGroup
//                                     controlId="formBasicText"
//                                 >
//                                     <ControlLabel>Song Album:</ControlLabel>
//                                     <FormControl
//                                         type="text"
//                                         value={this.state.song.album}
//
//                                         onChange={(event) => this.handleAddSongInfo(event,"album")}/>
//
//                                 </FormGroup>
//                                 <FormGroup
//                                     controlId="formBasicText"
//                                 >
//                                     <ControlLabel>Song Duration:</ControlLabel>
//                                     <FormControl
//                                         type="text"
//                                         value={this.state.song.duration}
//
//                                         onChange={(event) => this.handleAddSongInfo(event,"duration")}/>
//
//                                 </FormGroup>
//                                 <Button onClick={() => this.handleClickAddSongInfo()}> next </Button>
//
//                             </form>
//
//                             {/*<Button onClick={() => this.handleClickSignup()}> sign up </Button>*/}
//                         </div>
//
//
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         );
//     }


