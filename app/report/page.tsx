"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Button from "../components/Button";
import Title from "../components/text/Title";
import { ReportType } from "@/types/Report";

export default function ReportPage() {
  const [reportData, setReportData] = useState<ReportType | null>(null);

  async function fetchReport() {
    try {
      const res = await fetch("/api/reports/finance");
      const data = await res.json();
      if (data.success) setReportData(data.data);
    } catch {
      alert("Ошибка при загрузке отчета");
    }
  }

  useEffect(() => { fetchReport(); }, []);

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet([reportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Финансовый отчет");
    XLSX.writeFile(workbook, "FinanceReport.xlsx");
  }

  if (!reportData) return <div>Загрузка...</div>;

  return (
    <div className="container">
      <div className="my-8">
        <Title>Финансовый отчет</Title>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="p-4 border rounded shadow">
            <h3>Общая прибыль</h3>
            <p className="text-2xl font-bold text-green-600">{reportData.totalProfit.toFixed(2)} сом</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3>Затраты (материалы)</h3>
            <p className="text-2xl font-bold text-red-600">{reportData.totalCosts.toFixed(2)} сом</p>
          </div>
        </div>
        
        <Button onClick={exportToExcel}>Скачать Excel</Button>
      </div>
    </div>
  );
}