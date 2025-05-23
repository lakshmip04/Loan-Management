import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose, loanType, scheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock data for members
  const members = [
    { id: 'MEM-10001', name: 'John Smith', customerId: '67890', mobile: '9876543210', aadhar: '123456789012' },
    { id: 'MEM-10002', name: 'Sarah Johnson', customerId: '12345', mobile: '8765432109', aadhar: '234567890123' },
    { id: 'MEM-10003', name: 'Michael Brown', customerId: '54321', mobile: '7654321098', aadhar: '345678901234' },
    { id: 'MEM-10004', name: 'Emily Davis', customerId: '98765', mobile: '6543210987', aadhar: '456789012345' },
    { id: 'MEM-10005', name: 'Robert Wilson', customerId: '24680', mobile: '5432109876', aadhar: '567890123456' },
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
    // Route based on loanType
    if (loanType === "Gold Loan") {
      navigate("/gold", { state: { member, scheme } });
    } else if (loanType === "Business Loan") {
      navigate("/business-loan", { state: { member, scheme } });
    } else if (loanType === "Lendbox Loan") {
      navigate("/lendbox-loan", { state: { member, scheme } });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{loanType} - Search Members</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, last 5 digits of ID, mobile, or Aadhar number"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          {/* Search Results */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin text-blue-500 text-2xl">⌛</div>
            </div>
          ) : (
            <>
              {filteredMembers.length > 0 ? (
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="default" size="sm" onClick={() => handleApplyLoan(member)}>
                                Apply Loan
                              </Button>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : searchQuery ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="text-gray-300 text-4xl mb-2">🔍</span>
                  <p className="text-gray-500">No members found matching "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="text-gray-300 text-4xl mb-2">👥</span>
                  <p className="text-gray-500">Enter search terms to find members</p>
                  <p className="text-sm text-gray-400 mt-1">Search by name, ID, mobile or Aadhar</p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal; 