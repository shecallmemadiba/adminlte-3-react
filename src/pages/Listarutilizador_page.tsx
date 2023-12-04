/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader} from '@components';
import Colaboradores from '@app/modules/main/listarColaboradores';
import Grafico from '@app/modules/main/grafico/Grafico';

const Listarutilizador = () => {
  return (
    <div>
      <ContentHeader title="Listar_Editar Página" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            {/* <div className="card-header">
              <h3 className="card-title">Title</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div> */}
            <div className="card-body">
              <Colaboradores />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listarutilizador;
