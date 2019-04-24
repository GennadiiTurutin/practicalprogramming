import React, {Component} from 'react'
import { Jumbotron, InputGroup, FormControl } from 'react-bootstrap';


class Header extends Component {
  render () {
    return (
      <Jumbotron className="text-grey" style={{ opacity:"1", background:"#273E55"}}>
        <div className="container">
          <h4>
            The focus of the store is to provide reliable and simple platform 
            for online purchases of programming related stuff. 
          </h4>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-8">
              <p>If you have any questions, we'll eagerly help you.
              Please contact us, using contact data below or leave your email right here 
              and we will conctact you.</p>
            </div>
            <div className="col-4">
              <InputGroup size="md">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </Jumbotron>
    )
  }
}


export default Header

