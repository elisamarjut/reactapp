import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function AddCar(props) {

    // state
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const [open, setOpen] = useState(false); // is dialog open?

    // functions
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addCar(car);
        setOpen(false); // suljetaan dialogi
    }

    // return
    // addbutton
    // dialog (add form)
    // dialog tulee näkyviin vain buttonista painamalla
    return (
        <>
            <Button
                onClick={() => setOpen(true)} variant="filled" style={{ margin: 10 }}>New Car</Button >
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label="Year"
                        name="year"
                        value={car.year}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        label="Price"
                        name="price"
                        value={car.price}
                        onChange={handleInputChanged}
                    ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>Close</Button>
                    <Button
                        onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}