import EditForm from "./edit-form";
import React, {useState, useEffect,useNavigate} from 'react'
import TeamForm from "./team-form";

const Card = (props) => {
    const { handleDelete,teams, handleEditForm} = props;
    const[show, setShow] = useState(false)
    const nevigate=useNavigate
    
   const showModal = (event) => {
        setShow(true)
      }


    return(
       
<div class="card">
  <div class="container">
    <h3>{teams.name}'s Team</h3>
    <p>{teams.teamList}</p>
    {/* <button onClick={()=>{
        showModal()
    }}>POST</button>
    {show && <TeamForm />} */}
    <button onClick={()=>
    {
        // nevigate(`/pokeBuilder/EditForm/${teams._id}`)
        {showModal()}
    }
    }>EDIT</button>
        {show && <EditForm  
        teams={teams} 
        // handleEditForm={teams._id} 
          />}

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