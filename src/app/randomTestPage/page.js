'use client'
import React from 'react'

// Basically this gets done on admin but they can change it

export default function SendRiskDataButton() {
  const handleClick = async () => {
    const riskData = {
      discountForBoth: 0.9,
      taxRate: 0.15,
      homeBasePremium: 500,
      homeValuePercentage: 0.002,
      homeValueBaseLine: 350000,
      highLiability: 1.25,
      lowLiability: 1.0,
      homeOldAge: 1.5,
      homeMidAge: 1.25,
      homeNewAge: 1.0,
      heatingOil: 2.0,
      heatingWood: 1.25,
      heatingElectric: 1.0,
      heatingGas: 1.0,
      heatingOther: 1.0,
      rural: 1.15,
      urban: 1.0,
      autoBasePremium: 750,
      driverYoung: 2.0,
      driverOld: 1.0,
      accidentsMany: 2.5,
      accidentsFew: 1.25,
      accidentsNone: 1.0,
      vehicleOld: 2.0,
      vehicleMid: 1.5,
      vehicleNew: 1.0
    };

    try {
      const res = await fetch('http://localhost:8080/v1/admins/risk', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(riskData)
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const result = await res.json();
      console.log('Success:', result);
    } catch (err) {
      console.error('Error sending risk data:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Send Risk Data
    </button>
  );
}
