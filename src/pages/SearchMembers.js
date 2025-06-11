import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { members as membersApi } from "../services/api";

const SearchMembers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [membersList, setMembersList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { loanType, scheme } = location.state || {};

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching members from:', 'http://localhost:5002/api/members');
      
      const response = await membersApi.getAll();
      console.log('Full response object:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      if (response.data && response.data.success) {
        console.log('Members data received:', response.data.data);
        setMembersList(response.data.data);
      } else {
        console.error('API returned unsuccessful response:', response.data);
        setError('Failed to fetch members - API returned unsuccessful response');
      }
    } catch (error) {
      console.error("Detailed error information:");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      
      let errorMessage = 'Failed to fetch members';
      if (error.response) {
        errorMessage = `Server Error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Network Error: Unable to reach server';
      } else {
        errorMessage = `Request Error: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = membersList.filter(
    (member) =>
      (member.cusfname + ' ' + member.cussname).toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.cusid.includes(searchQuery) ||
      member.cusmob.toString().includes(searchQuery) ||
      member.cusaadhaar.includes(searchQuery)
  );

  const handleApplyLoan = (member) => {
    if (loanType === "Gold Loan") {
      navigate("/gold", { state: { member, scheme } });
    } else if (loanType === "Business Loan") {
      navigate("/business-loan", { state: { member, scheme } });
    } else if (loanType === "Lendbox Loan") {
      navigate("/lendbox-loan", { state: { member, scheme } });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Search Members</h1>
        <p className="mt-1 text-sm text-gray-500">
          {loanType
            ? `Select a member to apply for ${loanType}`
            : "Search and manage member information"}
        </p>
        {/* Debug information */}
        <div className="mt-2 text-xs text-gray-400">
          Server: http://localhost:5002/api/members | Members found: {membersList.length}
        </div>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 grid gap-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Input
            type="text"
            placeholder="Search by name, ID, mobile, or Aadhar number"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <Button 
          variant="default"
          onClick={() => navigate("/new-member")}
          className="bg-custom text-white hover:bg-indigo-600"
        >
          <i className="fas fa-user-plus mr-2"></i>
          Add New Member
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMembers}
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin text-blue-500 text-2xl">⌛</div>
            <p className="ml-2">Loading members...</p>
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
                      <TableHead>Aadhar</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>CIBIL</TableHead>
                      <TableHead>Reg. Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member._id}>
                        <TableCell className="font-medium">
                          {member.cusid}
                        </TableCell>
                        <TableCell>{`${member.cusfname} ${member.cussname}`}</TableCell>
                        <TableCell>{member.cusmob}</TableCell>
                        <TableCell>{member.cusaadhaar}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.category === 0
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {member.category === 0 ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>{member.cibil}</TableCell>
                        <TableCell>{formatDate(member.Date)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {loanType ? (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApplyLoan(member)}
                                className="bg-custom text-white hover:bg-indigo-600"
                              >
                                Apply Loan
                              </Button>
                            ) : (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => navigate(`/loan-details/${member._id}`)}
                                  className="bg-custom text-white hover:bg-indigo-600"
                                >
                                  View Loans
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/members/${member._id}/edit`)}
                                >
                                  Edit
                                </Button>
                              </>
                            )}
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
                <h3 className="text-lg font-medium text-gray-900">
                  No members found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Try searching for a member by name, ID, mobile, or Aadhar number"}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate("/new-member")}
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
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredMembers.length}</span> of{" "}
            <span className="font-medium">{filteredMembers.length}</span>{" "}
            results
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMembers;
