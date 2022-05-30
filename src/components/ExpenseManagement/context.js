import cogoToast from "cogo-toast"
import React, { createContext, useContext, useState } from "react"
import MakeRequest from "../../providers/MakeRequest"

const ExpenseManagementContext = createContext()
const useExpenseManagementContext = () => useContext(ExpenseManagementContext)

const expenseManagementInitialState = {
  expenseList: [],
  loading: true,
  name: "",
  price: "",
  descp: "",
  editMode: false,
  expensesDataModifiedAt: Date.now(),
}

function ExpenseManagementContextProvider(props) {
  const [expenseList, setExpenseList] = useState(
    expenseManagementInitialState.expenseList
  )
  const [loading, setLoading] = useState(expenseManagementInitialState.loading)
  const [name, setName] = useState(expenseManagementInitialState.name)
  const [price, setPrice] = useState(expenseManagementInitialState.price)
  const [descp, setDescp] = useState(expenseManagementInitialState.descp)
  const [editMode, setEditMode] = useState(
    expenseManagementInitialState.editMode
  )
  const [expensesDataModifiedAt, setExpensesDataModifiedAt] = useState(
    expenseManagementInitialState.expensesDataModifiedAt
  )

  const getExpenseList = async () => {
    try {
      setLoading(true)
      const data = await MakeRequest("get", "/expenses")
      setExpenseList(data)
      setLoading(false)
      setExpensesDataModifiedAt(Date.now())
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const addExpense = async () => {
    try {
      setLoading(true)
      const payload = {
        name,
        price,
        descp,
      }
      await MakeRequest("post", "/expenses", payload)
      setName("")
      setPrice("")
      setDescp("")
      cogoToast.success("Expense added successfully")
      getExpenseList()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const updateExpense = async () => {
    try {
      setLoading(true)
      const payload = {
        name,
        price,
        descp,
      }
      await MakeRequest("put", "/expenses", payload)
      setName("")
      setPrice("")
      setDescp("")
      cogoToast.success("Expense updated successfully")
      getExpenseList()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      setLoading(true)
      await MakeRequest("delete", "/expenses/" + id)
      cogoToast.success("Expense deleted successfully")
      getExpenseList()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const closeEditMode = () => {
    setName("")
    setPrice("")
    setDescp("")
    setEditMode(false)
  }

  const state = {
    expenseList,
    loading,
    name,
    price,
    descp,
    editMode,
    expensesDataModifiedAt,
  }

  const stateSetters = {
    setExpenseList,
    setLoading,
    setName,
    setPrice,
    setDescp,
    setEditMode,
    setExpensesDataModifiedAt,
  }

  const services = {
    getExpenseList,
    addExpense,
    closeEditMode,
    updateExpense,
    deleteExpense,
  }

  return (
    <ExpenseManagementContext.Provider
      value={{ state, stateSetters, services }}
    >
      {props.children}
    </ExpenseManagementContext.Provider>
  )
}

export { ExpenseManagementContextProvider, useExpenseManagementContext }
