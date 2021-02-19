import React, { Fragment, useState, Suspense, useEffect, useRef } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API } from "aws-amplify";
import Amplify, { Storage } from 'aws-amplify';
import { Formik } from "formik";
import * as Yup from "yup";

import moment from 'moment';
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import SendIcon from "@material-ui/icons/Send";
import { red, green, orange } from "@material-ui/core/colors";

import Helmet from "react-helmet";

import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';

import {
  CardContent,
  Grid,
  Link,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Table,
  Chip as MuiChip,
  Badge as MuiBadge,
  Fab,
  TextField as MuiTextField,
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing, display } from "@material-ui/system";

import {
  Done as DoneIcon,
  Face as FaceIcon,
  NewReleases,
  CheckCircle as CheckCircle,

  Notifications,
  BurstMode as BurstModeIcon,
  Description as DescriptionIcon,
  TagFaces as TagFacesIcon,
} from "@material-ui/icons";
import AttachFileIcon from '@material-ui/icons/AttachFile';
const Card = styled(MuiCard)`
  ${spacing};

  box-shadow: none;
`;

const Divider = styled(MuiDivider)(spacing);
const Spacer = styled.div(spacing);

const Shadow = styled.div`
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);
const TextField = styled(MuiTextField)(spacing);

const Typography = styled(MuiTypography)(display);
const Chip = styled(MuiChip)(spacing);
const Badge = styled(MuiBadge)(spacing);


const ChatContainer = styled(Grid)`
  width: 100%;
  height: 65vh;
`;

const ChatSidebar = styled(Grid)`
  border-right: 1px solid ${(props) => props.theme.palette.divider};
`;

const ChatMain = styled(Grid)``;

const ChatMessages = styled.div`
  overflow-y: scroll;
  height: calc(65vh - 94px);
`;

const ChatMessage = styled.div`
  margin: 30px;
  text-align: ${(props) => props.position};
`;

const ChatMessageInner = styled.div`
  display: inline-block;
`;

const ChatMessageTime = styled(Typography)`
  text-align: right;
  opacity: 0.8;
`;

const ChatMessageAvatar = styled(Avatar)`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const ChatMessageBubble = styled.div`
  display: inline-block;
  margin-right: auto;
  background: ${(props) =>
    props.highlighted
      ? props.theme.palette.secondary.main
      : props.theme.palette.action.hover};
  color: ${(props) =>
    props.highlighted
      ? props.theme.palette.common.white
      : props.theme.palette.text.primary};
  border-radius: 3px;
  padding: ${(props) => props.theme.spacing(2)}px;
  margin-bottom: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.shadows[1]};
`;

const ChatMessageBubbleName = styled(Typography)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

const ChatInput = styled(Grid)`
  min-height: 94px;
  padding: ${(props) => props.theme.spacing(5)}px;
`;

