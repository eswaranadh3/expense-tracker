import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material"
import React, { useState } from "react"
import { useExpenseManagementContext } from "./context"

function AddExpense() {
  const { services, state, stateSetters } = useExpenseManagementContext()
  const { name, price, descp, editMode } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    services.addExpense()
  }

  return (
    <div>
      <Backdrop style={{ color: "#fff", zIndex: 4000 }} open={state.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} style={{ padding: "10px" }}>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <TextField
                label={"Name"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                onChange={(e) => stateSetters.setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={"Price"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                onChange={(e) =>
                  Number(e.target.value) >= 0
                    ? stateSetters.setPrice(e.target.value)
                    : ""
                }
                value={price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={4}
                label={"Description"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                onChange={(e) => stateSetters.setDescp(e.target.value)}
                value={descp}
              />
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={"space-between"}
              item
              xs={12}
            >
              <div />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {editMode ? (
                  <>
                    <Button
                      hidden={!editMode}
                      type={"submit"}
                      variant={"contained"}
                      style={{ background: "#fc6435" }}
                      size={"small"}
                      disabled={state.loading}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      hidden={!editMode}
                      onClick={services.closeEditMode}
                      variant={"outlined"}
                      size={"small"}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      hidden={editMode}
                      type={"submit"}
                      variant={"contained"}
                      size={"small"}
                      disabled={state.loading}
                    >
                      Add Expense
                    </Button>
                  </>
                )}
              </div>
              <div />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  )
}

export default AddExpense
