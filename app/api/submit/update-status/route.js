// app/api/supportForm/update-status/route.js
import { connectDB } from "@/utils/connectToDb";
import SupportForm from "@/models/supportForm";
import { sendStatusUpdateEmail } from "@/utils/emailConfig";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  await connectDB();
  
  try {
    const { formId, newStatus } = await request.json();
    
    // Validate required fields
    if (!formId || !newStatus) {
      return NextResponse.json({ 
        success: false, 
        error: "Form ID and new status are required" 
      }, { status: 400 });
    }

    // Validate status
    const validStatuses = ['pending', 'in_progress', 'resolved', 'rejected'];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json({ 
        success: false, 
        error: "Invalid status" 
      }, { status: 400 });
    }

    // Find the support form
    const supportForm = await SupportForm.findById(formId);
    
    if (!supportForm) {
      return NextResponse.json({ 
        success: false, 
        error: "Support form not found" 
      }, { status: 404 });
    }

    const oldStatus = supportForm.status;
    
    // Update the status
    supportForm.status = newStatus;
    supportForm.lastUpdated = new Date();
    await supportForm.save();

    // Send email notification if status changed from pending
    let emailResult = { success: false, message: 'No email sent' };
    
    if (oldStatus === 'pending' && ['resolved', 'rejected', 'in_progress'].includes(newStatus)) {
      emailResult = await sendStatusUpdateEmail(
        supportForm.email,
        supportForm.name,
        supportForm.problem,
        newStatus,
        oldStatus
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      data: {
        supportForm,
        emailSent: emailResult.success,
        emailMessage: emailResult.message || emailResult.error
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating support form status:', error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the status"
    }, { status: 500 });
  }
}

// GET endpoint to fetch all support forms (for admin panel)
export async function GET(request) {
  await connectDB();
  
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    const supportForms = await SupportForm.find(filter)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const total = await SupportForm.countDocuments(filter);
    
    return NextResponse.json({
      success: true,
      data: {
        supportForms,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching support forms:', error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching support forms"
    }, { status: 500 });
  }
}