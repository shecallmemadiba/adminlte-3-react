import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import authHeader from '../../store/reducers/auth-header';


const baseUrl = "http://mktiagoandre.ddns.net:8080";
const otherUrl = "http://mktiagoandre.ddns.net:8080/delete/:id";

export default function List(props) {
  const [dataUser, setdataUser] = useState([]);
  const [searchname, setSearchname] = useState('');
  const { idUser } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    LoadUtilizador();
  }, []);

  async function LoadUtilizador() {
    const url = "http://mktiagoandre.ddns.net:8080/user/";
    axios
      .get(url, { headers: authHeader() })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const data = res.data.data;
          setdataUser(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }



  if (!dataUser) {
    return <div>Loading...</div>;
  }



  async function handleDelete(idUser) {
    const confirmResult = await swal({
      title: "Apagar",
      text: "Tem a certeza que deseja apagar o utilizador?",
      icon: "warning",
      buttons: ["Cancelar", "Confirmar"],
      dangerMode: true,
    });

    if (!confirmResult) return;

    try {
      const deleteResponse = await axios.delete(baseUrl + "/user/delete/" + idUser, {
        headers: authHeader(),
      });
      if (deleteResponse.data.success === true) {
        swal("Utilizador apagado com sucesso!", { icon: 'success' }).then(() => {
          window.location.reload();
        });
      } else {
        swal("Não foi possível apagar o Utilizador!", { icon: 'error' });
      }
    } catch (error) {
      swal("Ocorreu um erro, tente novamente!", { icon: 'error' });
      console.log(error);
    }
  }

  function handleSearch(e) {
    setSearchname(e.target.value);
  }

  const filteredData = dataUser.filter((data) => {
    return data.name && data.name.toLowerCase().includes(searchname.toLowerCase());
  });

  function LoadFillData() {
    if (!filteredData) {
      return null;
    }

    return filteredData.map((data, index) => {
      return (
        <tr key={index}>
          <th>{data.idUser}</th>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.phone}</td>
          <td>{data.address}</td>
          <td>
            <Link className="btn btn-outline-info btn-sm" to={"/update/" + data.idUser}>Editar</Link>
          </td>
          <td>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(data.idUser)}>Apagar</button>
          </td>
        </tr>
      )
    });
  }

  return (
    <div style={{ background: "black", color: "white" }}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Pesquisar Utilizadores..." value={searchname} onChange={handleSearch} />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>Limpar</button>
      </div>
      <table className="table table-hover table-striped" style={{ background: "white", color: "black" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">email</th>
            <th scope="col">Número de telemóvel</th>
            <th scope="col">Morada</th>
            <th colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {LoadFillData()}
        </tbody>
      </table>
    </div>
  );
}











