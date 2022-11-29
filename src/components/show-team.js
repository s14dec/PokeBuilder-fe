import React, { Component } from 'react';


let baseURL = `${process.env.REACT_APP_BACKEND_URL}`

class Show extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    

 


componentDidMount(){
    this.getTeams()
  }

  getTeams = () => {
    fetch(baseURL + '/pokeBuilder')
    .then((res) => {
      if(res.status === 200) {
        return res.json()
      }else{
        return []
      }
    })
    .then((data) => {
      console.log('data', data)
      if(data === []) {
        this.setState({ teams: data})
      }else{
        this.setState({teams: data.teams})
      }
    })
  }


  render() { 
    return ( 
    <>
    
    </> );
}


}
  export default Show;