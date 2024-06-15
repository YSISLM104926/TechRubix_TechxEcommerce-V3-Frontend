"use client"
import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  
const productShowPage = () => {
    const [tableProducts, setTableProducts] = useState([]);
    let [color, setColor] = useState("#ffffff");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/top-products', {
                    next: {
                        revalidate: 1
                    }
                });
                const data = await res.json();
                const newData = data?.map((d: any) => ({ ...d, id: d?._id }));
                setTableProducts(newData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(tableProducts);
    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/delete-user/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleUpdate = async (id: string, updatedData: any) => {
        try {
            await fetch(`http://localhost:5000/update-user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 250, editable: true },
        { field: 'category', headerName: 'Category', width: 150, editable: true },
        { field: 'regular_price', headerName: 'Regular Price', type: 'number', width: 110, editable: true },
        { field: 'sale_price', headerName: 'Sale Price', type: 'number', width: 110, editable: true },
        { field: 'discount', headerName: 'Discount', type: 'number', width: 110, editable: true },
        { field: 'stock', headerName: 'Stock', type: 'number', width: 110, editable: true },
        { field: 'rating', headerName: 'Rating', type: 'number', width: 110, editable: true },
        { field: 'flashsale', headerName: 'Flash Sale', type: 'string', width: 110, editable: true },
        {
            field: 'update',
            headerName: 'Update',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleUpdate(params.row.id, params.row)}
                        style={{ marginRight: 8 }}
                    >
                        Update
                    </Button>
                </div>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                        disabled={params.row.role === 'admin'}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }
    ];

    if (loading) {
        return <SyncLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />;
    }



    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tableProducts}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default productShowPage