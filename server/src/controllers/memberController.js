const Member = require('../models/Member');

// Create new member
const createMember = async (req, res) => {
  try {
    console.log('Request received at /api/members POST endpoint');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);

    // Format the data
    const memberData = {
      ...req.body,
      // Convert string dates to Date objects
      dateOfBirth: new Date(req.body.dateOfBirth),
      registrationDate: new Date(req.body.registrationDate),
      // Convert string numbers to actual numbers
      cibilScore: Number(req.body.cibilScore),
      miscCharges: Number(req.body.miscCharges)
    };

    console.log('Formatted member data:', memberData);

    const member = new Member(memberData);
    console.log('Member model instance created:', member);
    
    await member.save();
    console.log('Member saved successfully:', member);

    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Member registration error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        error: `A member with this ${field} already exists`
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error registering member'
    });
  }
};

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching members'
    });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching member'
    });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      // Convert string dates to Date objects if provided
      ...(req.body.dateOfBirth && { dateOfBirth: new Date(req.body.dateOfBirth) }),
      ...(req.body.registrationDate && { registrationDate: new Date(req.body.registrationDate) }),
      // Convert string numbers to actual numbers if provided
      ...(req.body.cibilScore && { cibilScore: Number(req.body.cibilScore) }),
      ...(req.body.miscCharges && { miscCharges: Number(req.body.miscCharges) })
    };

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating member'
    });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        error: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting member'
    });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
}; 