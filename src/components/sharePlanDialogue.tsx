"use client"

import { Copy } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"






export function SharePlanDialogue({submissionSuccess, slug}: {submissionSuccess: boolean, slug: string}) {

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = ''; 
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
      };



      const handleClick = () => {
        window.location.reload();
      };
    
      


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Submit</div>
      </DialogTrigger>
      {submissionSuccess ? (


      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Plan created!</DialogTitle>
          <DialogDescription>
            Anyone with this link can access and vote.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`https://localhost:3000/plan/${slug}`}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>

        </div>
        <DialogFooter className="flex flex-row gap-8 mx-auto">
            <Link href={`/plan/${slug}`}>
            <Button type="button" variant="secondary">
              View Plan
            </Button>
            </Link>
            <DialogClose asChild>
            <Button type="button" onClick={handleClick}variant="secondary">
              Create new
            </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
      ) : null}
    </Dialog>
  )
}

