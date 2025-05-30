import {useCallback, useEffect, useState} from 'react';

// MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
// Layouts
import {DashboardContent} from '../../layouts/dashboard';
// Components
import {Iconify} from '../../components/iconify';
import {Scrollbar} from '../../components/scrollbar';
import {TableNoData} from './components/table-no-data';
import {ClientTableRow} from './components/client-table-row.tsx';
import {ClientTableHead} from './components/client-table-head.tsx';
import {TableEmptyRows} from './components/table-empty-rows';
import {ClientTableToolbar} from './components/client-table-toolbar.tsx';
import {applyFilter, emptyRows, getComparator} from './components/utils';
// Api
import {fetchGetClients} from "../../components/api";
// Type
import {ClientType} from '../../components/types/ClientType.ts';

// ----------------------------------------------------------------------

export function Clients() {
    const [clients, setClients] = useState<ClientType[]>([]);
    const table = useTable();

    const [filterName, setFilterName] = useState('');


    useEffect(() => {
        fetchGetClients().then(json => {
            setClients(json)
        });
    }, []);

    const dataFiltered: ClientType[] = applyFilter({
        inputData: clients,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Clients
                </Typography>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    href={"/clients/create"}
                >
                    New client
                </Button>
            </Box>

            <Card>
                <ClientTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <ClientTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={clients.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(
                                        checked,
                                        clients.map((client) => client.id)
                                    )
                                }
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'siret', label: 'Siret' },
                                    { id: 'referent', label: 'Referent' },
                                    { id: 'create_at', label: 'Created At', align: 'center' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    )
                                    .map((row) => (
                                        <ClientTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(row.id)}
                                            onSelectRow={() => table.onSelectRow(row.id)}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, clients.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={table.page}
                    count={clients.length}
                    rowsPerPage={table.rowsPerPage}
                    // @ts-ignore
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

export function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        },
        [order, orderBy]
    );

    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    const onSelectRow = useCallback(
        (inputValue: string) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];

            setSelected(newSelected);
        },
        [selected]
    );

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    // @ts-ignore
    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const onChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            onResetPage();
        },
        [onResetPage]
    );

    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage,
    };
}
