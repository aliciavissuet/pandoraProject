import {Button} from "react-bootstrap";
import React from "react";
import {backendURL} from "../../config";
export default class HostAddFestivals extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            festival: {festivalName: "", festivalLocation: "", festivalDate: ""},
            message: "",
            user: this.props.user,
            festivals: [],
        }
    }

    handleAddFestivalChange = (event, label) => {
        let festival = this.state.festival;
        festival[label] = event.target.value;
        this.setState({festival});
    }

    handleFestivalClick = () => {

        const doAfterFetch = (state) =>{

            if(state==="success"){
                fetch(backendURL+"/host/listFestivals?name="+this.props.user)
                    .then((response1) => {return response1.json()})
                    .then((response1) => {return response1.content})
                    .then((response1) => {this.props.updateListOfFestivals(response1)})

            }

        }

        fetch(backendURL+"/host/addFestival?name="+this.props.user, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.festival)
        }).then(response => {
            return response.json()
        })
            .then(response => {
                return response.content
            })

            .then(response => {this.setState({message:response})})
            .then(() => console.log(this.state.message))

            .then(() => doAfterFetch(this.state.message))






    };

    render() {

        return (
            <div className={"Add-festival"}>

                <h2>Add a Festival</h2>

                <div>
                    <label>Festival Name </label>
                    <input type="text" value={this.state.festival.name}
                           onChange={(event) => this.handleAddFestivalChange(event, "festivalName")}
                    />
                </div>

                <div>
                    <label>Festival Location: </label>
                    <input type="text" value={this.state.festival.location}
                           onChange={(event) => this.handleAddFestivalChange(event, "festivalLocation")}
                    />
                </div>

                <div>
                    <label> Festival Date: </label>
                    <input type="text" value={this.state.festival.date}
                           onChange={(event) => this.handleAddFestivalChange(event, "festivalDate")}
                    />
                </div>

                <div>
                    <Button onClick={this.handleFestivalClick}> Add Festival </Button>
                </div>
                <div>
                    <h5>{this.state.message}</h5>
                </div>
            </div>

        )
    }
}