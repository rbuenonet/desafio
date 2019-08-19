import React from 'react';
import { Menu, Icon, Button } from 'antd';
import classNames from 'classnames';


import "./Navbar.scss";

// images
import logo from '../../assets/logo.png';
import iconSuporte from '../../assets/icon-suporte.png';


class Navbar extends React.Component {

  constructor(props) {
      super(props);
      this.state = {show: false};

  }


  openMenu(){
    const { show } = this.state;
    this.setState({show: !show});
  }

  render() {
        const { show } = this.state;
        return (
          <div id="navbar">
            <div className="icone">
              <Button icon={show?'close':'menu'} onClick={() => this.openMenu()} />
            </div>

            <div 
            className={classNames({'lateral': true, 'force-open': show })}>
              <div className="logo">
                  <img src={logo} alt="Ead Plataforma" />
              </div>
              <div className="conteudo">
                <Menu defaultSelectedKeys={['painel']} className="menu">
                  <Menu.Item key="painel" className="menu-item menu-item-selected">
                    <Icon type="appstore" theme="filled" style={{ fontSize: '16px', color: '#1bbc9b' }} />
                    Painel
                  </Menu.Item>
                  <Menu.Item key="config" className="menu-item">
                    <Icon type="setting" theme="filled" style={{ fontSize: '16px', color: '#1bbc9b' }} />
                    Configurações
                  </Menu.Item>
                  <Menu.Item key="suporte" className="menu-item menu-footer">
                    <img src={iconSuporte} alt="Icone Balão" />
                    Suporte
                  </Menu.Item>
                </Menu>            
              </div>
            </div>
          </div>
        );
  }
}

export default Navbar;