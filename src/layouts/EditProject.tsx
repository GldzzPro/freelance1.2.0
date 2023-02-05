import React from 'react'
import { Box, Button } from '@mui/material'
import { privilegeTable } from '../components/projectAdminsTable'
import { TextField} from '@mui/material'
import { ManageDialog } from '../components/dialogue'
import { useParams } from 'react-router-dom'

export const EditProject = () => {
  let {id} = useParams()
  const [title, setTitle] = React.useState('title')
  const [description, setDescription] = React.useState('description')
  const [admins , setAdmins] = React.useState([{name :'farhat' , role : "admin" , id : "1"} , {name :'aziyaz' , role : "admin" , id : "2"}])
  const [viewers , setViewers] = React.useState([{name :'jilani' , role : "viewer" , id : "3"} , {name :'tijani' , role : "viewer" , id : "4"}])
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<'viewer' | 'admin'>('viewer');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProject = () => {
    console.log('delete project' , id)
  }
  const handleSubmit = () => {
    console.log('submit')
  }
  console.log('edit project hnizzzz' , id)
  return (
    <>
      <div>EditProject</div>
      <button onClick={deleteProject}> delete project</button>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              value={title}
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
              <button onClick={() => {
        setType('viewer')
        handleClickOpen()
      }}>add viewer permission</button>
      <button onClick={() => {
        setType('admin')
        handleClickOpen()
      }}>add adminn permission</button>
      <privilegeTable data={[...admins , ...viewers]} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >update project</Button>
          </Box>
      <ManageDialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} type={type} id={id} />
    </>
  )
}
