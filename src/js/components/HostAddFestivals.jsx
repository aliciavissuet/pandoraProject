import {Button} from "react-bootstrap";
import React from "react";
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
                fetch("http://localhost:8080/host/listFestivals?name="+this.props.user)
                    .then((response1) => {return response1.json()})
                    .then((response1) => {return response1.content})
                    .then((response1) => {this.props.updateListOfFestivals(response1)})

            }

        }

        fetch("http://localhost:8080/host/addFestival?name="+this.props.user, {
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

    // componentDidMount(){
    //     console.log("component will mount")
    //     console.log(this.state.festivals)
    //
    //     const doAfterCWM = (response) => {
    //         console.log("doAfter", response)
    //         this.setState({festivals:response})
    //         this.props.updateListOfFestivals(response)
    //     }
    //
    //     fetch("http://localhost:8080/host/getFestival?name=" + this.props.user)
    //         .then((response)=> {
    //             return response.json()
    //         })
    //         .then((response) => {
    //             return response.content
    //         })
    //         .then((response) => doAfterCWM(response))
    //         .then(() => console.log("last", this.state.festivals))
    //
    //
    // }


    render() {

        return (
            <div style={{
                width: "450px",
                height: "250px",
                border: "1px solid black",
                margin: "auto",
                background: "rgba(235,235,235,.9)"
            }}>

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
            </div>

        )
    }
}