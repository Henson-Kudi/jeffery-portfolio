'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
interface Props{
    text: React.ReactNode
    title: React.ReactNode
    body: React.ReactNode
    handleConfirm: ()=>Promise<void>
}

export default function ModalButton({text, title, body, handleConfirm}:Props) {
    const [open, setOpen] = useState(false)
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            {text}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {body}
            <DialogFooter>
                <DialogClose>
                    Cancel
                </DialogClose>
                <button onClick={async()=>{
                    await handleConfirm?.()
                    setOpen(false)
                }}>Confirm</button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
