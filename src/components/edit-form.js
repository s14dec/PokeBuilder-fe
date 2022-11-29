import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import styled from 'styled-components';
let baseURL = `${process.env.REACT_APP_BACKEND_URL}`

const EditForm = (props) => {

    const {teams} = props;
   
    let {id} =useParams()
    const [name, setName] = useState('')
    const [teamList, setTeamList] = useState('')
    



 

   const handleSubmit = (id) => {
        fetch(baseURL + '/pokeBuilder' + id, {
            method: 'PUT',
            body: JSON.stringify({
                name:name,
                teamList:teamList
            }),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then( res => console.log('input', res.json()))
          .catch((err) => {console.log(err)})

      };

      const getProfile = (id) => {
        fetch(baseURL + '/pokeBuilder' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((res) => {
            setName(res.name)
            setTeamList(res.teamList)
        })
    }

      useEffect(() => {
        getProfile(id)
      },[])
    
  return (
            <>
             <form onSubmit={()=>handleSubmit(id)}>      
                <Input name="name" type="text" onChange={(e) => setName(e.target.value)} value={teams.name}/>  
                <TextArea type='text' rows= '6' name="teamList" onChange={(e) => setTeamList(e.target.value)} value={teams.teamList} />
                <Submit type="submit" value="Submit"/>
            </form>
             </> 
         );
    
}
 
const Input = styled.input``;

const TextArea = styled.textarea``;

const Submit = styled.input``;

export default EditForm;
