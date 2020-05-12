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
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc'
    }
  }

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  } 
  
  addAppointment = (apt) => {
    let tempApts = this.state.myAppointments
    tempApts.unshift(apt)

    this.setState({
      myAppointments: tempApts,

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

    let order
    let filteredApts = this.state.myAppointments

    if(this.state.orderDir === 'asc') {
      order = 1
    } else {
      order = -1
    }

    filteredApts.sort((a, b) => {
      if(a[this.state.orderBy].toLowerCase() <
         b[this.state.orderBy].toLowerCase()) {
          return -1 * order
        } else {
          return 1 * order
        }
    })

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment} />
                <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} />
                <ListAppointments appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    )}
}

export default App;
