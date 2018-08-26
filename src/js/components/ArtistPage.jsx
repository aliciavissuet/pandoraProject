import React from "react";
import {backendURL} from "../config";
import "../../CSS/UserDashboard.css"
import AddSongPopOver from "./AddSongPopOver";

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

        fetch(backendURL+"/host/artist/displaySongs?artistName="+this.props.artistName)
            .then((response) => {return response.json()})
            .then((response) => {this.setState({songs:response.content})})

        fetch(backendURL+"/host/displayArtistFestivalList?artistName="+this.props.artistName)
            .then((response) => {return response.json()})
            .then((response) => {this.setState({festivals:response.content})})
    }

    // handleSongClick =(artist) =>{
    //     fetch(backendURL+"/")
    // }

    refresh = () => {
        fetch(backendURL+"/host/artist/displaySongs?artistName="+this.props.artistName)
            .then((response) => {return response.json()})
            .then((response) => {this.setState({songs:response.content})})
    }

        render (){
            return (
               <div>
                <div>

                    <h2>{this.state.artistName} Info</h2>
                    <h4>Festivals Playing at:</h4>

                    {this.state.festivals.map((festival1) =>
                        <li
                            className={"Liststyle"}
                        >{festival1}
                        </li>
                    )}

                </div>
                   <AddSongPopOver
                       artistName={this.state.artistName}
                       updateSongs={this.props.updateSongs}
                       refresh={this.refresh}
                    />
                   <div>
                       <ul>
                           <h4> Songs: </h4>


                           {this.state.songs.map((song) =>
                               <li className={"Liststyle"}>
                                   {song}
                               </li>
                           )}
                       </ul>
                   </div>
                <div>
                    <a onClick={() => this.props.updateHostDashboard(false)}>back to dashboard</a>
                </div>
               </div>




            )
        }

}