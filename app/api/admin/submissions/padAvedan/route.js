import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

// MongoDB connection
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

// Database and collection names
const DATABASE_NAME = "yjss"
const COLLECTION_NAME = "padAvedan"

async function connectToDatabase() {
  try {
    await client.connect()
    return client.db(DATABASE_NAME)
  } catch (error) {
    console.error("Database connection failed:", error)
    throw new Error("Database connection failed")
  }
}

export async function GET(request) {
  try {
    // Connect to database
    const db = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    // Get query parameters for filtering and pagination
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const committee = searchParams.get('committee')
    const position = searchParams.get('position')
    const state = searchParams.get('state')
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 50
    const skip = (page - 1) * limit
    
    // Build filter query
    let filter = {}
    
    if (status && status !== 'all') {
      filter.status = status
    }
    
    if (committee && committee !== 'all') {
      filter.executiveCommittee = committee
    }
    
    if (position && position !== 'all') {
      filter.position = position
    }
    
    if (state && state !== 'all') {
      filter.state = state
    }
    
    // Get total count for pagination
    const totalCount = await collection.countDocuments(filter)
    
    // Fetch submissions with filters, sorting, and pagination
    const submissions = await collection
      .find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .toArray()
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    
    // Get aggregated statistics
    const stats = await collection.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]).toArray()
    
    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count
      return acc
    }, {})
    
    // Get committee-wise statistics
    const committeeStats = await collection.aggregate([
      {
        $group: {
          _id: "$executiveCommittee",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]).toArray()
    
    return NextResponse.json({
      success: true,
      data: {
        submissions,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit
        },
        statistics: {
          total: totalCount,
          byStatus: statusStats,
          byCommittee: committeeStats
        }
      }
    })
    
  } catch (error) {
    console.error('Error fetching pad avedan submissions:', error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch pad avedan submissions" 
      },
      { status: 500 }
    )
  } finally {
    // Close database connection
    try {
      await client.close()
    } catch (closeError) {
      console.error("Error closing database connection:", closeError)
    }
  }
}

// Update application status
export async function PATCH(request) {
  try {
    const body = await request.json()
    const { applicationId, status, comments, reviewedBy } = body
    
    // Validate required fields
    if (!applicationId || !status) {
      return NextResponse.json(
        { 
          success: false,
          error: "Application ID and status are required" 
        },
        { status: 400 }
      )
    }
    
    // Validate status values
    const validStatuses = ['pending', 'approved', 'rejected', 'under_review']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid status value" 
        },
        { status: 400 }
      )
    }
    
    // Connect to database
    const db = await connectToDatabase()
    const collection = db.collection(COLLECTION_NAME)
    
    // Prepare update data
    const updateData = {
      status,
      updatedAt: new Date(),
      reviewedAt: new Date()
    }
    
    if (comments) {
      updateData.reviewComments = comments
    }
    
    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy
    }
    
    if (status === 'approved') {
      updateData.approvedAt = new Date()
      updateData.approvedBy = reviewedBy
    }
    
    // Update the application
    const result = await collection.updateOne(
      { _id: new ObjectId(applicationId) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: "Application not found" 
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: "Application status updated successfully"
    })
    
  } catch (error) {
    console.error('Error updating application status:', error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to update application status" 
      },
      { status: 500 }
    )
  } finally {
    // Close database connection
    try {
      await client.close()
    } catch (closeError) {
      console.error("Error closing database connection:", closeError)
    }
  }
}