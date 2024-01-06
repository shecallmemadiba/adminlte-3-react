import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import authHeader from '../../store/reducers/auth-header';


const baseUrl = "https://backend-w7pc.onrender.com";


export default function Editar() {
  const [dataUser, setdataUser] = useState({});
  const [campname, setcampname] = useState("");
  // const [campNovaFoto, setcampNovaFoto] = useState(null);
  const [campemail, setcampemail] = useState("");
  const [campphone, setcampphone] = useState("");
  const [campaddress, setcampaddress] = useState("");
  const { idUser } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        // const url = baseUrl + "/utilizador/get/" + idUser;
        const url = `${baseUrl}/user/${idUser}`;
        const response = await axios.get(url);
        if (response.data.success) {
          const data = response.data.data[0];
          setdataUser(data);
          setcampname(data.name);
          setcampemail(data.email);
          setcampphone(data.phone);
          setcampaddress(data.address);
        } else {
          swal('Ocorreu um erro a carregar os dados do utilizador!', { icon: 'error' });
        }
      } catch (error) {
        swal('Ocorreu um erro no servidor, tente novamente!', { icon: 'error' });
      }
    };
    fetchData();
  }, [idUser]);


  // async function LoadDataUtilizador() {
  //   axios.get(baseUrl + "/utilizador/list/")
  //     .then(res => {
  //       if (res.data.success) {
  //         const data = res.data.data;
  //         setdataUtilizador(data);
  //       } else {
  //         swal('Ocorreu um erro a carregar os dados do utilizador!', { icon: 'error' });
  //       }
  //     })
  //     .catch(error => {
  //       swal('Ocorreu um erro no servidor, tente novamente!', { icon: 'error' });
  //     });
  // }

  async function handleUpdate(event: React.FormEvent) {
      event.preventDefault();
    if (campname === '') {
      return swal("Insira o seu nome!", { icon: 'warning' });
    }
    if (campemail === '') {
      return swal("Insira o seu email!", { icon: 'warning' });
    }
    if (campphone === '') {
      return swal("Insira o seu número de telemóvel!", { icon: 'warning' });
    }
    if (campaddress === '') {
      return swal("Insira a sua morada!", { icon: 'warning' });
    }



    const confirmResult = await swal({
      title: "Atualizar",
      text: "Tem a certeza que deseja alterar?",
      icon: "warning",
      buttons: ["Cancelar", "Confirmar"],
      dangerMode: true,
    });

    if (!confirmResult) return;

    const datapost = {
      name: campname,
      address: campaddress,
      email: campemail,
      phone: campphone,
      // foto: dataUtilizador.foto,
    };

    try {
      const updateResponse = await axios.put(baseUrl + "/user/update/" + idUser, datapost, {
        headers: authHeader(),
      });

      if (updateResponse.data.success === true) {
        swal("Utilizador atualizado com sucesso!", { icon: 'success' });
      } else {
        swal("Não foi possível atualizar o Utilizador!", { icon: 'error' });
      }
    } catch (error) {
      swal("Ocorreu um erro, tente novamente!", { icon: 'error' });
      console.log(error);
    }
  }

  async function handleDelete() {
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
        swal("Utilizador apagado com sucesso!", { icon: 'success' });
        navigate(-1);
      } else {
        swal("Não foi possível apagar o Utilizador!", { icon: 'error' });
      }
    } catch (error) {
      swal("Ocorreu um erro, tente novamente!", { icon: 'error' });
      console.log(error);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <form className="form-container" style={{ background: "black", color: "white" }}>
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">name</label>
        <input type="text" className="form-control" id="name" value={campname} onChange={(value) => setcampname(value.target.value)} />
      </div>
      <div className="mb-3">
  <label htmlFor="email" className="form-label">email</label>
  <input type="text" className="form-control" id="email" value={campemail} onChange={(value) => setcampemail(value.target.value)} />
</div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">Número de telemóvel</label>
        <input type="number" className="form-control" id="phone" value={campphone} onChange={(value) => setcampphone(value.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Morada</label>
        <input type="textbox" className="form-control" id="address" value={campaddress} onChange={(value) => setcampaddress(value.target.value)}></input>
      </div>

      <button type="button" className="btn btn-success" onClick={handleUpdate}>
        Atualizar
      </button>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Apagar
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
        Voltar
      </button>
    </form>
  );
}
