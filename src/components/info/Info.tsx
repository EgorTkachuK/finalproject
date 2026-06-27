import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./info.css";
import Summary from "./Summary";
import { supabase } from "../../lib/supabase";
import { useEffect } from "react";


import Calculator from "../../assets/icons/calculator.svg?react";
import Back from "../../assets/icons/return.svg?react";
import Bin from "../../assets/icons/delete.svg?react";
import WealthyHand from "../../assets/icons/wealthyHand.svg?react";
import WealthyColumns from "../../assets/icons/wealthyColumns.svg?react";
import Columns from "../../assets/icons/columns.svg?react";

type ViewMode = "overview" | "expense" | "gain" | "summary";

type Transaction = {
  id: string;
  type: "expense" | "gain";
  amount: number;
  category: string;
  reason: string;
  timestamp: Date;
};

const EXPENSE_CATEGORIES = [
  "Products",
  "Alcohol",
  "Joy",
  "Health",
  "Transport",
  "Home",
  "Machinery",
  "Communication",
  "Sport or hobby",
  "Education",
  "Other",
];



const GAIN_CATEGORIES = ["Pay", "Other"];

const Info: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [view, setView] = useState<ViewMode>("overview");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");



useEffect(() => {
  const fetchTransactions = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", error.message);
      return;
    }

    setTransactions(data || []);
  };

  fetchTransactions();
}, [user]);


  const balance = transactions.reduce((sum, t) => {
    return t.type === "gain" ? sum + t.amount : sum - t.amount;
  }, 0);

  const resetForm = () => {
    setAmount("");
    setReason("");
    setCategory("");
  };

const handleSubmit = async (type: "expense" | "gain") => {
  const parsed = Number(amount);
  if (!amount || Number.isNaN(parsed) || parsed <= 0) {
    window.alert("Please enter a valid amount");
    return;
  }
  if (!reason.trim()) {
    window.alert("Please enter a reason");
    return;
  }
  if (!category) {
    window.alert("Please select a category");
    return;
  }

  const newTransaction = {
    user_id: user?.id,
    type,
    amount: parsed,
    category,
    reason,
    timestamp: new Date(),
  };

  const { data, error } = await supabase
    .from("transactions")
    .insert([newTransaction])
    .select();

  if (error) {
    console.error("Error saving transaction:", error.message);
    window.alert("Failed to save transaction");
    return;
  }

  setTransactions((prev) => [data[0], ...prev]);
  resetForm();
  setView("overview");
};





const handleDelete = async (id: string) => {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    console.error("Error deleting transaction:", error.message);
    window.alert("Failed to delete transaction");
    return;
  }

  setTransactions((prev) => prev.filter((t) => t.id !== id));
};


  if (view === "summary") {
    return (
      <Summary transactions={transactions} onBack={() => setView("overview")} />
    );
  }

  if (view !== "overview") {
    const type = view === "expense" ? "expense" : "gain";
    const categories =
      type === "expense" ? EXPENSE_CATEGORIES : GAIN_CATEGORIES;

    return (
      <div className="infoCover">
        <div className="formContainer">
          <div className="formBackButton">
            <button
              type="button"
              className="iconBack"
              onClick={() => setView("overview")}
              aria-label="Back to overview"
              title="Back"
            >
              <Back className="backSvg" />
            </button>
          </div>

          <div className="topForms">
            <div className="formGroupDesc">
              <label className="formLabel">
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Description"
                  className="formInputDesc"
                />
              </label>
            </div>

            <div className="formGroupCat">
              <label className="formLabel">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="formSelect"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="formPrice">
            <label className="formLabel">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="00.00 USD"
                className="formInputBalance"
              />
            </label>
            <div className="calcContainer">
              <Calculator className="calcIcon" />
            </div>
          </div>
        </div>

        <div className="formButtons">
          <button
            type="button"
            onClick={() => handleSubmit(type)}
            className="buttonSave"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setView("overview")}
            className="buttonCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="infoCover">
    <div className="infoTop">
      <div className="summaryButtonContainer">
        <button
          type="button"
          className="summaryButton"
          onClick={() => setView("summary")}
        >
          <span className="summaryLabel">Move to summary</span>
          <Columns className="summaryIcon" />
        </button>
      </div>

      <div className="balanceSection">
        <div className="balanceAmount">{balance.toFixed(2)}USD</div>
        <div className="calcContainer">
          <Calculator className="calcIcon" />
        </div>
      </div>
    </div>

    <div className="transactionHistory">
      {transactions.length === 0 ? (
        <div className="infoIconDecorations">
          <div className="infoWealthyColumnsContainer">
            <WealthyColumns className="wealthyColumnsIcon" />
          </div>

          <div className="infoWealthyHandContainer">
            <WealthyHand className="wealthyHandIcon" />
          </div>
        </div>
      ) : (
        <ul className="transactionList">
          {transactions.map((t) => (
            <li key={t.id} className="transactionItem">
              <div className="transactionContent">
                <div className="transactionDetails">
                  <div className="transactionHistoryTitle">
                    <div className="transactionReason">{t.reason}</div>
                    <div className="transactionTime">
                      {new Date(t.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="transactionCategory">{t.category}</div>
                </div>
                <div
                  className={`transactionAmount ${
                    t.type === "gain" ? "amountGain" : "amountExpense"
                  }`}
                >
                  {t.type === "gain" ? "+" : "-"}${t.amount.toFixed(2)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="deleteButton"
                title="Delete transaction"
              >
                <Bin className="deleteIcon" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="infoBottom">
      <button
        type="button"
        onClick={() => setView("expense")}
        className="bottomButton expenseButton"
      >
        <span className="buttonLabel">EXPENSES</span>
      </button>
      <button
        type="button"
        onClick={() => setView("gain")}
        className="bottomButton incomeButton"
      >
        <span className="buttonLabel">INCOME</span>
      </button>
    </div>
  </div>
);

};

export default Info;
