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
import {ReportType} from "../../components/types/ReportType.ts";
import {fetchCreateReport} from "../../components/api";
import Checkbox from "@mui/material/Checkbox";
import {monthNames} from "./components/utils.ts";
import {FormCalendar} from "./FormCalendar.tsx";

export function CreateReport() {

    const nowMonth: number = new Date().getMonth()+1;
    const nowYear: number = new Date().getFullYear();

    const [month, setMonth] = useState<number>(nowMonth);
    const [year, setYear] = useState<number>(nowYear);

    const [billedMonth, setBilledMonth] = useState<number>(0);
    const [billedYear, setBilledYear] = useState<number>(0);
    const [billed, setBilled] = useState<boolean>(false);
    const [bonus, setBonus] = useState<number>(0);
    const [activity, setActivity] = useState<Map<string, number>>(new Map<string, number>());
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);

    const onSubmit = () => {
        let report: ReportType = {
            month: month,
            year: year,
            billed_month: (billedMonth === 0)?null:billedMonth,
            billed_year: (billedYear === 0)?null:billedYear,
            billed: billed,
            bonus: bonus,
            activity: Object.fromEntries(activity),
            contract_id: "d6af7e0b-21b0-4d6f-8e24-bdbfd00ef550",
            client_id: "0d96b193-6136-4693-9779-d78f21a0030d",
        };
console.log(report)
console.log(JSON.stringify(report))
        fetchCreateReport(report).then(() => {
            setSaveError(false);
            setSaveSuccess(true);
        }).catch(() => {
            setSaveError(true);
            setSaveSuccess(false);
        });
    }

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
                        <FormCalendar year={year} month={month} activity={activity} setActivity={setActivity} />
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