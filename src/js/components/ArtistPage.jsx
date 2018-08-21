import React from "react";
import {Button, ListGroup, ListGroupItem, Tab, Modal, Label, Tooltip, Form, FormGroup} from "react-bootstrap";
import {DEBUG} from "../config";
import SearchBar from "./SearchBar";
import "../../CSS/UserDashboard.css"
import AddArtistPopOver from "./AddArtistPopOver";
import AddSongPopOver from "./AddSongPopOver";
import SignUpPopOver from "./SignUpPopOver";

export default class ArtistPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artistName: this.props.artistName,
            user: this.props.user,
            songs: [],
            festivals: [],
        }
    }

    componentWillMount() {
        console.log("will mount", this.props.artistName)
        console.log(this.props.user, "will mount**")
        const doAfterCWM = (response) => {
            console.log("doAfter", response)
            this.setState({songs: response})

            fetch("http://localhost:8080/artist/?artistName=" + this.state.artistName)
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    doAfterCWM(response.content)
                })
                .then(() => console.log("last", this.state.festivals))
        }

    }

    componentWillReceiveProps(props){
        console.log(props.artistName, "props")
    }




        render (){
            return (
               <div>
                <div>

                    <h2>{this.state.artistName} Info</h2>
                    <h4>Songs: {this.state.songs}</h4>
                    <h4>Festivals Playing at: {this.state.festivals}</h4>

                </div>
                <div>
                    <Button onClick={() => this.props.updateHostDashboard(false)}>back to dashboard</Button>
                </div>
               </div>




            )
        }

}