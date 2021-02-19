import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { API } from "aws-amplify";
import Helmet from "react-helmet";
import { green, orange } from "@material-ui/core/colors";
import { Route } from 'react-router-dom'
import { red, blue } from "@material-ui/core/colors";

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
  Avatar as MuiAvatar,
  Box,
  Checkbox,
  Chip as MuiChip,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import moment from 'moment';

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;


const ProductsChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;
const headCells = [

  { id: "id", alignment: "right", label: "ID" },
  { id: "codigo_banco", alignment: "right", label: "CODIGO BANCO" },
  { id: "nombre_banco", alignment: "right", label: "NOMBRE BANCO" },
  { id: "opciones", alignment: "right", label: "OPCIONES" },
];
const Card = styled(MuiCard)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);




const querylistasSiniestros = `
  query listasSiniestros {
    listasSiniestros {
    id
    data_siniestro
  }
  }
`;
async function obtenerlistasSiniestros() {
  const data = await API.graphql({ querylistasSiniestros });
  console.log("data from GraphQL:", data);

  let listaBancos = data['data']['litasSiniestros'];
  listaBancos.forEach(element => {
    console.log(element);
    // rows.push(createData(element.id, element.codigo_banco, element.nombre_banco))
  });
}





function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Invoices
            </Typography>
          )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};
const CenteredContent = styled.div`
  text-align: center;
`;

function createData(
  id,
  codigo,
  nombre
) {
  return { id, codigo, nombre };
}
const rows = [
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

let itemBanco = {};
function SaveValue(key, value) {
  itemBanco[key] = value
}


function FormRegistrarSiniestro() {
  return (
    <Card mb={12}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          REGISTRAR SINIESTRO
        </Typography>
        <Grid container spacing={12}>
          <Grid item md={4} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="NUMERO_SIENIESTRO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>


          <Grid item md={4} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="NUMERO_POLIZA"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={4} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="RUT_USUARIO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={4} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_DENUNCIA"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={4} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_SINIESTRO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={6} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="CODIGO_ESTADO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={6} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="CODIGO_CAUSAL"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={12} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="DESCRIPCION"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_ENVIO_CIA"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_ENVIO_LIQUIDACION"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_PAGO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="FECHA_CONTACTO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="MAIL"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>
          <Grid item md={6} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="DIRECCION"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>

          <Grid item md={3} style={{ padding: '4px' }}>
            <TextField
              id="id"
              label="COMPLETADO"
              defaultValue=""
              variant="outlined"
              fullWidth
              onChange={event => SaveValue("id_banco", event.target.value)}
              my={2}
            />
          </Grid>

        </Grid>

        <Button onClick={createNote} variant="contained" color="primary" mt={3}>
          GURADAR SINIESTRO
        </Button>
      </CardContent>
    </Card>


  )
}





async function createNote() {



  console.log("idBanco :" + itemBanco['id_banco'] + " codigoBanco :" + itemBanco['codigo_banco'] + " nombreBanco:" + itemBanco['nombre_banco'])

  let idBanco = Number(itemBanco['id_banco']);
  let codigoBanco = itemBanco['codigo_banco'];
  let nombreBanco = itemBanco['nombre_banco'];

  const mutation = `
  mutation MyMutation($bank:BankInput!) {
  createBank (input:$bank){
    codigo_banco
    id
    nombre_banco
  }
}
`;

  await API.graphql({
    query: mutation,
    variables: { bank: { id: idBanco, codigo_banco: codigoBanco, nombre_banco: nombreBanco } }

  });
  console.log("Banco creado exitosamente!");


}

function EnhancedTable() {



  const [polizas, setPolizas] = useState('undefined');


  useEffect(async () => {
    let temId = ''

    const queryListaActividadGraphql = `
    query MyQuery {
   listasSiniestros {
     id
    data_siniestro
    email
    numero_poliza
  }
}

`;

    console.log(queryListaActividadGraphql)
    const data = await API.graphql({
      query: queryListaActividadGraphql
    });
    console.log("data from GraphQL:", data);
    setPolizas(data)

  }, [])

  console.log("polizaaa", polizas)

  if (polizas && polizas['data']) {

    console.log("productos", polizas['data']['listasSiniestros']);

    let listProductos = polizas['data']['listasSiniestros'];
    console.log("listaProductos", listProductos)

    return <TableBody style={{ width: '100%' }}>

      {listProductos &&
        listProductos.map((item, index) => {
          console.log(item);

          let itemTemporal = JSON.parse(item['data_siniestro']);

          console.log(itemTemporal)

          return (<TableRow style={{ width: '100%' }} key={index}>
            <TableCell >
              <ProductsChip
                size="small"
                label="ACTIVO"
                rgbcolor={blue[500]}
              />
            </TableCell>

            <TableCell >
              <Typography gutterBottom style={{ fontSize: 11, textTransform: 'uppercase' }}>
                {item['id']}
              </Typography>

            </TableCell>


            <TableCell component="th" scope="row" >
              <Typography style={{ fontSize: 11, textTransform: 'uppercase' }} gutterBottom>
                {itemTemporal['detalle']['tipo_siniestro']}
              </Typography>
            </TableCell>

            <TableCell component="th" scope="row"  >
              <Typography gutterBottom style={{ fontSize: 11, textTransform: 'uppercase' }}>
                {moment(itemTemporal['detalle']['fecha_siniestro']).format("DD/MM/YYYY")}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row"  >

              <Typography gutterBottom style={{ fontSize: 11, textTransform: 'uppercase', fontWeight: 'bold' }}>
                {itemTemporal['polizaItem']}

              </Typography>


            </TableCell>


            <TableCell component="th" scope="row"  >


              <Typography gutterBottom style={{ fontSize: 11, textTransform: 'uppercase' }}>
                {item['email']}

              </Typography>

            </TableCell>

            <TableCell component="th" scope="row" >

              <Grid style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Route style={{ marginRight: '6px', fontSize: 11 }} render={({ history }) => (
                  <Button onClick={() => { history.push(`/pages/polizas/${item['numero_poliza']}`) }} size="small" color="primary">
                    VER POLIZA
                  </Button>

                )} />

                <Route style={{ marginRight: '6px', fontSize: 11 }} render={({ history }) => (
                  <Button onClick={() => { history.push(`/pages/siniestros/${item['id']}`) }} size="small" color="primary">
                    VER SINIESTRO
                  </Button>

                )} />

              </Grid>
            </TableCell>
          </TableRow>
          )
        })
      }
    </TableBody >
  } else {

    return polizas && 'cargando...'

  }

}



function Siniestros() {

  let [renderView, setRenderView] = useState('lista')

  let itemRender = ''


  switch (renderView) {


    case 'lista':
      itemRender = <EnhancedTable />
      break;

    case 'nuevo':
      itemRender = <FormRegistrarSiniestro />
      break;
  }


  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        GESTION BACKOFFICE - SINIESTROS
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Pages
        </Link>
        <Typography>PRODUCTOS</Typography>
      </Breadcrumbs>

      <Grid item lg={12} style={{ display: 'flex' }}>
        <Grid item lg={6}>
          <Button onClick={() => {
            setRenderView('lista')
          }} variant="contained" color="primary" mt={3}>
            LISTA SINIESTROS
        </Button>
        </Grid>

        <Grid item lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => {
            setRenderView('nuevo')
          }} variant="contained" color="primary" mt={3}>
            NUEVO SINIESTRO
        </Button>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {itemRender}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Siniestros;
