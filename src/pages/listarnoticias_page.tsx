/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader} from '@components';
import Noticias from '@app/modules/main/listarnoticias';

const Blank = () => {
  return (
    <div>
      <ContentHeader title="Listar_Editar Noticias Página" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              {/* <Noticias/> */}
              <button style={{width: '100%', height: '100%', position: 'relative', boxShadow: '0px 0px 7.250668525695801px rgba(0, 0, 0, 0.50) inset', borderRadius: 25}}>
                  <div style={{width: 184.56, height: 45.63, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(90deg, black 0%, rgba(0, 0, 0, 0.96) 83%, rgba(0, 0, 0, 0.76) 100%)', borderRadius: 9.43}} />
                <div style={{width: 179.95, height: 37.43, left: -0.28, top: 4.10, position: 'absolute', borderRadius: 25, justifyContent: 'center', alignItems: 'center', gap: 2.05, display: 'inline-flex'}}>
              <div style={{textAlign: 'center', color: 'white', fontSize: 14.35, fontFamily: 'Caladea', fontWeight: '700', wordWrap: 'break-word'}}>Inserir Nova Noticia</div>
            </div>
          </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blank;
