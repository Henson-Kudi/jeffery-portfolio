import { NextResponse } from 'next/server'
import { deleteManyFilesFromS3 } from '@/lib/s3'
import dbConnect, { Project } from '@/lib/mongoose/models'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect()

    const { id } = await params

    const deleted = await Project.findByIdAndDelete(id)

    if (deleted) {
        await deleteManyFilesFromS3([deleted.mainImage, ...(deleted?.otherImages ?? [])])
    }


    return NextResponse.json({
        success: true,
        message: 'Project deleted successfuly',
        data: deleted
    })
}