const Online = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)}px;
  span {
    background-color: ${(props) =>
    props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;


let itemDatosAsegurado = {};



function ChatMessageComponent({
  name,
  message,
  time,
  avatar,
  archivo,

  position = "left",
}) {
  return (
    <ChatMessage position={position}>
      <ChatMessageInner>
        <ChatMessageBubble highlighted={position === "right"}>
          <Typography variant="body2">{message}</Typography>
        </ChatMessageBubble>
        <ChatMessageTime variant="body2">{time}</ChatMessageTime>
      </ChatMessageInner>
    </ChatMessage>
  );
}


let itemDatosSiniestro = ''

function ChatMessageComponentSiniestos({
  name,
  message,
  time,
  avatar,
  archivo,

  position = "left",
}) {
  return (
    <ChatMessage position={position}>
      <ChatMessageInner>
        <ChatMessageBubble highlighted={position === "right"}>
          <Typography variant="body2"></Typography>
        </ChatMessageBubble>
      </ChatMessageInner>
    </ChatMessage>
  );
}

function ChatMessageComponentImage({
  name,
  message,
  time,
  avatar,
  archivo,

  position = "left",
}) {
  return (
    <ChatMessage position={position}>
      <ChatMessageInner>
        <ChatMessageBubble highlighted={position === "right"}>
          <img src={archivo} style={{ width: 200 }} />
          <Typography variant="body2">{message}</Typography>
        </ChatMessageBubble>
        <ChatMessageTime variant="body2">{time}</ChatMessageTime>
      </ChatMessageInner>
    </ChatMessage>
  );
}

const ObtenerDetalleSiniestro = () => {

  let { id } = useParams();

  let temId = String(id);
  console.log(id)


  const [siniestros, setSiniestros] = useState('undefined');


  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   detalleSiniestro(numero_siniestro:"${temId}") {
     id
    data_siniestro
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setSiniestros(data)

  }, [])

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {

    let dataSiniestro = JSON.parse(siniestros['data']['detalleSiniestro']['data_siniestro'])
    console.log("siniestro", dataSiniestro)
    let listaImagenesSeguro = dataSiniestro['imagenes']



    return (


      <Grid container justify="center" style={{ marginTop: 22 }} >
        <Grid container justify="center">
          <Grid item xs={12} lg={12}>
            <Shadow>
              <Grid container justify="center">
                <Grid item xs={12} lg={12}>
                  <Shadow>

                    <Card pb={6} px={6} lg={12}>
                      <CardContent  >
                        <Grid item lg={12} style={{ paddingLeft: 12 }}  >

                          <Grid item lg={12}>
                            <div>
                              <span style={{ fontWeight: 'bold', fontSize: '22px', marginTop: 12 }}>    RESUMEN SINIESTRO</span>

                              <Grid style={{ marginTop: 22 }}>

                                <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                  MI CELULAR
                          </Typography>

                                <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                  SAMSUNG - GALAXY S20 - <a href={`/pages/polizas/${dataSiniestro['idPoliza']}`} >VER POLIZA</a>
                                </Typography>
                              </Grid>

                              <Grid style={{ marginTop: 22 }}>

                                <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                                  FECHA DECLARACION
                          </Typography>

                                <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >
                                  {moment(dataSiniestro['detalle']['fecha_siniestro']).format("DD-MM-YYYY")}
                                </Typography>
                              </Grid>



                            </div>
                          </Grid>


                        </Grid>
                        <Grid lg={12} style={{ paddingLeft: 12, marginTop: 32 }}>

                          <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                            FOTOS ADJUNTAS
                          </Typography></Grid>
                        <Grid lg={12} style={{ display: 'flex', paddingLeft: 12, marginTop: 22 }} >


                          {dataSiniestro['detalle']['tipo_siniestro'] === 'parcial' ? (<Grid lg={12} style={{ display: 'flex' }}><Grid lg={3} style={{ paddingRight: 4 }}>
                            <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} style={{ width: '100%', height: '100%' }} src={listaImagenesSeguro['EQUIPO']} />
                            </div>
                          </Grid>
                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                              </div>
                            </Grid>

                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                              </div>
                            </Grid>


                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                              </div>
                            </Grid>
                          </Grid>
                          ) : ''}




                          {dataSiniestro['detalle']['tipo_siniestro'] === 'total' ? (<Grid lg={12} style={{ display: 'flex' }}>

                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['SERVICIO_TECNICO']} />
                              </div>
                            </Grid>

                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                              </div>
                            </Grid>


                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                              </div>
                            </Grid>
                          </Grid>
                          ) : ''}




                          {dataSiniestro['detalle']['tipo_siniestro'] === 'robo' ? (<Grid lg={12} style={{ display: 'flex' }}>

                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['PARTE_POLICIAL']} />
                              </div>
                            </Grid>

                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_DELANTERA']} />
                              </div>
                            </Grid>


                            <Grid item lg={3} style={{ paddingRight: 4 }}>
                              <div style={{ height: '160px', paddingRight: 4, border: '1px dashed black' }}>

                                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={listaImagenesSeguro['CARNET_TRASERA']} />
                              </div>
                            </Grid>
                          </Grid>
                          ) : ''}



                        </Grid>

                        <Grid style={{ marginTop: 22, paddingLeft: 12 }}>

                          <Typography style={{ marginRight: 4 }} variant="h6" gutterBottom  >
                            RESUMEN
                          </Typography>


                          <textarea variant="body2" disabled style={{ width: '100%', border: 'none', background: 'white' }} rows="18">
                            <Typography style={{ marginTop: 6 }} variant="body2" gutterBottom  >

                              {dataSiniestro['detalle']['descripcion_siniestro']}
                            </Typography>

                          </textarea>


                        </Grid>



                      </CardContent>
                    </Card>
                  </Shadow>
                </Grid>
              </Grid>



            </Shadow>
          </Grid>
        </Grid>
      </Grid>

    )
  } else {

    return siniestros && 'cargando...'

  }
}

