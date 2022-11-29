import React, { Component } from 'react'
import styled from 'styled-components';


class TeamForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            teamList: "",
            teams: [],
            show: this.props.show
        }

    }
 
    componentDidMount() {
        this.loadList();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    loadList = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((resJson) => {
            this.setState({
              teams: resJson.team.reverse(),
            });
            console.log('loadlist',this.state.teams)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/`, {
          method: "POST",
          body: JSON.stringify({
            name: this.state.name,
            teamList: this.state.teamList
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((resJson) => {
            this.props.handleAddTeam(resJson)
            this.setState({
              name: "",
              teamList:""
            });
            this.loadList();
          })
          .catch((err) => {
            console.log(err);
          });
          console.log('this is URL',`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/${window.location.pathname.split("/")[2]}`)
      };

    render() { 
        return ( 
          <div>
            <form onSubmit={this.handleSubmit}>      
                <Input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>  
                <TextArea type='text' rows= '6' name="teamList" onChange={this.handleChange} placeholder="test" />
                <Submit type="submit" value="POST"/>
            </form>
          
            <div>
        
              {this.state.teams&&console.log('TEAMS',this.state.teams)}
                {this.state.teams?.length > 0
                ?
                this.state.teams.map((teams, index) => {
                  return(
                    <div>
                  {/* <Card key= {index} teams={teams}>
                  */} 
              
                    {teams.name}
                    {teams.teamList}
                    </div>
                   
                  )
                })
                : "No Teams"}
                
            </div> 

          </div>
         )
    }
}
 
const Input = styled.input``;

const TextArea = styled.textarea``;

const Submit = styled.input``;

export default TeamForm