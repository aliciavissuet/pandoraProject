import React from "react";
import { ListGroup, ListGroupItem} from "react-bootstrap";
import "../../../App.css";
import "../../../CSS/UserDashboard.css"
import {backendURL, DEBUG} from "../../config";

export default class UserDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            user: this.props.user,
            festivals: [],
            allFestivals:[],
            festivalChosen:null,
            searchResults:"",
            festivalInfo:[],
            artistList:[],
            playList:[],
            songInfo:{songName:"", songArtist:""},
            playListInfo:[]
        }
    }
    componentWillMount() {
        fetch(backendURL + "/listFestivals")
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({allFestivals: response.content})
            })
        // .then(response => {this.setState({allFestivals:response})});

        fetch(backendURL + "/user/listFestivals?name=" + this.state.user)
            .then(response => {
                return response.json()
            })
            .then(response => {
                afterFetch(response)
            });

        const afterFetch = (response) => {
            this.setState({festivals: response.content})
            this.props.updateListOfFestivals(response.content)
        };




    }


   componentWillReceiveProps(nextProps) {
       DEBUG && console.log(nextProps.listOfFestivals, "next props")
        this.setState({festivals:nextProps.listOfFestivals})



   }

    handleViewFestival = (festival) => {

        const doAfterArtistList = (response) => {
            console.log("after artist", response)
            this.setState({artistList: response})


        }

        fetch(backendURL + "/host/viewFestival?name=" + this.props.user + "&festivalName=" + festival)
            .then(response => {
                return response.json()
            })
            .then(response => {
                return (response.content)
            })
            .then(response => this.setState({festivalInfo: response}))

        fetch(backendURL + "/festival/displayArtists?festivalName=" + festival)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                doAfterArtistList(response.content)
            })
        fetch(backendURL + "/user/festival/displayPlaylist?festivalName="+festival+"&userName="+this.props.user)
            .then(response => {
                return response.json()
            })
            .then(response => {
                return (response.content)
            })
            .then(response => {
                DEBUG && console.log("here")
                this.setState({playList:response})
            })
        fetch(backendURL+"/user/festival/displayPlaylistInfo?festivalName="+festival)
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.setState({playListInfo:response.content})
            })


    }

    handleClickArtist = (artist) => {
        // this.setState({artist})
        this.props.updateArtist(artist)
        this.props.updateArtistPage(true)

    }
    handleClickSong = (song0, song1) => {
        DEBUG && console.log(song0, song1)
        fetch(backendURL+"/user/playSong?song="+song0+"&artistName="+song1)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                return response.content
            })
            .then((response) => {
                this.setState({message:response+" now playing: "+song0})
            })
    }


    render() {

        return (
            <div>
                <h3>{this.state.message}</h3>
                <div className={"grid-container"}>
                    <div className={"grid-item-1"}>
                        <div>
                            <ListGroup>
                                <h4> Your Festivals: </h4>

                                    {this.state.festivals.map((festival) =>
                                          <ListGroupItem onClick={() => this.handleViewFestival(festival)}

                                        href="#link1">{festival}</ListGroupItem>)}
                             </ListGroup>
                        </div>
                    </div>

                    <div className={"grid-item-3"}>



                            <h3>PlayList:</h3>

                            <h6>Number of Songs: {this.state.playListInfo[0]}</h6>
                            <h6>Total Play Time: {this.state.playListInfo[1]} minutes</h6>
                        <div className={"Playlist-song-info"}>
                            <div className={"box1"}><b>Name:</b></div>
                            <div className={"box2"}> <b>Artist:</b></div>
                        </div>
                            {this.state.playList.map((song) =>


                                <div className={"Playlist-song-info"}>

                                       <div className={"box1"}><p style={{color:"blue", cursor:"pointer"}} onClick={() => this.handleClickSong(song[0], song[1])}> {song[0]} </p></div>
                                        <div className={"box2"}><p> {song[1]}</p></div>
                                   </div>

                            )}

                    </div>
                    <div className={"grid-item-2"}>
                        {this.state.festivalInfo[0]&& <div>
                            <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Name:  </b><p> {"  "+this.state.festivalInfo[0]}</p></div>
                            <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Location:  </b><p> {"  "+this.state.festivalInfo[1]}</p></div>
                            <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Date:  </b><p> {"  "+this.state.festivalInfo[2]}</p></div>

                        <div >

                                <h5> Artists Playing </h5>
                                {this.state.artistList.map((artist) =>
                                    <div style={{cursor:"pointer", color:"blue", align:"left"}} className={"Liststyle"} onClick={() => this.handleClickArtist(artist)}>
                                        {artist}
                                    </div>
                                )}

                        </div>
                        </div>
                        }
                    </div>

                </div>






                </div>



        )
    }

}
