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
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const formatNumber = (num) => {
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
    const adSpendYearly = inputs.adSpendDaily * 365;

    const serviceFeeA = inputs.serviceFeeA * 12;
    const totalCostA = serviceFeeA + adSpendYearly;
    const leadsA = adSpendYearly / inputs.leadCost;
    const costPerLeadA = totalCostA / leadsA;
    const dealsA = leadsA / inputs.leadsPerDeal;
    const gciA = dealsA * inputs.dealValue;
    const netRoiA = gciA - totalCostA;

    const totalCostB = inputs.installFeeB + adSpendYearly;
    const leadsB = adSpendYearly / inputs.leadCost;
    const costPerLeadB = totalCostB / leadsB;
    const dealsB = leadsB / inputs.leadsPerDeal;
    const gciB = dealsB * inputs.dealValue;
    const netRoiB = gciB - totalCostB;

    const roiBoost = ((netRoiB - netRoiA) / netRoiA) * 100;
    const roiMultiple = netRoiB / netRoiA;
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
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="py-6">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Lead Gen ROI Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(inputs).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>{labels[key]}</Label>
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
              {Object.entries(results)
                .filter(([key]) => key === "A" || key === "B")
                .map(([option, data]) => (
                  <div
                    key={option}
                    className={`border rounded-xl p-6 shadow-sm text-white ${
                      option === "A"
                        ? "bg-red-900 border-red-600"
                        : "bg-green-900 border-green-600"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      Option {option}
                    </h3>
                    <p className="mb-1">
                      💰 <strong>Total Cost:</strong> ${formatNumber(data.totalCost)}
                    </p>
                    <p className="mb-1">
                      📊 <strong>Real Cost Per Lead:</strong> ${formatNumber(data.costPerLead)}
                    </p>
                    <p className="mb-1">
                      📈 <strong>Deals Closed:</strong> {data.deals.toFixed(2)}
                    </p>
                    <p className="mb-1">
                      🏆 <strong>Estimated GCI:</strong> ${formatNumber(data.gci)}
                    </p>
                    <p className="mb-1">
                      🚀 <strong>Net ROI:</strong> ${formatNumber(data.roi)}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {results?.boost && (
            <div className="mt-6 p-4 bg-green-100 rounded-lg text-green-900 shadow border border-green-300">
              <p className="text-lg font-semibold mb-2">🚀 The New Way Wins!</p>
              <p>
                💥 <strong>ROI Multiple:</strong> {results.roiMultiple.toFixed(2)}x return
              </p>
              <p>
                📈 <strong>That's +{results.boost.toFixed(0)}% higher</strong> than the old way
              </p>
              <p>
                💰 <strong>Extra Profit Earned:</strong> ${formatNumber(results.profitDifference)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
