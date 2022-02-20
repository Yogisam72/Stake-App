import './App.css';
import Header from './Header';
import Navbar from "./Navbar";
import Card from "./Card";
import MdtToken from "./abis/MdtToken.json"
import StakePool from "./abis/StakePool.json"
import Web3 from "web3";
import React , {Component} from "react";



class App extends Component{
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({account : accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log(networkId)

    //load MdtToken
    const mdtTokenData = MdtToken.networks[networkId]
    if(mdtTokenData) {

      const mdtToken = new web3.eth.Contract(MdtToken.abi, mdtTokenData.address)
      this.setState({ mdtToken })
      let mdtTokenBalance = await mdtToken.methods.balanceOf(this.state.account).call()
      this.setState({ mdtTokenBalance: mdtTokenBalance.toString() })
      console.log(mdtTokenBalance)
    } 
    else {
      window.alert('MdtToken contract not deployed to detected network.')
    }

    // Load StakePool
    const stakePoolData = StakePool.networks[networkId]
    if(stakePoolData) {
      const stakePool = new web3.eth.Contract(StakePool.abi, stakePoolData.address)
      this.setState({ stakePool })
      let stakingBalance = await stakePool.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
      console.log(stakingBalance)
    } 
    else {
      window.alert('StakePool contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }
  

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.mdtToken.methods.approve(this.state.stakePool._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.stakePool.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = () => {
    this.setState({ loading: true })
    this.state.stakePool.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state ={
      account : '0x0' ,
      mdtToken : {},
      stakePool: {},
      mdtTokenBalance: '0',
      stakingBalance : '0',
      stakeTime : '0',
      rewardBalance : '0',
      loading:true
    }
  }



  render(){
    
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Card
        mdtTokenBalance={this.state.mdtTokenBalance}
        stakingBalance={this.state.stakingBalance}
        rewardBalance = {this.state.rewardBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }
    return (
      <div className="page">
        <Navbar account={this.state.account} />
        <Header />
        {content}
      </div>
    );
  }

}

export default App;
