import React from 'react';
import "./Layout.scss";


import Navbar from '../Navbar';
import Header from '../Header';

export default function Layout(){
  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
    </div>
  );
};