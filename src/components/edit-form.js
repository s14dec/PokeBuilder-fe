import React, { Component} from 'react';
import {useParams} from 'react-router-dom'
import styled from 'styled-components';
let baseURL = `${process.env.REACT_APP_BACKEND_URL}`
// import React, {Component} from 'react'

class EditForm extends Component {
    constructor(props){
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeTeamList = this.handleChangeTeamList.bind(this)
        this.setState = {
            name:'',
            teamList:'',
            teams:props.teams,
            show:props.show
        }
    }
   
    handleChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleChangeTeamList(event) {
        this.setState({
            teamList: event.target.value
        })
    }

     hideModal = () => {
        this.setState({
            show: false
        })
      }

      handleUpdate = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/${id._id}`,{
            method: "PUT",
            body: JSON.stringify({
                name:this.state.name,
                teamList: this.
            })
        } )
      }

render(){
    if(!this.props.show){
        return null
        
    }
    return(
        <>
        {console.log(this.props.teams)}
        {console.log(this.props.teams.name)}
        
           
            <form >      
               <Input name="name" type="text" placeholder="Name" value={this.props.teams.name}/>  
               <TextArea type='text' rows= '6' name="teamList"  placeholder="test"value={this.props.teams.teamList} />
               <Submit type="submit" value="Submit"/>
            </form>
            
        
            
        </>
    )

}










}

// const EditForm = (props) => {

//     const {teams} = props;
//     console.log(teams)
//     const{id} = useParams()
//     // console.log(teams._id)
//     const[name, setName] = useState('')
//     const[team, setTeam] = useState('')
//     const[teamList, setTeamList] = useState('')
//     // const {teams} = props;


//     const loadList = () => {
//         fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/`, {
            
//             // // method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }).then(res =>{
//             if(res.status === 200){
//                 return res.json()
//             }   else    {
//                 return[]
//             }
//           }).then(data =>{
//             setTeam(data.data)
//           })
          
//     }

//     useEffect(() => {
//         loadList()
//     },[])

//     // const onChange = (e) ={
//     //     useState({
//     //         [e.target.id]:e.target.value
//     //     })
//     // }

//    const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = { name:name, teamList:teamList, id:id}
//         console.log("EditData",data);

//         fetch(`${process.env.REACT_APP_BACKEND_URL}/pokeBuilder/` + id, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//             body: JSON.stringify(data
//             // name: setName,
//             // teamList: setTeamList
//           ),
//         })
//           .then((res) => res.json())
//           .then((resJson) => {
          
//             setTeam({
//               name: "",
//               teamList:""
//             });
//             loadList();
//           })
//           .catch((err) => {
//             console.log(err);
//           });
          
//       };
    
//   return (
//             <>
//              <form onSubmit={handleSubmit}>      
//                 <Input name="name" type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}} value={name}/>  
//                 <TextArea type='text' rows= '6' name="teamList" onChange={(e) => {setTeamList(e.target.value)}} placeholder="test"value={teamList} />
//                 <Submit type="submit" value="Submit"/>
//             </form>
//              </> 
//          );
    
// }
 
const Input = styled.input``;

const TextArea = styled.textarea``;

const Submit = styled.input``;

export default EditForm;
