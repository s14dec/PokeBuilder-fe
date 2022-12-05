import React, { Component } from 'react'
import styled from 'styled-components';
import Card from './card';



class TeamForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          teams: [],
            name: "",
            teamList: "",
            show: false
        }

    }
 
    componentDidMount() {
        this.loadList()
       
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
            // console.log('loadlist',this.state.teams)
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
            "Content-Type":"application/json",
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
          
      };
      
      handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}`+'/pokeBuilder/'+id, {
          method: 'DELETE',
          // credentials: "include"
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
          
          <div>
            {this.state.teams && console.log('TEAMS',this.state.teams)}
            {this.state.teams?.length > 0
              ?
            this.state.teams.map((teams, index) => {
            return(   
                    <Card key= {index} teams={teams} handleDelete={this.handleDelete} />
                  )}): "No Teams"  
            }
            <form onSubmit={this.handleSubmit}>      
                <Input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>  
                <Input type='text' name="teamList" onChange={this.handleChange} placeholder="test" />
                <Submit type="submit" value="POST"/>
            </form>
          
            
          </div>
                )
              }
}
 
const Input = styled.input``;

// const TextArea = styled.textarea``;

const Submit = styled.input``;

export default TeamForm