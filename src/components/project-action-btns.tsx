'use client'

import { useState } from 'react'
import { Trash, LoaderCircle } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface ProjectActionButtonsProps {
  projectId: string
  // onDelete: (id: string) => Promise<void>
  // onEdit: (id: string) => void
}

export default function ProjectActionButtons({ projectId }: ProjectActionButtonsProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setSubmitting(true)
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        const json = await res.json()
        alert(json?.message)
      }
    } catch (err) {
      console.log(err)
    }finally{
      router.refresh()
      setSubmitting(false)
      setOpen(false)
    }
  }

  return (
    <div className="flex items-end justify-end gap-4">
      <button onClick={() => {
        setOpen(true)
      }}>
        <Trash className="text-red-500 hover:text-red-600 transition-colors" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
            <Button
              disabled={submitting}
              onClick={handleDelete}
            >
              {
                submitting && <LoaderCircle className='mr-2 w-5 h-5 animate-spin' />
              }
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  )
}

