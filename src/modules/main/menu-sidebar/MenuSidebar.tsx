import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import {PfImage} from '@profabric/react-components';
import styled from 'styled-components';
// import {SidebarSearch} from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faTwitter, faFontAwesome)

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  // image: string;
  children?: Array<IMenuItem>;
}


export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    // image: 'img/dashboardlogo.png',  // Provide the actual image path
    path: '/'
  },
  {
    name: i18n.t('Gestor de Utilizador'),
    icon: 'far fa-caret-square-down nav-icon',
    children: [
      {
        name: i18n.t('Listar/Editar Utilizador'),
        icon: 'fas fa-cogs fa-spin nav-icon',
        path: '/sub-menu-1'
      },
      {
        name: i18n.t('Submissão de Horas'),
        icon: 'fas fa-cogs fa-spin nav-icon',
        path: '/sub-menu-2'
      }
    ]
  },
  {
    name: i18n.t('Gestão de Notícias'),
    // icon: 'fas fa-wrench nav-icon',
    icon: 'fa fa-arrow-circle-down nav-icon',
    children: [
      {
        name: i18n.t('Criar Notícias'),
        icon: 'fas fa-cogs fa-spin nav-icon',
        path: '/sub-menu-3'
      },
      {
        name: i18n.t('Listar/Editar Notícias'),
        icon: 'fas fa-cogs fa-spin nav-icon',
        path: '/sub-menu-4'
      }
    ]
  }
];

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
           src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">Portal Admin</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        {/* <div className="form-inline">
          <SidebarSearch />
        </div> */}

        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
