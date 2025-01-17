import { NextResponse } from 'next/server'
import { getFileFromS3 } from '@/lib/s3'
import dbConnect from '@/lib/mongoose/models'
import { Readable } from 'stream'

export async function GET(request: Request, { params }: { params: { filePath: string[] } }) {
    await dbConnect()

    const { filePath } = await params

    const { Body, ContentType, ContentLength } = await getFileFromS3(filePath.join('/'))



    if (!(Body instanceof Readable)) {
        throw new Error('Failed to get readable stream from S3')
    }

    // Set appropriate headers
    const headers = new Headers()
    if (ContentType) headers.set('Content-Type', ContentType)
    if (ContentLength) headers.set('Content-Length', ContentLength.toString())

    const stream = new ReadableStream({
        start(controller) {
            Body.on('data', (chunk) => controller.enqueue(chunk))
            Body.on('end', () => controller.close())
            Body.on('error', (err) => controller.error(err))
        },
    })

    return new NextResponse(stream, { headers })
}

