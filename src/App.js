import React, { Component } from 'react';
import logo from './Assets/Images/Pandora.svg';
import background1 from './Assets/Images/lolla.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LandingPage from "./js/components/LandingPage";
import UserDashboard from "./js/components/UserDashboard";
import HostDashboard from "./js/components/HostDashboard";
import ManagePlayLists from "./js/components/ManagePlayLists";
import HostAddFestivals from "./js/components/HostAddFestivals";
import {Button, Tab, Tabs} from "react-bootstrap";
import PlayListPage from "./js/components/ManagePlayLists";
import SearchBar from "./js/components/SearchBar";
import ArtistPage from "./js/components/ArtistPage";
import {DEBUG} from "./js/config";


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            landingPage:true,
            userPage:false,
            hostPage:false,
            artistPage:false,
            user:"",
            userType:"",
            tab:"home",
            searchResults:"",
            listOfFestivals:[],
            artistName:""



        }
    }

    updateLandingPage = (landingPage) => {
        this.setState({landingPage})
    };

    updateUser = (user) => {
        this.setState({user});
    };

    updateUserType = (userType) =>{
        this.setState({userType});
    };
    handleSelectTab = (key) => {
        this.setState({key});
    }
    updateSignIn = (signedIn) => {
        this.setState({signedIn})
    }
    updateSearchResults = (searchResults) => {
        this.setState({searchResults});
    }
    updateListOfFestivals = (response) => {
        DEBUG && console.log(response, "update list")
        this.setState({listOfFestivals:response})
        DEBUG && console.log("updated", this.state.listOfFestivals)


    }
    updateArtistPage = (response) => {
        this.setState({artistPage:response})
    }
    updateArtist = (response) => {
        console.log("here")
        this.setState({artistName: response})
        console.log("here too", this.state.artistName)

    }





  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Festival Playlists</h1>

        </header>

          {this.state.landingPage &&
              <div className="Landing-page">
                  <LandingPage
                    updateLandingPage = {this.updateLandingPage}
                    updateUser = {this.updateUser}
                    updateUserType = {this.updateUserType}
                  />
              </div>
          }

          {!this.state.landingPage && !this.state.artistPage && this.state.userType ==="host" &&
          <div>
              <Tabs activeKey={this.state.hostKey} onSelect={this.handleSelectHostKey} id="UserDashboardTabs">
                  <Tab eventKey={"manageFestivals"} title="Manage Current Festivals">
                    <HostDashboard
                          user={this.state.user}
                          updateLandingPage = {this.updateLandingPage}
                          updateUser = {this.updateUser}
                          updateUserType = {this.updateUserType}
                          updateSignIn={this.updateLandingPage}
                          updateArtistPage={this.updateArtistPage}
                          updateListOfFestivals={this.updateListOfFestivals}
                          festivals={this.state.listOfFestivals}
                          artistList={this.updateArtistList}
                          updateArtist={this.updateArtist}
                          artistName={this.state.artist}

                      />
                  </Tab>
                  <Tab eventKey={"addFestivals"} title="Add Festivals">
                      <HostAddFestivals
                          user={this.state.user}
                          updateLandingPage = {this.updateLandingPage}
                          updateUser = {this.updateUser}
                          updateUserType = {this.updateUserType}
                          updateSignIn={this.updateLandingPage}
                          updateListOfFestivals={this.updateListOfFestivals}
                          festivals={this.state.listOfFestivals}
                          artistName={this.state.artist}
                      />

                  </Tab>
              </Tabs>

          </div>
          }
          {this.state.artistPage &&
          <ArtistPage
              user={this.state.user}
              updateHostDashboard={this.updateArtistPage}
              artistName={this.state.artistName}

          />
          }

          {!this.state.landingPage && this.state.userType ==="user" && <div>
              <SearchBar
               updateSignIn={this.updateLandingPage}
                updateSearchResults={this.updateSearchResults}
                handleSelectTab={this.handleSelectTab}/>
              <Tabs activeKey={this.state.key} onSelect={this.handleSelectTab} id="UserDashboardTabs">
                  <Tab eventKey={"home"} title="Home">
                      <UserDashboard
                          user={this.state.user}
                          updateLandingPage = {this.updateLandingPage}
                          updateUser = {this.updateUser}
                          updateUserType = {this.updateUserType}
                          tab={this.handleSelectTab}
                          updateSignIn={this.updateLandingPage}
                          searchResults={this.state.searchResults}
                          listOfFestivals={this.state.listOfFestivals}

                      />
                  </Tab>
                  <Tab eventKey={"findMusic"} title="Find Music">
                    <ManagePlayLists
                        user={this.state.user}
                        updateSignIn={this.updateLandingPage}
                        searchResults={this.state.searchResults}
                        updateListOfFestivals={this.updateListOfFestivals}

                    />
                  </Tab>

              </Tabs>




          </div>

          }

      </div>
    );
  }
}

export default App;
