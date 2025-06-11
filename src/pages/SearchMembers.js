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
import axios from "axios";

const SearchMembers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { loanType, scheme } = location.state || {};

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/members');
      setMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.customerId.includes(searchQuery) ||
      member.mobile.includes(searchQuery) ||
      member.aadhar.includes(searchQuery)
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
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid gap-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 max-w-2xl flex items-center gap-2">
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
          <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium hover:bg-indigo-600 whitespace-nowrap">
            <i className="fas fa-search mr-2"></i>
            Search
          </button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="default"
            onClick={() => navigate("/new-member")}
            className="bg-custom text-white hover:bg-indigo-600"
          >
            Add New Member
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
                        <TableCell className="font-medium">
                          {member.customerId}
                        </TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.mobile}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/members/${member.id}`)}
                            >
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
