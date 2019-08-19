import React from 'react';
import { Input, Icon, Avatar } from 'antd';
import { useSelector } from 'react-redux';

import "./Header.scss";

import store from '../../store'
import * as data from '../../store/data'

export default function Header() {

  const login = useSelector(state => state.login)
  
  return (
    <div id="header">

      <Input
        prefix={<Icon type="search" 
        style={{ color: 'rgba(0,0,0,.25)' }} />}
        className="field-search"
        onChange={(event) => onchangeinput(event)}
        placeholder="Busca por clientes"
      />  

      <div className="right">
        <Icon type="bell" style={{ fontSize: '24px', color: '#878787' }} />
        <Avatar size={64} src={login.photo_url} />
        <Icon type="down" style={{ fontSize: '14px', color: '#878787' }} />
      </div>
    </div>
  );

  function onchangeinput(event){
    store.dispatch(data.set_search(event.target.value))
  }
};