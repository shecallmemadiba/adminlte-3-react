import React ,{useEffect, useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import { nodes } from "../../data";

const Component: React.FC = () => {
  const [data, setData] = React.useState({ nodes });

  const colorTheme = {
    BaseRow: `
        color: #141414;
      `,
    Row: `
        &:hover {
          color: orange;
        }

        cursor: pointer;
                background-color: white; /* Set background color to white */

      `,
      Cell: `
      color: white;
    `,
  };

  const handleUpdate = (value: string, id: string) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, nome: value };
        } else {
          return node;
        }
      }),
    }));
  };

  


  interface Node {
    id: string;
    nome: string;
    email: string;
    numeroTelemovel: string;
    morada: string;
    CartaConducao: boolean;
  }

  const stripedTheme = {
    BaseRow: `
        font-size: 14px;
      `,
    HeaderRow: `
        background-color: #eaf5fd;
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
  };

  const marginTheme = {
    BaseCell: `
        margin: 9px;
        padding: 11px;
      `,
  };

  

  interface RowProps {
    item: Node;
    onUpdate: (value: string, id: string) => void;
  }

  const Row: React.FC<RowProps & { theme: any }> = ({ item, onUpdate, theme }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedNome, setEditedNome] = useState(item.nome);
    const [editedEmail, setEditedEmail] = useState(item.email);
    const [editedNumeroTelemovel, setEditedNumeroTelemovel] = useState(item.numeroTelemovel);
    const [editedMorada, setEditedMorada] = useState(item.morada);
    const [editedCartaConducao, setEditedCartaConducao] = useState(item.CartaConducao);
    const handleEditClick = () => {
      setEditMode(true);
    };



const handleSaveClick = () => {
  onUpdate(editedNome, item.id, editedEmail, item.id, editedNumeroTelemovel, item.id, editedMorada, item.id, editedCartaConducao.toString(), item.id); 
  setEditMode(false);
};



  const handleCancelClick = () => {
    setEditMode(false);
    setEditedNome(item.nome);
    setEditedEmail(item.email);
    setEditedNumeroTelemovel(item.numeroTelemovel);
    setEditedMorada(item.morada);
    setEditedCartaConducao(item.CartaConducao);
  };

  
    return (
      <>
        <Cell>
        {editMode ? (
          <input
            style={{ width: "100%" }}
            type="text"
            value={editedNome}
            onChange={(event) => setEditedNome(event.target.value)}
          />
        ) : (
          item.nome
        )}
      </Cell>
      <Cell>
        {editMode ? (
          <input
            style={{ width: "100%" }}
            type="text"
            value={editedEmail}
            onChange={(event) => setEditedEmail(event.target.value)}
          />
        ) : (
          item.email
        )}
      </Cell>

        <Cell>
          {editMode ? (
            <input
              style={{ width: "100%" }}
              type="text"
              value={editedNumeroTelemovel}
              onChange={(event) => setEditedNumeroTelemovel(event.target.value)}
            />
          ) : (
            item.numeroTelemovel
          )}
        </Cell>

        <Cell>
          {editMode ? (
            <input
              style={{ width: "100%" }}
              type="text"
              value={editedMorada}
              onChange={(event) => setEditedMorada(event.target.value)}
            />
          ) : (
            item.morada
          )}
        </Cell>

        <Cell>
  {editMode ? (
    <input
      style={{ width: "100%" }}
      type="text"
      value={editedCartaConducao.toString()}
      onChange={(event) => setEditedCartaConducao(event.target.value === 'true')}
    />
  ) : (
    item.CartaConducao.toString()
  )}
</Cell>


        <Cell>
        {editMode ? (
          <>
            <button style={{
                backgroundColor: 'green', // Set background color to red
                color: '#ffffff', // Set text color to white
                border: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '14px',
                marginRight: '8px',
              }}
              onClick={handleSaveClick}>Salvar</button>
            <button
              style={{
                backgroundColor: '#ff0000', // Set background color to red
                color: '#ffffff', // Set text color to white
                border: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '14px',
                marginRight: '8px',
              }}
              onClick={handleCancelClick}
            >
              Cancelar
            </button>          
            </>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
        )}
      </Cell>
      </>
    );
  };




  const theme = useTheme([colorTheme, stripedTheme, marginTheme]);

  return (
    <Table data={data} theme={theme}>
  {(tableList: Node[]) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Nome</HeaderCell>
              <HeaderCell>Email</HeaderCell>
              <HeaderCell>Número de Telemóvel</HeaderCell>
              <HeaderCell>Morada</HeaderCell>
              <HeaderCell>Carta de Condução</HeaderCell>
              <HeaderCell>Editar</HeaderCell> 
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item} onUpdate={handleUpdate} theme={theme} />
            ))}
          </Body>

        </>
      )}
    </Table>
  );
};

export default Component;










