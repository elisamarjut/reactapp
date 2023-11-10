import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {

    // state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    // columns for cars ag-grid
    const columns = [
        { field: 'brand', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'color', sortable: true, filter: true },
        { field: 'fuel', sortable: true, filter: true },
        { field: 'year', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true },
        {
            cellRenderer: params => <EditCar params={params.data} updateCar={updateCar} />,
            width: 150
        },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ]

    const REST_URL = 'https://carrestapi.herokuapp.com/cars';

    useEffect(() => getCars(), [])

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData" + responseData._embedded.cars)
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));
    };

    const deleteCar = (params) => {
        console.log("params: " + params.data._links.car.href)
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Car was deleted succesfully!');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => console.error(error));
    }

    const addCar = (car) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Car was added succesfully!');
                    getCars();
                }
                else {
                    alert('Something went wrong wile adding a new car');
                }
            })
            .catch(error => console.error(error));
    }

    const updateCar = (car, REST_URL_FOR_UPDATE) => {
        fetch(REST_URL_FOR_UPDATE, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Car was updated succesfully!');
                    getCars();
                } else {
                    alert('Something went wrong while editing the car')
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </>
    );
}