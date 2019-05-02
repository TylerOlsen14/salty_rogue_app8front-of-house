import React, { Component } from 'react';
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';

class UpdateRecordModal extends Component {
  state = {
    modal: false,
    ClientName: '',
    ClientPhoneNumber: '',
    ClientNotes: '',
  }

  // enterModal = async () => {
  componentWillMount = async () => {
    this.setState({
      ClientName: this.props.record.ClientName,
      ClientPhoneNumber: this.props.record.ClientPhoneNumber,
      ClientNotes: this.props.record.ClientNotes,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.onSubmit(this.state)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    console.log(this.state)
    this.setState({ 
      [e.target.name]: e.target.value,   
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:5000/`+ this.props.record._id, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
          "Content-Type": "application/json",
        }
      }
    )
    this.toggle();
    this.props.refresh();//this refreshes the page after we're done
  };
    
  newRecord = {
    ClientName: this.state.ClientName,
    ClientPhoneNumber: this.state.ClientPhoneNumber,
    ClientNotes: this.state.ClientNotes
  }

  // componentDidMount() {
  //   console.log(this.props.id)
  // }

  render() {
    return(
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >
          Update Record
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
          >
            Update Record
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup onSubmit={this.handleSubmit}>
                <Label for="record">
                  Phone Record - Keep our conversations and discussions in order
                </Label>
                <Input 
                  type="text"
                  name="ClientName"
                  id="item"
                  // placeholder={Client Name}
                  onChange={this.onChange}
                  value={this.state.ClientName}
                />
                <Input 
                  type="number"
                  name="ClientPhoneNumber"
                  id="item"
                  // placeholder="Create Phone Number"
                  onChange={this.onChange}
                  value={this.state.ClientPhoneNumber}
                />
                <Input 
                  type="text"
                  name="ClientNotes"
                  id="item"
                  // placeholder="Create coversation record"
                  onChange={this.onChange}
                  value={this.state.ClientNotes}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Update Phone Record
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ( UpdateRecordModal );