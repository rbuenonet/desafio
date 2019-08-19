import React  from 'react';
import './App.scss';

import 'antd/dist/antd.css';

import Clients from './pages/Clients';
import Load from './components/Load';

import Api from "./services/Api";

import store from './store'
import * as login from './store/login'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false
    };
  }

  componentDidMount() {
    
    Api.get('profile/1')
      .then(
        (result) => {
          store.dispatch(login.set_data(result.data))
          this.setState({
            load: true
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }


  render() {
    const { load } = this.state;
    if (!load) {
      return <Load></Load>;
    } else {
      return (
        <Clients></Clients>
      );
    }
  }
}

export default (App);
