import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton } from "@mui/material"
import { useExpenseManagementContext } from "./context"

export default function DeleteExpense(props) {
  const { services, state } = useExpenseManagementContext()
  const { name, id } = props

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeletion = async () => {
    await services.deleteExpense(id)
    handleClose()
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen} size={"small"}>
        <DeleteIcon style={{ color: "red" }} fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You want to delete this expense titled as <b> {name} </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            style={{ background: "red" }}
            variant={"contained"}
            onClick={handleDeletion}
            disabled={state.loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
