import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {weekDaysNames} from "./components/utils.ts";
import {TextField} from "@mui/material";

export function FormCalendar(props: any) {

    const currentDay = new Date(props.year, props.month, 0);
    const nbDay:number = new Date(currentDay.getFullYear(), currentDay.getMonth(), 0).getDate();
    const firstDayOfMonth:Date = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    const weekdayOfFirstDay:number = firstDayOfMonth.getDay();

    for (let days = 1; days <= nbDay; days++) {
        props.activity.set(days.toString(), 0);
    }

    let initActivity:Map<Object, any> = new Map<Object, any>();
    let currentDays:any = [];
    let index:number = 0;
    for (let day:number = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === currentDay.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            index: index,
            selected: (firstDayOfMonth.toDateString() === currentDay.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
        index++;
        currentDays.push(calendarDay);
        if(day !==0 && currentDays.length === 7) {
            let index:number = day/7
            initActivity.set(index, currentDays);
            currentDays = [];
            index = 0;
        }
    }

    return (<>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h6" flexGrow={1}>
                    Activity
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                {
                    weekDaysNames.map((weekday) => {
                        return (<Typography variant="caption" flexGrow={1} key={weekday} >{weekday}</Typography>);
                    })
                }
            </Box>
            {[...initActivity.entries()].map(([key, value]) =>
                (<Box display="flex" alignItems="center" mb={1} key={key+"box"}>
                    {
                        value.map((day:any) => {
                            if (day.currentMonth && (day.date.getDay() === 0 || day.date.getDay() === 6)) {

                                return (<><TextField id={day.number} defaultValue={0} value={props.activity.get(day.number)} inputProps={{pattern: "^(0|1|0\.5)$"}}
                                                     type="text" key={day.number+"dayfield"} onChange={props.handleActivity}
                                                     label={day.number} variant="outlined" fullWidth required sx={{ bgcolor: 'background.neutral' }} /></>)
                            } else if (day.currentMonth) {

                                return (<><TextField id={day.number} value={props.activity.get(day.number)} inputProps={{pattern: "^(0|1|0\.5)$"}}
                                                     type="text" key={day.number+"dayfield"} onChange={props.handleActivity}
                                                     label={day.number} variant="outlined" fullWidth required/></>)
                            } else {
                                return (<TextField id={"outlined-number"+key} disabled value="" variant="outlined" key={day.number+"none"} sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        display: 'none'
                                    }
                                }} fullWidth/>)
                            }
                        })
                    }
                </Box>)
            )}
        </>
    );

}