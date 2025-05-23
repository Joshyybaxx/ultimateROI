import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function LeadGenROICalculator() {
  const [inputs, setInputs] = useState({
    serviceFeeA: 2000,
    installFeeB: 1000,
    adSpendDaily: 25,
    leadCost: 20,
    leadsPerDeal: 80,
    dealValue: 15000,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const formatNumber = (num) => {
    if (isNaN(num)) return "0.00";
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const labels = {
    serviceFeeA: "Monthly Retainer (Old Way - Lower Profits)",
    installFeeB: "One-Time Setup Fee (New Way - Higher Profits)",
    adSpendDaily: "Daily Ad Budget",
    leadCost: "Average Cost per Lead",
    leadsPerDeal: "Leads Needed to Win a Listing",
    dealValue: "GCI per Listing ($)",
  };

  const calculate = () => {
    const adSpendYearly = inputs.adSpendDaily * 365 || 0;
    const serviceFeeA = inputs.serviceFeeA * 12;

    const totalCostA = serviceFeeA + adSpendYearly;
    const leadsA = adSpendYearly / (inputs.leadCost || 1);
    const costPerLeadA = totalCostA / (leadsA || 1);
    const dealsA = leadsA / (inputs.leadsPerDeal || 1);
    const gciA = dealsA * inputs.dealValue;
    const netRoiA = gciA - totalCostA;

    const totalCostB = inputs.installFeeB + adSpendYearly;
    const leadsB = adSpendYearly / (inputs.leadCost || 1);
    const costPerLeadB = totalCostB / (leadsB || 1);
    const dealsB = leadsB / (inputs.leadsPerDeal || 1);
    const gciB = dealsB * inputs.dealValue;
    const netRoiB = gciB - totalCostB;

    const roiBoost = ((netRoiB - netRoiA) / (netRoiA || 1)) * 100;
    const roiMultiple = netRoiB / (netRoiA || 1);
    const profitDifference = netRoiB - netRoiA;

    setResults({
      A: {
        totalCost: totalCostA,
        costPerLead: costPerLeadA,
        deals: dealsA,
        gci: gciA,
        roi: netRoiA,
      },
      B: {
        totalCost: totalCostB,
        costPerLead: costPerLeadB,
        deals: dealsB,
        gci: gciB,
        roi: netRoiB,
      },
      boost: roiBoost,
      roiMultiple,
      profitDifference,
      serviceFeeA,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="py-6">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
            Lead Gen ROI Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(inputs).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key} className="text-white">{labels[key]}</Label>
                <Input
                  type="number"
                  step="any"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={calculate}
              className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Calculate
            </Button>
          </div>

          {results && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {["A", "B"].map((option) => (
                <div
                  key={option}
                  className={`border rounded-xl p-6 shadow-sm text-white ${option === "A" ? "bg-red-900 border-red-600" : "bg-green-900 border-green-600"}`}
                >
                  <h3 className="text-lg font-semibold mb-4">Option {option}</h3>
                  <p className="mb-1">💰 <strong>Total Cost:</strong> ${formatNumber(results[option].totalCost)}</p>
                  <p className="mb-1">📊 <strong>Real Cost Per Lead:</strong> ${formatNumber(results[option].costPerLead)}</p>
                  <p className="mb-1">📈 <strong>Deals Closed:</strong> {results[option].deals.toFixed(2)}</p>
                  <p className="mb-1">🏆 <strong>Estimated GCI:</strong> ${formatNumber(results[option].gci)}</p>
                  <p className="mb-1">🚀 <strong>Net ROI:</strong> ${formatNumber(results[option].roi)}</p>
                </div>
              ))}
            </div>
          )}

          {results?.boost && (
            <div className="mt-6 p-4 bg-green-900 rounded-lg text-white shadow border border-green-600">
              <p className="text-lg font-semibold mb-2">🚀 The New Way Wins!</p>
              <p>💥 <strong>ROI Multiple:</strong> {results.roiMultiple.toFixed(2)}x return</p>
              <p>📈 <strong>That's +{results.boost.toFixed(0)}% higher</strong> than the old way</p>
              <p>💰 <strong>Extra Profit Earned:</strong> ${formatNumber(results.profitDifference)}</p>
            </div>
          )}

          {results?.serviceFeeA && (
            <div className="mt-6 p-4 bg-yellow-400 rounded-lg text-gray-900 border border-yellow-600 shadow">
              <p className="text-lg font-bold">💸 Money You Keep</p>
              <p>
                Instead of paying <strong>${formatNumber(results.serviceFeeA)}</strong> in ongoing fees,
                you keep that in your pocket with <span className="font-semibold">The New Way</span>.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
