import React from "react";
import {Button, Nav, Navbar, NavItem} from "react-bootstrap";

import "../../../CSS/UserDashboard.css"

export default class NavBarHost extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render (){
        return (
            <Navbar className={"Host-navbar"}>
                <Nav>
                    <NavItem> Hello, {this.props.user}</NavItem>

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