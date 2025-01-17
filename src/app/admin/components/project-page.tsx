 'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import AddProjectForm from './project-form'

export default function ProjectPage({children}:{children: React.ReactNode}) {
    const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className='flex items-center justify-between gap-8'>
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <button onClick={()=>setOpen(true)} className='bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300'>Add New Project</button>
      </div>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>

            <AddProjectForm onSuccess={()=>{{
                alert('Project created')
                setOpen(false)
            }}} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
