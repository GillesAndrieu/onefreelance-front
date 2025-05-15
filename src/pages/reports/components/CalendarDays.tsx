import {TextField} from "@mui/material";
import Box from "@mui/material/Box";

export function CalendarDays(props: any) {
    const nbDay:number = new Date(props.day.getFullYear(), props.day.getMonth(), 0).getDate();
    const firstDayOfMonth:Date = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
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
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            index: index,
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
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

    const handleActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newActivity:Map<string,number> = props.activity.set(event.target.id, event.target.valueAsNumber)
        props.setActivity(newActivity);

    }

    return (
        <>
            {[...initActivity.entries()].map(([key, value]) =>
                (<Box display="flex" alignItems="center" mb={1} key={key+"box"}>
                    {
                        value.map((day:any) => {
                            if (day.currentMonth) {
                                return <TextField id={day.number} defaultValue="0" value={props.activity.get(day.number)}
                                                  type="number" key={day.number+"dayfield"} onChange={handleActivity}
                                                  label={day.number} variant="outlined" fullWidth required/>
                            }else {
                                return <TextField id="outlined-number" disabled value="" variant="outlined" key={day.number+"none"} sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        display: 'none'
                                    }
                                }} fullWidth/>
                            }
                        })
                    }
                </Box>)
            )}
        </>
    )
}