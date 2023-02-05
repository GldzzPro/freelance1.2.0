import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

export const ManageDialog = ({
    type,
    id,
    handleClickOpen ,
    handleClose,
    open

}: {
    type: 'viewer' | 'admin',
    id: string
    handleClickOpen: () => void,
    handleClose: () => void,
    open: boolean
}) => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [admins, setAdmins] = React.useState(['farhat', 'azizayaz'])
    const [viewers, setViewers] = React.useState(['chokri', 'hayawan'])
    const [selectedAdmin, setSelectedAdmin] = React.useState<string | null>(null);
    const [selectedViewer, setSelectedViewer] = React.useState<string | null>(null);

    const handleSubmit = () => {
        console.log('submit')
        handleClose()
    }

    // Form 
    // Title : string
    // Description : string
    // Admins : select fetched from server  
    // Viewers :  select fetched from server  

    return (
            <Dialog
                fullWidth={fullWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>manage project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        add {`${type}`} permission to the project
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        {type === 'admin' ?
                            <>
                                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                    <Select
                                        autoFocus
                                        value={selectedAdmin}
                                        onChange={(e) => setSelectedAdmin(e.target.value as string)}
                                        label="admins"
                                    >
                                        {admins.map((admin) => {
                                            return (
                                                <MenuItem key={admin} value={admin}>
                                                    {admin}
                                                </MenuItem>
                                            );
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </> :
                            <>
                                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                    <Select
                                        autoFocus
                                        value={selectedViewer}
                                        onChange={(e) => setSelectedViewer(e.target.value as string)}
                                        label="viewers"
                                    >
                                        {viewers.map((viewer) => {
                                            return (
                                                <MenuItem key={viewer} value={viewer}>
                                                    {viewer}
                                                </MenuItem>
                                            );
                                        }
                                        )}
                                    </Select>
                                </FormControl>
                            </>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
    );
}