import {CalendarDays} from "./components/CalendarDays.tsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function FormCalendar(props: any) {


        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const currentDay = new Date(props.year, props.month, 0);

        return (<>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" flexGrow={1}>
                    Activity
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                {
                    weekdays.map((weekday) => {
                        return (<Typography variant="caption" flexGrow={1} key={weekday} >{weekday}</Typography>);
                    })
                }
            </Box>
                <CalendarDays day={currentDay} activity={props.activity} setActivity={props.setActivity} />
            </>
        );

}