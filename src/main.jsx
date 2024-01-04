import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter, createBrowserRouter, RouterProvider} from "react-router-dom";

import Home  from './routes/Home.jsx';
import Login  from './routes/Login.jsx';
import MeusDados from './routes/MeusDados.jsx';
import RecuperarSenha from './routes/RecuperarSenha.jsx'
import NovaSenha from './routes/NovaSenha.jsx'
import NovoUsuario from './routes/NovoUsuario.jsx'
import Usuarios from './routes/Usuarios.jsx'
import Frota from './routes/Frota.jsx';
import ErrorPage  from  './routes/ErrorPage.jsx'
import CadastroAeronave from './routes/CadastroAeronave.jsx';
import EditaAeronave from './routes/EditaAeronave.jsx';
import MapaAssentos from './routes/MapaAssentos.jsx';
import Rotas from './routes/Rotas.jsx';
import Tarifas from './routes/Tarifas.jsx';
import CadastroTarifa from './routes/CadastroTarifa.jsx';
import Fretamento from './routes/Fretamento.jsx';
import CadastroFretamento from './routes/CadastroFretamento.jsx';
import AgenciaCliente from './routes/CadastroContratante.jsx';
import EditaFretamento from './routes/EditaFretamento.jsx';
import Reserva from './routes/Reserva.jsx';
import ValidacaoAssentos from './routes/ValidacaoAssentos.jsx';
import Checkin from './routes/Checkin.jsx';
import Localizador from './routes/Localizador.jsx';
import HomeAereo from './routes/HomeAereo.jsx';
import HomeRodoviario from './routes/HomeRodoviario.jsx';
import HomeAdmin from './routes/HomeAdmin.jsx';
import Aeroportos from './routes/Aeroportos.jsx';
import Assentos from './routes/Assentos.jsx';
import Classe from './routes/Classe.jsx';
import Fabricante from './routes/Fabricante.jsx';
import ServicoBordo from './routes/ServicoBordo.jsx';
import Companhias from './routes/Companhias.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/meusdados',
        element: <MeusDados />,
      },
      {
        path: '/recuperarsenha',
        element: <RecuperarSenha />,
      },
      {
        path: '/novasenha',
        element: <NovaSenha />,
      },
      {
        path: '/novousuario',
        element: <NovoUsuario />,
      },
      {
        path: '/admin/usuarios',
        element: <Usuarios />,
      },
      {
        path: '/aereo/frota',
        element: <Frota />,
      },
      {
        path: '/aereo/frota/cadastroaeronave',
        element: <CadastroAeronave />,
      },
      {
        path: '/aereo/frota/editaaeronave/:id',
        element: <EditaAeronave />,
      },
      {
        path: '/aereo/frota/mapaassentos/:id',
        element: <MapaAssentos />,
      },
      {
        path: '/aereo/frota/rotas/:id',
        element: <Rotas />,
      },
      {
        path: '/aereo/tarifas',
        element: <Tarifas />,
      },
      {
        path: '/aereo/tarifas/cadastrotarifa/:id',
        element: <CadastroTarifa />,
      },
      {
        path: '/aereo/fretamento',
        element: <Fretamento />,
      },
      {
        path: '/aereo/fretamento/cadastrofretamento/',
        element: <CadastroFretamento />,
      },
      {
        path: '/admin/agenciacliente',
        element: <AgenciaCliente />,
      },
      {
        path: '/aereo/fretamento/editafretamento/:id',
        element: <EditaFretamento />,
      },
      {
        path: '/aereo/reserva',
        element: <Reserva />,
      },
      {
        path: '/aereo/reserva/validacaoassentos/:id',
        element: <ValidacaoAssentos />,
      },
      {
        path: '/aereo/checkin',
        element: <Checkin />,
      },
      {
        path: '/aereo/checkin/localizador/:id',
        element: <Localizador />,
      },
      {
        path: '/aereo',
        element: <HomeAereo />,
      },
      {
        path: '/onibus',
        element: <HomeRodoviario />,
      },
      {
        path: '/admin',
        element: <HomeAdmin />,
      },
      {
        path: '/admin/aeroportos',
        element: <Aeroportos />,
      },
      {
        path: '/admin/assentos',
        element: <Assentos />,
      },
      {
        path: '/admin/classe',
        element: <Classe />,
      },
      {
        path: '/admin/fabricante',
        element: <Fabricante />,
      },
      {
        path: '/admin/servicobordo',
        element: <ServicoBordo />,
      },
      {
        path: '/admin/companhias',
        element: <Companhias />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
