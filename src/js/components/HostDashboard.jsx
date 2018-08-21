import React from "react";
import {Button, ListGroup, ListGroupItem, Tab, Modal, Label, Tooltip, Form, FormGroup} from "react-bootstrap";
import {backendURL, DEBUG} from "../config";
import SearchBar from "./SearchBar";
import "../../CSS/UserDashboard.css"
import AddArtistPopOver from "./AddArtistPopOver";
import AddSongPopOver from "./AddSongPopOver";


export default class HostDashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            festivalInfo:[],
            message: "",
            user: this.props.user,
            festivals:this.props.festivals,
            artistList:[],
            song:{name:"", album:"", duration:null},
            artist:"",
            festivalName:"",
            allArtists:[]
        }
    }
    //
    // componentWillReceiveProps() {
    //     fetch("http://localhost:8080/host/getFestival?name=" + this.props.user)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(response => {
    //             return response.content
    //         })
    //         .then(response => {
    //             this.setState({festivals: response})
    //         })
    //         .then((response) => this.props.updateListOfFestivals(response))
    //     // this.props.updateListOfFestivals;
    //
    // }

    componentWillMount(){

        const doAfterCWM = (response) => {
            console.log("doAfter", response)
            this.setState({festivals:response})

            // this.props.updateListOfFestivals(response)

        }

        console.log("component will mount")
        fetch("http://localhost:8080/host/listFestivals?name=" + this.props.user)
            .then((response)=> {
                return response.json()
            })
            .then((response) => {
                doAfterCWM(response.content)
            })
            .then(() => console.log("last", this.state.festivals))




    }


 componentWillReceiveProps (nextProps){
        DEBUG&& console.log(nextProps.festivals, "next props")
        this.setState({festivals:nextProps.festivals})
}



    componentDidMount(){
        console.log("did mount", this.state.festivals)
        fetch("http://localhost:8080/artists/viewAll")
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({allArtists:response.content})
            })

    }

    componentWillUnmount(){
        console.log("unmount", this.state.festivals)
    }









    handleViewFestival = (festival1) => {

        const doAfterArtistList = (response) => {
            console.log("after artist", response)
            this.setState({artistList:response})


        }

        fetch("http://localhost:8080/host/viewFestival?name=" + this.props.user + "&festivalName=" + festival1)
            .then(response => {
                return response.json()
            })
            .then(response => {
                return (response.content)
            })
            .then(response => this.setState({festivalInfo:response}))

        fetch("http://localhost:8080/host/festival/displayArtists?hostName="+this.props.user+"&festivalName="+ festival1)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                doAfterArtistList(response.content)
            })

        // fetch("http://localhost:8080/artists/viewAll")
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .then((response) => {
        //         this.setState({allArtists:response.content})
        //     })
    }

    refresh = () => {

        fetch("http://localhost:8080/artists/viewAll")
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({allArtists:response.content})
            })
    }

   updateArtistList = (response) => {
        console.log(response, "response")
        this.setState({artistList:response})
       console.log(this.state.artistList, "artist list")

   }
   handleClickArtist = (artist) => {
       // this.setState({artist})
       this.props.updateArtist(artist)
       this.props.updateArtistPage(true)

   }

   handleAddArtist = (artist) => {
        fetch(backendURL+ "/host/festival/addArtist?hostName="+this.state.user+"&festivalName="+this.state.festivalInfo[0]+"&artistName="+artist)
            .then((response) =>{return response.json()})
            .then((response) => {return response.content})
            .then((response) => {this.setState({artistList:response})})

   }

    render() {

        return (
            <div>

                <h1> Hello {this.props.user}</h1>


                <div>


                    <div className={"Host-dashboard-body"}>
                        <div>
                        {this.state.festivals.map((festival1) =>
                        <div className="dropdown">

                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={() => this.handleViewFestival(festival1)}>
                                {festival1}
                                <span className="caret"></span>
                            </button>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                {this.state.allArtists.map((artist) =>
                                <li onClick={() => this.handleAddArtist(artist)}>{artist}</li>
                                )}
                            </ul>

                        </div>
                        )}
                        </div>
                        {/*<div className={"Side-bar"}>*/}
                            {/*<div>*/}
                                {/*<ListGroup>*/}
                                    {/*<h4> Your Festivals: </h4>*/}

                                    {/*{this.state.festivals.map((festival1) =>*/}
                                        {/*<ListGroupItem*/}
                                            {/*onClick={() => this.handleViewFestival(festival1)}*/}
                                            {/*>{festival1}*/}
                                        {/*</ListGroupItem>*/}
                                    {/*)}*/}
                                {/*</ListGroup>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                        <div>
                        <h4>Festival Name: {this.state.festivalInfo[0]}</h4>
                        <h4>Festival Location: {this.state.festivalInfo[1]}</h4>
                        <h4>Festival Date: {this.state.festivalInfo[2]}</h4>

                        <div>
                            <ul style={{alignContent:"center"}}>
                                <h4> Artists Playing </h4>


                                {this.state.artistList.map((artist) =>
                                    <a onClick={() => this.handleClickArtist(artist)}>
                                        {artist}
                                    </a>
                                )}
                            </ul>
                        </div>
                        </div>
                        <div>

                                <ListGroup>
                                    <div>
                                        <AddArtistPopOver
                                            host={this.state.user}
                                            festivalName={this.state.festivalInfo[0]}
                                            user={this.state.user}
                                            festival={this.state.festivalInfo[0]}
                                            updateArtistList={this.updateArtistList}
                                            refresh={this.refresh}

                                        />
                                    </div>
                                    <h4>All Artists:</h4>
                                {this.state.allArtists.map((artist) =>
                                    <ListGroupItem
                                        onClick={() => this.handleAddArtist(artist)}
                                    >{artist}
                                    </ListGroupItem>
                                )}
                                </ListGroup>
                        </div>

                        </div>
                    </div>
                </div>


        )
    }

}

