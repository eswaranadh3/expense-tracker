import React, { useContext, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useExpenseManagementContext } from "./context"
import DeleteExpense from "./DeleteExpense"

export default function ExpenseList() {
  const { services, state, stateSetters } = useExpenseManagementContext()

  useEffect(() => {
    services.getExpenseList()
  }, [])

  const editExpense = (row) => {
    stateSetters.setName(row.name)
    stateSetters.setPrice(row.price)
    stateSetters.setDescp(row.descp)
    stateSetters.setEditMode(true)
  }

  const columns = [
    { field: "name", headerName: "Name", resizable: true, flex: 1 },
    { field: "descp", headerName: "Description", resizable: true, flex: 1 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      resizable: true,
      flex: 1,
    },
    { field: "createdAt", headerName: "Date/Time", resizable: true, flex: 1 },
    {
      field: "",
      headerName: "Actions",
      type: "number",
      resizable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            <IconButton onClick={() => editExpense(params.row)} size={"small"}>
              <EditIcon fontSize="small" />
            </IconButton>
            <DeleteExpense name={params.row.name} id={params.row.id} />
          </div>
        )
      },
    },
  ]

  const rows = state.expenseList.map((expense) => {
    const { id, descp, name, price, created_at } = expense
    return {
      id,
      descp,
      name,
      price: price + "$",
      createdAt:
        new Date(created_at).toLocaleDateString() +
        "  " +
        new Date(created_at).toLocaleTimeString(),
    }
  })

  return (
    <div style={{ height: 400, width: "100%" }} className="paper-card">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={state.loading}
      />
    </div>
  )
}
