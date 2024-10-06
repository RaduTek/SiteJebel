import {
    Box,
    Button,
    Divider,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import PageAppBar from "../../components/PageAppBar";
import Event from "../../../components/Timeline/Event";
import { useState, useEffect } from "react";
import { Add, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../../../utils/handleRouterPush";

interface ApiList {
    count_total: number;
    count_page: number;
    events: Event[];
    pages: number;
}

export default function AdminBlogPosts() {
    const navigate = useNavigate();
    const [data, setData] = useState<ApiList>({
        count_total: 0,
        count_page: 0,
        pages: 0,
        events: [],
    });
    const [page, setPage] = useState(0); // 0-based index for MUI TablePagination
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [isLoading, setIsLoading] = useState(false);

    const loadRows = (page: number, limit: number) => {
        setIsLoading(true);
        fetch(`/api/admin/posts/list.php?page=${page + 1}&limit=${limit}`)
            .then((res) => res.json())
            .then((_data) => {
                setIsLoading(false);
                setData(_data as ApiList);
            })
            .catch((reason) => {
                setIsLoading(false);
                console.log(reason);
            });
    };

    useEffect(() => {
        loadRows(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to first page when rows per page changes
    };

    return (
        <>
            <PageAppBar title="Postări" />
            <Stack sx={{ p: 2, gap: 2 }}>
                <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                    <Stack sx={{ p: 1, gap: 1 }} direction="row">
                        <Button
                            startIcon={<Add />}
                            onClick={handleRouterPush(navigate)}
                            component="a"
                            href="/admin/posts/new"
                        >
                            Adaugă
                        </Button>

                        <Box sx={{ flex: 1 }}></Box>

                        <Tooltip title="Reîncarcă date">
                            <IconButton
                                onClick={() => loadRows(page, rowsPerPage)}
                            >
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Box sx={{ height: 4, marginTop: "-4px" }}>
                        {isLoading && <LinearProgress />}
                    </Box>
                    <Divider />

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell width="40%">Nume</TableCell>
                                <TableCell>Dată</TableCell>
                                <TableCell width={80}>Vizibilitate</TableCell>
                                <TableCell>Opțiuni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {data.events.map((event) => (
                                <EventRow key={event.id} event={event} />
                            ))} */}
                        </TableBody>
                    </Table>

                    <Divider />
                    <TablePagination
                        component="div"
                        count={data.count_total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </TableContainer>
            </Stack>
        </>
    );
}
