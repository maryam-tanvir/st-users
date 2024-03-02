import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    email: '',
    username: '',
    password: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.email,
        last: this.state.username,
        email: this.state.password
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.email,
        last: this.state.username,
        email: this.state.password
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, email, username, password } = this.props.item
      this.setState({ id, email, username, password })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">E-mail</Label>
          <Input type="text" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Username</Label>
          <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username === null ? '' : this.state.username}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">password</Label>
          <Input type="text" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm