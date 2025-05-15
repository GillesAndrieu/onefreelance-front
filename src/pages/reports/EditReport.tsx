import {DashboardContent} from "../../layouts/dashboard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {CardContent, FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {Form, useSearchParams} from "react-router-dom";
import {fetchGetClient, fetchUpdateClient} from "../../components/api";
import {ClientType} from "../../components/types/ClientType.ts";
import Alert from "@mui/material/Alert";
import {AddressType} from "../../components/types/AddressType.ts";

export function EditReport() {
    const [searchParams] = useSearchParams();
    const [clientId, setClientId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [siret, setSiret] = useState<string>("");
    const [referent, setReferent] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const id:any = searchParams.get("id");

    if(!isLoad) {
        fetchGetClient(id)
            .then(response => {
                setClientId(response.id)
                setName(response.name);
                setSiret(response.siret);
                setReferent(response.referent);
                setNumber(response.address.number);
                setStreet(response.address.street);
                setCity(response.address.city);
                setPostalCode(response.address.postal_code);
                setIsLoad(true);
            });
    }

    const onSubmit = () => {
        let address: AddressType = {
            number: number,
            street: street,
            city: city,
            postal_code: postalCode,
        }
        let client: ClientType = {
            name: name,
            siret: siret,
            referent: referent,
            address: address,
            id: clientId,
            create_at: "",
            update_at: ""
        };

        fetchUpdateClient(client, clientId).then(() => {
            setSaveError(false);
            setSaveSuccess(true);
        }).catch(() => {
            setSaveError(true);
            setSaveSuccess(false);
        });
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSiret = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSiret(event.target.value);
    };

    const handleReferent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReferent(event.target.value);
    };

    const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(event.target.value);
    };

    const handleStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(event.target.value);
    };

    const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handlePostalCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(event.target.value);
    };

    return (<DashboardContent>
        {saveSuccess &&
            <Alert severity="success">
                Client updated with successF
            </Alert>
        }
        {saveError &&
            <Alert severity="error">
                Error when updated client.
            </Alert>
        }
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
                Edit Report
            </Typography>
        </Box>
        {isLoad && <Card sx={{padding:1}}>
            <CardContent>
                <Form onSubmit={onSubmit}>
                    <FormControl component="fieldset" variant="standard" fullWidth >
                        <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="h6" flexGrow={1}>
                                Client
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={name} onChange={handleName} label="Name" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={siret} onChange={handleSiret} label="Siret" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={referent} onChange={handleReferent} label="Referent" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="h6" flexGrow={1}>
                                Address
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={number} onChange={handleNumber} label="Number" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={street} onChange={handleStreet} label="Street" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={city} onChange={handleCity} label="City" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" value={postalCode} onChange={handlePostalCode} label="Postal code" variant="outlined" fullWidth required />
                        </Box>
                        <Button variant="contained" endIcon={<SendIcon />} type="submit">
                            Valid
                        </Button>
                    </FormControl>
                </Form>
            </CardContent>
        </Card>}
    </DashboardContent>);
}