let itemRender = 'cargando'



let ultimoElementoSeleccionado = null
let listaRequerimientosGlobales = null;

const ListaRenderSiniestros = (setListaMensajes, setTitulo) => {
  const [siniestros, setSiniestros] = useState('');

  useEffect(async () => {
    const queryListaActividadGraphql = `
 query MyQuery {
   listaRequerimientos {
     id
    data_requerimiento
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setSiniestros(data)

  }, [])



  function mostrarListaMensajes(item) {
    console.log("asdasd", item)
    if (ultimoElementoSeleccionado) {
      console.log("ultimoElementoSeleciionado", ultimoElementoSeleccionado)

      listaRequerimientosGlobales.find((objectoFind, index) => {

        console.log("itemEncontrado", "indexxxx : " + index);
        console.log("item", ultimoElementoSeleccionado)
        console.log("elementoFind", objectoFind)

        if (objectoFind['id'] == ultimoElementoSeleccionado['id']) {

          console.log("actualizando lista mensajes")
          let itemf = ultimoElementoSeleccionado;
          let itemTemp = JSON.parse(ultimoElementoSeleccionado['data_requerimiento']);

          console.log("iteeemTemporal", itemTemp)

          setTitulo('SOLICITUD N°' + (index + 1))

          let listaMensajes = itemTemp['mensajes'];

          console.log("listaMensajesGuardar", listaMensajes)

          itemTemp["mensajes"] = listaMensajesGlobales;

          itemf['data_requerimiento'] = JSON.stringify(itemTemp);
          listaRequerimientosGlobales[index] = itemf

          setSiniestros({
            data: {
              listaRequerimientos: listaRequerimientosGlobales
            }
          });
          listaMensajesGlobales = ''



          var list = document.getElementById("listaMensajesContainer");
          setTimeout(() => {
            list.scrollTop = list.scrollHeight;

          })

        }
      })
    }


    let itemObject = JSON.parse(item['data_requerimiento']);
    let listaMensajes = itemObject['mensajes'];
    console.log("listaMensajes", listaMensajes)
    setListaMensajes(listaMensajes)

    console.log("ITEM MENSAJE", item)
    ultimoElementoSeleccionado = item;

  }

  console.log("polizaaa", siniestros)
  if (siniestros && siniestros['data']) {

    console.log("productos", siniestros['data']);
    let listProductos = siniestros['data']['listaRequerimientos'];
    console.log("listaProductos", listProductos)
    listaRequerimientosGlobales = listProductos

    return (<Grid>
      <List  >
        {listProductos &&
          listProductos.map((item, index) => {
            console.log(item);

            let itemTemporal = JSON.parse(item['data_requerimiento']);
            console.log(itemTemporal)


            let tempItem = ''


            if (itemTemporal.estado === 1) {
              tempItem = <Chip label="PENDIENTE" color="primary" />
            } else {
              tempItem = <Chip label="RECHAZADO" style={{ background: 'darkred', color: 'white' }} />
            }

            return (
              <ListItem button >

                <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
                  lg={12} onClick={event => {

                    console.log("cargar lista mensajes")

                    //listaMensajesGlobales = [];
                    mostrarListaMensajes(item);
                  }}>
                  <Grid item lg={12} style={{ display: 'flex' }}>
                    <Grid item lg={6}>
                      <Typography style={{ fontWeight: 'bold' }} >
                        {"SOLICITUD N° " + (index + 1)}
                      </Typography>
                    </Grid>

                  </Grid>

                  <Grid>
                    <Chip label="ENVIAR NUEVA SOLICITUD" style={{ background: 'darkred', color: 'white' }} />
                  </Grid>
                </Grid>
              </ListItem>
            )
          })
        }

      </List>
    </Grid>
    )
  } else {

    return siniestros && 'cargando...'

  }



}

let listaMensajeRender = [{ mensaje: 'mensaje' }, { mensaje: 'mensaje' }, { mensaje: 'mensaje' }, { mensaje: 'mensaje' }];
let inputMensaje = '';

function SaveValueChat(data) {
  inputMensaje = data;

  console.log("data", data)
}

function SaveValue(key, value) {

  itemDatosAsegurado[key] = value;

  console.log("Registrando elemento" + key + " - " + value)
}


let listaMensajesGlobales = [];
const ChatWindow = () => {


  const [listaMensaje, setListaMensaje] = useState([]);
  const [mensaje, setMensaje] = useState('sasdasdd');
  const [titulo, setTitulo] = useState('');


  listaMensajesGlobales = listaMensaje;

  itemRender = ListaRenderSiniestros(setListaMensaje, setTitulo);



  let listaElementos = listaMensaje;


  let fnEnviarMensaje = () => {


    listaElementos = [...listaElementos, { mensaje: inputMensaje, tipo: 1, }];
    console.log("lista", listaElementos)

    setListaMensaje(listaElementos)
    inputMensaje = ''

    document.getElementById('inputMensaje').value = "";
    document.getElementById('inputMensaje').focus();


    var list = document.getElementById("listaMensajesContainer");
    setTimeout(() => {
      list.scrollTop = list.scrollHeight;

    })


    actualizarListaMensajes(listaElementos)
  }

  return (
    <ChatContainer container component={Card}>
      <ChatSidebar item xs={12} md={4} lg={3} style={{ overflowY: 'scroll' }}>

        <Divider />

        {itemRender}



      </ChatSidebar>
      <ChatMain item xs={12} md={8} lg={9}>
        <ChatMessages id="listaMensajesContainer">




          <Grid item lg={12} style={{ display: 'flex', padding: 6, alignItems: 'center' }}>
            <Grid item lg={6} style={{ padding: 6 }}>
              {titulo}

            </Grid>
            <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>


            </Grid>

          </Grid>


          {listaMensaje && listaMensaje.map((item, index) => {
            console.log("iteeeem", item)

            if (item.tipo != 2) {
              return (<ChatMessageComponent
                name={index}
                avatar="/static/img/banner_06_on.png"
                message={item['mensaje']}
                time="20 minutes ago"
                position="right"
              />)
            } else {
              return (<ChatMessageComponentImage
                name={index}
                avatar="/static/img/banner_06_on.png"
                message={item['mensaje']}
                archivo={item['archivo']}

                time="20 minutes ago"
                position="right"
              />)
            }


          })}
        </ChatMessages>
        <Divider />
        <ChatInput container>
          <Grid item>
            <Box ml={2} style={{ marginRight: 12 }}>

              <DialogDropzone listaElementos={listaElementos} setLista={setListaMensaje} />
            </Box>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              id="inputMensaje"

              InputProps={{
                readOnly: false,
              }} variant="outlined" onChange={event =>
                SaveValueChat(event.target.value)
              }
              label="Escriba aqui su mensaje" fullWidth />
          </Grid>
          <Grid item>
            <Box ml={2}>
              <Fab color="primary" aria-label="add" size="medium" onClick={fnEnviarMensaje}>
                <SendIcon />
              </Fab>
            </Box>
          </Grid>
        </ChatInput>
      </ChatMain>
    </ChatContainer>
  )




}


async function registrarRequerimientoSiniestro() {

  const mutation = `
  mutation MyMutation($bank:InputNuevoRequerimiento!) {
  registrarNuevoRequerimiento (input:$bank){
    data_requerimiento
  }
}
`;

  let objectoRegistro = JSON.stringify({
    estado: 1,
    fecha_solicitud: '31/03/1990',
    mensajes: [{ mensaje: 'Este es el primer mensaje que se mostrar automatico al momento de abrir la conversacion', tipo: 1 }],

  },
  );

  console.log("obtejetoRequerimiento", objectoRegistro)
  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_requerimiento: objectoRegistro

      }
    }

  });
  console.log("cotizacion_registrada");

}


function DialogDropzone(props) {
  const [open, setOpen] = useState(false);


  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    console.log("files:", files);
    files.forEach(async (item) => {


      console.log("asdad", item)
      await Storage.put(item.name, item)
        .then(result => {

          console.log("RESULTTT", result)

          let listaMensajes = props.listaElementos

          listaMensajes = [...listaMensajes, { mensaje: '', archivo: 'https://kirastoragebucket112236-dev.s3.us-east-2.amazonaws.com/public/' + result['key'], tipo: 2 }]
          props.setLista(listaMensajes)
          console.log("lista", listaMensajes)

          actualizarListaMensajes(listaMensajes)



        }) // {key: "test.txt"}
        .catch(err => console.log(err));



    })
    setOpen(false);
  };

  return (
    <Grid>
      <Fab onClick={() => setOpen(true)}
        color="primary" aria-label="add" size="medium">
        <AttachFileIcon />
      </Fab>


      <DropzoneDialog
        open={open}
        onSave={handleSave}
        showPreviews={true}
        dialogTitle={'SUBIR FOTOS'}
        cancelButtonText={'CANCELAR'}
        submitButtonText={'SUBIR'}
        dropzoneText={'Favor subir imagenes solicitadas'}
        maxFileSize={5000000}
        onClose={() => setOpen(false)}
      />
    </Grid>
  );
}


async function registrarProducto() {

  const mutation = `
  mutation MyMutation($bank:InputNuevoRequerimiento!) {
  registrarNuevoRequerimiento (input:$bank){
    data_requerimiento
    numero_siniestro
  }
}
`;

  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_requerimiento: JSON.stringify({

          estado: 1,
          fecha_solicitud: itemDatosAsegurado['fecha_solicitud'],
          mensajes: [{ mensaje: itemDatosAsegurado['primer_mensaje'], tipo: 1, autor: 0 }],


        }),
        numero_siniestro: idPoliza
      }
    }

  });
  console.log("SINIESTRO REGISTRADO EXITOSAMENTE!");

}



async function actualizarListaMensajes(listaaa) {
  console.log("listaMEnsajesPorGuardar", listaaa)
  console.log("ultimoElemento", ultimoElementoSeleccionado)

  const mutation = `
  mutation MyMutation($bank:InputActualizacionNuevoRequerimiento!) {
  actualizarRequerimientoSiniestro (input:$bank){
    data_requerimiento
    numero_siniestro
    id
  }
}
`;

  let itemTemporal = JSON.parse(ultimoElementoSeleccionado['data_requerimiento'])
  itemTemporal['mensajes'] = listaaa;

  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        data_requerimiento: JSON.stringify(itemTemporal),
        numero_siniestro: idPoliza,
        id_requerimiento: ultimoElementoSeleccionado['id']
      }
    }

  });
  console.log("SINIESTRO REGISTRADO EXITOSAMENTE!");

}

const timeOut = (time) => new Promise((res) => setTimeout(res, time));


function RenderIngresoRequerimiento() {

  const inputRef = React.useRef(null)


  const formRef = useRef()

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {

    console.log("DATOS ASEGURADO", itemDatosAsegurado)
    try {
      await timeOut(1500);
      registrarProducto();

      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <Card mb={6}>
          <CardContent>
            <Typography variant="h6" gutterBottom>

            </Typography>
            <Typography variant="body2" gutterBottom>


            </Typography>


            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid item md={6}>
                      <h4>¿FECHA REQUERIMIENTO?</h4>

                      <form noValidate>
                        <TextField
                          style={{ marginTop: 8 }}
                          id="fecha_siniestro"
                          label="FECHA SINIESTRO"
                          type="date"
                          fullWidth
                          defaultValue={itemDatosAsegurado['fecha_siniestro']}
                          onChange={event => SaveValue("fecha_solicitud", event.target.value)} variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </Grid>

                    <Grid item md={12}>

                      <h4>Primer Mensaje</h4>

                      <textarea
                        rows="12"
                        placeholder="INGRESE PRIMER MENSAJE"
                        style={{ width: '100%' }}
                        name="primer_mensaje"
                        fullWidth
                        defaultValue={itemDatosAsegurado['primer_mensaje']}
                        onBlur={handleBlur}
                        onChange={event => SaveValue("primer_mensaje", event.target.value)}
                      />

                    </Grid>


                    <Grid>
                      <Button
                        ref={inputRef}
                        type="submit"
                        variant="contained"
                        color="primary"
                        mt={3}
                      >
                        ENVIAR
                </Button>
                    </Grid>
                  </Grid>


                </form>
              )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}




const initialValues = {
  firstName: "Lucy",
  lastName: "Lavender",
  email: "lucylavender@gmail.com",
  password: "mypassword123",
  confirmPassword: "mypassword123",
};


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(12, "Must be at least 12 characters")
    .max(255)
    .required("Required"),
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});


function RenderPantall() {


  const [itemRender, setItemRender] = useState('siniestros');


  let handleClickSiniestro = () => {

    setItemRender('siniestros')

  }


  let handleClickNuevoRequerimiento = () => {

    setItemRender('requerimientos')

  }

  let handleClickNotificaciones = () => {

    setItemRender('notificaciones')

  }



  switch (itemRender) {


    case 'siniestros':
      itemRenderDetalle = itemRender && dataAllSiniestros

      break;

    case 'requerimientos':
      itemRenderDetalle = <RenderIngresoRequerimiento />
      break;

    case 'notificaciones':
      itemRenderDetalle = <ChatWindow />
      break;
  }

  if (itemRender) {
    return (
      <Grid>
        <Grid style={{ display: 'flex' }}>
          <Grid item lg={8} >
            <Chip
              avatar={<NewReleases />}
              label="RESUMEN SINIESTRO"
              onClick={handleClickSiniestro}
              m={1}
            />
            <Chip
              avatar={<Notifications />}
              label="SOLICITUDES"
              onClick={handleClickNotificaciones}
              m={1}
            />
            <Chip
              avatar={<Notifications />}
              label="NUEVO REQUERIMIENTO"
              onClick={handleClickNuevoRequerimiento}
              m={1}
            />
            <Chip
              avatar={<MailIcon />}
              label="ENVIAR SINIESTRO"
              //onClick={handleClickNotificaciones}
              m={1}
            />


          </Grid>

        </Grid>
        <Grid item lg={4} style={{ display: 'flex', paddingLeft: 6 }}>


        </Grid>

        <Grid style={{ marginTop: "22px" }}>
          <Shadow>
            <Card>
              {itemRenderDetalle}
            </Card>
          </Shadow>
        </Grid>
      </Grid>
    )
  } else {
    return itemRender && "Cargando detalle poliza"
  }



}


let itemRenderDetalle = 'Cargando';

let dataAllSiniestros = 'cargando'



let idPoliza = 0;
function DetalleSiniestro() {



  dataAllSiniestros = ObtenerDetalleSiniestro();
  let { id } = useParams();


  idPoliza = id;


  return (
    <React.Fragment>
      <Helmet title="Invoice Details" />

      <Typography variant="h3" gutterBottom display="inline">
        FICHA SINIESTRO
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2} style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>NUMERO POLIZA {id}</Typography>
        <Typography>NUMERO SINIESTRO {id}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid>
        <RenderPantall />
      </Grid>
    </React.Fragment>
  );
}

export default DetalleSiniestro;
