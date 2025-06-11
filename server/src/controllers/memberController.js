const Customer = require('../models/Member');

// Create new member
const createMember = async (req, res) => {
  try {
    const memberData = {
      cusfname: req.body.cusfname,
      cussname: req.body.cussname,
      cusdob: new Date(req.body.cusdob),
      cusgen: req.body.cusgen,
      cusmob: req.body.cusmob,
      cusadd: req.body.cusadd,
      cusaadhaar: req.body.cusaadhaar,
      fee: Number(req.body.fee),
      reference: req.body.reference || 'SELF',
      Date: new Date(req.body.Date || Date.now()),
      cibil: Number(req.body.cibil),
      category: Number(req.body.category || 0)
    };

    console.log('Creating member with data:', memberData);

    const member = new Customer(memberData);
    await member.save();

    console.log('Member created successfully:', member);

    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Member creation error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A member with this ID or Aadhar number already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error creating member'
    });
  }
};

// Get all members from the actual customer collection
const getAllMembers = async (req, res) => {
  try {
    console.log('Fetching all members from customer collection...');
    
    const members = await Customer.find()
      .sort({ Date: -1 })
      .lean();

    console.log(`Found ${members.length} members in customer collection`);
    
    if (members.length > 0) {
      console.log('Sample member data:', JSON.stringify(members[0], null, 2));
    }
    
    res.json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching members: ' + error.message
    });
  }
};

// Get member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Customer.findById(req.params.id);

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
      cusdob: req.body.cusdob ? new Date(req.body.cusdob) : undefined,
      Date: req.body.Date ? new Date(req.body.Date) : undefined,
      fee: req.body.fee ? Number(req.body.fee) : undefined,
      cibil: req.body.cibil ? Number(req.body.cibil) : undefined,
      category: req.body.category !== undefined ? Number(req.body.category) : undefined
    };

    const member = await Customer.findByIdAndUpdate(
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
    const member = await Customer.findByIdAndDelete(req.params.id);

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