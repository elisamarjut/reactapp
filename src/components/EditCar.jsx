import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCar(props) {

    // state
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const [open, setOpen] = useState(false); // is dialog open?

    // functions
    const handleClickOpen = () => {
        console.log(props.params);
        setCar({ brand: props.params.brand, model: props.params.model, color: props.params.color, fuel: props.params.fuel, year: props.params.year, price: props.params.price })
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleUpdate = () => {
        props.updateCar(car, props.params._links.car.href); // todo - update car
        setOpen(false); // suljetaan dialogi
    }

    // return
    // editbutton
    // dialog (edit form) tulee näkyviin vain buttonista painamalla
    return (
        <>
            <Button
                onClick={handleClickOpen} variant="text">Edit Car</Button >
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        margin="dense"
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        margin="dense"
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        margin="dense"
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        margin="dense"
                        label="Year"
                        name="year"
                        value={car.year}
                        onChange={handleInputChanged}
                    ></TextField>
                    <TextField
                        margin="dense"
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
                        onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}