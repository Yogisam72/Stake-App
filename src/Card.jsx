import React , {Component} from "react";

class Card extends Component {
    render(){
    return(
        <center>
        <div id= "content" className = "card">
            
            <table className="balance-displayers">
            <thead>
                <tr>
                <th scope="col">Staking Balance</th>
                <th scope="col">Reward Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} MDT</td>
                <td>{window.web3.utils.fromWei(this.props.rewardBalance, 'Ether')} MDT</td>
                </tr>
            </tbody>
            </table>


            <div className = "cardbody">
                <form className= "form-stake" onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.stakeTokens(amount)
                    }}>
                        <div>
                            <label className="float-left">Stake MDT Tokens</label>
                            <span className="text-f-l">
                                Balance : {window.web3.utils.fromWei(this.props.mdtTokenBalance, 'Ether')}
                            </span>
                        </div>
                        <div className="input-box">
                            <input 
                            type="text"
                            ref={(input) => { this.input = input }}
                            className="amount"
                            placeholder="0"
                            required />
                        </div>
                        <div className="subutton">
                            <button type = "submit" >STAKE!</button>
                        </div>
                        <div className ="unstake">
                            <button
                                type="submit"
                                className="btn btn-link btn-block btn-sm"
                                onClick={(event) => {
                                    event.preventDefault()
                                    this.props.unstakeTokens()
                                }}>
                                Unstake!...
                            </button>
                        </div>

                </form>
            </div>
        </div>
        </center>
    );
}
}

export default Card;