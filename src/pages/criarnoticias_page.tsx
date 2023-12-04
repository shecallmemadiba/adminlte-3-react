/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader} from '@components';
import CriarNoticias from '@app/modules/main/criarnoticias';

const criarnoticiaspage = () => {
  return (
    <div>
      <ContentHeader title="Criar noticias Página" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
            <CriarNoticias />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default criarnoticiaspage;
