import  { useReducer, useState, createElement } from "react";
import "./App.css";

const h = createElement;

const initialState = {
  transactions: []
};

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        transactions: [...state.transactions, action.payload]
      };

    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          function (transaction) {
            return transaction.id !== action.payload;
          }
        )
      };

    case "CLEAR_TRANSACTIONS":
      return {
        transactions: []
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    expenseReducer,
    initialState
  );

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const totalExpenses = state.transactions.reduce(
    function (total, transaction) {
      return total + transaction.amount;
    },
    0
  );

  const balance =
    Number(monthlyIncome || 0) - totalExpenses;

  function addExpense(e) {
    e.preventDefault();

    if (title.trim() === "" || amount === "") {
      alert("Please enter expense name and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category
    };

    dispatch({
      type: "ADD_TRANSACTION",
      payload: newExpense
    });

    setTitle("");
    setAmount("");
  }

  function deleteExpense(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Education",
    "Entertainment",
    "Health",
    "Other"
  ];

  const transactions = state.transactions
    .slice()
    .reverse();

  return h(
    "div",
    { className: "app" },

    h("div", {
      className: "circle circle1"
    }),

    h("div", {
      className: "circle circle2"
    }),

    h("div", {
      className: "circle circle3"
    }),

    h(
      "div",
      { className: "container" },

      h(
        "header",
        null,

        h(
          "p",
          { className: "small-title" },
          "PERSONAL FINANCE"
        ),

        h(
          "h1",
          null,
          "Expense Tracker"
        ),

        h(
          "p",
          { className: "subtitle" },
          "Track your income, expenses and balance easily."
        )
      ),

      h(
        "section",
        { className: "income-input-box" },

        h(
          "div",
          null,

          h(
            "h2",
            null,
            "💰 Set Your Monthly Income"
          ),

          h(
            "p",
            null,
            "Enter the amount you earn every month."
          )
        ),

        h(
          "div",
          { className: "income-input" },

          h(
            "span",
            null,
            "₹"
          ),

          h("input", {
            type: "number",
            placeholder: "Enter monthly income",
            value: monthlyIncome,
            onChange: function (e) {
              setMonthlyIncome(e.target.value);
            }
          })
        )
      ),

      h(
        "div",
        { className: "summary" },

        h(
          "div",
          { className: "card income-card" },

          h(
            "div",
            { className: "card-icon" },
            "💰"
          ),

          h(
            "div",
            null,

            h(
              "p",
              null,
              "Monthly Income"
            ),

            h(
              "h2",
              null,
              "₹" +
                Number(
                  monthlyIncome || 0
                ).toLocaleString()
            )
          )
        ),

        h(
          "div",
          { className: "card expense-card" },

          h(
            "div",
            { className: "card-icon" },
            "💸"
          ),

          h(
            "div",
            null,

            h(
              "p",
              null,
              "Total Expenses"
            ),

            h(
              "h2",
              null,
              "₹" + totalExpenses.toLocaleString()
            )
          )
        ),

        h(
          "div",
          { className: "card balance-card" },

          h(
            "div",
            { className: "card-icon" },
            "💵"
          ),

          h(
            "div",
            null,

            h(
              "p",
              null,
              "Remaining Balance"
            ),

            h(
              "h2",
              {
                className:
                  balance < 0
                    ? "negative-balance"
                    : ""
              },
              "₹" + balance.toLocaleString()
            )
          )
        )
      ),

      h(
        "div",
        { className: "main-grid" },

        h(
          "section",
          { className: "form-box" },

          h(
            "h2",
            null,
            "Add Expense"
          ),

          h(
            "p",
            { className: "form-subtitle" },
            "Enter your daily expenses"
          ),

          h(
            "form",
            { onSubmit: addExpense },

            h(
              "label",
              null,
              "Expense Name"
            ),

            h("input", {
              type: "text",
              placeholder: "Example: Grocery",
              value: title,
              onChange: function (e) {
                setTitle(e.target.value);
              }
            }),

            h(
              "label",
              null,
              "Expense Amount"
            ),

            h("input", {
              type: "number",
              placeholder: "Example: 500",
              value: amount,
              onChange: function (e) {
                setAmount(e.target.value);
              }
            }),

            h(
              "label",
              null,
              "Expense Category"
            ),

            h(
              "select",
              {
                value: category,
                onChange: function (e) {
                  setCategory(e.target.value);
                }
              },

              h(
                "option",
                { value: "Food" },
                "🍔 Food"
              ),

              h(
                "option",
                { value: "Travel" },
                "🚗 Travel"
              ),

              h(
                "option",
                { value: "Shopping" },
                "🛍️ Shopping"
              ),

              h(
                "option",
                { value: "Bills" },
                "💡 Bills"
              ),

              h(
                "option",
                { value: "Education" },
                "📚 Education"
              ),

              h(
                "option",
                { value: "Entertainment" },
                "🎬 Entertainment"
              ),

              h(
                "option",
                { value: "Health" },
                "🏥 Health"
              ),

              h(
                "option",
                { value: "Other" },
                "📦 Other"
              )
            ),

            h(
              "button",
              {
                className: "add-btn",
                type: "submit"
              },
              "+ Add Expense"
            )
          )
        ),

        h(
          "section",
          { className: "transactions-box" },

          h(
            "div",
            { className: "section-heading" },

            h(
              "div",
              null,

              h(
                "h2",
                null,
                "Expense History"
              ),

              h(
                "p",
                null,
                "Your recent spending"
              )
            ),

            h(
              "span",
              { className: "count" },
              state.transactions.length
            )
          ),

          h(
            "div",
            { className: "transaction-list" },

            state.transactions.length === 0

              ? h(
                  "div",
                  { className: "empty" },

                  h(
                    "span",
                    null,
                    "📭"
                  ),

                  h(
                    "p",
                    null,
                    "No expenses added yet"
                  ),

                  h(
                    "small",
                    null,
                    "Add your first expense!"
                  )
                )

              : transactions.map(
                  function (transaction) {
                    return h(
                      "div",
                      {
                        className: "transaction",
                        key: transaction.id
                      },

                      h(
                        "div",
                        {
                          className:
                            "transaction-icon"
                        },
                        "💸"
                      ),

                      h(
                        "div",
                        {
                          className:
                            "transaction-info"
                        },

                        h(
                          "h3",
                          null,
                          transaction.title
                        ),

                        h(
                          "p",
                          null,
                          transaction.category
                        )
                      ),

                      h(
                        "div",
                        {
                          className:
                            "amount expense"
                        },
                        "-₹" +
                          transaction.amount.toLocaleString()
                      ),

                      h(
                        "button",
                        {
                          className: "delete-btn",
                          onClick: function () {
                            deleteExpense(
                              transaction.id
                            );
                          }
                        },
                        "×"
                      )
                    );
                  }
                )
          )
        )
      ),

      h(
        "section",
        { className: "overview" },

        h(
          "h2",
          null,
          "📊 Expense Overview"
        ),

        h(
          "p",
          { className: "overview-subtitle" },
          "See where your money is going."
        ),

        h(
          "div",
          { className: "overview-content" },

          h(
            "div",
            { className: "progress-container" },

            categories.map(
              function (item) {
                const categoryTotal =
                  state.transactions
                    .filter(function (transaction) {
                      return (
                        transaction.category === item
                      );
                    })
                    .reduce(
                      function (
                        total,
                        transaction
                      ) {
                        return (
                          total +
                          transaction.amount
                        );
                      },
                      0
                    );

                const percentage =
                  totalExpenses > 0
                    ? (categoryTotal /
                        totalExpenses) *
                      100
                    : 0;

                return h(
                  "div",
                  {
                    className: "progress-item",
                    key: item
                  },

                  h(
                    "div",
                    {
                      className:
                        "progress-label"
                    },

                    h(
                      "span",
                      null,
                      item
                    ),

                    h(
                      "span",
                      null,
                      "₹" +
                        categoryTotal.toLocaleString()
                    )
                  ),

                  h(
                    "div",
                    {
                      className:
                        "progress-bar"
                    },

                    h("div", {
                      className:
                        "progress-fill",
                      style: {
                        width:
                          percentage + "%"
                      }
                    })
                  )
                );
              }
            )
          ),

          h(
            "div",
            { className: "balance-circle" },

            h(
              "div",
              null,

              h(
                "span",
                null,
                "Balance"
              ),

              h(
                "strong",
                {
                  className:
                    balance < 0
                      ? "circle-negative"
                      : ""
                },
                "₹" +
                  balance.toLocaleString()
              ),

              h(
                "small",
                null,
                "remaining"
              )
            )
          )
        )
      ),

      state.transactions.length > 0

        ? h(
            "button",
            {
              className: "clear-btn",
              onClick: function () {
                dispatch({
                  type:
                    "CLEAR_TRANSACTIONS"
                });
              }
            },
            "Clear All Expenses"
          )

        : null,

      h(
        "footer",
        null,
        "Expense Tracker • Manage your money wisely"
      )
    )
  );
}

export default App;