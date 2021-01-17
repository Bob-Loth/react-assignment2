import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
class App extends Component {
   state = {
      characters: []
   }; 

   removeCharacter = index => {
      const {characters} = this.state
      this.setState({
         characters: characters.filter((character, i) => {
            this.handleDelete(character);
            return i !== index;
         }),
      })
   }

   componentDidMount() {
      axios.get('<http://localhost:5000/users>')
       .then(res => {
         const characters = res.data.users_list;
         this.setState({ characters });
       })
       .catch(function (error) {
         //Not handling the error. Just logging into the console.
         console.log(error);
       });
   }

   render() {
     const {characters} = this.state;
   
   return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
   )
  }

  handleDelete = character => {
     const url='http://localhost:5000/users?id=' + character.id;
     axios.delete(url)
     .then(
        response => {
           console.log(response)
        })
     .then(response => {
        this.setState(previousState => {
           return {
             characters: previousState.characters.filter(c => c != response)
           };
        });
     })
     .catch(err => {
        console.log(err);
     });
  }

  handleSubmit = character => {
   this.makePostCall(character).then( callResult => {
      if (callResult !== false) {
         this.setState({ characters: [...this.state.characters, callResult] });
      }
   });
 }

 makePostCall(character){
   return axios.post('http://localhost:5000/users', character)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
 }
  
}

export default App