import {DashboardContent} from "../../layouts/dashboard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {Form, useSearchParams} from "react-router-dom";
import {fetchGetClients, fetchGetContract, fetchUpdateContract} from "../../components/api";
import {ContractType} from "../../components/types/ContractType.ts";
import Alert from "@mui/material/Alert";

export function EditContract() {
    const [searchParams] = useSearchParams();
    const [contractId, setContractId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [dailyRate, setDailyRate] = useState<string>("");
    const [currencyDailyRate, setCurrencyDailyRate] = useState<string>("");
    const [taxRate, setTaxRate] = useState<string>("");
    const [taxRateType, setTaxRateType] = useState<string>("");
    const [clients, setClients] = useState<Map<string, string>>(new Map<string, string>());
    const [clientId, setClientId] = useState<string>("");
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const id:any = searchParams.get("id");

    if(!isLoad) {
        fetchGetClients()
            .then(response => {
                let initClients: Map<string, string> = new Map<string, string>();
                response.map((client) => initClients.set(client.id, client.name));
                setClients(initClients);
                setIsLoad(true);
            });

        fetchGetContract(id)
            .then(response => {
                setContractId(response.id);
                setClientId(response.client_id);
                setName(response.name);
                setNumber(response.number);
                setDailyRate(response.daily_rate);
                setCurrencyDailyRate(response.currency_daily_rate);
                setTaxRate(response.tax_rate);
                setTaxRateType(response.tax_rate_type);
                setIsLoad(true);
            });
    }

    const onSubmit = () => {

        let contract: ContractType = {
            name: name,
            number: number,
            daily_rate: dailyRate,
            currency_daily_rate: currencyDailyRate,
            tax_rate: taxRate,
            tax_rate_type: taxRateType,
            client_id: clientId,
            id: "",
            create_at: "",
            update_at: ""
        };

        fetchUpdateContract(contract, contractId).then(() => {
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

    const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(event.target.value);
    };

    const handleClientId = (event: SelectChangeEvent<string>) => {
        setClientId(event.target.value);
    };

    const handleDailyRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDailyRate(event.target.value);
    };

    const handleCurrencyDailyRate = (event: SelectChangeEvent) => {
        setCurrencyDailyRate(event.target.value);
    };

    const handleTaxRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaxRate(event.target.value);
    };

    const handleTaxRateType = (event: SelectChangeEvent) => {
        setTaxRateType(event.target.value);
    };

    return (<DashboardContent>
        {saveSuccess &&
            <Alert severity="success">
                Contract updated with success
            </Alert>
        }
        {saveError &&
            <Alert severity="error">
                Error when updated contract.
            </Alert>
        }
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
                Edit Contract
            </Typography>
        </Box>
        {isLoad && <Card sx={{padding:1}}>
                <CardContent>
                    <Form onSubmit={onSubmit}>
                        <FormControl component="fieldset" variant="standard" fullWidth >
                            <Box display="flex" alignItems="center" mb={1}>
                                <Typography variant="h6" flexGrow={1}>
                                    Contract
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <TextField id="outlined-basic" value={name} onChange={handleName} label="Name" variant="outlined" fullWidth required />
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <TextField id="outlined-basic" value={number} onChange={handleNumber} label="Number" variant="outlined" fullWidth required />
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Typography variant="h6" flexGrow={1}>
                                    Contract data
                                </Typography>
                            </Box>
                        </FormControl>
                        <FormControl required fullWidth >
                            <Box display="flex" alignItems="center" mb={1}>
                                <InputLabel id="client-label">Client</InputLabel>
                                <Select
                                    labelId="client-label"
                                    id="outlined-basic"
                                    value={clientId}
                                    label="Client"
                                    onChange={handleClientId}
                                    variant="outlined"
                                    fullWidth required
                                >
                                    {[...clients.entries()].map(([key, value]) =>
                                        <MenuItem value={key} key={key}>{value}</MenuItem>
                                    )}
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl required fullWidth>
                            <Box display="flex" alignItems="center" mb={1}>
                                <TextField id="outlined-basic" value={dailyRate} onChange={handleDailyRate} label="Daily rate" variant="outlined" fullWidth required />
                            </Box>
                        </FormControl>
                        <FormControl required fullWidth >
                            <Box display="flex" alignItems="center" mb={1}>
                                <InputLabel id="currency-label">Currency daily rate</InputLabel>
                                <Select
                                    labelId="currency-label"
                                    id="outlined-basic"
                                    value={currencyDailyRate}
                                    label="Currency daily rate"
                                    onChange={handleCurrencyDailyRate}
                                    variant="outlined"
                                    fullWidth required
                                >
                                    <MenuItem value={"EUR"}>EUR</MenuItem>
                                    <MenuItem value={"GBP"}>GBP</MenuItem>
                                    <MenuItem value={"USD"}>USD</MenuItem>
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl component="fieldset" variant="standard" fullWidth >
                            <Box display="flex" alignItems="center" mb={1}>
                                <TextField id="outlined-basic" value={taxRate} onChange={handleTaxRate} label="Tax rate" variant="outlined" fullWidth required />
                            </Box>
                        </FormControl>
                        <FormControl required fullWidth >
                            <Box display="flex" alignItems="center" mb={1}>
                                <InputLabel id="tax-label">Tax rate type</InputLabel>
                                <Select
                                    labelId="tax-label"
                                    id="outlined-basic"
                                    value={taxRateType}
                                    label="Tax rate type"
                                    onChange={handleTaxRateType}
                                    variant="outlined"
                                    fullWidth required
                                >
                                    <MenuItem value={"CURRENCY"}>CURRENCY</MenuItem>
                                    <MenuItem value={"PERCENTAGE"}>PERCENTAGE</MenuItem>
                                </Select>
                            </Box>
                        </FormControl>
                        <FormControl component="fieldset" variant="standard" fullWidth >
                            <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                Valid
                            </Button>
                        </FormControl>
                    </Form>
                </CardContent>
            </Card>}
    </DashboardContent>);
}