import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';

const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'accounts', headerName: 'Phone', type: 'number', width: 200, sortable: true, valueGetter: (params) => params.row.accounts },
    { field: 'amount', headerName: 'Amount', width: 200, sortable: true, valueGetter: (params) => params.row.amount }


  ];
  
export default function OrderTable() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogLabel, setDialogLabel] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.flipkarttech.com/getOrder`);
      console.log(response.data.result)
      const rowsWithIds = response.data.result.map((row, index) => ({ ...row, id: index + 1 }));
      console.log(`>>>>>>>${JSON.stringify(rowsWithIds)}`)
      setData(rowsWithIds);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    fetchData();

    if (storedUsername !== 'flAdmin' || storedPassword !== 'flip1234') {
      window.location.replace('/');
    }
  }, []);

  const openDialog = (label) => {
    setDialogLabel(label);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setInputValue(''); // Reset input value when dialog is closed
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDialogSubmit = () => {
    console.log('Submitted value:', inputValue);
    closeDialog();
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>
      <Header />
      <br />
      <div style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'monospace', textAlign: 'center' }}>Buy Products Dashboard</div>
      <div style={{ flex: 1, marginBottom: '10px', display: 'flex', justifyContent: 'center', background: '#d8dfeb' }}>
        {data && data.length>0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          className="custom-data-grid"
          checkboxSelection
          autoHeight
          style={{ background: ' #cce0e0', boxShadow: '0px 8px 16px rgba(159, 181, 181, 0.9)', paddingRight: '10px', width: '80%', fontFamily: 'monospace' }} // Adjust table height automatically
        />):(<div>Loading...</div>)}
      </div>
      <br />
      <Footer />
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', width: '400px', textAlign: 'center' }}>{dialogLabel}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Number"
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={closeDialog}>Cancel</Button>
          <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={handleDialogSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
