import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Database and collection names
const DATABASE_NAME = "yjss";
const COLLECTION_NAME = "padAvedan";

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(DATABASE_NAME);
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'serialNumber', 'name', 'fatherName', 'birthDate', 'address',
       'executiveCommittee', 'position', 'executiveId',
      'phone', 'email', 'applicationDate', 'state'
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields", 
          missingFields 
        },
        { status: 400 }
      );
    }

    // Additional validation for Uttar Pradesh
    if (formData.state === "Uttar Pradesh") {
      const upRequiredFields = ['zone', 'mandal', 'district', 'loksabha', 'vidansabha'];
      const missingUPFields = upRequiredFields.filter(field => !formData[field]);
      
      if (missingUPFields.length > 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Missing UP-specific required fields", 
            missingFields: missingUPFields 
          },
          { status: 400 }
        );
      }

      // Validate area type and related fields
      if (!formData.areaType) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Area type is required for Uttar Pradesh" 
          },
          { status: 400 }
        );
      }

      if (formData.areaType === "rural" && (!formData.block || !formData.gramPanchayat)) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Block and Gram Panchayat are required for rural areas" 
          },
          { status: 400 }
        );
      }

      if (formData.areaType === "urban" && !formData.ward) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Ward is required for urban areas" 
          },
          { status: 400 }
        );
      }
    }

    // Validate phone number (10 digits)
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid phone number. Must be 10 digits." 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid email format" 
        },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Check if serial number already exists
    const existingApplication = await collection.findOne({
      serialNumber: formData.serialNumber
    });

    if (existingApplication) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Application with this serial number already exists" 
        },
        { status: 409 }
      );
    }

    // Check if user already applied for the same position in the same committee
    const duplicateApplication = await collection.findOne({
      phone: formData.phone,
      executiveCommittee: formData.executiveCommittee,
      position: formData.position
    });

    if (duplicateApplication) {
      return NextResponse.json(
        { 
          success: false, 
          error: "You have already applied for this position in this committee" 
        },
        { status: 409 }
      );
    }

    // Prepare document for insertion
    const applicationDocument = {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending", // Default status
      applicationNumber: formData.serialNumber,
      // Add additional metadata
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString()
      }
    };

    // Insert the application
    const result = await collection.insertOne(applicationDocument);

    if (result.insertedId) {
      // Log successful application
      console.log(`New position application submitted:`, {
        serialNumber: formData.serialNumber,
        name: formData.name,
        position: formData.position,
        committee: formData.executiveCommittee,
        state: formData.state,
        insertedId: result.insertedId
      });

      return NextResponse.json(
        { 
          success: true, 
          message: "Position application submitted successfully",
          applicationId: result.insertedId.toString(),
          serialNumber: formData.serialNumber
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to insert application");
    }

  } catch (error) {
    console.error("Error processing position application:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error. Please try again later." 
      },
      { status: 500 }
    );
  } finally {
    // Close database connection
    try {
      await client.close();
    } catch (closeError) {
      console.error("Error closing database connection:", closeError);
    }
  }
}

export async function GET(request) {
  return NextResponse.json(
    { 
      success: false, 
      error: "Method not allowed. Use POST to submit applications." 
    },
    { status: 405 }
  );
}