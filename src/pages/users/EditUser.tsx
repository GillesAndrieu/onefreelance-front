import {DashboardContent} from "../../layouts/dashboard";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
    CardContent,
    Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from '@mui/icons-material/Send';
import {Form, useSearchParams} from "react-router-dom";
import {fetchGetUser, fetchUpdateUser} from "../../components/api";
import {UserType} from "../../components/types/UserType.ts";
import Alert from "@mui/material/Alert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const roleNames = [
    'ROLE_ANONYMOUS',
    'ROLE_USER',
    'ROLE_ADMIN'
];

export function EditUser() {
    const [searchParams] = useSearchParams();
    const [userId, setUserId] = useState<string>("");
    const [roles, setRoles] = useState<string[]>([]);
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const id:any = searchParams.get("id");

    if(!isLoad) {
        fetchGetUser(id)
            .then(response => {
                setUserId(response.id)
                setFirstname(response.firstname);
                setLastname(response.lastname);
                setEmail(response.email);
                setActive(response.active);
                setRoles(response.roles);
                setIsLoad(true);
            });
    }

    const onSubmit = () => {
        let user: UserType = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            roles: roles,
            active: active,
            id: userId,
            create_at: "",
            update_at: ""
        };

        fetchUpdateUser(user, userId).then(() => {
            setSaveError(false);
            setSaveSuccess(true);
        }).catch(() => {
            setSaveError(true);
            setSaveSuccess(false);
        });
    }

    const handleFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(event.target.value);
    };

    const handleLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastname(event.target.value);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActive(event.target.checked);
    };

    const handleChange = (event: SelectChangeEvent<typeof roles>) => {
        const {
            target: { value },
        } = event;
        setRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (<DashboardContent>
        {saveSuccess &&
            <Alert severity="success">
                User updated with success
            </Alert>
        }
        {saveError &&
            <Alert severity="error">
                Error when updated user.
            </Alert>
        }
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
                Edit User
            </Typography>
        </Box>
        {isLoad && <Card sx={{padding:1}}>
            <CardContent>
                <Form onSubmit={onSubmit}>
                    <FormControl component="fieldset" variant="standard" fullWidth >
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" defaultValue={lastname} onChange={handleLastname} label="Lastname" variant="outlined" fullWidth required />
                            <TextField id="outlined-basic" defaultValue={firstname} onChange={handleFirstname} label="Firstname" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField id="outlined-basic" defaultValue={email} onChange={handleEmail} label="Email" variant="outlined" fullWidth required />
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <FormControl fullWidth>
                                <InputLabel id="roles-label">Roles</InputLabel>
                                <Select
                                    labelId="roles-label"
                                    id="roles"
                                    label="Roles"
                                    multiple
                                    value={roles}
                                    fullWidth
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                    input={<OutlinedInput label="Roles" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {roleNames.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox name="active" value={active} onChange={handleActive} checked={active}/>
                                }
                                label="Active"
                            />
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