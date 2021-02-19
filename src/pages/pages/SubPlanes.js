import React, { Fragment, useState, Suspense, useEffect } from 'react';
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { API } from "aws-amplify";
import Helmet from "react-helmet";
import { green, orange } from "@material-ui/core/colors";

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

const headCells = [

  { id: "nombre_tecnico", alignment: "right", label: "NOMBRE TECNICO" },
  { id: "nombre_comercial", alignment: "right", label: "NOMBRE COMERCIAL" },
  { id: "descripcion", alignment: "right", label: "DESCRIPCION" },
  { id: "fechaInicio", alignment: "right", label: "FECHA INICIO" },
  { id: "fechaTermino", alignment: "right", label: "FECHA TERMINO" },
  { id: "opciones", alignment: "right", label: "OPCIONES" },
];
const Card = styled(MuiCard)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

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



async function registrarItem() {


  const mutation = `
  mutation MyMutation($bank:InputRegisterSubPlan!) {
  registerSubPlan (input:$bank){
    data_sub_plan
  }
}
`;

  await API.graphql({
    query: mutation,
    variables: {
      bank: {
        id_plan: planSeleccionado['id'],
        data_sub_plan: JSON.stringify(itemProducto)
      }
    }

  });

  console.log("Banco creado exitosamente!");

}

async function obtenerListaItems() {

  const queryListaActividadGraphql = `
 query MyQuery {
   listasSubPlanes {
  data_sub_plan
  }
}

`;

  console.log(queryListaActividadGraphql)
  const data = await API.graphql({
    query: queryListaActividadGraphql
  });
  console.log("data from GraphQL:", data);

  rows = [];
  let listasProductos = data['data']['listasSubPlanes'];
  listasProductos.forEach(element => {

    let itemPlan = JSON.parse(element['data_sub_plan'])
    console.log(itemPlan);
    rows.push(createData(itemPlan.descripcion,
      itemPlan.codigo_producto,
      itemPlan.plan,
      itemPlan.nombre_plan,
      itemPlan.caracteristicas,
      itemPlan.brief,
    ))
  });
  console.log(listasProductos)


  return true;
}


const CenteredContent = styled.div`
  text-align: center;
`;

