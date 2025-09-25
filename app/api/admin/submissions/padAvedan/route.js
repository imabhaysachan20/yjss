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
    const committee = searchParams.get('committee')
    const position = searchParams.get('position')
    const state = searchParams.get('state')
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 50
    const skip = (page - 1) * limit
    
    // Build filter query
    let filter = {}
    
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

