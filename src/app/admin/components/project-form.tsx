'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IProjectJSON } from '@/types'
import { LoaderCircle } from 'lucide-react'

export default function AddProjectForm({onSuccess}:{onSuccess?: (data: {
    success?: boolean,
    message?: string
    data?: IProjectJSON
})=>void}) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [description, setDescription] = useState('')
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [otherImages, setOtherImages] = useState<FileList | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (mainImage) formData.append('mainImage', mainImage)
    if (otherImages) {
      for (let i = 0; i < otherImages.length; i++) {
        formData.append('otherImages', otherImages[i])
      }
    }

    const res = await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setTitle('')
      setDescription('')
      setMainImage(null)
      setOtherImages(null)
      
      router.refresh()
      onSuccess?.(await res.json())
    } else {
        console.log(res.body)
      alert('Failed to add project')
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2  border border-gray-600 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium ">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md"
          rows={3}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="mainImage" className="block text-sm font-medium">
          Main Image
        </label>
        <input
          type="file"
          id="mainImage"
          onChange={(e) => setMainImage(e.target.files?.[0] || null)}
          className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md"
          accept="image/*"
          required
        />
      </div>
      <div>
        <label htmlFor="otherImages" className="block text-sm font-medium">
          Other Images
        </label>
        <input
          type="file"
          id="otherImages"
          onChange={(e) => setOtherImages(e.target.files)}
          className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md"
          accept="image/*"
          multiple
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 flex justify-center gap-2 items-center"
        disabled={submitting}
      >
        {submitting && <LoaderCircle className='w-5 h-5 animate-spin' />}
        <span>Add Project</span>
      </button>
    </form>
  )
}

