import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (for production, use a database like MongoDB, PostgreSQL, etc.)
let visitorData = {
  count: 75, // Starting count
  ips: new Set<string>()
}

export async function GET(request: NextRequest) {
  try {
    // Get visitor IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check if this IP has visited before
    const isNewVisitor = !visitorData.ips.has(ip)
    
    if (isNewVisitor && ip !== 'unknown') {
      visitorData.ips.add(ip)
      visitorData.count++
    }
    
    return NextResponse.json({
      count: visitorData.count,
      isNewVisitor
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json({ count: visitorData.count, isNewVisitor: false })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Reset counter (admin functionality - you can add authentication)
    if (body.action === 'reset') {
      visitorData = {
        count: 0,
        ips: new Set<string>()
      }
      return NextResponse.json({ success: true, count: 0 })
    }
    
    return NextResponse.json({ success: false, message: 'Invalid action' })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error processing request' })
  }
}
