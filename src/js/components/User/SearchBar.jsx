import React from "react";
import {Button, FormControl, Nav, Navbar, NavItem} from "react-bootstrap";
import {backendURL} from "../../config";

export default class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchResults:""
        }
    }

    handleChange = (event) => {
        this.setState({festivalSearch:event.target.value})
    };

    handleSearchClick = () => {

        fetch(backendURL+"/user/searchFestivals?name="+this.state.festivalSearch)
            .then(response => {return response.json()} )
            .then(response => doAfterHandleSearchClick(response.content))
            .then(() => {console.log(this.state.searchResults)});

        const doAfterHandleSearchClick = (sendThis) => {
            this.setState({searchResults:sendThis})
            this.props.updateSearchResults(sendThis);
            this.props.handleSelectTab("findMusic")
            console.log(this.props.searchResults);
        }
    };



    render() {
        return(
            <Navbar>
                <Nav>
                    <NavItem>
                        <FormControl type="text" value={this.state.festivalSearch} onChange={this.handleChange} placeholder="Festival Name Here" />
                    </NavItem>
                    <NavItem>
                        <Button onClick={() => this.handleSearchClick()} type="submit">Search</Button>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem>
                        <Button className="logout" onClick={() => this.props.updateSignIn(true)}>Log out</Button>
                    </NavItem>
                </Nav>

            </Navbar>
        )
    }
}