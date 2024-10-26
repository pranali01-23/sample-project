import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [activeReport, setActiveReport] = useState("sales");
  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("https://api.example.com/sales");
      setSalesData(response.data);
    } catch (error) {
      setError("Failed to fetch sales data");
      setOpenSnackbar(true);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get("https://api.example.com/inventory");
      setInventoryData(response.data);
    } catch (error) {
      setError("Failed to fetch inventory data");
      setOpenSnackbar(true);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("https://api.example.com/customers");
      setCustomerData(response.data);
    } catch (error) {
      setError("Failed to fetch customer data");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (activeReport === "sales") fetchSalesData();
    if (activeReport === "inventory") fetchInventoryData();
    if (activeReport === "customers") fetchCustomerData();
  }, [activeReport]);

  const renderReport = () => {
    switch (activeReport) {
      case "sales":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="sales report">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.item}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>${data.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "inventory":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="inventory report">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Warehouse</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.item}</TableCell>
                    <TableCell>{data.stock}</TableCell>
                    <TableCell>{data.warehouse}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case "customers":
        return (
          <TableContainer component={Paper}>
            <Table aria-label="customers report">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Purchase</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.purchase}</TableCell>
                    <TableCell>${data.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Reports Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6">Select Report</Typography>
              <Button
                variant="contained"
                color={activeReport === "sales" ? "primary" : "default"}
                onClick={() => setActiveReport("sales")}
                fullWidth
                style={{ margin: "10px 0" }}
              >
                Sales Report
              </Button>
              <Button
                variant="contained"
                color={activeReport === "inventory" ? "primary" : "default"}
                onClick={() => setActiveReport("inventory")}
                fullWidth
                style={{ margin: "10px 0" }}
              >
                Inventory Report
              </Button>
              <Button
                variant="contained"
                color={activeReport === "customers" ? "primary" : "default"}
                onClick={() => setActiveReport("customers")}
                fullWidth
                style={{ margin: "10px 0" }}
              >
                Customer Report
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              {activeReport.charAt(0).toUpperCase() + activeReport.slice(1)} Report
            </Typography>
            {renderReport()}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