function createData(
  anexo_cp,
  descripcion,
  carta_cp,
  descripcion_larga,
  fecha_inicio,
  fecha_termino,
  imagen,
  logo,
  nombre_comercial,
  nombre_tecnico,
  periodo,
  producto_cp,
  valor_minimo,
) {
  return {
    descripcion,
    carta_cp,
    descripcion_larga,
    fecha_inicio,
    fecha_termino,
    imagen,
    logo,
    nombre_comercial,
    nombre_tecnico,
    periodo,
    producto_cp,
    valor_minimo
  };
}
let rows = [
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

function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  console.log("rowPasada", row)
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                    >

                      <TableCell component="th" id={labelId} scope="row">
                        <Customer>
                          <Avatar>{row.customerAvatar}</Avatar>
                          <Box ml={3}>
                            {row.customer}
                            <br />
                            {row.customerEmail}
                          </Box>
                        </Customer>
                      </TableCell>

                      <TableCell align="right">##{row.nombre_comercial}</TableCell>
                      <TableCell align="right">##{row.nombre_tecnico}</TableCell>
                      <TableCell align="right">##{row.descripcion}</TableCell>
                      <TableCell align="right">##{row.fecha_inicio}</TableCell>
                      <TableCell align="right">##{row.fecha_termino}</TableCell>


                      <TableCell align="right">

                        <IconButton
                          aria-label="details"
                          component={NavLink}
                          to="/invoices/detail"
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
let itemProducto = {};
let itemRender = {};

let listPlanes = [];
let planSeleccionado = '';

function SaveValue(key, value) {
  itemProducto[key] = value
}

const ListaRender = (functionRenderDetalle) => {
  const [productos, setProductos] = useState('undefined');
  const [error, setError] = useState('undefined');


  // console.log("listaProductos", listaProductos)

  useEffect(async () => {


    const queryListaActividadGraphql = `
 query MyQuery {
      listasPlanes {
        id
data_plan
  }
}

`;

    console.log(queryListaActividadGraphql)
    await API.graphql({
      query: queryListaActividadGraphql
    }).then(result => {
      console.log(result);
      setProductos(result);


    }
    )

  }, []);


  if (productos && productos['data']) {

    console.log("productos", productos['data']['listasPlanes']);

    let listaPlanes = productos['data']['listasPlanes'];
    listPlanes = listaPlanes;

    console.log("listaProductos", listaPlanes)



    return < select style={{ width: '100%', height: '40px', textTransform: 'uppercase' }} onChange={functionRenderDetalle} >
      < option value="_" > SELECCIONAR PLAN</option >

      {
        listaPlanes.map(item => {
          console.log(item);
          let itemPlan = JSON.parse(item['data_plan'])
          return <option style={{ textTransform: 'uppercase' }} value={item['id']}> {itemPlan['nombre_plan']}</option>

        })
      }
    </select >
  } else {

    return productos && 'cargando...'

  }
}

function FormularioRegistroRender() {

  const [dplan, setDplan] = useState('');

  function handleChangePlan(event) {
    console.log(event)

    let plan = listPlanes.find((u) => {

      return u['id'] === event.target.value


    });
    console.log("planSeleccionado", plan)
    setDplan(plan)
    planSeleccionado = plan;
    // this.setState({ value: event.target.value });
    // RenderDetallePlan(user)
  };



  itemRender = ListaRender(handleChangePlan)

  return (
    <div>





      <Card mb={12}>
        <CardContent>

          <Grid container spacing={12}>


            <Grid item md={12} style={{ padding: '4px', marginTop: '22px' }}>
              <Typography variant="h6" gutterBottom>
                REGISTRAR SUBPLAN
        </Typography>


            </Grid>

            <Grid item md={12} style={{ padding: '4px', marginTop: '22px' }}>
              {itemRender}

            </Grid>



            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="nombre"
                label="nombre"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("nombre", event.target.value)}
                my={2}
              />
            </Grid>

            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="imagen_comercial"
                label="imagen_comercial"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("imagen_comercial", event.target.value)}
                my={2}
              />
            </Grid>

            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="descripcion_comercial"
                label="descripcion_comercial"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("descripcion_comercial", event.target.value)}
                my={2}
              />
            </Grid>
            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="caracteristicas"
                label="caracteristicas"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("caracteristicas", event.target.value)}
                my={2}
              />
            </Grid>

            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="brief"
                label="brief"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("brief", event.target.value)}
                my={2}
              />
            </Grid>


            <Grid item md={3} style={{ padding: '4px' }}>
              <TextField
                id="capital"
                label="capita"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("capital", event.target.value)}
                my={2}
              />
            </Grid>

            <Grid item md={3} style={{ padding: '4px' }}>
              <TextField
                id="capital_atm"
                label="capital atm"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("capital_atm", event.target.value)}
                my={2}
              />
            </Grid>

            <Grid item md={3} style={{ padding: '4px' }}>
              <TextField
                id="comision"
                label="comision"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("comision", event.target.value)}
                my={2}
              />
            </Grid>
            <Grid item md={3} style={{ padding: '4px' }}>
              <TextField
                id="precio_mensual"
                label="precio mensual"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("precio_mensual", event.target.value)}
                my={2}
              />
            </Grid>

          </Grid>

          <Button onClick={registrarItem} variant="contained" color="primary" mt={3}>
            GUARDAR PLAN
        </Button>
        </CardContent>
      </Card>




    </div >
  );
}
const query = `
  query listNotes {
    getBanks {
    codigo_banco
    id
    nombre_banco
  }
  }
`;

function ListaRegistrosRender() {
  return (
    <Card mb={10}>
      <CardContent>


        <Grid item mb={10}>
          <EnhancedTable />
        </Grid>
      </CardContent>
    </Card>
  );
}

function SubPlan() {


  const [menu, setMenu] = useState(2);


  let itemRender = <ListaRegistrosRender />;

  const btnListaElementos = async () => {
    setMenu(2);
    let response = await obtenerListaItems(setMenu);
    console.log(response)
    setMenu(2);

  };

  const btnRegistrarElemento = () => {
    setMenu(1);
  };

  switch (menu) {
    case 1:
      itemRender =
        <div>
          <FormularioRegistroRender />

        </div>
      break;
    case 2:
      itemRender =
        <div>
          <ListaRegistrosRender />
        </div>

      break;

  }


  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        GESTION BACKOFFICE - PLANES
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

      <Divider my={6} />

      <Grid style={{ height: '60px' }}   >
        <Grid mb={10} >
          <Grid mb={10} >
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button
                onClick={btnListaElementos}
                style={{ marginRight: "4px" }}
                variant="contained"
                color="primary"
                mt={3}
              >
                LISTA
        </Button>
              <Button
                onClick={btnRegistrarElemento}
                style={{ marginRight: "4px" }}
                variant="contained"
                color="primary"
                mt={3}
              >
                NUEVA
        </Button>
            </div>

          </Grid>
        </Grid>


      </Grid>
      <Grid mb={10}>
        {itemRender}
      </Grid>
    </React.Fragment >
  );
}

export default SubPlan;








