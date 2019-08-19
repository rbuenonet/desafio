import React from 'react';
import { Avatar, Card, List, Typography, Row, Col } from 'antd';
import { connect } from 'react-redux';

import "./Clients.scss";

import Layout from '../../components/Layout';
import Load from '../../components/Load';

import Api from "../../services/Api";

import store from '../../store'
import * as data from '../../store/data'

class Clients extends React.Component {
  state = {
    load: false
  }

  componentDidMount() {
    Api.get('users')
      .then(
        (result) => {
          store.dispatch(data.set_data(result.data))
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
    const { Text } = Typography;
    const { load } = this.state;

    if (!load) {
      return (        
        <div id="page-clients" className="page">
          <Layout></Layout>
          <Load></Load>
        </div>
      );
    } else {
      const {
        list
      } = this.props;
      const INDEX_PAGE_SIZE_DEFAULT = 10
     
      let dataSource = list.users;
      let search = false;
      if( list.search !== undefined && list.search !== '' ){
        search = true;
        dataSource = list.users.filter(function(user){
          return (
            ( user.name.toLowerCase().indexOf( list.search.toLowerCase() ) ) >= 0 ||
            ( user.email.toLowerCase().indexOf( list.search.toLowerCase() ) ) >= 0
          );
        });
      }
      return (
        <div id="page-clients" className="page">
          <Layout></Layout>
          
          <div className="content">          

            {this.top_content(dataSource, search)}



            <List
              className="page-table"
              itemLayout="vertical"
              pagination={{
                pageSize: INDEX_PAGE_SIZE_DEFAULT,
                itemRender: (current, type, originalElement) =>{
                    if (type === 'prev') {
                      return <span>Anterior</span>;
                    }
                    if (type === 'next') {
                      return <span>Próximo</span>;
                    }
                    return originalElement;
                  }
              }}
              dataSource={dataSource}    
              renderItem={item => (
                <List.Item>
                  
                  <Row>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      <Avatar src={item.photo_url} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      <span>{item.name}</span>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      <span>{item.email}</span>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      <span>{item.phone}</span>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      <span>{`R$ ${item.amount.toString().replace('.', ',')}`}</span>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={4}>
                      { ( parseInt(item.status) === 0) ? <Text>Adimplente</Text> : <Text type="danger">Inadimplente</Text> }
                    </Col>
                  </Row>
                  
                </List.Item>
              )}
            />

          </div>
        </div>
      );
    }
  }

  top_content = (dataSource, search) => {
    if( search ){
      return <p>Foram encontrados <strong>{dataSource.length} resultado</strong></p>
    }

    const data = [
      {
        title: 'Total de clientes',
        content: (dataSource).length
      },
      {
        title: 'Clientes inadimplentes',
        content: (dataSource.filter((item) => item.status === '1')).length
      },
      {
        title: 'Clientes adimplentes',
        content: (dataSource.filter((item) => item.status === '0')).length
      },
      {
        title: 'Total arrecadado',
        content: 'R$ ' + dataSource.map(function(item){ return parseFloat(item.amount) }).reduce((total, item) => {return total + item}).toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.')
      },
    ];
     
    return (
      <div>
        <h2>Visão geral</h2>
        <List
          className="page-list"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item className="page-list-item">
              <Card className="page-list-item-card" title={item.title} >{item.content}</Card>
            </List.Item>
          )}
        />
        <h2>Clientes cadastrados</h2>
      </div>
    )
  }
};

export default connect(state => ({ list: data.getData(state) }))(Clients);
