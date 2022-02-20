import React , {Component} from "react";

class Navbar extends Component{
    render(){
    return(
    <div>
    <nav className="mynav">
        <div className = "stakepool">STAKE POOL PLATFORM</div>
        <ul className = "accounts">
            <li><a> Your account : {this.props.account} </a></li>
        </ul>
    </nav>
    </div>
    );
}
}

export default Navbar;