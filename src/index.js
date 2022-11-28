import React, { Component } from "react";
import ReactDOM from "react-dom";
import Builder from "./components/builder";
import "./styles.css";
import TeamForm from "./components/team-form";

let baseURL = `${process.env.REACT_APP_BACKEND_URL}`

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      show: false
    }
  }
//test
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

  handleAddTeam= (team) => {
    const copyTeam = [...this.state.teams]
    copyTeam.unshift(team);
    this.setState({
      teams: copyTeam,
      name: "",
      teamList: "",
    });
  };

  handleDelete = (id) => {
    fetch(baseURL + '/pokeBuilder/' + id, {
      method: 'DELETE'
    })
    .then( res => {
      const copyTeam = [...this.state.teams]
      const findIndex = this.state.teams.findIndex(
        (team) => team._id === id
      )
      copyTeam.splice(findIndex, 1)
      this.setState({ teams: copyTeam})
    })
  }

  showModal = (event) => {
    this.setState({
      show: true
    })
  }

  hideModal = (event) => {
    this.setState({
      show: false
    })
  }




  render() {
    return (
      <div className="app">
        <Builder />
        <TeamForm handleAddTeam={this.handleAddTeam} handleDelete={this.handleDelete} showModal={this.showModal} teams={this.state.teams} show={this.state.show}/>
      </div>
    
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
