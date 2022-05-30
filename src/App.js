import { Grid } from "@mui/material"
import React from "react"
import AddExpense from "./components/ExpenseManagement/AddExpense"
import ExpenseList from "./components/ExpenseManagement/ExpenseList"
import { ExpenseManagementContextProvider } from "./components/ExpenseManagement/context"
import axios from "axios"
import Config from "./config"
import ExpensesPie from "./components/Dashboard/ExpensesPie"

axios.defaults.baseURL = Config.baseUrl
function App() {
  return (
    <div>
      <ExpenseManagementContextProvider>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <div style={{ padding: "30px" }}>
              <AddExpense />
            </div>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ExpensesPie />
          </Grid>
        </Grid>

        <div style={{ padding: "30px" }}>
          <ExpenseList />
        </div>
      </ExpenseManagementContextProvider>
    </div>
  )
}

export default App
