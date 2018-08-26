import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {backendURL, DEBUG} from "../../config";

import "../../../CSS/UserDashboard.css";
import AddArtistPopOver from "./AddArtistPopOver";




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


    componentWillMount(){

        const doAfterCWM = (response) => {
            console.log("doAfter", response)
            this.setState({festivals:response})

            // this.props.updateListOfFestivals(response)

        }

        console.log("component will mount")
        fetch(backendURL+"/host/listFestivals?name=" + this.props.user)
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
        fetch(backendURL+"/artists/viewAll")
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

        fetch(backendURL+"/host/viewFestival?name=" + this.props.user + "&festivalName=" + festival1)
            .then(response => {
                return response.json()
            })
            .then(response => {
                return (response.content)
            })
            .then(response => this.setState({festivalInfo:response}))

        fetch(backendURL+"/festival/displayArtists?festivalName="+ festival1)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                doAfterArtistList(response.content)
            })


}

    refresh = () => {

        fetch(backendURL+"/artists/viewAll")
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
            .then(() => {this.setState({message:artist+" is scheduled to play at "+this.state.festivalInfo[0]})})

   }

    render() {


        return (
            <div>
                    <div className={"Host-dashboard-body"}>

                        <div className={"Side-bar"}>
                            <div>
                                <ListGroup>
                                    <h4> Your Festivals: </h4>

                                    {this.state.festivals.map((festival1) =>
                                        <ListGroupItem
                                            onClick={() => this.handleViewFestival(festival1)}
                                            >{festival1}
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                            </div>

                        </div>

                        <div className={"Host-festival"}>
                            <div>
                                <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Name: </b><p>{this.state.festivalInfo[0]}</p></div>
                                <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Location:</b><p> {this.state.festivalInfo[1]}</p></div>
                                <div className={"Festival-info-2"}><b style={{color:"gray"}}>Festival Date:</b><p> {this.state.festivalInfo[2]}</p></div>
                            </div>

                            <div>


                                <h4> Artists Playing </h4>


                                {this.state.artistList.map((artist) =>
                                        <div style={{cursor:"pointer", color:"blue", align:"left"}} className={"Liststyle"} onClick={() => this.handleClickArtist(artist)}>
                                            {artist}
                                        </div>
                                )}

                                <h5>{this.state.message}</h5>
                            </div>
                        </div>

                        <div className={"Host-festival2"}>
                            {!this.state.festivalInfo[0] ? <h3> Click on festival to add artists. </h3> : <div>
                                <ListGroup>

                                    <h4>Add Artist to Festival:</h4>
                                    {this.state.allArtists.map((artist) =>
                                        <ListGroupItem
                                            onClick={() => this.handleAddArtist(artist)}
                                        >{artist}
                                        </ListGroupItem>
                                    )}

                                </ListGroup>

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
                            </div>
                            }
                        </div>
                    </div>
            </div>


        )
    }

}

