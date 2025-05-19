import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {DashboardContent} from "../../layouts/dashboard";
import Box from "@mui/material/Box";
import {useState} from "react";
import {fetchGetYears} from "../../components/api";
import {Dashboard} from "./Dashboard.tsx";

export function Home() {

    const currentYear = new Date().getFullYear();
    const [yearSelected, setYearSelected] = useState<number>(currentYear);
    const [years, setYears] = useState<number[]>([]);

    const [isLoad, setIsLoad] = useState<boolean>(false);

    if(!isLoad) {
        fetchGetYears()
            .then(response => {
                setYears(response);
                setIsLoad(true);
            });
    }

    const handleSelectedYear = (event: SelectChangeEvent<number>) => {
        setYearSelected(event.target.value as (number));
    };

    return(
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Dashboard
                <FormControl required sx={{ width: '200px', float: 'right'}} >
                    <Box display="flex" alignItems="center" mb={1}>
                        <InputLabel id="year-label">Year</InputLabel>
                        <Select
                            labelId="year-label"
                            id="outlined-basic"
                            value={yearSelected}
                            label="Year"
                            onChange={handleSelectedYear}
                            variant="outlined"
                            fullWidth required
                        >
                            {years.map((value) =>
                                <MenuItem value={value} key={value}>{value}</MenuItem>
                            )}
                        </Select>
                    </Box>
                </FormControl>
            </Typography>
            <Dashboard year={yearSelected} />
        </DashboardContent>
    );
}