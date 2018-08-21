import React from "react";
import {Button, ButtonGroup, ButtonToolbar, Tab, Tabs, ListGroup, ListGroupItem} from "react-bootstrap";
import "../../App.css";
import "../../CSS/UserDashboard.css"
import {DEBUG} from "../config";
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
        }
    }
    componentWillMount(){
        fetch("http://localhost:8080/listFestivals")
            .then(response => {return response.json()})
            .then(response => {this.setState({allFestivals:response.content})})
            // .then(response => {this.setState({allFestivals:response})});

        fetch("http://localhost:8080/user/listFestivals?name="+this.state.user)
            .then(response => {return response.json()})
            .then(response => {this.setState({festivals:response.content})})




        const consoleLog = (r) =>{
            console.log(r);
            return r;}
    }


   componentWillReceiveProps(nextProps) {
       DEBUG && console.log(nextProps.listOfFestivals, "next props")
        this.setState({festivals:nextProps.listOfFestivals})


   }




    render() {

        return (
            <div>
                <div>

                    <h4> Hello, {this.props.user} </h4>


                </div>
                <div className={"User-dashboard-body"}>
                    <div className={"Side-bar"}>
                        <ListGroup>
                        <h4> Your Festivals: </h4>

                        {this.state.festivals.map((festival) =>
                            <ListGroupItem

                                href="#link1">{festival}</ListGroupItem>)}
                        </ListGroup>
                    </div>
                    <div className={"Play-list"}>

                    </div>
                </div>


                </div>


        )
    }


}