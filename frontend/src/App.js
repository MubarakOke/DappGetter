import React from 'react';
import './App.css';
import {ethers} from 'ethers'
import contractAbi from './abi.json'

function App() {
  const [value, setValue] = React.useState("")
  const [smartValue, setSmartValue] = React.useState("")
  const [connected, setConnected] = React.useState(false)
  const [contract, setContract] = React.useState(null)
  const contractAddress= "0xf458b8288A17f18642Ee2A560ee39A7fE7C1951B"

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts'})
  }

  async function handleConnected(){
    if(!connected){
      if(typeof window.ethereum != 'undefined'){
        await requestAccount()
        const provider= new ethers.BrowserProvider(window.ethereum)
        const signer= await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        setContract(contract)
        setConnected(true)
      }
    } 
  }

  async function getMessage(e){
    e.preventDefault()
    if(contract && connected){
      try {
        const transaction= await contract.getMessage()
        setSmartValue(transaction)
      }
      catch(e){
        console.log("message not gotten")
      }
    }
  }

  async function setMessage(e){
    e.preventDefault()
    if(contract && connected){
      try {
        const transaction= await contract.setMessage(value)
        await transaction.wait()
        console.log("Owo ti drop ooooooo")
      }
      catch(e){
        console.log("message not set")
      }
    }
  }

  function handleChange(e){
    e.preventDefault()
    setValue(e.target.value)
  }

  return (
    <div className="App">
      <button onClick={(e)=>{handleConnected(e)}}>Connect</button><small>{connected?" connected":" not connected"}</small>
      <header className="App-header">
        <div>
          <input type="textbox" value={value} onChange={handleChange} />
          <button onClick={(e)=>{setMessage(e)}}>
            Set Message
          </button>
        </div>
        <div>
          <button onClick={(e)=>{getMessage(e)}}>
            Get Message
          </button>
          <div style={{width: "80px", height: "80px", borderColor: "black", color: "black"}}>{smartValue}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
