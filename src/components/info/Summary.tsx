import React, { useState } from "react";
import Back from "../../assets/icons/return.svg?react";
import Left from "../../assets/icons/ttleft.svg?react";
import Right from "../../assets/icons/ttright.svg?react";
import Alcohol from "../../assets/icons/alcohol.svg?react";
import Products from "../../assets/icons/products.svg?react";
import Joy from "../../assets/icons/joy.svg?react";
import Health from "../../assets/icons/health.svg?react";
import Trans from "../../assets/icons/trans.svg?react";
import Home from "../../assets/icons/home.svg?react";
import Machinery from "../../assets/icons/machinery.svg?react";
import Invoice from "../../assets/icons/invoice.svg?react";
import Hobby from "../../assets/icons/hobby.svg?react";
import Education from "../../assets/icons/education.svg?react";
import OtherExpen from "../../assets/icons/other.svg?react";
import Pay from "../../assets/icons/pay.svg?react";
import OtherInco from "../../assets/icons/otherInco.svg";

import "./summary.css";

type SummaryProps = {
  transactions: {
    id: string;
    type: "expense" | "gain";
    amount: number;
    category: string;
    reason: string;
    timestamp: Date;
  }[];
  onBack: () => void;
};

const Summary: React.FC<SummaryProps> = ({ transactions, onBack }) => {
  const [viewType, setViewType] = useState<"expense" | "gain">("expense");

  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();
  const currentYear = currentDate.getFullYear();

  const handlePrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.timestamp);
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  });

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalGain = monthlyTransactions
    .filter((t) => t.type === "gain")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalGain - totalExpense;

  const groupedData = Object.entries(
    monthlyTransactions
      .filter((t) => t.type === viewType)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {}),
  )
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const ICON_MAP: Record<string, React.FC<any>> = {
    Products,
    Alcohol,
    Joy,
    Health,
    Transport: Trans,
    Home,
    Machinery,
    Communication: Invoice,
    "Sport or hobby": Hobby,
    Education,
    Other: OtherExpen,

    Pay,
    OtherInco,
  };

const maxAmount = Math.max(...groupedData.map((d) => d.amount), 0);


  return (
    <div className="summaryCover">
      <div className="summaryHeader">
        <button className="iconBack" onClick={onBack}>
          <Back className="backSvg" />
        </button>

        <div className="periodSection">
          <p className="periodLabel">Current period:</p>
          <div className="periodSwitcher">
            <button className="monthButton" onClick={handlePrevMonth}>
              <Left className="switchIcon" />
            </button>
            <h2 className="periodTitle">
              {currentMonth} {currentYear}
            </h2>
            <button className="monthButton" onClick={handleNextMonth}>
              <Right className="switchIcon" />
            </button>
          </div>
        </div>

        <div className="balanceSection">
   
          <div className="balanceValue">{balance.toFixed(2)} USD</div>
        </div>
      </div>

      <div className="summaryStats">
        <div className="summaryExpense">
          <span className="summaryStatLabel">Expenses:</span>
          <span className="summaryStatValue expenseValue">
            -{totalExpense.toFixed(2)} USD
          </span>
        </div>

        <div className="summaryGain">
          <span className="summaryStatLabel">Income:</span>
          <span className="summaryStatValue gainValue">
            +{totalGain.toFixed(2)} USD
          </span>
        </div>
      </div>

      <div className="summaryHeader">
        <div className="periodSection">
          <div className="periodSwitcher">
            <button
              className="monthButton"
              onClick={() => setViewType("expense")}
            >
              <Left className="switchIcon" />
            </button>
            <h2 className="periodTitle">
              {viewType === "expense" ? "EXPENSES" : "INCOME"}
            </h2>
            <button className="monthButton" onClick={() => setViewType("gain")}>
              <Right className="switchIcon" />
            </button>
          </div>
        </div>
      </div>

<div className="categoryContainer">
  {groupedData.map((item, index) => {
    const Icon = ICON_MAP[item.category] || OtherExpen;

    return (
      <div
        key={item.category}
        className={`categoryBox ${index === 0 ? "highlighted" : ""}`}
      >
<div
    className="iconWrapper"
    style={{
      backgroundColor: index === 0 ? "#FFDAC0" : "#F8F9FB",
    }}
  >
    <Icon
      className="categoryIcon"
      color={index === 0 ? "#FF751D" : "#1A1A1A"}
    />
  </div>


        <div className="categoryAmount">{item.amount.toFixed(2)} USD</div>
        <div className="categoryLabel">{item.category}</div>
      </div>
    );
  })}
</div>
<div className="graphContainer">
  {groupedData.map((item, index) => {
    const barWidth = (item.amount / maxAmount) * 100;
    const isTop = index === 0;

    return (
      <div key={item.category} className="graphRow">
        <div className="graphLabel">{item.category}</div>
        <div className="graphValue">{item.amount.toFixed(2)} USD</div>
        <div
          className="graphBar"
          style={{
            width: `${barWidth}%`,
            backgroundColor: isTop ? "#FF751D" : "#FFDAC0",
          }}
        />
      </div>
    );
  })}
</div>

    </div>
  );
};

export default Summary;
