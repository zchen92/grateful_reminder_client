import React, { Component } from 'react';
import Diaries from './components/Diaries.js';
import { url } from './api.js'

class App extends Component {

  state = {
    diaries : [],
    formInputs: {
      date: '',
      happiness: '',
      grateful1: '',
      grateful2: '',
      grateful3: ''
    },
    diaryToEdit: {},
    isEditing: false
  }

  componentDidMount() {
      this.getData()
  }

  getData = () => {
      fetch(`${url}/diaries`)
      .then(res => res.json())
      .then(jsonDiaries => this.setState({diaries :jsonDiaries}))
      .catch(error => console.error(error))
  }

  handleChange = (event) => {
    console.log("this point")
    const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
    this.setState(updateInput)
  }

  handleSubmit  = (event) =>{
    event.preventDefault()
    fetch(`${url}/diaries`, {
      body: JSON.stringify(this.state.formInputs),
      method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    })
    .then(createdDiary => {
      return createdDiary.json()
    })

    .then(jsonedDiary => {
      this.setState({
        formInputs: {
          date: '',
          happiness: '',
          grateful1: '',
          grateful2: '',
          grateful3: ''
        },
        diaries: [jsonedDiary, ...this.state.diaries]
      })
    })
    .catch(error => console.log(error))
  }

  handleDelete =(id, index) => {
    fetch(`${url}/diaries/${id}`, {
        method: 'DELETE',
    }).then(() => {
        this.setState({
            diaries: [...this.state.diaries.slice(0, index), ...this.state.diaries.slice(index + 1)],
        });
        this.getData();
    });
  };

  toggleEdit=(diary) =>{
    // console.log(diary)
    // console.log(this.state)
    this.setState({
        diaryToEdit: diary,
        isEditing: !this.state.isEditing
    })
    // console.log(this.state.isEditing)
  }

  handleUpdate(event, item) {
    event.preventDefault();
    fetch(`${url}/diaries/${item.id}`, {
        body: JSON.stringify(item),
        method: 'PUT',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(updatedDiary => {
            window.location.reload()
        });
  }

  render() {
    return (
        <div className="container">
          <header>
            <h1>Happiness is a State of Mind</h1>
          </header>
          <nav>
            <div className="formBox">
                {this.state.isEditing ? null : <div>
                  <h2>Record your day!</h2>
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="date">Date</label>
                    <input type="text" id="date" value={this.state.formInputs.date}
                      onChange={this.handleChange}/>
                    <label htmlFor="happiness">Happiness Level</label>
                    <input type="number" id="happiness" value={this.state.formInputs.happiness}
                      onChange={this.handleChange}/>
                    <label htmlFor="content">Today I'm grateful for...#1</label>
                    <input type="text" id="grateful1" value={this.state.formInputs.grateful1}
                      onChange={this.handleChange} />
                    <label htmlFor="content">Today I'm grateful for... #2</label>
                    <input type="text" id="grateful2" value={this.state.formInputs.grateful2}
                      onChange={this.handleChange} />
                    <label htmlFor="content">Today I'm grateful for... #3</label>
                    <input type="text" id="grateful3" value={this.state.formInputs.grateful3}
                      onChange={this.handleChange}/>
                    <input type="submit" className="submit" />
                </form> </div> }
              </div>
              </nav>
          <div className="diary">
              <h3>All the great things in my life:</h3>
              <Diaries 
                content={this.state.diaries} 
                handleDelete={this.handleDelete} 
                toggleEdit={this.toggleEdit} 
                handleUpdate={this.handleUpdate} 
                isEditing={this.state.isEditing} 
                diaryToEdit={this.state.diaryToEdit} 
                handleChange={this.state.handleChange}/>
          </div>
          <footer>
            <h3>Created by: Zoe (Luting) Chen</h3>
          </footer>
        </div>
    );
  }
}

export default App;
