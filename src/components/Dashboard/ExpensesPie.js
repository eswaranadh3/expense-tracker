import React, { useEffect, useState } from "react"
import { Chart } from "react-google-charts"
import { useExpenseManagementContext } from "../ExpenseManagement/context"

export default function ExpensesPie() {
  const { state } = useExpenseManagementContext()
  const [data, setData] = useState([["Expense", "Usage"]])

  useEffect(() => {
    const expenseData = state.expenseList
    let medicine = 0,
      food = 0,
      utilities = 0,
      cab = 0,
      movies = 0,
      others = 0
    expenseData.forEach((expense) => {
      let name = expense.name.toLowerCase()
      if (
        [
          "tablets",
          "treatment",
          "healing",
          "therapy",
          "medication",
          "medicine",
          "cure",
          "remedy",
          "dose",
        ].some((item) => name.includes(item))
      ) {
        medicine++
      } else if (
        [
          "food",
          "foods",
          "nutriment",
          "nutrition",
          "bread",
          "cooking",
          "baking",
          "cuisine",
          "edibles",
          "drink",
          "meal",
          "lunch",
          "dinner",
          "breakfast",
        ].some((item) => name.includes(item))
      ) {
        food++
      } else if (
        [
          "service",
          "power",
          "matter",
          "gas",
          "rent",
          "wifi",
          "bill",
          "recharge",
          "grocery",
          "groceries",
        ].some((item) => name.includes(item))
      ) {
        utilities++
      } else if (
        ["taxi", "minicab", "cab", "carriage", "car"].some((item) =>
          name.includes(item)
        )
      ) {
        cab++
      } else if (
        [
          "movie",
          "movies",
          "cinema",
          "film",
          "picture",
          "theatre",
          "motion",
          "feature",
          "talkie",
        ].some((item) => name.includes(item))
      ) {
        movies++
      } else {
        others++
      }
    })

    setData([
      ["Expense", "Usage"],
      ["Medicine", medicine],
      ["Food", food],
      ["Utilities", utilities],
      ["Cab", cab],
      ["Movies", movies],
      ["Others", others],
    ])
  }, [state.expensesDataModifiedAt])

  const options = {
    title: "My Expenses",
  }
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
