import React from "react";
import "../../../App.css";
import {backendURL} from "../../config";


export default class ManagePlayLists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            user: this.props.user,
            festivals: [],
            allFestivals: [],
            festivalChosen: null,
            festivalSearch:"",
        }
    }
    // handleChange = (event) => {
    //     this.setState({festivalSearch:event.target.value})
    // };
    //
    // handleSearchClick = () => {
    //
    //     fetch("http://localhost:8080/user/searchFestivals?name="+this.state.festivalSearch)
    //         .then(response => {return response.json()} )
    //         .then(response => this.setState({message:response.content}));
    // };



    componentWillMount(){
        fetch(backendURL+"/listFestivals")
            .then(response => {return response.json()})
            .then(response => {this.setState({allFestivals:response.content})})
            // .then(response => {this.setState({allFestivals:response})});

        fetch(backendURL+"/user/listFestivals?name="+this.state.user)
            .then(response => {return response.json()})
            .then(response => {this.setState({festivals:response.content})})
            // .then(response => {this.setState({festivals:response})});



    }



    handleAddFestival = (festivalIndexNum) => {
        fetch(backendURL+"/user/addFestival?name=" + this.state.user + "&festivalName="+this.state.allFestivals[festivalIndexNum],)

            .then(response => {return response.json()})
            .then(response => {this.props.updateListOfFestivals(response.content)})

            // .then(response => {console.log(response, "response")})
            // .then(response => {this.setState({festivals:response})})
            // .then(response =>{this.props.updateListOfFestivals(response)})


    };

        render(){

            return(
            <div>

                <div><h4>{this.state.message}</h4></div>
                    <div className={"User-Dashboard1"}
                         style={{overflow:"scroll"}}
                    >
                        <div className={"List-of-all-festivals"}>
                            <div className={"All-festivals-header"}>
                                <h4> List of All Festivals </h4>
                            </div>
                            {this.state.allFestivals.map((festival, index)=>
                                <div className={"All-festivals"}>
                                    <div>
                                        <h4><button
                                            onClick={() => this.handleAddFestival(index)}> Add </button></h4>
                                    </div>
                                    <div>
                                        <h4>{festival}</h4></div>

                                </div>
                            )}
                        </div>
                        <div className={"Search-results"}style={{

                            overflow:"scroll"
                        }}>
                            <h4>Search Results:</h4>
                            {this.props.searchResults}
                        </div>
                    </div>
            </div>

            )

        }

}