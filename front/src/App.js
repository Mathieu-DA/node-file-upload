import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      files: null,
      message: [],
    }
  }

  handleSubmit = (e) => {
    const array = this.state.message
    if (this.state.files) {
      this.state.files.map((image, index) => {
        const formData = new FormData();
        formData.append('monfichier', image);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios.post("/monupload", formData, config)
          .then((response) => {
            array.push(`Fichier ${index + 1} `, response.data.answer)
            this.setState({ message: array })
          })
          .catch(() => {
            array.push(`Fichier ${index + 1}: Erreur lors du chargement`)
            this.setState({ message: array })
          });
      });
    }
    else {
      this.setState({ message: "Vous n'avez pas ajouté de ficher" })
    }
  }

  onChange = (e) => {
    const uploaded = Array.from(e.target.files)
    this.setState({ message: [], files: uploaded });
  }

  render() {
    console.log(this.state.message)
    return (
      <div className="App">
        <Input type="file" name="monupload" multiple onChange={this.onChange} />
        <Button color="primary" onClick={() => this.handleSubmit()}>Upload</Button>{' '}
        {this.state.message.map(item =>
          <div>{item}</div>
          )}
      </div>
    );
  }
}


export default App;
