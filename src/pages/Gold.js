import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { supabase } from '../supabaseClient';

function Gold() {
  const location = useLocation();
  const member = location.state?.member;
  const scheme = location.state?.scheme;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [goldRate, setGoldRate] = useState(5850);
  const [grossWeight, setGrossWeight] = useState('');
  const [netWeight, setNetWeight] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('22');
  const [selectedLTV, setSelectedLTV] = useState('75');
  const [eligibleAmount, setEligibleAmount] = useState(0);
  const [goldValue, setGoldValue] = useState(0);
  const [ornamentType, setOrnamentType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ornaments, setOrnaments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Customer and Nominee details
  const customerDetails = {
    firstName: member?.name?.split(' ')[0] || "John",
    lastName: member?.name?.split(' ')[1] || "Smith",
    aadhaar: member?.aadhar || "1234-5678-9012",
    mobile: member?.mobile || "+91 9876543210",
    civilScore: 750,
    address: "123 Main Street, Bangalore, Karnataka, 560001",
    registrationDate: "2023-05-15",
    receiptId: member?.id || "R-2023-0042",
    accountNumber: "ACCT-00123456",
  };

  const nomineeDetails = {
    name: "Sarah Johnson",
    relationship: "Spouse",
  };

  // Calculate net weight when gross weight changes
  React.useEffect(() => {
    if (grossWeight !== '') {
      const calculatedNetWeight = Number(grossWeight) * 0.995;
      setNetWeight(Number(calculatedNetWeight.toFixed(2)));
    } else {
      setNetWeight('');
    }
  }, [grossWeight]);

  // Calculate gold value and eligible amount
  React.useEffect(() => {
    if (netWeight !== '' && selectedPurity) {
      const purityFactor = Number(selectedPurity) / 24;
      const calculatedGoldValue = Number(netWeight) * goldRate * purityFactor;
      setGoldValue(Math.round(calculatedGoldValue));
      const ltvFactor = Number(selectedLTV) / 100;
      setEligibleAmount(Math.round(calculatedGoldValue * ltvFactor));
    } else {
      setGoldValue(0);
      setEligibleAmount(0);
    }
  }, [netWeight, selectedPurity, goldRate, selectedLTV]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrnament = () => {
    if (ornamentType && grossWeight !== '' && netWeight !== '') {
      const newOrnament = {
        id: Date.now(),
        type: ornamentType,
        grossWeight,
        netWeight,
        purity: `${selectedPurity}K`,
        goldValue,
        eligibleAmount,
        remarks,
        image: uploadedImage,
      };
      setOrnaments([...ornaments, newOrnament]);
      // Reset form
      setOrnamentType('');
      setGrossWeight('');
      setNetWeight('');
      setRemarks('');
      setUploadedImage(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gold Loan Application</h1>
      </div>

      {/* Customer Details Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow mb-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Customer Details</h2>
        <p className="text-sm text-gray-500 mb-6">Automatically fetched from the system</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={`${customerDetails.firstName} ${customerDetails.lastName}`} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input type="text" value={customerDetails.aadhaar} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input type="text" value={customerDetails.mobile} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col justify-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">Civil Score</label>
            <div className="flex items-center space-x-2">
              <input type="text" value={customerDetails.civilScore} readOnly className="w-20 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-green-400" style={{ width: `${(customerDetails.civilScore / 900) * 100}%` }}></div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
            <input type="text" value={customerDetails.registrationDate} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt ID</label>
            <input type="text" value={customerDetails.receiptId} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={customerDetails.address} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input type="text" value={customerDetails.accountNumber} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
        </div>
      </div>

      {/* Nominee Details Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow mb-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Nominee Details</h2>
        <p className="text-sm text-gray-500 mb-6">Automatically fetched from the system</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
            <input type="text" value={nomineeDetails.name} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <input type="text" value={nomineeDetails.relationship} readOnly className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type of Ornament</label>
                <select
                  value={ornamentType}
                  onChange={(e) => setOrnamentType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                >
                  <option value="">Select ornament type</option>
                  <option value="necklace">Necklace</option>
                  <option value="ring">Ring</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="earrings">Earrings</option>
                  <option value="chain">Chain</option>
                  <option value="bangle">Bangle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gross Weight (grams)</label>
                <input
                  type="number"
                  value={grossWeight}
                  onChange={(e) => setGrossWeight(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Net Weight (grams)</label>
                <input
                  type="number"
                  value={netWeight}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Automatically calculated as 0.5% less than gross weight</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Purity (Karat)</label>
                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                >
                  <option value="24">24K - 99.9% Pure</option>
                  <option value="22">22K - 91.6% Pure</option>
                  <option value="18">18K - 75.0% Pure</option>
                  <option value="14">14K - 58.3% Pure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Ornament Image</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Ornament preview"
                        className="mx-auto h-40 object-contain"
                      />
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-400 mb-2">
                        <i className="fas fa-cloud-upload text-3xl"></i>
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500">Current Gold Rate (per gram)</div>
                  <div className="text-2xl font-bold">₹ {goldRate.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">As per IBJA rates</div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gold Value:</span>
                    <span className="font-semibold">₹ {goldValue.toLocaleString()}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Loan to Value (LTV)</label>
                    <select
                      value={selectedLTV}
                      onChange={(e) => setSelectedLTV(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom sm:text-sm"
                    >
                      <option value="75">75%</option>
                      <option value="60">60%</option>
                    </select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-sm text-gray-600">Eligible Amount:</span>
                    <span className="font-semibold text-green-600">₹ {eligibleAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={addOrnament}
              disabled={!ornamentType || grossWeight === '' || netWeight === ''}
              className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-plus mr-2"></i> Add Ornament
            </button>
          </div>
        </div>
      </div>

      {ornaments.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Loan Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Weight (g)</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Weight (g)</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purity</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gold Value (₹)</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Eligible Amount (₹)</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ornaments.map((ornament) => (
                    <tr key={ornament.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{ornament.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ornament.image && (
                          <img
                            src={ornament.image}
                            alt={ornament.type}
                            className="h-12 w-12 object-cover rounded-md"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{ornament.grossWeight}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{ornament.netWeight}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ornament.purity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">₹ {ornament.goldValue.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">₹ {ornament.eligibleAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ornament.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600">Total Gold Value:</span>
                  <span className="block text-xl font-bold">
                    ₹ {ornaments.reduce((sum, item) => sum + item.goldValue, 0).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Eligible Amount:</span>
                  <span className="block text-xl font-bold text-green-600">
                    ₹ {ornaments.reduce((sum, item) => sum + item.eligibleAmount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button className="!rounded-button bg-white text-gray-700 px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50">
                Save as Draft
              </button>
              <button className="!rounded-button bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700">
                Process Loan Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gold; 