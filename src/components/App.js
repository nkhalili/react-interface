import React from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import ListAppointments from './ListAppointments'
import SearchAppointments from './SearchAppointments'
import { without } from 'lodash'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      myAppointments: [],
      formDisplay: false
    }
  }

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  } 
  
  deleteAppointment = (apt) => {
    let tempApts = this.state.myAppointments
    tempApts = without(tempApts, apt)

    this.setState({
      myAppointments: tempApts
    })
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          return item
        })

        this.setState({
          myAppointments: apts
        })
      })
  }

  render(){
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    )}
}

export default App;
