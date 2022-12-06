import React, { useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
let baseURL = `${process.env.REACT_APP_BACKEND_URL}`

const EditForm = (props) => {
    // console.log("this is the props",props)
    const {teams} = props;
//    console.log(teams.name , teams.teamList)

    let {id} =useParams()
    const navigate = useNavigate
    const [name, setName] = useState(props.teams)
    const [teamList, setTeamList] = useState(props.teams)

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
    // setTeamList(props.teams)
    setName(props.teams)
      },[]) 

   const handleSubmit = (e) => {
        e.preventDefault();
        // const data = {data:teamList}
        console.log(teamList)
    fetch(baseURL + '/pokeBuilder/'+ teamList._id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(teamList),
          }).then((res)=>res.json())
        //   .then((data)=>{
        //     // console.log(data)
        //     navigate('/pokeBuilder')
        //     window.location.reload('/pokeBuilder')
        //   })
          .then( res => console.log('input', res.json()))
          .catch((err) => {console.log(err)})
          .finally(()=>{
            window.location.reload('/pokeBuilder')
          }
          );
      };

    
  return (
            <>
             <form onSubmit={handleSubmit
                // ()=>handleSubmit(id)
                }>      
                <Input name="name" type="text" onChange=
                // {handleEditChange}
                {(e) => setTeamList({...name, name: e.target.value})} 
                value={teamList.name}/>  
                <Input  name="teamList" type="text"
                onChange={(e) => setTeamList({...teamList, teamList: e.target.value})}
                value={teamList.teamList}
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
