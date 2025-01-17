import { NextResponse } from 'next/server'
import { deleteFileFromS3 } from '@/lib/s3'
import dbConnect, { Project } from '@/lib/mongoose/models'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await dbConnect()

    const { id } = params

    const deleted = await Project.findByIdAndDelete(id)

    if (deleted) {
        await Promise.all([deleted.mainImage, ...(deleted?.otherImages ?? [])].map(async item => await deleteFileFromS3(item)))
    }


    return NextResponse.json({
        success: true,
        message: 'Project deleted successfuly',
        data: deleted
    })
}

