import {DashboardContent} from "../../layouts/dashboard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
    CardContent,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {Form} from "react-router-dom";
import Alert from "@mui/material/Alert";
import {ReportInputType} from "../../components/types/ReportInputType.ts";
import {fetchCreateReport, fetchGetContracts} from "../../components/api";
import Checkbox from "@mui/material/Checkbox";
import {monthNames} from "./components/utils.ts";
import {FormCalendar} from "./FormCalendar.tsx";

export function CreateReport() {

    const nowMonth: number = new Date().getMonth()+1;
    const nowYear: number = new Date().getFullYear();

    const [month, setMonth] = useState<number>(nowMonth);
    const [year, setYear] = useState<number>(nowYear);

    const [billedMonth, setBilledMonth] = useState<number>(nowMonth);
    const [billedYear, setBilledYear] = useState<number>(nowYear);
    const [billed, setBilled] = useState<boolean>(false);
    const [bonus, setBonus] = useState<number>(0);
    const [activity, setActivity] = useState<Map<string, number>>(new Map<string, number>());
    const [contracts, setContracts] = useState<Map<string, string>>(new Map<string, string>());
    const [contractId, setContractId] = useState<string>("");
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);

    if(!isLoad) {
        fetchGetContracts()
            .then(response => {
                let initContracts: Map<string, string> = new Map<string, string>();
                response.map((contract) => initContracts.set(contract.id, contract.name));
                setContracts(initContracts);
                setIsLoad(true);
            });
    }

    const onSubmit = () => {
        let report: ReportInputType = {
            month: month,
            year: year,
            billed_month: billedMonth,
            billed_year: billedYear,
            billed: billed,
            bonus: bonus,
            activity: Object.fromEntries(activity),
            contract_id: contractId,
            id: "",
            create_at: "",
            update_at: ""
        };

        fetchCreateReport(report).then(() => {
            setSaveError(false);
            setSaveSuccess(true);
            window.location.replace("/activity-report");
        }).catch(() => {
            setSaveError(true);
            setSaveSuccess(false);
        });
    }

    const handleContractId = (event: SelectChangeEvent<string>) => {
        setContractId(event.target.value);
    };

    const handleMonth = (event: SelectChangeEvent<number>) => {
        setMonth((event.target.value as number));
        setActivity(new Map<string, number>())
    };

    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.valueAsNumber);
        setActivity(new Map<string, number>())
    };

    const handleBilledMonth = (event: SelectChangeEvent<number>) => {
        setBilledMonth((event.target.value as number));
    };

    const handleBilledYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBilledYear(event.target.valueAsNumber);
    };

    const handleBilled = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBilled(event.target.checked);
    };

    const handleBonus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBonus(event.target.valueAsNumber);
    };

    const handleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        let newActivity:Map<string,number> = activity.set(event.target.id, (event.target.value as number))
        setActivity(newActivity);
    }

    return (<DashboardContent>
        {saveSuccess &&
            <Alert severity="success">
                Report created with success
            </Alert>
        }
        {saveError &&
            <Alert severity="error">
                Error when created new report.
            </Alert>
        }
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
                Create new Report
            </Typography>
        </Box>
        <Card sx={{padding:1}}>
            <CardContent>
                <Form onSubmit={onSubmit}>
                <FormControl component="fieldset" variant="standard" fullWidth >
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="h6" flexGrow={1}>
                            Report
                        </Typography>
                    </Box>
                    <FormControl required fullWidth >
                        <Box display="flex" alignItems="center" mb={1}>
                            <InputLabel id="contract-label">Contract</InputLabel>
                            <Select
                                labelId="contract-label"
                                id="outlined-basic"
                                value={contractId}
                                label="Contract"
                                onChange={handleContractId}
                                variant="outlined"
                                fullWidth required
                            >
                                <MenuItem value={0} key={0}>&nbsp;</MenuItem>
                                {[...contracts.entries()].map(([key, value]) =>
                                    <MenuItem value={key} key={key}>{value}</MenuItem>
                                )}
                            </Select>
                        </Box>
                    </FormControl>
                    <FormControl required fullWidth >
                    <Box display="flex" alignItems="center" mb={1}>
                        <InputLabel id="month-label">Month</InputLabel>
                        <Select
                            labelId="month-label"
                            id="outlined-basic"
                            value={month}
                            label="Month"
                            onChange={handleMonth}
                            variant="outlined"
                            fullWidth required
                        >
                            {monthNames.map((m, i) => (
                                <MenuItem value={i+1} key={i+"month"}>{m}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    </FormControl>
                    <Box display="flex" alignItems="center" mb={1}>
                        <TextField id="outlined-number" value={year} onChange={handleYear} type="number" label="Year" variant="outlined" fullWidth required />
                    </Box>
                    <FormControl required fullWidth >
                        <Box display="flex" alignItems="center" mb={1}>
                            <InputLabel id="billed-month-label">Billed Month</InputLabel>
                            <Select
                                labelId="billed-month-label"
                                id="outlined-basic"
                                value={billedMonth}
                                label="Billed Month"
                                onChange={handleBilledMonth}
                                variant="outlined"
                                fullWidth required
                            >
                                {monthNames.map((m, i) => (
                                    <MenuItem value={i+1} key={i+"billedMonth"}>{m}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </FormControl>
                    <Box display="flex" alignItems="center" mb={1}>
                        <TextField id="outlined-number" value={billedYear} onChange={handleBilledYear} type="number" label="Billed Year" variant="outlined" fullWidth required />
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <TextField id="outlined-number" value={bonus} onChange={handleBonus} type="number" label="Bonus" variant="outlined" fullWidth required />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox name="billed" value={billed} onChange={handleBilled} />
                            }
                            label="Billed"
                        />
                    </Box>
                    {month !== 0 && year !== 0 && year > 1900 &&
                        <FormCalendar year={year} month={month} activity={activity} handleActivity={handleActivity} />
                    }
                    <Button variant="contained" endIcon={<SendIcon />} type="submit">
                        Valid
                    </Button>
                </FormControl>
                </Form>
            </CardContent>
        </Card>
    </DashboardContent>);
}