import EditForm from "./edit-form";
import React, {useState, useEffect} from 'react'

const Card = (props) => {
    const { handleDelete,teams, handleEdit} = props;
    const[show, setShow] = useState(false)
    
   const showModal = (event) => {
        setShow(true)
      }


    return(
       
<div class="card">
  <div class="container">
    <h3>{teams.name}'s Team</h3>
    <p>{teams.teamList}</p>

    <button onClick={()=>{
        showModal()
    }}>EDIT</button>
        {show && <EditForm  teams={teams}  />}

    <button onClick={()=>{
        handleDelete(teams._id)
    }}>
        X
    </button>
  </div>
</div>
        
    )



}

export default Card;