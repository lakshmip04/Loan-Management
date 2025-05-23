import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

const SearchMembers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loanType, scheme } = location.state || {};

  // Mock data for members
  const members = [
    { id: 'MEM-10001', name: 'John Smith', customerId: '67890', mobile: '9876543210', aadhar: '123456789012', status: 'Active', lastLoan: '₹50,000' },
    { id: 'MEM-10002', name: 'Sarah Johnson', customerId: '12345', mobile: '8765432109', aadhar: '234567890123', status: 'Active', lastLoan: '₹75,000' },
    { id: 'MEM-10003', name: 'Michael Brown', customerId: '54321', mobile: '7654321098', aadhar: '345678901234', status: 'Inactive', lastLoan: '₹25,000' },
    { id: 'MEM-10004', name: 'Emily Davis', customerId: '98765', mobile: '6543210987', aadhar: '456789012345', status: 'Active', lastLoan: '₹100,000' },
    { id: 'MEM-10005', name: 'Robert Wilson', customerId: '24680', mobile: '5432109876', aadhar: '567890123456', status: 'Active', lastLoan: '₹60,000' },
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.customerId.includes(searchQuery) ||
    member.mobile.includes(searchQuery) ||
    member.aadhar.includes(searchQuery)
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleApplyLoan = (member) => {
    if (loanType === "Gold Loan") {
      navigate("/gold", { state: { member, scheme } });
    } else if (loanType === "Business Loan") {
      navigate("/business-loan", { state: { member, scheme } });
    } else if (loanType === "Lendbox Loan") {
      navigate("/lendbox-loan", { state: { member, scheme } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Search Members</h1>
        <p className="mt-1 text-sm text-gray-500">
          {loanType ? `Select a member to apply for ${loanType}` : 'Search and manage member information'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid gap-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Input
            type="text"
            placeholder="Search by name, ID, mobile, or Aadhar number"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Filter
          </Button>
          <Button variant="outline">
            Export
          </Button>
          <Button onClick={() => navigate('/new-member')}>
            Add Member
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin text-blue-500 text-2xl">⌛</div>
          </div>
        ) : (
          <>
            {filteredMembers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Loan</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.id}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.mobile}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status}
                          </span>
                        </TableCell>
                        <TableCell>{member.lastLoan}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {loanType && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApplyLoan(member)}
                              >
                                Apply Loan
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-gray-400 text-5xl mb-4">🔍</span>
                <h3 className="text-lg font-medium text-gray-900">No members found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : 'Try searching for a member by name, ID, mobile, or Aadhar number'}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate('/new-member')}
                >
                  Add New Member
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredMembers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMembers.length}</span> of{' '}
            <span className="font-medium">{filteredMembers.length}</span> results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMembers; 