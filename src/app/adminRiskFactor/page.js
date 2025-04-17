'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function SendRiskDataButton() {
  const [riskData, setRiskData] = useState({
    discountForBoth: 0,
    taxRate: 0,
    homeBasePremium: 0,
    homeValuePercentage: 0,
    homeValueBaseLine: 0,
    highLiability: 0,
    lowLiability: 0,
    homeOldAge: 0,
    homeMidAge: 0,
    homeNewAge: 0,
    heatingOil: 0,
    heatingWood: 0,
    heatingElectric: 0,
    heatingGas: 0,
    heatingOther: 0,
    rural: 0,
    urban: 0,
    autoBasePremium: 0,
    driverYoung: 0,
    driverOld: 0,
    accidentsMany: 0,
    accidentsFew: 0,
    accidentsNone: 0,
    vehicleOld: 0,
    vehicleMid: 0,
    vehicleNew: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fieldMap = {
    discountForHavingBothPolicies: 'discountForBoth',
    taxRate: 'taxRate',
    homeBasePremium: 'homeBasePremium',
    homeValuePercentage: 'homeValuePercentage',
    homeValueBaseLine: 'homeValueBaseLine',
    highLiability: 'highLiability',
    lowLiability: 'lowLiability',
    homeOldAge: 'homeOldAge',
    homeMidAge: 'homeMidAge',
    homeNewAge: 'homeNewAge',
    heatingOil: 'heatingOil',
    heatingWood: 'heatingWood',
    heatingElectric: 'heatingElectric',
    heatingGas: 'heatingGas',
    heatingOther: 'heatingOther',
    rural: 'rural',
    urban: 'urban',
    autoBasePremium: 'autoBasePremium',
    youngDriver: 'driverYoung',
    olderDriver: 'driverOld',
    manyAccidents: 'accidentsMany',
    fewAccidents: 'accidentsFew',
    noAccidents: 'accidentsNone',
    vehicleOld: 'vehicleOld',
    vehicleMid: 'vehicleMid',
    vehicleNew: 'vehicleNew',
  };

  const affectsAllFields = ['discountForHavingBothPolicies', 'taxRate'];

  const affectsHomeFields = [
    'homeBasePremium', 'homeValuePercentage', 'homeValueBaseLine',
    'highLiability', 'lowLiability', 'homeOldAge', 'homeMidAge',
    'homeNewAge', 'heatingOil', 'heatingWood', 'heatingElectric',
    'heatingGas', 'heatingOther', 'rural', 'urban'
  ];

  const affectsAutoFields = [
    'autoBasePremium', 'youngDriver', 'olderDriver',
    'manyAccidents', 'fewAccidents', 'noAccidents',
    'vehicleOld', 'vehicleMid', 'vehicleNew'
  ];

  useEffect(() => {
    fetch('http://localhost:8080/v1/admins/risk', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRiskData(data.object);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error getting risk data:', err);
        setIsLoading(false);
      });
  }, []);

  const handleClick = async () => {
    // Validate fields
    for (const key in riskData) {
      const value = riskData[key];
      if (value === '' || value === null || isNaN(value)) {
        setErrorMsg('All fields must be filled out before updating risk data.');
        return;
      }
    }

    try {
      setErrorMsg(''); // clear previous error
      const processedData = Object.keys(riskData).reduce((acc, key) => {
        acc[key] = riskData[key] === '' ? 0 : parseFloat(riskData[key]);
        return acc;
      }, {});

      const res = await fetch('http://localhost:8080/v1/admins/risk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData)
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      const result = await res.json();
      console.log('Success:', result);
      alert('Risk data updated successfully!');
    } catch (err) {
      console.error('Error sending risk data:', err);
      setErrorMsg('Failed to update risk data. Check the console for details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const stateKey = fieldMap[name];
    setErrorMsg(''); // clear previous error
    setRiskData(prev => ({
      ...prev,
      [stateKey]: value === '' ? '' : parseFloat(value)
    }));
  };

  const renderInputFields = (fields) => {
    return fields.map(displayKey => {
      const stateKey = fieldMap[displayKey];
      return (
        <div key={displayKey} className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">
            {formatFieldName(displayKey)}
          </label>
          <Input
            name={displayKey}
            type="number"
            step="0.01"
            value={riskData[stateKey]}
            onChange={handleChange}
          />
        </div>
      );
    });
  };

  const formatFieldName = (field) => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading risk data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 mt-10">
      <Card className="w-full max-w-5xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">Risk Factors Management</CardTitle>
          <CardDescription className="text-gray-600">
            Update insurance risk factors and premiums for quotes and policies.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Affects All Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputFields(affectsAllFields)}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Affects Home Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderInputFields(affectsHomeFields)}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Affects Auto Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderInputFields(affectsAutoFields)}
              </div>
            </div>
          </form>
          {errorMsg && (
            <div className=" text-red-600 text-center font-medium mt-2">
              {errorMsg}
            </div>
          )}
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <Button
            onClick={handleClick}
            type="button"
            className="w-full h-[50px] text-lg font-semibold"
          >
            Update Risk Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
