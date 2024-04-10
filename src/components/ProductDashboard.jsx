import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, DialogContentText } from '@mui/material';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';
import { useState } from 'react';

export default function ProductDashboard() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [dialogLabel, setDialogLabel] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = React.useState([]);
    const [productData, setProductData] = useState({
        url: '',
        detailUrl: '',
        shortTitle: '',
        longTitle: '',
        mrp: 0,
        cost: 0,
        discount: 0,
        quantity: 0,
        description: '',
        discounts: '',
        tagline: ''
    });
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteProduct(params.row._id)}
                >
                    Delete
                </Button>
            ),
        },
        { field: 'title', headerName: 'Product Name', width: 400, sortable: true, valueGetter: (params) => params.row.title.shortTitle },
        { field: 'title', headerName: 'Product Full Name', width: 300, sortable: true, valueGetter: (params) => params.row.title.longTitle },
        { field: 'price.mrp', headerName: 'Actual Price', type: 'number', width: 290, sortable: true, valueGetter: (params) => params.row.price.mrp },
        { field: 'price.cost', headerName: 'MRP', type: 'number', width: 250, sortable: true, valueGetter: (params) => params.row.price.cost },
        { field: 'price.discount', headerName: 'Discount', type: 'number', width: 250, sortable: true, valueGetter: (params) => params.row.price.discount },
        { field: 'quantity', headerName: 'Quantity ', type: 'number', width: 250, sortable: true },
        { field: 'description', headerName: 'Description', width: 250, sortable: false },
        { field: 'discount', headerName: 'DiscountLine', width: 250, sortable: false },
        { field: 'tagline', headerName: 'Tagline', width: 250, sortable: false }
    ];
    const [selectedProductId, setSelectedProductId] = React.useState(null);
    const validateProductData = (productData) => {
        // Check if any field is empty
        for (const key in productData) {
            if (productData[key] === '') {
                return false;
            }
        }
        return true;
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.flipkarttech.com/products`);
            const rowsWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));
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
        setIsDeleteDialogOpen(false);
        setInputValue(''); // Reset input value when dialog is closed
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleDialogSubmit = async (productData) => {
        // Validate product data
        if (!validateProductData(productData)) {
            // If any field is empty, display an error message
            alert("Please fill in all fields");
            return;
        }
    
        // If all fields are filled, proceed with submitting the data
        console.log(productData)
        const response = await axios.post(`https://api.flipkarttech.com/addProducts`, productData);
        setIsDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setInputValue(''); // Reset input value when dialog is closed
        console.log(response)
    };
    

    const handleDeleteProduct = async (productId) => {
        try {
            console.log(`>>>>>>>>>>>>>>>..${productId}`)
            const response = await axios.delete(`https://api.flipkarttech.com/deleteProducts/${productId}`);
            console.log(response.data); // Log the response if needed
            // Optionally, you can fetch data again to refresh the table after deleting the product
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fcfcfc' }}>
            <Header />
            <br />
            <div style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'monospace', textAlign: 'center' }}>Products Dashboard</div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161' }} onClick={() => openDialog('Add Product Number')}>
                    Add Products
                </Button>
            </div>
            <div style={{ flex: 1, marginBottom: '10px', display: 'flex', justifyContent: 'center', background: '#d8dfeb' }}>
                {data && data.length > 0 ? (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        className="custom-data-grid"
                        autoHeight
                        style={{ background: ' #cce0e0', boxShadow: '0px 8px 16px rgba(159, 181, 181, 0.9)', paddingRight: '10px', width: '80%', fontFamily: 'monospace' }} // Adjust table height automatically
                    />) : (<div>Loading...</div>)}
            </div>
            <br />
            <Footer />
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', width: '400px', textAlign: 'center' }}>Enter Product Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        name="url"
                        label="URL"
                        fullWidth
                        value={productData.url}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="detailUrl"
                        name="detailUrl"
                        label="Detail URL"
                        fullWidth
                        value={productData.detailUrl}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="shortTitle"
                        name="shortTitle"
                        label="Short Title"
                        fullWidth
                        value={productData.shortTitle}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="longTitle"
                        name="longTitle"
                        label="Long Title"
                        fullWidth
                        value={productData.longTitle}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="mrp"
                        name="mrp"
                        label="MRP"
                        type="number"
                        fullWidth
                        value={productData.mrp}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="cost"
                        name="cost"
                        label="Cost"
                        type="number"
                        fullWidth
                        value={productData.cost}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="discount"
                        name="discount"
                        label="Discount"
                        type="number"
                        fullWidth
                        value={productData.discount}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={productData.quantity}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        value={productData.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="discounts"
                        name="discounts"
                        label="Discounts"
                        fullWidth
                        value={productData.discounts}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="tagline"
                        name="tagline"
                        label="Tagline"
                        fullWidth
                        value={productData.tagline}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={closeDialog}>Cancel</Button>
                    <Button style={{ backgroundColor: 'lightblue', border: '1px solid lightblue', borderRadius: '4px', color: '#566161', fontSize: '12px' }} onClick={() => handleDialogSubmit(productData)}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onClose={closeDialog}>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteProduct(selectedProductId)} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
