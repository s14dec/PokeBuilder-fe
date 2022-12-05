import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
let baseURL = `${process.env.REACT_APP_BACKEND_URL}`

const EditForm = (props) => {
    console.log("this is the props",props)
    const {teams} = props;
   console.log(teams.name , teams.teamList)

    let {id} =useParams()
    const navigate = useNavigate
    const [name, setName] = useState("")
    const [teamList, setTeamList] = useState("")
    // const [pokemonToEdit, setPokemonToEdit] = useState({
    //     name :props.name,
    //     teamList: props.teamList
    // })
    // console.log("This is pokemonToEdit",pokemonToEdit)
   
    const handleEditChange = (e) => {
        // setPokemonToEdit({
        //        ...pokemonToEdit,
        //        [e.target.id]: e.target.value
        // })
        setTeamList({...teams,
            [e.target.name]:e.target.value,
            [e.target.teamList]:e.target.value
        })
   }

//    const getProfile = (id) => {
//     fetch(baseURL + '/pokeBuilder'  + 'id')
//     .then((res) => {
//       if(res.status === 200) {
//         return res.json()
//       }else{
//         return []
//       }
//     })
//     .then((data) => {
//       console.log('data', data)
//       if(data === []) {
//         props.setState({ teams: data})
//       }else{
//         props.setState({teams: data.teams})
//       }
//     })
//   }


    // const getProfile = (id) => {
    //     fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/` + id).then((res)=>{
    //         return res.json()
    //     }).then((resp)=>{
    //         setName(resp.data.name)
    //         setTeamList(resp.data.teamList)
    //     }).catch((err)=>{
    //         console.log(err.message)
    //     })
        //  {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json())

        // .then((res) => {
            
        //     const{team}= res
        //     // setName(team.name)
        //     // setTeamList(team.teamList)
    //     // })
    // }

    useEffect(() => {
        // const {teams} = props
        // getProfile(id)
    //    setPokemonToEdit({
    //     name :props.name,
    //     teamList: props.teamList
    //    })
     
      },[])
    
      const data = {name: name, teamList: teamList}
   const handleSubmit = (e) => {
        e.preventDefault();
    const data ={name:teams.name, teamList:teams.teamList, id:teams.id}
    fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/`+ id, {
        
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data
            //     {
            //     name: pokemonToEdit.name,
            //     teamList: pokemonToEdit.teamList
            //     name:name,
            //     teamList:teamList
            // }
            ),
          }).then((res)=>res.json())
          .then((data)=>{
            console.log(data)
            // navigate('/pokeBuilder')
            // window.location.reload('/pokeBuilder')
          })
        //   .then( res => console.log('input', res.json()))
        //   .catch((err) => {console.log(err)})

      };

    
  return (
            <>
             <form onSubmit={handleSubmit
                // ()=>handleSubmit(id)
                }>      
                <Input name="name" type="text" onChange=
                {handleEditChange}
                // {(e) => setName(e.target.value)} 
                value={teams.name}/>  
                <Input  name="teamList" type="text"
                onChange={handleEditChange}
                value={teams.teamList}
                // {(e)=>setTeamList(e.target.value)} value={props.teams.teamList}
                />
                {/* <TextArea type='text' rows= '6' name="teamList" onChange=
                {(e)=> setTeamList(e.target.validationMessage)}
                value={props.teamList} /> */}
                <Submit type="submit" value="Submit"/>
            </form>
             </> 
         );
    
}
 
const Input = styled.input``;

const TextArea = styled.textarea``;

const Submit = styled.input``;

export default EditForm;
