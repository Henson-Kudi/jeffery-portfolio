import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { uploadFileToS3 } from '@/lib/s3'
import dbConnect, { Project } from '@/lib/mongoose/models'

export async function POST(request: Request) {
    await dbConnect()

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const mainImage = formData.get('mainImage') as File
    const otherImages = formData.getAll('otherImages') as File[]

    if (!title || !description || !mainImage) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save the main image
    const mainImageBuffer = Buffer.from(await mainImage.arrayBuffer())
    const mainImagePath = `images/${randomUUID()}-${mainImage.name}`
    // console.log(mainImage, 'main image')
    // const mainImagePath = join('public', 'uploads', mainImage.name)
    await uploadFileToS3(mainImageBuffer, mainImagePath, mainImage.type)

    // Save other images
    const otherImagePaths = await Promise.all(
        otherImages.map(async (image) => {
            const buffer = Buffer.from(await image.arrayBuffer())
            const path = `images/${randomUUID()}-${image.name}`
            await uploadFileToS3(buffer, path, image.type)
            return path
        })
    )

    // In a real application, you would save this data to a database
    const project = await Project.create({
        mainImage: mainImagePath,
        title,
        description,
        otherImages: otherImagePaths,

    })

    return NextResponse.json({
        success: true,
        message: 'Project created successfuly',
        data: project
    })
}

