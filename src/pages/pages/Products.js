import React from "react";
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


function Public() {
  return (
    <div>


      <Card mb={12}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            REGISTRAR PRODUCTO
        </Typography>
          <Grid container spacing={12}>
            <Grid item md={4} style={{ padding: '4px' }}>
              <TextField
                id="id"
                label="CODIGO_PRODUCTO"
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
                label="NOMBRE_COMERCIAL"
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
                label="NOMBRE_TECNICO"
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
                label="FECHA_INICIO"
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
                label="FECHA_TERMINO"
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
                label="PRODUCTO_CP"
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
                label="ANEXO_CP"
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
                label="CARTA_CP"
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
                label="LOGO"
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
                label="IMAGEN"
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
                label="VALOR MINIMO"
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
                label="PERIODO"
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


            <Grid item md={12} style={{ padding: '4px' }}>
              <TextField
                id="id"
                label="DESCRIPCION_LARGA"
                defaultValue=""
                variant="outlined"
                fullWidth
                onChange={event => SaveValue("id_banco", event.target.value)}
                my={2}
              />
            </Grid>

          </Grid>
          <Button
            onClick={fetchNotes}
            style={{ marginRight: "4px" }}
            variant="contained"
            color="primary"
            mt={3}
          >
            LISTAR PRODUCTOS
        </Button>
          <Button onClick={createNote} variant="contained" color="primary" mt={3}>
            GURADAR PRODUCTO
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
async function fetchNotes() {
  const data = await API.graphql({ query });
  console.log("data from GraphQL:", data);

  let listaBancos = data['data']['getBanks'];
  listaBancos.forEach(element => {
    console.log(element);
    rows.push(createData(element.id, element.codigo_banco, element.nombre_banco))
  });
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

  fetchNotes();

}

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

                      <TableCell align="right">##{row.id}</TableCell>
                      <TableCell align="right" style={{ color: "black" }}>##{row.codigo}</TableCell>
                      <TableCell align="right">##{row.nombre}</TableCell>

                      <TableCell align="right">
                        <IconButton aria-label="delete">
                          <ArchiveIcon />
                        </IconButton>
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

function Private() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          LISTA DE BANCOS
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={10}>
            <EnhancedTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Products() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        GESTION BACKOFFICE - PRODUCTOS
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

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Products;
